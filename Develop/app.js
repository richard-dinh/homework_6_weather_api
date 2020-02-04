let userInput
let uvIndex
let pastCities = []
let display = document.getElementById('cityInfo')
let fiveSelect= document.getElementById('fiveDay')

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

const toFarenheit = value =>{
  value = (value * (9 / 5) - 459.67).toFixed(2)
  return value
}
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
      temp = toFarenheit(temp)

      // console.log(temp, humidity, speed, lon, lat)
      info.innerHTML = `<h2>${userInput} ${moment().format('MM/DD/YYYY')}</h2>
    <p>Temperature: ${temp} ºF</p>
    <p>Humidity: ${humidity}</p>
    <p> Wind Speed: ${speed} mph </p>
    `
      display.append(info)
      getUvIndex(lon, lat)
      getFiveDayForecast(lon, lat)
      
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

const getFiveDayForecast = (lon, lat) =>{
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=504fb55759317621b3658208c57633c9`)
    .then(response => response.json())
    .then(({list}) => {
      console.log(list)
      //converting unix time stamp to a date time
      console.log(moment.unix(list[0].dt).format("MM/DD/YYYY"))
      for(let i = 7; i<list.length; i+=7){
        let fiveNode = document.createElement('div')
        fiveNode.setAttribute('class', 'col-sm-2 fiveDayStyle')
        fiveNode.innerHTML =`
            <h6>${moment.unix(list[i].dt).format("MM/DD/YYYY")}</h6>
            <p>Temp: ${toFarenheit(list[i].main.temp)} ºF</p>
            <p>Humidity: ${list[i].main.humidity}%</p>
        `
        console.log(fiveNode)
        fiveSelect.append(fiveNode)
      }
      // starts at index 0 and increases by 7
    })
    .catch(error => console.error(error))
}
