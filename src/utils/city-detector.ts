export const cityDetector_func = () => {
  const elements_cityDropdown = document.querySelectorAll('[location-dropdown]');
  const elements_navHomeLinks = document.querySelectorAll('[nav-home-link]');

  if (elements_cityDropdown.length) {
    const defaultCity = 'New York';
    const all_cityButtons = document.querySelectorAll('[section_menu] [location-dropdown_button]');
    const button_yes = document.querySelector('[is-your-city-new-york="yes"]');
    const button_no = document.querySelector('[is-your-city-new-york="no"]');
    const button_ok = document.querySelector('[is-your-city-new-york="ok"]');
    const button_close = document.querySelector('[city-detector-tip-close]');
    const el_cityPopup = document.querySelector('[city-detector-tip]');
    const el_cityName = document.querySelector('[city-guess]');
    const el_cityQuestion = document.querySelector('[city-question]');
    const el_locationDropdownList = document.querySelector('[location-dropdown_list]');
    let element_detectedCity;

    async function func_locationApi() {
      if (!navigator.geolocation) {
        setDefaultCity();
        return;
      }

      try {
        const position = await getCurrentPosition();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        await codeLatLng(lat, lng);
      } catch (error) {
        setDefaultCity();
      }
    }

    function getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }

    async function codeLatLng(lat, lng) {
      const geocoder = new google.maps.Geocoder();
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
              let cityMatched = false;
              all_cityButtons.forEach((cityButton) => {
                if (cityButton.textContent.toUpperCase() === city.long_name.toUpperCase()) {
                  element_detectedCity = cityButton;
                  cityMatched = true;
                  cityGuess();
                }
              });
              if (!cityMatched) {
                setDefaultCity();
              }
            } else {
              setDefaultCity();
            }
          } else {
            setDefaultCity();
          }
        } else {
          setDefaultCity();
        }
      });
    }

    function setDefaultCity() {
      let defaultCitySet = false;
      all_cityButtons.forEach((cityButton) => {
        if (cityButton.textContent.toUpperCase() === defaultCity.toUpperCase()) {
          element_detectedCity = cityButton;
          defaultCitySet = true;
          cityGuess();
        }
      });
    }

    button_yes.addEventListener('click', function () {
      saveCity(element_detectedCity);
    });

    button_no.addEventListener('click', function () {
      el_cityPopup.classList.add('hide');
      el_locationDropdownList.classList.add('w--open');
    });

    button_close.addEventListener('click', function () {
      el_cityPopup.classList.add('hide');
    });

    function cityGuess() {
      el_cityName.textContent = element_detectedCity.textContent;
      el_cityName.classList.remove('opacity-0');
      el_cityPopup.classList.remove('hide');
      elements_cityDropdown.forEach((element) => {
        element.classList.remove('opacity-0');
      });
      const allCityPlaceholders = document.querySelectorAll('[city-dropdown-name-placeholder]');
      allCityPlaceholders.forEach((placeholder) => {
        placeholder.classList.remove('opacity-0');
      });
    }

    function saveCity(city) {
      const currentCity = city.getAttribute('location-dropdown_button');
      const currentCityLink = city.getAttribute('href');

      console.log(`Saving city: ${currentCity}, link: ${currentCityLink}`);

      localStorage.setItem('savedCity', currentCity);
      el_cityPopup.classList.add('hide');
      window.location.href = currentCityLink;
    }

    function changeNamePlaceholder(city) {
      const cityName = city.getAttribute('location-dropdown_button');
      const allCityPlaceholders = document.querySelectorAll('[city-dropdown-name-placeholder]');
      allCityPlaceholders.forEach((placeholder) => {
        placeholder.textContent = cityName;
        placeholder.classList.remove('opacity-0');
      });
      elements_cityDropdown.forEach((element) => {
        element.classList.remove('opacity-0');
      });
    }

    function findElementOfCurrentCity(textNameOfCity) {
      let cityFound = false;
      all_cityButtons.forEach((cityButton) => {
        if (
          cityButton.getAttribute('location-dropdown_button').toUpperCase() ===
          textNameOfCity.toUpperCase()
        ) {
          const currentCityButton = cityButton;
          console.log(
            `Found city button: ${currentCityButton.textContent}, link: ${currentCityButton.getAttribute('href')}`
          );
          element_detectedCity = currentCityButton;
          changeNamePlaceholder(currentCityButton);
          cityFound = true;
        }
      });
      if (!cityFound) {
        console.log('City not found, setting to default city');
        setDefaultCity();
      }
    }

    if (localStorage.getItem('savedCity')) {
      const savedCity = localStorage.getItem('savedCity');
      console.log(`Loaded saved city: ${savedCity}`);
      findElementOfCurrentCity(savedCity);
      elements_cityDropdown.forEach((element) => {
        element.classList.remove('opacity-0');
      });
    } else {
      func_locationApi();
    }

    all_cityButtons.forEach((cityButton) => {
      cityButton.addEventListener('click', function () {
        saveCity(cityButton);
        changeNamePlaceholder(cityButton);
        elements_cityDropdown.forEach((element) => {
          element.classList.remove('opacity-0');
        });
      });
    });

    elements_navHomeLinks.forEach((navHomeLink) => {
      navHomeLink.addEventListener('click', function () {
        if (element_detectedCity) {
          const cityLink = element_detectedCity.getAttribute('href');
          console.log(`Navigating to city: ${element_detectedCity.textContent}, link: ${cityLink}`);
          window.location.href = cityLink;
        } else {
          setDefaultCity();
          const cityLink = element_detectedCity.getAttribute('href');
          console.log(
            `Navigating to default city: ${element_detectedCity.textContent}, link: ${cityLink}`
          );
          window.location.href = cityLink;
        }
      });
    });
  }
};
