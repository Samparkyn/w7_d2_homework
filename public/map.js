var Map = function(latLng, zoom){

this.googleMap = new google.maps.Map(document.getElementById('map'), {
  center: latLng,
  zoom: zoom
})

this.addMarker = function(latLng, label, title){
  var marker = new google.maps.Marker({
    position: latLng,
    map: this.googleMap,
    label: label,
    draggable: true,
    animation: google.maps.Animation.DROP,
    title: title
  });
  return marker;
}


this.bindClick = function(){
  var counter = 1;
  google.maps.event.addListener(this.googleMap, 'click', function(userClick){

    this.addMarker({lat: userClick.latLng.lat(), lng: userClick.latLng.lng()}, counter.toString())
    counter += 1;
    this.addInfoWindow({lat: userClick.latLng.lat(), lng: userClick.latLng.lng()}, "Your chosen location");
  }.bind(this))
}

  this.addInfoWindow = function(latLng, title){
    var marker = this.addMarker(latLng, "A", title);
    marker.addListener('mouseover', function(){

   var infoBubble = new InfoBubble({
       map: this.googleMap,
       content: this.title,
       shadowStyle: 1,
       padding: 0,
       backgroundColor: 'lightgreen',
       borderRadius: 5,
       borderWidth: 1,
       borderColor: '#2c2c2c',
       maxWidth: 300,
       disableAutoPan: true,
       arrowPosition: 10,
       arrowSize: 30,
       arrowStyle: 2

     });
   infoBubble.open(this.map, marker);
      })

   }
}