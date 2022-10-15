const popupLinks = document.querySelectorAll('.popup-link')
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true

const timeout = 800

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index]
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '')
      const currentPopup = document.getElementById(popupName)
      popupOpen(currentPopup)
      e.preventDefault()
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
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('popup_content')) {
        popupClose(e.target.closest('.popup'))
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open')
  }
  if (doUnlock) {
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
    const popupActive = document.querySelector('.popup.open')
    popupClose(popupActive)
  }
})


const form = document.getElementById('form')
const wrapper = document.querySelector('#content')
const table = document.createElement('table')
const headerText = document.createElement('div')
const tBody = document.createElement('tbody')
const trString = document.createElement('tr')

const tdName = document.createElement('td')
const tdColor = document.createElement('td')
const tdDiagonal = document.createElement('td')


headerText.innerText = 'Parameters of the desired device'
tdName.innerText = 'Name'
tdColor.innerText = 'Color'
tdDiagonal.innerText = 'Diagonal'
headerText.style.whiteSpace = 'nowrap'
headerText.style.backgroundColor = 'rgb(63, 77, 61)'
headerText.style.border = '2px solid #5ab055'
headerText.style.fontSize = '25px'
headerText.style.padding = '20px 0 20px 0'
wrapper.appendChild(headerText)

trString.appendChild(tdName)
trString.appendChild(tdColor)
trString.appendChild(tdDiagonal)

tBody.appendChild(trString)
table.appendChild(tBody)
wrapper.appendChild(table)


function retriveFormValue(event) {
  event.preventDefault()
  console.log(event)
  const name = form.querySelector('[name="name"]')
  const color = form.querySelector('[name="color"]')
  const diagonal = form.querySelector('[name="diagonal"]')

  const trBody = document.createElement('tr')
  const tdName = document.createElement('td')
  const tdColor = document.createElement('td')
  const tdDiagonal = document.createElement('td')

  // trBody.setAttribute('id', 'table_body')

  let data = {}
  const submit = document.getElementById('neForm')
  submit.addEventListener('click', function (event) {
    console.log(event.target.value)
    data[event.target.name] = event.target.value
    localStorage.setItem('formData', JSON.stringify(data))
  })
  if (localStorage.getItem('formData')) {
    data = JSON.parse(localStorage.getItem('formData'))

    for (let key in data) {
      form.elements[key].value = data[key]
    }
  }


  tdName.innerText = name.value
  tdColor.innerText = color.value
  tdDiagonal.innerText = diagonal.value

  trBody.appendChild(tdName)
  trBody.appendChild(tdColor)
  trBody.appendChild(tdDiagonal)


  table.appendChild(trBody)

}


form.addEventListener('submit', retriveFormValue)


const div = document.getElementById('APIBlock')
div.style.width = 'auto'

async function getResponse() {
  let response = await fetch('https://rickandmortyapi.com/api/character')
  let obj = await response.json()
  obj = obj.results
  obj.forEach(el => {
    let img = document.createElement('img')
    let p = document.createElement('p')
    p.innerText = el.name
    p.style.fontSize = '40px'
    p.style.color = '#5dff55'
    img.style.width = 'auto'
    img.style.height = 'auto'
    img.style.border = '3px solid #5dff55'
    img.style.marginTop = '70px'
    img.src = el.image
    div.appendChild(img)
    img.append(p)
    div.appendChild(p)
  })
}

getResponse()
