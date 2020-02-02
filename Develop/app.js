let userInput

let pastCities = []


document.addEventListener('click', ()=>{
  let target = event.target
  if(target.classList.contains('btn')){
    userInput = document.getElementById('citySearch').value
    //saving user input into pastCities array
    pastCities.push(userInput)
    console.log(userInput)
  }
})