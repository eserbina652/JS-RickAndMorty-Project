const form = document.getElementById('form')
const wrapper = document.querySelector('#content')
const table = document.createElement('table')
const headerText = document.createElement('div')
const tBody = document.createElement('tbody')
const trString = document.createElement('tr')

const tdName = document.createElement('td')
const tdColor = document.createElement('td')


headerText.innerText = 'Parameters of the desired device'
trString.style.display = 'table-column'
tdName.innerText = 'Name'
tdColor.innerText = 'Color'
headerText.style.whiteSpace = 'wrap'
headerText.style.backgroundColor = 'rgb(63, 77, 61)'
headerText.style.border = '2px solid #5ab055'
headerText.style.fontSize = '25px'
headerText.style.padding = '20px 0 20px 0'
wrapper.appendChild(headerText)

trString.appendChild(tdName)
trString.appendChild(tdColor)

tBody.appendChild(trString)
table.appendChild(tBody)
wrapper.appendChild(table)


function retriveFormValue(event) {
  event.preventDefault()

  const name = form.querySelector('[name="name"]')
  const color = form.querySelector('[name="color"]')

  const trBody = document.createElement('tr')
  const tdName = document.createElement('td')
  const tdColor = document.createElement('td')

  tdName.innerText = name.value
  tdColor.innerText = color.value

  trBody.appendChild(tdName)
  trBody.appendChild(tdColor)
  table.appendChild(trBody)
}

form.addEventListener('submit', retriveFormValue)


