$(document).ready(function() {

  // search button functionality
  $("#searchbutton").on("click", function SearchForCity(input){
    var input = $("#search").val();
    //set the searched city local storage
    localStorage.setItem("city:", input);
    // ajax call that gets city info
    $.ajax({
     type: "GET",
     url: "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=77d824887f06ac6836449d9d10feb418&units=imperial",
     dataType: "json"
  }).then(function(response) {
    console.log(response);
})
function addCities(text) {
  var searchedCity = $("<li>").addClass("list-group-item").text(text);
  $(".historylist").append(searchedCity);
}
addCities(input);
  })

})