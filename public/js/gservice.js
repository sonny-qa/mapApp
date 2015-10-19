angular.module('gservice', [])
	.factory('gservice', function($http){

		//factory will return object with service methods
		var googleMapService = {};


		var selectedLat = 51.50722;
		var selectedLong = -0.12750;

		//create the initial map
		var initialize = function(latitiude,longitude){

			var myLatLng = {lat: selectedLat, lng: selectedLong};

			//if there's no map then create one
			if (!map){

				var map = new google.maps.Map(document.getElementById('map'),{
					center: myLatLng,
					zoom: 7
				});
				console.log('creating map', map)

			}


		}

		

		google.maps.event.addDomListener(window, 'load',
			initialize(selectedLat,selectedLong))
		return googleMapService;
	});