export const cityDetector_func = () => {
  const elements_cityDropdown = document.querySelectorAll('[location-dropdown]');

  if (elements_cityDropdown.length) {
    setTimeout(function () {
      // все переменные
      const defaultCity = 'New York';
      const all_cityButtons = document.querySelectorAll(
        '[section_menu] [location-dropdown_button]'
      );
      const button_yes = document.querySelector('[is-your-city-new-york="yes"]');
      const button_no = document.querySelector('[is-your-city-new-york="no"]');
      const button_ok = document.querySelector('[is-your-city-new-york="ok"]');
      const button_close = document.querySelector('[city-detector-tip-close]');
      const el_cityPopup = document.querySelector('[city-detector-tip]');
      const el_cityName = document.querySelector('[city-guess]');
      const el_cityQuestion = document.querySelector('[city-question]');
      const el_locationDropdownList = document.querySelector('[location-dropdown_list]');
      let element_detectedCity;

      // функция с API
      function func_locationApi() {
        console.log('func_locationApi stared');

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
                  // detecedCity = city.long_name;
                  // detecedCityCapitalize = detecedCity;
                  // detecedCity = detecedCity.toString().toUpperCase();

                  all_cityButtons.forEach((cityButton) => {
                    if (cityButton.textContent.toUpperCase() === city.long_name.toUpperCase()) {
                      console.log('город совпал');
                      element_detectedCity = cityButton;
                      cityGuess();
                    } else {
                      console.log('город не со списком совпал');
                      //тут надо new york установить
                      all_cityButtons.forEach((cityButton) => {
                        if (cityButton.textContent.toUpperCase() === defaultCity.toUpperCase()) {
                          console.log('вызываем defaultCity');
                          element_detectedCity = cityButton;
                          cityGuess();
                        }
                      });
                    }
                  });
                } else {
                  console.log('City not found');

                  all_cityButtons.forEach((cityButton) => {
                    if (cityButton.textContent.toUpperCase() === defaultCity.toUpperCase()) {
                      console.log('вызываем defaultCity');
                      element_detectedCity = cityButton;
                      cityGuess();
                    }
                  });
                }
              } else {
                console.log('No results found');

                all_cityButtons.forEach((cityButton) => {
                  if (cityButton.textContent.toUpperCase() === defaultCity.toUpperCase()) {
                    console.log('вызываем defaultCity');
                    element_detectedCity = cityButton;
                    cityGuess();
                  }
                });
              }
            } else {
              console.log('Geocoder failed due to: ' + status);

              all_cityButtons.forEach((cityButton) => {
                if (cityButton.textContent.toUpperCase() === defaultCity.toUpperCase()) {
                  console.log('вызываем defaultCity');
                  element_detectedCity = cityButton;
                  cityGuess();
                }
              });
            }
          });
        }

        initialize();
        //––––––––––––––––––––––––––––––––––––––––––
      }
      // func проверить выбран ли город, если выбран —> redirect
      // func при клике на yes –> сохранять в выбранный город
      // формировать список из городов, которые в dropdown
      // функция, которая проверяет, если определившийся город из списка или нет
      // функция, которая меняет название в span
      // функция редиректа
      // функция обработки кнопки yes
      button_yes.addEventListener('click', function () {
        saveCity(element_detectedCity);
      });
      // функция обработки кнопки no
      button_no.addEventListener('click', function () {
        // el_cityQuestion.textContent = el_cityQuestion.getAttribute('city-question');
        setTimeout(function () {
          el_cityPopup.classList.add('hide');
          el_locationDropdownList.classList.add('w--open');
        }, 0);
      });
      // функция обработки кнопки close
      button_close.addEventListener('click', function () {
        el_cityPopup.classList.add('hide');
      });
      // функция предположения
      function cityGuess() {
        el_cityName.textContent = element_detectedCity.textContent;
        el_cityPopup.classList.remove('hide');
      }
      // функция для сохранения города в localStorage
      function saveCity(city) {
        const currentCity = city.getAttribute('location-dropdown_button');
        const currentCityLink = city.getAttribute('href');

        localStorage.setItem('savedCity', currentCity);
        console.log(`Город ${currentCity} сохранён в localStorage.`);
        el_cityPopup.classList.add('hide');
        window.location.href = currentCityLink;
      }
      // функция для загрузки сохраненного города из localStorage
      // функция для отображения подтверждающего диалога выбора города
      // функция для обновления интерфейса на основе выбранного города
      // функция для инициализации всех событий и начального состояния
      // точки входа
      function changeNamePlaceholder(city) {
        const cityName = city.getAttribute('location-dropdown_button');
        const allCityPlaceholders = document.querySelectorAll('[city-dropdown-name-placeholder]');
        allCityPlaceholders.forEach((placeholder) => {
          placeholder.textContent = cityName;
        });
      }

      // Проверяем, есть ли сохранённый город в localStorage
      if (localStorage.getItem('savedCity')) {
        // Получаем значение сохранённого города
        const savedCity = localStorage.getItem('savedCity');

        // Выводим сохранённый город

        // changeNamePlaceholder(element_detectedCity);
        // console.log(element_detectedCity);
        findElementOfCurrentCity(savedCity);

        console.log(`Сохранённый город: ${savedCity}`);
      } else {
        // Если город не сохранён, выводим сообщение
        console.log('Сохранённого города нет');
        func_locationApi();
      }

      all_cityButtons.forEach((cityButton) => {
        cityButton.addEventListener('click', function () {
          saveCity(cityButton);
          changeNamePlaceholder(cityButton);
        });
      });

      //
      function findElementOfCurrentCity(textNameOfCity) {
        all_cityButtons.forEach((cityButton) => {
          if (
            cityButton.getAttribute('location-dropdown_button').toUpperCase() ===
            textNameOfCity.toUpperCase()
          ) {
            const currentCityButton = cityButton;
            changeNamePlaceholder(currentCityButton);
          }
        });
      }
      //–––––––
    }, 2000);
  }
};
