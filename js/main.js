const popupOpen = document.getElementById('button_open')
const container = document.getElementById('popup_container_close')
const popupLittleWindow = document.getElementById('popup_window')
const Xclose = document.getElementById('X_close_button')
const linkClose = document.getElementById('close_button')

const div = document.getElementById('APIBlock')
const main = document.getElementById('main')
const APIHeader = document.createElement('h2')

const clearButton = document.getElementById('clearButton')
const clearContainer = document.getElementById('clear-popup-close')
const clearLittleWindow = document.getElementById('little-clear-popup')
const xClearClose = document.getElementById('clear-close')
const clearYes = document.getElementById('clear-yes')
const clearNo = document.getElementById('clear-no')

const wrapper = document.querySelector('#content')
const table = document.createElement('table')
const headerText = document.createElement('div')
const tBody = document.createElement('tbody')
const trString = document.createElement('tr')
const tdDate = document.createElement('td')
const tdName = document.createElement('td')
const tdColor = document.createElement('td')
const tdDiagonal = document.createElement('td')

const dateInput = document.getElementById('date')
const nameInput = document.getElementById('name')
const colorInput = document.getElementById('color')
const diagonalInput = document.getElementById('diagonal')
const errDate = document.getElementById('error1')
const errName = document.getElementById('error2')
const errColor = document.getElementById('error3')
const errDiagonal = document.getElementById('error4')

const dropdowns = document.querySelectorAll('.dropdown')


let trBody
let tableValues = []
let result = []
let error = {
  date: false,
  name: false,
  color: false,
  diagonal: false
}


headerText.innerText = 'Parameters of the desired device'
headerText.style.whiteSpace = 'nowrap'
headerText.style.backgroundColor = '#223328'
headerText.style.border = '3px solid #6e9179'
headerText.style.fontSize = '25px'
headerText.style.padding = '20px 0 20px 0'

APIHeader.innerText = 'Response from the server'
APIHeader.style.fontSize = '50px'
APIHeader.style.letterSpacing = '5px'
APIHeader.style.fontWeight = 'lighter'

div.style.width = 'auto'
div.style.zIndex = '0'
div.style.backgroundColor = 'none'
div.style.zIndex = '2'

wrapper.appendChild(headerText)


popupOpen.addEventListener('click', openPopup)

popupLittleWindow.addEventListener('click', (event) => {
  event.stopPropagation()
})

Xclose.addEventListener('click', closePopup)

linkClose.addEventListener('click', () => {
  if (!error.diagonal && !error.color && !error.name && !error.date) {
    retriveFormValue()
    closePopup()
  }
})

container.addEventListener('click', closePopup)


clearButton.addEventListener('click', openClearPopup)

clearLittleWindow.addEventListener('click', (event) => {
  event.stopPropagation()
})

clearContainer.addEventListener('click', closeClearPopup)

xClearClose.addEventListener('click', closeClearPopup)

clearNo.addEventListener('click', closeClearPopup)

clearYes.addEventListener('click', () => {
  localStorage.clear()
  table.innerHTML = ''

  columNames()
  closeClearPopup()
})


dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select')
  const caret = dropdown.querySelector('.caret')
  const menu = dropdown.querySelector('.menu')
  const options = dropdown.querySelectorAll('.menu li')
  const selected = dropdown.querySelector('.selected')

  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked')
    caret.classList.toggle('caret-rotate')
    menu.classList.toggle('menu-open')
  })

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText
      select.classList.remove('select-clicked')
      caret.classList.remove('caret-rotate')
      menu.classList.remove('menu-open')
      options.forEach(option => {
        option.classList.remove('active')
      })
    })
  })
})

document.getElementById('sort-button').onclick = function () {
  table.innerHTML = ''
  document.getElementById('sortedBy').innerHTML = 'Sorted by...'
  let dateStart = document.querySelector('#start-date').value
  let dateEnd = document.querySelector('#end-date').value
  dateStart = Date.parse(dateStart)
  dateEnd = Date.parse(dateEnd)
  let localValues = localStorage.getItem('localData')
  localValues = JSON.parse(localValues)
  const localDateValue = localValues.map(el => ({...el, date: Date.parse(el.date)}))

  columNames()

  localDateValue.sort((a, b) => a.date - b.date)
  localDateValue.forEach(el => {
    if (dateStart <= el.date && el.date <= dateEnd) {
      tableView(el.date, el.name, el.color, el.diagonal)
    }
  })
}

