var addCtrl = angular.module('addCtrl',['geolocation','gservice']);

//define controller
addCtrl.controller('addCtrl',function($scope, $http, geolocation, gservice){

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
      latitude: $scope.formData.latitude,
      longitude: $scope.formData.longitude, 
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
    
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address':address},function(results,status){
      console.log('hello', results);
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