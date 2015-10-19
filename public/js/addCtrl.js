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

  //function to create new user collecting form data, triggered when the create user button is clicked

    $scope.createUser = function() {
      console.log('here')
        // Grabs all of the text box fields
        var userData = {
            username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            favlang: $scope.formData.favlang,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        $http({
          method: 'POST',
          url: '/users',
          data: userData
        }).then(function(data){
            // Once complete, clear the form (except location)
                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favlang = "";


          }, function errorCallback(response){
            console.log('Error: ', response)
          });
     
    };

});