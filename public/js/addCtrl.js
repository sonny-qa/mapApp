var addCtrl = angular.module('addCtrl',['geolocation','gservice','google.places']);

addCtrl.controller('MapController', function ($scope) {
    //$scope.user = {'from': '', 'fromLat': '', 'fromLng' : ''};
    var options = {
        componentRestrictions: {country: "us"}
    };
    var inputFrom = document.getElementById('from');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);

    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        $scope.user.fromLat = place.geometry.location.lat();
        $scope.user.fromLng = place.geometry.location.lng();
        //update the scope.user.form with the formatted ddresses suggestions
        $scope.user.from = place.formatted_address;
    });
   
});

//define controller
addCtrl.controller('addCtrl',function($scope, $http, geolocation, gservice){

  $scope.place = null;

  $scope.formData = {};
  var coords = {};
  var lat = 0;
  var long = 0;

  //initialise map data
  $scope.formData.latitude = 51.50722;
  $scope.formData.longitude = -0.12750;



  $scope.createPoint = function(){
    //function to create a new tool from the form data, triggered when the add button is clicked
    var toolData = {
      description: $scope.formData.desc,
      location: [$scope.formData.longitude, $scope.formData.latitude],
      address: $scope.formData.address
    };
    
    //make a $http post request
    $http({
      method: 'POST',
      url:'/items',
      data: toolData

    }).then(function(data){
      //once get request has been made, clear the form
        $scope.formData.desc = "";
        $scope.formData.longitude = "";
        $scope.formData.latitude = "";
        $scope.formData.address = "";


    }, function errorCb(response){
      console.log('error posting item: ', response)
    });

  };

  $scope.geoCode = function(address){
    console.log(address)
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address':address},function(results,status){
      console.log('hellooo',address);
    })
  };


  

  //function to create new user collecting form data, triggered when the create user button is clicked

    // $scope.createUser = function() {
    //   console.log('here')
    //     // Grabs all of the text box fields
    //     var userData = {
    //         username: $scope.formData.username,
    //         gender: $scope.formData.gender,
    //         age: $scope.formData.age,
    //         favlang: $scope.formData.favlang,
    //         location: [$scope.formData.longitude, $scope.formData.latitude],
    //         htmlverified: $scope.formData.htmlverified
    //     };

    //     $http({
    //       method: 'POST',
    //       url: '/users',
    //       data: userData
    //     }).then(function(data){
    //         // Once complete, clear the form (except location)
    //             $scope.formData.username = "";
    //             $scope.formData.gender = "";
    //             $scope.formData.age = "";
    //             $scope.formData.favlang = "";


    //       }, function errorCallback(response){
    //         console.log('Error: ', response)
    //       });
     
    // };

});