angular.module('gservice', [])
.factory('gservice', function($http){


	var googleMapService = {};
	//array of locations returned after api call
	var locations =[]

	//initialisze map at USA centre
	var selectedLat = 37.773972;
	var selectedLong = -122.431297;

    //-----functions-----------------

    //will make a get request to the db, then callconvert to map points, call initialise
    googleMapService.refresh = function(latitude, longitude){
    	locations =[]

    	selectedLat = latitude;
    	selectedLong = longitude;

    	$http.get('/items').success(function(response){

    		locations = convertToMapPoints(response);

    		initialize(latitude,longitude);
    	}).error(function(){})
    };

    //takes a response from the get request, converts this JSON object to map points
    //fills location array with latlon  class obj + message
    var convertToMapPoints = function (response){

    	locations = [];

    	//loop over response
    	for (var i=0; i<response.length;i++){
    		var item = response[i];

    		var contentString = '<p><b>Description</b>: ' + item.description + '</p>';

    		locations.push({
    			latlon: new google.maps.LatLng(item.latitude, item.longitude),
    			message: new google.maps.InfoWindow({
    				content: contentString,
    				maxWidth: 320
    			})
    		});

    	}

    	return locations;

    };
    //initialises the map, adds canvas with starting point, loops over locations converting each to a marker
    var initialize = function(latitude,longitude){

    	var myLatLng = {lat: selectedLat, lng: selectedLong};

    	if (!map){

		        // Create a new map and place in the index.html page
		        var map = new google.maps.Map(document.getElementById('map'), {
		        	zoom: 10,
		        	center: myLatLng
		        });
		    }

		    locations.forEach(function(item, i){
		    	var marker = new google.maps.Marker({
		    		position: item.latlon,
		    		map: map


		    	});


        	 	// For each marker created, add a listener that checks for clicks
        	 	google.maps.event.addListener(marker, 'click', function(e){

	            // When clicked, open the selected marker's message
	            currentSelectedMarker = item;
	            item.message.open(map, marker);
	        });
        	 });

    		    // Set initial location
    		    var initialLocation = new google.maps.LatLng(latitude, longitude);

    		    var marker = new google.maps.Marker({
    		    	position: initialLocation,
    		    	map: map,

    		    });

    		   // lastMarker = marker;


    		};


		//listener so that map loads on page load
		google.maps.event.addDomListener(window, 'load',

			googleMapService.refresh(selectedLat,selectedLong));

		return googleMapService;
	});