$(document).ready(function() {

  // search button functionality
  $("#searchbutton").on("click", function(input){
    // sets what the user searched for as a variable
    var input = $("#search").val();
    // saves the searched-for city in local storage
    localStorage.setItem("city:", input);

    // ajax call that gets city's weather info
    $.ajax({
     type: "GET",
     url: "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=77d824887f06ac6836449d9d10feb418&units=imperial",
     dataType: "json",
     success: (function(data){
    // test
    console.log(data);
    // variables for the current weather conditions - uv will have to be separate
      var currentCity = $("<h2>").addClass("card-current").text(data.name);
      var currentTemp = $("<p>").text("Temperature: " + data.main.temp + "°F");
      var currentHumid = $("<p>").text("Humidity: " + data.main.humidity + "%");
      var currentWind = $("<p>").text("Wind Speed: " + data.wind.speed + "MPH");
      var cardInfo = $("<div>").addClass("card-body");
      var addCard = $("<div>").addClass("card");
      cardInfo.append(currentCity, currentTemp, currentHumid, currentWind);
      addCard.append(cardInfo);
      $(".currentday").append(addCard);
    })
  })
// creates list elements and adds searched-for cities to the history list
function addCities(text) {
  var searchedCity = $("<li>").addClass("list-group-item").text(text);
  $(".historylist").append(searchedCity);
}
addCities(input);

})
  })
