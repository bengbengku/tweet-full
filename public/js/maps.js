function initMap() {
  var myLatLng = { lat: 3.607862, lng: 98.690317 };

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

 