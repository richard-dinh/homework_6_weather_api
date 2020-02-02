let userInput

let pastCities = []

//  API KEY : 504fb55759317621b3658208c57633c9


//API call by city name: api.openweathermap.org/data/2.5/weather?q=<cityName>
document.addEventListener('click', ()=>{
  let target = event.target
  if(target.classList.contains('btn')){
    userInput = document.getElementById('citySearch').value
    //saving user input into pastCities array
    pastCities.push(userInput)
    console.log(userInput)
    getWeather(userInput)
  }
})

const getWeather = userInput =>{
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=504fb55759317621b3658208c57633c9`)
  .then(response => response.json())
  .then(({main: {temp, humidity}, wind:{speed}}) =>{
    userInput = titleCase(userInput)
    let display = document.getElementById('cityInfo')
    let info = document.createElement('div')
    temp = (temp *(9/5) - 459.67).toFixed(2)
    
    console.log(temp, humidity, speed)
    info.innerHTML = `<h2>${userInput} </h2>
    <p>Temperature: ${temp} deg F</p>
    <p>Humidity: ${humidity}</p>
    <p> Wind Speed: ${speed} mph </p>
    `
    display.append(info)
  })
  .catch(error => console.error(error))
}

const titleCase = str => {
  let splitStr = str.toLowerCase().split(' ');
  console.log(splitStr)
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}