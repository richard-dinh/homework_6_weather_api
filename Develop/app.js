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
  .then(data =>{
    console.log(data)
  })
  .catch(error => console.error(error))
}