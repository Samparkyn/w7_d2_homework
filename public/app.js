window.onload = function(){
  console.log('App started');
  var url = "https://restcountries.eu/rest/v1";
  var request = new XMLHttpRequest();
  request.open("GET", url);

  var index;
  var countries;

  request.onload = function(){
    if(request.status === 200){
      var jsonString = request.responseText;
      countries = JSON.parse(jsonString);
    }
    //create the options
    for (var i = 0; i < countries.length; i++){
    var option = document.createElement('option');
    option.value = i;
    option.innerText = countries[i].name;
    dropDown.appendChild(option);
    };
    dropDown.value = localStorage.getItem("lastCountryIndex");

  }

  var dropDown = document.createElement('select');
  var main = document.querySelector('.main');
  // console.log('main', main);
  main.appendChild(dropDown);

  dropDown.onchange = function() {
    index = dropDown.value;
    updatePage(index);
    localStorage.setItem("lastCountryIndex", index);
   }


  var updatePage = function(index) {
    showName.innerHTML = "Country Name :  " +  countries[index].name + " ";
    showPopulation.innerHTML = "Population : " + countries[index].population + " ";
    showCapital.innerHTML = "Capital City : " + countries[index].capital + " ";
    showBorderCountryName.innerHTML = "Bordering Countries : " + showBordering(index) + " ";

    var countryLatLng = {lat: countries[index].latlng[0], lng: countries[index].latlng[1]}
    var map = new Map(countryLatLng, zoom);
    map.addMarker(countryLatLng, "");
    map.addInfoWindow(countryLatLng, showName.innerHTML + showCapital.innerHTML + showPopulation.innerHTML + showBorderCountryName.innerHTML );

    document.getElementById("button").addEventListener("click", function(){
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

    map.addMarker({lat: lat, lng: lng});
    map.addInfoWindow({lat: lat, lng: lng}, "You are Here!");
    });

    });
    }


  var showName = document.createElement('p');
  var showPopulation = document.createElement('p');
  var showCapital = document.createElement('p');
  var showBorderCountryName = document.createElement('p');
  var borderCode = document.createElement('p')
  var latitude = document.createElement('p')
  var longitude = document.createElement('p')
  box = document.querySelector('.box');
  // box.appendChild(showName);
  // box.appendChild(showPopulation);
  // box.appendChild(showCapital);
  // box.appendChild(showBorderCountryName);
  // box.appendChild(latitude);
  // box.appendChild(longitude);



  var showBordering = function(index){
    var borderCode = countries[index].borders || null;
    borderCountries = borderCode.map(getNameFromCode);
    return borderCountries;
  }

  var getNameFromCode = function(code){
    for(i = 0; i < countries.length; i++){
      if(countries[i].alpha3Code === code){
        return countries[i].name;
      }
    }
  };

  var zoom = 6;


  // map.bindClick();



  request.send();

}
