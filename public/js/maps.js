function initMap() {
  var myLatLng = { lat: 3.597031, lng: 98.678513 };

  var map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 16,
  });

  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
  });
}