document.getElementById('back-button').onclick = function () {
  table.innerHTML = ''
  document.getElementById('sortedBy').innerHTML = 'Sorted by...'

  columNames()

  let localValues = localStorage.getItem('localData')
  localValues = JSON.parse(localValues)
  localValues.forEach(el => tableView(el.date, el.name, el.color, el.diagonal))
}

document.getElementById('newest').onclick = function () {
  compare('newest')
}

document.getElementById('oldest').onclick = function () {
  compare('oldest')
}


function openPopup() {
  container.setAttribute('id', 'popup_container')
  window.addEventListener('keydown', (e) => {
    if (container.hasAttribute('popup_container')) {
      e.preventDefault()
    }
  })
}


function popupValidation(name, date, color, diagonal) {
  name.data.addEventListener('blur', function () {
    let value = this.value
    let check = /^\d+$/.test(value)

    if (check) {
      error.name = true
      errClear('name', false)
    } else {
      error.name = false
      errClear('name', true)
    }
  })

  date.data.addEventListener('blur', function () {
    let value = this.value
    let check = !(new Date(value).getTime() >= new Date("1980-01-01").getTime() && new Date(value).getTime() <= new Date('2100-01-01').getTime())

    if (check) {
      error.date = true
      errClear('date', false)
    } else {
      error.date = false
      errClear('date', true)
    }
  })

  color.data.addEventListener('blur', function () {
    let value = this.value
    let check = /^\d+$/.test(value)

    if (check) {
      error.color = true
      errClear('color', false)
    } else {
      error.color = false
      errClear('color', true)
    }
  })

  diagonal.data.addEventListener('blur', function () {
    let value = this.value
    let check = !/^[1-9]{0,3}([,.][0-9]{0,3})?$/.test(value)

    if (check) {
      error.diagonal = true
      errClear('diagonal', false)
    } else {
      error.diagonal = false
      errClear('diagonal', true)
    }
  })
}


popupValidation({name: "name", data: nameInput},
  {name: "date", data: dateInput},
  {name: "color", data: colorInput},
  {name: "diagonal", data: diagonalInput})


function closePopup() {
  container.removeAttribute('popup_container')
  container.setAttribute('id', 'popup_container_close')
}


function openClearPopup() {
  clearContainer.setAttribute('id', 'clear-popup')

  window.addEventListener('keydown', e => { //событие keydown = нажатие любой клавиши на клавиатуре
    if (clearContainer.hasAttribute('clear-popup')) {
      e.preventDefault()
    }
  })
}


function closeClearPopup() {
  clearContainer.removeAttribute('clear-popup')
  clearContainer.setAttribute('id', 'clear-popup-close')
}


function columNames() {
  tdDate.innerText = 'Date'
  tdName.innerText = 'Name'
  tdColor.innerText = 'Color'
  tdDiagonal.innerText = 'Diagonal'

  trString.appendChild(tdDate)
  trString.appendChild(tdName)
  trString.appendChild(tdColor)
  trString.appendChild(tdDiagonal)

  tBody.appendChild(trString)
  table.appendChild(tBody)
  wrapper.appendChild(table)
}


const tableView = (date, name, color, diagonal) => {
  if (!error.date && !error.name && !error.color && !error.diagonal) {
    let normalDate = new Date(date)

    trBody = document.createElement('tr')
    const tdDate = document.createElement('td')
    const tdName = document.createElement('td')
    const tdColor = document.createElement('td')
    const tdDiagonal = document.createElement('td')

    tdDate.innerText = normalDate.toDateString()
    tdName.innerText = name
    tdColor.innerText = color
    tdDiagonal.innerText = diagonal

    trBody.appendChild(tdDate)
    trBody.appendChild(tdName)
    trBody.appendChild(tdColor)
    trBody.appendChild(tdDiagonal)

    table.appendChild(trBody)
  }
}


