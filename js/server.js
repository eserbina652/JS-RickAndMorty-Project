const popupLinks = document.querySelectorAll('.popup-link')
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')
const neForm = document.getElementById('neForm')

let unlock = true

const timeout = 800

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index]
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '')
      const currentPopup = document.getElementById(popupName)
      popupOpen(currentPopup)
      e.preventDefault()//если событие не выполняется явно, его действие по умолчанию не должно выполняться так, как обычно
    })
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index]
    el.addEventListener('click', function (e) {
      popupClose(el.closest('popup'))
      e.preventDefault()
    })
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open')
    if (popupActive) {
      popupClose(popupActive, false)
    } else {
      bodyLock()
    }
    currentPopup.classList.add('open')
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open')
  } if (doUnlock) {
    bodyUnLock()
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
  if (lockPadding.length > 0)
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index]
      el.style.paddingRight = lockPaddingValue
    }
  body.style.paddingRight = lockPaddingValue
  body.classList.add('lock')

  unlock = false
  setTimeout(function () {
    unlock = true
  }, timeout)
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index]
        el.style.paddingRight = '0px'
      }
    }
    body.style.paddingRight = '0px'
    body.classList.remove('lock')
  }, timeout)

  unlock = false
  setTimeout(function () {
    unlock = true
  }, timeout)
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const  popupActive = document.querySelector('.popup.open')
    popupClose(popupActive)
  }
})

// const div = document.getElementById('APIBlock')
// div.style.width = 'auto'
// div.style.display = 'flex'
// div.style.flexDirection = 'row'
// div.style.flexWrap = 'wrap'
// div.style.alignItems = 'flex-start'
// div.style.justifyContent = 'space around'
// div.style.alignContent = 'flex-start'
// const button = document.getElementById('button')
// button.style.height = '70px'
// button.style.width = '70px'
// button.style.backgroundColor = 'red'
// button.style.borderRadius = '20px'
// button.style.marginLeft = '450px'
// button.style.marginTop = '30px'

const form = document.getElementById('form')
const wrapper = document.querySelector('#content')
const table = document.createElement('table')
const headerText = document.createElement('div')
const tBody = document.createElement('tbody')
const trString = document.createElement('tr')

const tdAvatar = document.createElement('img')
const tdName = document.createElement('td')
const tdStatus = document.createElement('td')


headerText.innerText = 'Parameters of the desired device'
tdAvatar.innerText = 'Avatar'
tdName.innerText = 'Name'
tdStatus.innerText = 'Status'
headerText.style.whiteSpace = 'nowrap'
headerText.style.backgroundColor = 'rgb(63, 77, 61)'
headerText.style.border = '2px solid #5ab055'
headerText.style.fontSize = '25px'
headerText.style.padding = '20px 0 20px 0'
wrapper.appendChild(headerText)

trString.appendChild(tdAvatar)
trString.appendChild(tdName)
trString.appendChild(tdStatus)

tBody.appendChild(trString)
table.appendChild(tBody)
wrapper.appendChild(table)


async function getResponse(event, name) {
    event.preventDefault()
    name = form.querySelector('[name="name"]')

  if (name === 'all') {
    let response = await fetch(`https://rickandmortyapi.com/api/character`)
    let obj = await response.json()
    obj = obj.results
    obj.forEach(el => {
      const trBody = document.createElement('tr')
      const tdAvatar = document.createElement('img')
      const tdName = document.createElement('td')
      const tdStatus = document.createElement('td')
      tdStatus.innerText = el.status
      tdName.innerText = el.name
      tdName.style.fontSize = '40px'
      tdName.style.color = '#5dff55'
      tdAvatar.style.width = 'auto'
      tdAvatar.style.height = 'auto'
      tdAvatar.style.border = '3px solid green'
      tdAvatar.style.marginTop = '30px'
      tdAvatar.src = el.image
      trBody.appendChild(tdAvatar)
      trBody.appendChild(tdName)
      trBody.appendChild(tdDiagonal)
      table.appendChild(trBody)
    })
  }
  form.addEventListener('submit', retriveFormValue)

}
getResponse()
neForm.addEventListener('click', function (e) {
  if (!e.target.closest('popup_content')) {
    popupClose(e.target.closest('.popup'))
  }
})
