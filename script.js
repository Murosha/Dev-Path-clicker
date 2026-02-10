let balance = 0
let clickPlus = 1
let maxEnergy = 200

const balanc = document.getElementById(`balance`)
const btn = document.getElementById(`click`)
const energy = document.getElementById(`maxEnergy`)
const message = document.getElementById('message')
// update
const update1 = document.getElementById(`update1`)
const update2 = document.getElementById(`update2`)
const update3 = document.getElementById(`update3`)
const update4 = document.getElementById(`update4`)
const update5 = document.getElementById(`update5`)
const update6 = document.getElementById(`update6`)
const update7 = document.getElementById(`update7`)


const savedBalance = localStorage.getItem('balance')
const savedClickPlus = localStorage.getItem('clickPlus')
const savedMaxEnergy = localStorage.getItem('maxEnergy')
const lastTime = localStorage.getItem('lastSaveTime')

if (savedBalance !== null) balance = Number(savedBalance)
if (savedClickPlus !== null) clickPlus = Number(savedClickPlus)
if (savedMaxEnergy !== null) maxEnergy = Number(savedMaxEnergy)
    if (lastTime !== null) {
    const now = Date.now()
    const diff = now - Number(lastTime) 

    const energyPerMs = 1 / 6000 
    const gainedEnergy = Math.floor(diff * energyPerMs)

    maxEnergy = Math.min(200, maxEnergy + gainedEnergy)
}

function saveGame() {
    localStorage.setItem('balance', balance)
    localStorage.setItem('clickPlus', clickPlus)
    localStorage.setItem('maxEnergy', maxEnergy)
    localStorage.setItem('lastSaveTime', Date.now())
}

// click
btn.addEventListener(`click`,() => {
    if (maxEnergy <= 0) return
    maxEnergy -= 1
    balance += clickPlus
    energy.innerText = '⚡' + maxEnergy
    balanc.innerText = `🪙` + balance
    saveGame()
})
// add energy
setInterval(() => {
    if (maxEnergy <= 199) {
        maxEnergy += 1
        energy.innerText = '⚡' + maxEnergy
    }
}, 6000)

// update bye
function update(bye, plus) {
if (balance >= bye) {
    balance -= bye
    clickPlus = plus
    balanc.innerText = `🪙` + balance
}
else {
    showMessage(`Not enough coins!`)
}
 updateButtons()
 saveGame()
}
/* по натисканню кнопки запускаєм функцію з такими значеннями */
update1.onclick = () => update(200, 2)
update2.onclick = () => update(650, 3)
update3.onclick = () => update(2000, 4)
update4.onclick = () => update(5000, 5)
update5.onclick = () => update(10000, 10)
update6.onclick = () => update(40000, 20)
update7.onclick = () => update(100000, 50)

// see update
function updateButtons() {
    const updatess = [update1, update2, update3, update4, update5, update6, update7]
    updatess.forEach(b => b.style.display = 'none') 

    if (clickPlus === 1) update1.style.display = 'inline-block'
     if (clickPlus === 2) update2.style.display = 'inline-block'
      if (clickPlus === 3) update3.style.display = 'inline-block'
       if (clickPlus === 4) update4.style.display = 'inline-block'
        if (clickPlus === 5) update5.style.display = 'inline-block'
         if (clickPlus === 10) update6.style.display = 'inline-block'
          if (clickPlus === 20) update7.style.display = 'inline-block'
}

// смс
function showMessage(text) {
    message.innerText = text
    message.style.opacity = '1'

    setTimeout(() => {
        message.style.opacity = '0'
    }, 3000)
}
// показ збереження
energy.innerText = '⚡' + maxEnergy
balanc.innerText = '🪙' + balance
updateButtons()
