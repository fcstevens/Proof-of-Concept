//object that stores varaibles and functions
let weather = {
    //this variables stores the unique API key generated from openweather.org
    apiKey: "0a9039a78f70a262a8ae8a5ecd903a8d",
    //function which retrieves the url and appends the city parameter with the api key variable to fetch weather information
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + //link to openweather.org, requires a city and api key to function
            city + //variable that user can alter  
            "&units=metric&appid=" + //using metric units as UK standard
            this.apiKey
        )
            //checks response 
            .then((response) => {
                //if statement that runs if invalid response is returned
                if (!response.ok) {
                    alert("No weather found."); //create an alert upon web page
                    throw new Error("No weather found."); //throws error
                }
                //when weather data is returned, stores data in standard file format
                return response.json();
            })
            //weather data is fetched then pushed into displayWeather function
            .then((data) => this.displayWeather(data));
    },
    //function used to display weather 
    displayWeather: function (data) {  //retreives data from object array of the complete URl fetched from fetchWeather function to be made into variables

        const { name } = data; //city name is extracted from object data 
        const { icon, description } = data.weather[0]; //specifically retrieves icon and description of weather data from array 
        const { temp, humidity } = data.main; //extract temperature and humidy from array
        const { speed } = data.wind; //takes the wind speed out the object and made into a variable 

        //query selector used to return the elements needed to display weather information
        document.querySelector(".city").innerText = "Weather in " + name; //displays city name 
        document.querySelector(".icon").src = //icon images are sourced from an openweather.org URL
            "https://openweathermap.org/img/wn/" + icon + ".png"; // data from variable is appended to URL to produce the correct icon png 
        document.querySelector(".description").innerText = description; // displays corresponding description for weather condition
        document.querySelector(".temp").innerText = temp + "°C"; // temperature of city using "°C" as
        document.querySelector(".humidity").innerText = //produces humidty found within object data
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = //displays wind speed from variable
            "Wind speed: " + speed + " km/h";

        document.querySelector(".weather").classList.remove("loading");

        // produces an image of the city that the weather showcases 
        var img = document.createElement("img"); //creates an variable used to hold the image
        img.src = "https://source.unsplash.com/1200x650/?" + name + "'"; //image is sourced from a URL with the appended name of city
        var src = document.getElementById("header");
        src.appendChild(img);

        //function that allows user to input a search 
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value); //fetches input from search bar and retrieves corresponding data
    },
};

//when search button is clicked by user, it initiates search function 
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

//creates an event listener for when the "enter" key is pressed within the search bar, it runs the weather.search function
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

//when app is initiated, it searches for and retrieves the weather in "Bath" to be displayed
weather.fetchWeather("Bath");