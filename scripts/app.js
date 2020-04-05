const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon= document.querySelector('.icon img');


const updateUI = (data)=>{
    //destructuring the object since it has same name
    const {cityDets, weather }= data;
    // update Deatils Template
     details.innerHTML =
     `
        <h5 id="cname" class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
         </div>
     `;

    // update the dayand night icon images
    let timeSrc = weather.IsDayTime ? 'img/day.svg' :'img/night.svg' ;
    time.setAttribute('src',timeSrc); 

    // updating the icon packages
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`  ;
    icon.setAttribute('src',iconSrc);


     // removing the class d-none
     if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
    }
}




const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    // returns the promise
    return {cityDets,  weather };
};


cityForm.addEventListener('submit',e =>{
    //preventDefaultAction
    e.preventDefault();
    // get city Value
    const city = cityForm.city.value.trim();  
    cityForm.reset();
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err=>console.log(err));
    // cityName.innerHTML = city;
    // update the ui with the new city

    //setLocalStorage
    localStorage.setItem('city',city);
     
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}