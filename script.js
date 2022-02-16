const field = document.querySelector('.field')
const cells = document.querySelectorAll('.cell')
const resetBtn = document.querySelector('#resetButton')
let counter = 0
let ticArr = []
let tacArr = []
let urlMove
const ticUrl = ('./assets/svg/tic.svg')
const tacUrl = ('./assets/svg/tac.svg')
const players = [ticArr, tacArr]
const winArrays = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]]

field.addEventListener('click', move)
resetBtn.addEventListener('click', resetGame)

function move(event) {
    let target = event.target.closest('div')
    if(!target) return  
    if(target.className != 'cell') return
    if(target.style.backgroundColor == 'white') return
    target.style.backgroundColor = 'white'
    target.childNodes[0].src = chooseTicOrTac()
    
    // Custom array.indexOf()
    for(let i = 0; i < cells.length; i++) {
        if(cells[i] == target) {
            chooseArray(i)
        }
    }
    
    // Check for win array
    findWinner()
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
    equal = [1,3,3]
    equal.length = 4
    for(let i = 0; i < cells.length; i++) {
        cells[i].childNodes[0].src = ''
        cells[i].style.backgroundColor = 'black'
    }
}

function findWinner() {
    for(let twoArrays = 0; twoArrays < players.length; twoArrays++) {
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
                    twoArrays == 0 ? alert('First player win') : alert('Second player win');
                    
                }
            }
    }
}
