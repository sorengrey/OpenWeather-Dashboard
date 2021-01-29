$(document).ready(function() {

  // search button functionality
  $("#searchbutton").on("click", function(input){
    // sets what the user searched for as a variable
    var input = $("#search").val();
    // saves the searched-for city in local storage
    localStorage.setItem("city:", input);
    // sets the locally stores cities to list elements 
    var history = $("<li>").addClass("list-group-item list-group-item-action").text(localStorage.getItem("city:"))
    $(".historylist").prepend(history);

    // ajax call that gets city's current weather info
    $.ajax({
     type: "GET",
     url: "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=77d824887f06ac6836449d9d10feb418&units=imperial",
     dataType: "json",
     success: (function(data){
    // variables for the current weather conditions
      var currentCity = $("<h2>").addClass("card-current").text(data.name);
      var currentTemp = $("<p>").text("Temperature: " + data.main.temp + "°F");
      var currentHumid = $("<p>").text("Humidity: " + data.main.humidity + "%");
      var currentWind = $("<p>").text("Wind Speed: " + data.wind.speed + "MPH");
      var currentUV = $("<p>").text("UV Index: ");
      // the card's body
      var cardInfo = $("<div>").addClass("card-body");
      // UV Button still needs to be set up
      var uvButton = $("<button>").addClass("uv-button");
      // the card
      var addCard = $("<div>").addClass("card");
      // adds all the weather info to the card body
      cardInfo.append(currentCity, currentTemp, currentHumid, currentWind, currentUV);
      // adds the card body's info to the card
      addCard.append(cardInfo);
      // adds the card to the currentday div
      $(".currentday").append(addCard);
    })
  })

// function to clear divs so the user can search again without breaking the layout

// get UV index function

// five day forecast function
function getFiveDay(input){
  // ajax call that gets the city's five-day forecast
  $.ajax({
     type: "GET",
     url: "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=77d824887f06ac6836449d9d10feb418&units=imperial",
     dataType: "json",
     success: (function(data){
       console.log(data);
       // deletes forecasts from the previous search
       $("#weather").empty();
       // loops through the forecast object to add cards
       for (var i = 0; i < data.list.length; i++) {
         // only grabs data from the forecast object after 3pm since there are three arrays for each day
        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          // gets the date
          var todaysDate = new Date(data.list[i].dt_txt).toLocaleDateString();
          console.log(todaysDate)
           // card
          var fiveCard = $("<div>").addClass("card bg-primary mb-3 text-white");
           // card body
          var fiveCardBody = $("<div>").addClass("card-body p-2");
          // changes the dt code to a readable date
          var date = $("<h3>").addClass("card-title date").text(todaysDate);
          // weather icons
          var icon = $("<img>").addClass("card-img").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
          // temperatures
          var temp = $("<p>").addClass("card-text temp").text("Temp: " + data.list[i].main.temp + "°F");
          // humidities
          var humid = $("<p>").addClass("card-text humid").text("Humidity: " + data.list[i].main.humidity + "%");
          // adds columns for the cards to go in
          var columns = $("<div>").addClass("col-md-2");
         // adds info to card's bodies
         columns.append(fiveCard.append(fiveCardBody).append(date, icon, temp, humid));
         // adds cards to fiveday div
         $(".fiveday").append(columns);
        }
      }
     })
  })
}


//function calls
getFiveDay(input);
})
  })
 