
var styleDark = [{"featureType":"water","stylers":[{"color":"#021019"}]},{"featureType":"landscape","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"transit","stylers":[{"color":"#146474"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]}];
var styleGreen = [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#333739"}] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#2ecc71"}] }, { "featureType": "poi", "stylers": [{ "color": "#2ecc71" }, { "lightness": -7}] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#2ecc71" }, { "lightness": -28}] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#2ecc71" }, { "visibility": "on" }, { "lightness": -15}] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#2ecc71" }, { "lightness": -18}] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff"}] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off"}] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2ecc71" }, { "lightness": -34}] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "color": "#333739" }, { "weight": 0.8}] }, { "featureType": "poi.park", "stylers": [{ "color": "#2ecc71"}] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#333739" }, { "weight": 0.3 }, { "lightness": 10}]}];
var styleCobalt = [{ "featureType": "all", "elementType": "all", "stylers": [{ "invert_lightness": true }, { "saturation": 10 }, { "lightness": 30 }, { "gamma": 0.5 }, { "hue": "#435158"}]}];
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {
    if (navigator.geolocation) {
        // Call getCurrentPosition with success and failure callbacks
        navigator.geolocation.getCurrentPosition(success, fail);
    }
    else {
        alert("Sorry, your browser does not support geolocation services.");
    }
}




function success(position) {

   var markericon = "Res/img/marker_2.png"; 
   var mapCanvas = document.getElementById('gmap');
   var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
   directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
        mapTypeControlOptions: {
            mapTypeIds: ['Styled']
        },
        center: myLatlng,
        zoom: 15,
        panControl: false,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        mapTypeId: 'Styled'
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var styledMapType = new google.maps.StyledMapType(styleGreen, { name: 'Styled' });
    map.mapTypes.set('Styled', styledMapType);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Me',
        icon: markericon
    });
    directionsDisplay.setMap(map);
}
google.maps.event.addDomListener(window, 'load', initialize);

function fail(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}

function calcRoute(startaddr, destaddr, depdate) {
    var originLatLng;
    var destinationLatLng;

    var geocoder = new google.maps.Geocoder();
    var originAddr = startaddr;
    var destinationAddr = destaddr;

    geocoder.geocode({ 'address': originAddr }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            originLatLng = results[0].geometry.location;
            geocoder.geocode({ 'address': destinationAddr }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    destinationLatLng = results[0].geometry.location;
                    var selectedMode = "DRIVING";
                    var request = {
                        origin: originLatLng,
                        destination: destinationLatLng,
                        transitOptions: 
                        {
                            departureTime: new Date(depdate)
                        },
                        travelMode: google.maps.TravelMode[selectedMode]
                    };
                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                        }
                    });
                }
            }); 
        }
    });

   

   
}