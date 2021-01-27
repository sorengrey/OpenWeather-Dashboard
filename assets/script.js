$(document).ready(function() {

  // search button functionality
  $("#searchbutton").on("click", function SearchForCity(input){
    var input = $("#search").val();

    $.ajax({
     type: "GET",
     url: "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=77d824887f06ac6836449d9d10feb418&units=imperial",
     dataType: "json"
  }).then(function(response) {
    console.log(response);
})
  })
})