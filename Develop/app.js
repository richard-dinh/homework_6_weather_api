let userInput
let uvIndex
let pastCities = []
let display = document.getElementById('cityInfo')

//  API KEY : 504fb55759317621b3658208c57633c9


//API call by city name: api.openweathermap.org/data/2.5/weather?q=<cityName>
document.addEventListener('click', ()=>{
  let target = event.target
  if(target.classList.contains('btn')){
    userInput = document.getElementById('citySearch').value
    //saving user input into pastCities array
    pastCities.push(userInput)
    // console.log(userInput)
    displayWeather(userInput)
  }
})

//Capitalize first letter of every word in the string
const titleCase = str => {
  let splitStr = str.toLowerCase().split(' ');
  // console.log(splitStr)
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}
const displayWeather = userInput =>{
  getCityWeather(userInput)
}

const getCityWeather = userInput =>{
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=504fb55759317621b3658208c57633c9`)
    .then(response => response.json())
    .then(({ main: { temp, humidity }, wind: { speed }, coord: { lon, lat } }) => {
      userInput = titleCase(userInput)
      let info = document.createElement('div')
      temp = (temp * (9 / 5) - 459.67).toFixed(2)

      // console.log(temp, humidity, speed, lon, lat)
      info.innerHTML = `<h2>${userInput} </h2>
    <p>Temperature: ${temp} deg F</p>
    <p>Humidity: ${humidity}</p>
    <p> Wind Speed: ${speed} mph </p>
    `
      display.append(info)
      getUvIndex(lon, lat)
    })
    .catch(error => console.error(error))
}
const getUvIndex = (lon, lat) =>{
  fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=504fb55759317621b3658208c57633c9&lat=${lat}&lon=${lon}`)
    .then(response => response.json())
    .then(({ value }) => {
      let uvNode = document.createElement('p')
      uvNode.textContent = 'UV Index: '
      let uvSpan = document.createElement('span')
      uvSpan.textContent = `${value}`
      switch (value) {
        case Math.floor(value) <= 2: uvSpan.setAttribute('class', 'uvSafe')
          break
        case Math.floor(value) <= 5: uvSpan.setAttribute('class', 'uvMed')
          break
        case Math.floor(value) <= 7: uvSpan.setAttribute('class', 'uvMod')
          break
        default: uvSpan.setAttribute('class', 'uvHigh')
          break
      }
      uvNode.append(uvSpan)
      display.append(uvNode)
    })

    .catch(error => console.error(error))
}
