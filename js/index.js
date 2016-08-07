var app = angular.module('WeatherApp', []);

app.controller("MainCtrl", ['$scope', '$http', function($scope, $http) {
  $http({ //Getting user's current location
    method: "GET",
    url: "http://freegeoip.net/json/"
  }).then(function mySucces(response) {
    $scope.state = response.data.region_code;
    $scope.city = response.data.city.split(" ").join("_");

    $.ajax({
      url: "http://api.wunderground.com/api/" + "92b2fa0b8cfa09d9" + "/forecast/conditions/q/" + $scope.state + "/" + $scope.city + ".json",
      dataType: "jsonp",
      success: function(parsed_json) {
        //Icon                  
        $scope.icon_url = "http://icons.wxug.com/i/c/i/" + parsed_json.current_observation.icon + ".gif";
        
        //Set Temp                    
        $scope.temp_f = parsed_json.current_observation.temp_f;
        $scope.temp_c = parsed_json.current_observation.temp_c;
        $scope.temp = $scope.temp_f;
        $scope.temp_var1 = "F";
        $scope.temp_var2 = "C";
                            
        //Weather Forecast                    
        $scope.weatherforecast = parsed_json.current_observation.weather;
        backgroundDisplay($scope.weatherforecast);

        //Local Time
        $scope.local_time = parsed_json.current_observation.local_time_rfc822;
        var locTime = $scope.local_time;
        var locTime2 = locTime.split(" ");
        locTime = locTime2.pop();
        locTime = locTime2.join(" ");
        $scope.local_time = locTime;

        //Feels Like:
        $scope.feelslike_f = parsed_json.current_observation.feelslike_f;
        $scope.feelslike_c = parsed_json.current_observation.feelslike_c;
        $scope.feelslike_var = $scope.feelslike_f;

        $scope.$digest(); //Because we are executing code outside of Angular's knowledge, we need to manually call $scope.$digest()
      }
    });
  });

  var backgroundDisplay = function(weatherFore) {
    console.log("weatherFore" + weatherFore);
    if ((weatherFore.toLowerCase() == "mostly cloudy") ||
      (weatherFore.toLowerCase() == "scattered clouds") ||
      (weatherFore.toLowerCase() == "partly cloudy") ||
      (weatherFore.toLowerCase() == "partly sunny")) {
      document.body.style.backgroundImage = "url('http://i.giphy.com/HoUgegTjteXCw.gif')";
    } else if (weatherFore.toLowerCase() == "mostly sunny") {
      document.body.style.backgroundImage = "url('http://i.giphy.com/OmHopaOtlmCEU.gif')";
    } else if (weatherFore.toLowerCase() == "sunny") {
      document.body.style.backgroundImage = "url('http://i.giphy.com/KlI5X8lg0wINO.gif')";
    } else if ((weatherFore.toLowerCase() == "overcast") ||
      (weatherFore.toLowerCase() == "cloudy")) {
      document.body.style.backgroundImage = "url('http://i.giphy.com/lrYX3haV25ZC0.gif')";
    } else if (weatherFore.toLowerCase() == "clear") {
      document.body.style.backgroundImage = "url('http://i.giphy.com/ivcVZnZAEqhs4.gif')";
    } else if ((weatherFore.toLowerCase() == "thunderstorms") ||
      (weatherFore.toLowerCase() == "thunderstorm") ||
      (weatherFore.toLowerCase() == "unknown") ||
      (weatherFore.toLowerCase() == "chance of thunderstorms") ||
      (weatherFore.toLowerCase() == "chance of a thunderstorm")) {
      document.body.style.backgroundImage = "url('http://i.giphy.com/o5a3a7aBSEC3K.gif')";
    } else if ((weatherFore.toLowerCase() == "snow") ||
      (weatherFore.toLowerCase() == "flurries") ||
      (weatherFore.toLowerCase() == "chance of flurries") ||
      (weatherFore.toLowerCase() == "chance of snow")) {
      document.body.style.backgroundImage = "url('http://i.giphy.com/12RAfAXFH8g5LG.gif')";
    } else if ((weatherFore.toLowerCase() == "sleet") ||
      (weatherFore.toLowerCase() == "freezing rain") ||
      (weatherFore.toLowerCase() == "chance of freezing rain") ||
      (weatherFore.toLowerCase() == "chance of sleet")) {
      document.body.style.backgroundImage = "url('http://i.giphy.com/LmQOUUhklFSyA.gif')";
    } else if ((weatherFore.toLowerCase() == "rain") ||
      (weatherFore.toLowerCase() == "chance of rain") ||
      (weatherFore.toLowerCase() == "chance rain")) {
      document.body.style.backgroundImage = "url('http://i.giphy.com/5PjafLZFxMWc.gif')";
    } else if ((weatherFore.toLowerCase() == "fog") ||
      (weatherFore.toLowerCase() == "haze")) {
      document.body.style.backgroundImage = "url('http://i.giphy.com/10v3lzFmbemHv2.gif')";
    }
  }

  $scope.clickTempButton = function() {
    var tempButton = document.getElementById('tempButn');
    // Get the values
    var tempr = tempButton.getAttribute('data-temp');
    if (tempr == "F") {
      $scope.temp = $scope.temp_c;
      $scope.temp_var1 = "C";
      $scope.temp_var2 = "F";
      $scope.feelslike_var = $scope.feelslike_c;
    } else if (tempr == "C") {
      $scope.temp = $scope.temp_f;
      $scope.temp_var1 = "F";
      $scope.temp_var2 = "C";
      $scope.feelslike_var = $scope.feelslike_f;
    }
  }

}]);