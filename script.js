const field = document.querySelector('.field')
const cells = document.querySelectorAll('.cell')
const resetBtn = document.querySelector('#resetButton')
const resultHovered = document.querySelector('.results')
const resultText = document.querySelector('.results__text')

let counter = 0
let ticArr = []
let tacArr = []
let urlMove
const ticUrl = ('./assets/svg/111.svg')
const tacUrl = ('./assets/svg/222.svg')
let players = [ticArr, tacArr]
const winArrays = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]]

field.addEventListener('click', move)
resetBtn.addEventListener('click', resetGame)

function move(event) {
    let target = event.target.closest('div')
    if(!target) return  
    if(target.className != 'cell') return
    if(target.style.backgroundColor == '#faebd7') return
    target.style.backgroundColor = '#faebd7'
    target.childNodes[0].src = chooseTicOrTac()
    
    // Custom array.indexOf()
    for(let i = 0; i < cells.length; i++) {
        if(cells[i] == target) {
            chooseArray(i)
        }
    }
    
    // Check for win array
    setTimeout(() => findWinner(), 0);
}

function chooseArray(index) {
    if(counter % 2 == 0) {
        tacArr.push(index)
    } else {
        ticArr.push(index)
    }
}
function chooseTicOrTac() {
    if(counter % 2 == 0) {
        urlMove = ticUrl

    } else {
        urlMove = tacUrl
    }
    counter++
    return urlMove
}

function resetGame() {
    counter = 0
    ticArr = []
    tacArr = []
    cells.forEach(element => {
        element.childNodes[0].src = "";
        element.style.backgroundColor = "#554a26";
    })
    players = [ticArr, tacArr]
    field.addEventListener('click', move)
    resultHovered.style.visibility = 'hidden'
    resultHovered.style.opacity = '0'
    resultText.style.visibility = 'hidden'
    resultText.style.opacity = '0'
}

function findWinner() {
    for(let twoArrays = 0; twoArrays < players.length; twoArrays++) {
        if(ticArr.length + tacArr.length == 9) {
           resultText.innerHTML = 'Draw'
            field.removeEventListener('click', move)
            resultHovered.style.visibility = 'visible'
            resultHovered.style.opacity = '1'
            resultText.style.visibility = 'visible'
            resultText.style.opacity = '1'    
        }
        let player = players[twoArrays].slice(0)

        if(player.length < 2) return

        for(let z = 0; z < winArrays.length;z++) {
                let equal = winArrays[z].slice(0)

                for(let c = 0; c < player.length; c++) {

                    if(equal.includes(player[c])) {
                        let index = equal.indexOf(player[c])
                        equal.splice(index, 1)
                    }

                }
                if(equal.length === 0) {
                    twoArrays == 0 ? resultText.innerHTML = 'First player win' : resultText.innerHTML = 'Second player win';
                    field.removeEventListener('click', move)
                    resultHovered.style.visibility = 'visible'
                    resultHovered.style.opacity = '1'
                    resultText.style.visibility = 'visible'
                    resultText.style.opacity = '1'                    
                }
            }
    }
}
