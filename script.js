const field = document.querySelector('.field')
const cells = document.querySelectorAll('.cell')
const resultHovered = document.querySelector('.results')
const resultText = document.querySelector('.results__text')
const winArrays = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]]
const ticUrl = ('./assets/svg/111.svg')
const tacUrl = ('./assets/svg/222.svg')
const body = document.querySelector('body')
const resultWinner = document.querySelector('.results__winner')
const resultMoves = document.querySelector('.results__moves')
const historyHovered = document.querySelector('.history')
const historyText = document.querySelector('.history__text')
// buttons
const resetBtn = document.querySelector('#resetButton')
const historyBtn = document.querySelector('#historyBtn')
const langBtn = document.querySelector('#langBtn')
const themeBtn = document.querySelector('#themeBtn')

// styles
const darkCell = 'rgb(229, 229, 229)'
const lightCell = 'rgb(33, 158, 188)'
const lightCellClicked = '#ffb703'
const darkCellClicked = '#fff'

// variables
let localLang = localStorage.getItem('engLanguage')
let themeStor = localStorage.getItem('theme')

let historyArr = [
    
]
if(localStorage.getItem('history')) {
    historyArr = JSON.parse(localStorage.getItem('history'))
}

let isEng = true
let isDark = false
let counter = 0
let ticArr = []
let tacArr = []
let urlMove
let players = [ticArr, tacArr]

field.addEventListener('click', move)
resetBtn.addEventListener('click', resetGame)
themeBtn.addEventListener('click', themeChange)
langBtn.addEventListener('click', langChange)
historyBtn.addEventListener('click', showHistory)

const language = {
    reset: {
        en: 'Reset Game',
        ru: 'Начать заново',
    },
    draw: {
        en: 'Draw',
        ru: 'Ничья',
    },
    first: {
        en: 'First player win',
        ru: 'Первый игрок выиграл',
    },
    second: {
        en: 'Second player win',
        ru: 'Второй игрок выиграл',
    },
    moves: {
        en: 'Number of moves',
        ru: 'Количество ходов',
    },
}

function move(event) {
    let target = event.target.closest('div')
    if(!target) return  
    let style = getComputedStyle(target)
    if(target.className != 'cell') return
    if(style.backgroundColor != cellTheme()) return
    target.style.backgroundColor = cellThemeClicked()
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

function cellThemeClicked() {
    if(body.className == 'dark') {
        return darkCellClicked
    } else {
        return lightCellClicked
    }
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
        element.style.backgroundColor = "";
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
            resultWinner.textContent = language.draw[langChoose()]
            resultMoves.textContent = language.moves[langChoose()] + ' ' + moves
            field.removeEventListener('click', move)
            resultHovered.style.visibility = 'visible'
            resultHovered.style.opacity = '1'
            resultText.style.visibility = 'visible'
            resultText.style.opacity = '1'
            gameHistory('draw', 9)
            return
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
                    let moves = +ticArr.length + +tacArr.length
                    if(twoArrays == 0) {
                        resultWinner.textContent = language.first[langChoose()]
                        gameHistory('first', moves)
                    } else {
                        resultWinner.textContent = language.second[langChoose()]
                        gameHistory('second', moves)
                    }
                    resultMoves.textContent = language.moves[langChoose()] + ' ' + moves
                    field.removeEventListener('click', move)
                    resultHovered.style.visibility = 'visible'
                    resultHovered.style.opacity = '1'
                    resultText.style.visibility = 'visible'
                    resultText.style.opacity = '1'                    
                }
            }
    }
}

function themeChange() {
    if(body.className == 'dark') {
        body.className = ''
        localStorage.removeItem('theme')
        localStorage.setItem('theme', 'light')
    } else {
        body.className = 'dark'
        localStorage.removeItem('theme')
        localStorage.setItem('theme', 'dark')
    }
    resetGame()
}

function checkTheme() {
    if(themeStor == 'dark') {
        themeChange()
    }
}
function checkLang() {
    if(localLang == 'false') {
        isEng = true
        langChange()
    }
}

function cellTheme() {
    if(body.className == 'dark') {
        return darkCell
    } else {
        return lightCell
    }
}

function langChange() {
    isEng = !isEng
    resetBtn.textContent = language.reset[langChoose()]
    if(isEng) {
        localStorage.removeItem('engLanguage')
        localStorage.setItem('engLanguage', true)
    } else {
        localStorage.removeItem('engLanguage')
        localStorage.setItem('engLanguage', false)
    }

    resetGame()
}
function langChoose() {
    if(isEng) {
        return 'en'
    } else {
        return 'ru'
    }
}

function gameHistory(winner, moves) {
    
    historyArr.unshift({
        'winner': winner,
        'moves': moves,
    })

    if(historyArr.length > 10) historyArr.pop()
    localStorage.removeItem('history')
    localStorage.setItem('history', JSON.stringify(historyArr))
}

let isHistoryShowed = false
function showHistory() {
    if(historyArr.length == 0) return
    let ul = document.createElement('ul')
    for(let i = 0; i < historyArr.length; i++) {
        let tempObj = historyArr[i]
        let li = document.createElement('li')
            
        if(tempObj.moves != undefined) {
            if(isEng) {        
                tempObj.winner == 'draw' ? li.innerHTML = `Draw` :
                li.innerHTML = `Winner: ${tempObj.winner} player, moves: ${tempObj.moves}`
                ul.append(li)
            } else {
                tempObj.winner == 'draw' ? li.innerHTML = `Ничья` :
                li.innerHTML = `Победитель: ${translatePlayers(tempObj.winner)} игрок, ходов: ${tempObj.moves}`
                ul.append(li)
            }
        }
        historyText.innerHTML = ''
        historyText.append(ul)
    }
    if(isHistoryShowed) {
        historyHovered.style.visibility = 'visible'
        historyHovered.style.opacity = '1'
        historyText.style.visibility = 'visible'
        historyText.style.opacity = '1'   
        isHistoryShowed = !isHistoryShowed 
    } else {
        historyHovered.style.visibility = 'hidden'
        historyHovered.style.opacity = '0'
        historyText.style.visibility = 'hidden'
        historyText.style.opacity = '0'   
        isHistoryShowed = !isHistoryShowed 
    }
}

function translatePlayers(enPlayer) {
    switch(enPlayer) {
        case 'first':
            return 'первый'
            break
        case 'second':
            return 'второй'
            break
    }
}
checkLang()
checkTheme()
