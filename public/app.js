window.onload = function(){
  console.log('App started');
  var url = "https://restcountries.eu/rest/v1";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
    if(request.status === 200){
      console.log('got the data success');
      var jsonString = request.responseText;
      countries = JSON.parse(jsonString);

    index = JSON.parse(localStorage.getItem("last_country_index"));
    }

    for (var i = 0; i < countries.length; i++){
    var option = document.createElement('option');
    option.value = i;
    option.innerText = countries[i].name;
    dropDown.appendChild(option);

    dropDown.value = index;
  };


  var showName = document.createElement('p');
  var showPopulation = document.createElement('p');
  var showCapital = document.createElement('p');
  var showBorderCountryName = document.createElement('p');
  var borderCode = document.createElement('p')
  box = document.querySelector('.box');
  box.appendChild(showName);
  box.appendChild(showPopulation);
  box.appendChild(showCapital);
  box.appendChild(showBorderCountryName);


  showBordering(index);

  var updatePage = function(index){
   showName.innerHTML = "Country Name : " + countries[index].name;
   showPopulation.innerHTML = "Population : " + countries[index].population;
   showCapital.innerHTML = "Capital City : " + countries[index].capital;
   showBorderCountryName.innerHTML = "Bordering Countries : " + showBordering(index)
  }

  dropDown.onchange =function(){
    index = dropDown.value;
    updatePage(index);
   }

    localStorage.setItem("last_country_index", JSON.stringify(index));
  }


  request.send();

  var dropDown = document.createElement('select');
  var main = document.querySelector('.main');
  // console.log('main', main);
  main.appendChild(dropDown);
}
  var showBordering = function(index){
    var borderCode = countries[index].borders;
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





// var countries;


// borderCode.innerHTML = countries[index].name