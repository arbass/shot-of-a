export const cityDetector_func = () => {
  const elements_cityDropdown = document.querySelectorAll('[location-dropdown]');
  let detecedCity;

  if (elements_cityDropdown.length) {
    let detecedCityCapitalize;
    let elements_cityNames;
    setTimeout(startChecking, 1000);
    let choosedCity;

    function startChecking() {
      let geocoder;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
      }

      function successFunction(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        codeLatLng(lat, lng);
      }

      function errorFunction() {
        console.log('Geocoder failed');
      }

      function initialize() {
        geocoder = new google.maps.Geocoder();
      }

      function codeLatLng(lat, lng) {
        const latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ latLng: latlng }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              let city;
              for (let i = 0; i < results[0].address_components.length; i++) {
                for (let b = 0; b < results[0].address_components[i].types.length; b++) {
                  if (results[0].address_components[i].types[b] == 'locality') {
                    city = results[0].address_components[i];
                    break;
                  }
                }
              }
              if (city) {
                console.log(city.long_name);
                detecedCity = city.long_name;
                detecedCityCapitalize = detecedCity;
                detecedCity = detecedCity.toString().toUpperCase();
              } else {
                console.log('City not found');
              }
            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        });
      }

      initialize();
      //––––––––––––––––––––––––––––––––––––––––––
      const firstDropdown = elements_cityDropdown[0];
      const el_cityDetecorTip = document.querySelector('[city-detector-tip]');
      elements_cityNames = firstDropdown.querySelectorAll(
        '[location-dropdown] [location-dropdown_button]'
      );
      const textValues_cities = [];
      elements_cityNames.forEach((el) => {
        textValues_cities.push(el.textContent.toUpperCase());
        el.setAttribute('city-name-uppercase', el.textContent.toUpperCase());
      });
      setTimeout(function () {
        // console.log(textValues_cities);
        // console.log(detecedCity);
        el_cityDetecorTip.classList.remove('hide');

        textValues_cities.forEach((city) => {
          // console.log(city);
          if (city === detecedCity) {
            // console.log('город совпал');
            document.querySelector('[city-guess]').textContent = detecedCityCapitalize;
            elements_cityNames.forEach((el) => {
              if (el.getAttribute('city-name-uppercase') === detecedCity) {
                const currentCityUrl = el.getAttribute('href');
                console.log(currentCityUrl);
              }
            });
          } else {
            // console.log('город не из списка');
            document.querySelector('[city-guess]').textContent = 'New York';
          }
        });
      }, 1000);

      //-------
      const button_city_yes = document.querySelector('[is-your-city-new-york="yes"]');
      const button_city_no = document.querySelector('[is-your-city-new-york="no"]');
      const button_city_ok = document.querySelector('[is-your-city-new-york="ok"]');
      const button_city_close = document.querySelector('[city-detector-tip-close]');

      button_city_close.addEventListener('click', function () {
        el_cityDetecorTip.classList.add('hide');
      });

      button_city_yes.addEventListener('click', function () {
        elements_cityNames.forEach((el) => {
          console.log(elements_cityNames);
        });
      });
    }
    //––––––
    function redirectToCity(cityLink) {
      console.log(cityLink);
    }
  }
};