const firstVie = () => {
  const prevStorage = localStorage.getItem('localData') ? JSON.parse(localStorage.getItem('localData')) : []
  prevStorage.forEach(el => {
    tableValues = el
    tableView(el.date, el.name, el.color, el.diagonal)
  })
}


const localController = (diagonal, name, color, date) => {
  if (!error.date && !error.name && !error.color && !error.diagonal) {
    const prevStorage = localStorage.getItem('localData') ? JSON.parse(localStorage.getItem('localData')) : []
    const localStorageData = {
      date: date,
      name: name,
      color: color,
      diagonal: diagonal
    }

    result = [...prevStorage, localStorageData]
    localStorage.setItem('localData', JSON.stringify(result))
  }
}


function retriveFormValue() {
  if (!error.date && !error.name && !error.color && !error.diagonal) {
    tableView(dateInput.value, nameInput.value, colorInput.value, diagonalInput.value)
    localController(diagonalInput.value, nameInput.value, colorInput.value, dateInput.value)
  }
}


function errClear(type, clear) {
  const p = document.createElement('p')
  p.style.color = 'red'
  p.style.fontSize = '10px'

  switch (type) {
    case 'name': {
      if (!errName.childNodes.length) {
        p.innerText = 'Incorrect name'
        nameInput.classList.add('invalid')
        errName.appendChild(p)
      }
      if (clear) {
        nameInput.classList.remove('invalid')
        errName.innerHTML = ''
      }
    }
      break;

    case 'date': {
      if (!errDate.childNodes.length) {
        p.innerText = 'Incorrect date'
        dateInput.style.borderBottom = '1px solid red'
        errDate.appendChild(p)
      }
      if (clear) {
        dateInput.style.borderBottom = '1px solid black'
        errDate.innerHTML = ''
      }
    }
      break;

    case 'color': {
      if (!errColor.childNodes.length) {
        p.innerText = 'Incorrect color'
        colorInput.classList.add('invalid')
        errColor.appendChild(p)
      }
      if (clear) {
        colorInput.classList.remove('invalid')
        errColor.innerHTML = ''
      }
    }
      break;

    case 'diagonal': {
      if (!errDiagonal.childNodes.length) {
        p.innerText = 'Incorrect diagonal'
        diagonalInput.classList.add('invalid')
        errDiagonal.appendChild(p)
      }
      if (clear) {
        diagonalInput.classList.remove('invalid')
        errDiagonal.innerHTML = ''
      }
    }

      break;

    default: {
    }
  }
}


function compare(str) {
  table.innerHTML = ''
  let localValues = localStorage.getItem('localData')
  localValues = JSON.parse(localValues)
  const localDateValues = localValues.map(el => ({...el, date: Date.parse(el.date)}))

  if (str === 'oldest') {
    localDateValues.sort((a, b) => a.date - b.date)
    columNames()
    localDateValues.forEach(el => tableView(el.date, el.name, el.color, el.diagonal))
  } else if (str === 'newest') {
    localDateValues.sort((a, b) => b.date - a.date)
    columNames()
    localDateValues.forEach(el => tableView(el.date, el.name, el.color, el.diagonal))
  }
}


async function getResponse() {
  let response = await fetch('https://rickandmortyapi.com/api/character')
  let obj = await response.json()
  obj = obj.results

  obj.forEach(el => {
    let img = document.createElement('img')
    let p = document.createElement('p')

    p.innerText = el.name
    p.style.fontSize = '40px'
    p.style.color = 'rgba(0,255,149,0.47)'
    img.style.width = 'auto'
    img.style.height = 'auto'
    img.style.border = '3px solid #5dff55'
    img.style.marginTop = '70px'
    img.src = el.image
    img.style.zIndex = '3'
    p.style.zIndex = '3'

    div.appendChild(img)
    img.append(p)
    div.appendChild(p)
  })
  main.appendChild(APIHeader)
  main.appendChild(div)
}

columNames()
firstVie()
getResponse()








