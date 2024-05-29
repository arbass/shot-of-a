"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/city-detector.ts
  var cityDetector_func = () => {
    const elements_cityDropdown = document.querySelectorAll("[location-dropdown]");
    if (elements_cityDropdown.length) {
      setTimeout(function() {
        const defaultCity = "New York";
        const all_cityButtons = document.querySelectorAll(
          "[section_menu] [location-dropdown_button]"
        );
        const button_yes = document.querySelector('[is-your-city-new-york="yes"]');
        const button_no = document.querySelector('[is-your-city-new-york="no"]');
        const button_ok = document.querySelector('[is-your-city-new-york="ok"]');
        const button_close = document.querySelector("[city-detector-tip-close]");
        const el_cityPopup = document.querySelector("[city-detector-tip]");
        const el_cityName = document.querySelector("[city-guess]");
        const el_cityQuestion = document.querySelector("[city-question]");
        const el_locationDropdownList = document.querySelector("[location-dropdown_list]");
        let element_detectedCity;
        function func_locationApi() {
          console.log("func_locationApi stared");
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
            console.log("Geocoder failed");
          }
          function initialize() {
            geocoder = new google.maps.Geocoder();
          }
          function codeLatLng(lat, lng) {
            const latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({ latLng: latlng }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                  let city;
                  for (let i = 0; i < results[0].address_components.length; i++) {
                    for (let b = 0; b < results[0].address_components[i].types.length; b++) {
                      if (results[0].address_components[i].types[b] == "locality") {
                        city = results[0].address_components[i];
                        break;
                      }
                    }
                  }
                  if (city) {
                    console.log(city.long_name);
                    all_cityButtons.forEach((cityButton) => {
                      if (cityButton.textContent.toUpperCase() === city.long_name.toUpperCase()) {
                        console.log("\u0433\u043E\u0440\u043E\u0434 \u0441\u043E\u0432\u043F\u0430\u043B");
                        element_detectedCity = cityButton;
                        cityGuess();
                      } else {
                        console.log("\u0433\u043E\u0440\u043E\u0434 \u043D\u0435 \u0441\u043E \u0441\u043F\u0438\u0441\u043A\u043E\u043C \u0441\u043E\u0432\u043F\u0430\u043B");
                        all_cityButtons.forEach((cityButton2) => {
                          if (cityButton2.textContent.toUpperCase() === defaultCity.toUpperCase()) {
                            console.log("\u0432\u044B\u0437\u044B\u0432\u0430\u0435\u043C defaultCity");
                            element_detectedCity = cityButton2;
                            cityGuess();
                          }
                        });
                      }
                    });
                  } else {
                    console.log("City not found");
                    all_cityButtons.forEach((cityButton) => {
                      if (cityButton.textContent.toUpperCase() === defaultCity.toUpperCase()) {
                        console.log("\u0432\u044B\u0437\u044B\u0432\u0430\u0435\u043C defaultCity");
                        element_detectedCity = cityButton;
                        cityGuess();
                      }
                    });
                  }
                } else {
                  console.log("No results found");
                  all_cityButtons.forEach((cityButton) => {
                    if (cityButton.textContent.toUpperCase() === defaultCity.toUpperCase()) {
                      console.log("\u0432\u044B\u0437\u044B\u0432\u0430\u0435\u043C defaultCity");
                      element_detectedCity = cityButton;
                      cityGuess();
                    }
                  });
                }
              } else {
                console.log("Geocoder failed due to: " + status);
                all_cityButtons.forEach((cityButton) => {
                  if (cityButton.textContent.toUpperCase() === defaultCity.toUpperCase()) {
                    console.log("\u0432\u044B\u0437\u044B\u0432\u0430\u0435\u043C defaultCity");
                    element_detectedCity = cityButton;
                    cityGuess();
                  }
                });
              }
            });
          }
          initialize();
        }
        button_yes.addEventListener("click", function() {
          saveCity(element_detectedCity);
        });
        button_no.addEventListener("click", function() {
          setTimeout(function() {
            el_cityPopup.classList.add("hide");
            el_locationDropdownList.classList.add("w--open");
          }, 0);
        });
        button_close.addEventListener("click", function() {
          el_cityPopup.classList.add("hide");
        });
        function cityGuess() {
          el_cityName.textContent = element_detectedCity.textContent;
          el_cityPopup.classList.remove("hide");
        }
        function saveCity(city) {
          const currentCity = city.getAttribute("location-dropdown_button");
          const currentCityLink = city.getAttribute("href");
          localStorage.setItem("savedCity", currentCity);
          console.log(`\u0413\u043E\u0440\u043E\u0434 ${currentCity} \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D \u0432 localStorage.`);
          el_cityPopup.classList.add("hide");
          window.location.href = currentCityLink;
        }
        function changeNamePlaceholder(city) {
          const cityName = city.getAttribute("location-dropdown_button");
          const allCityPlaceholders = document.querySelectorAll("[city-dropdown-name-placeholder]");
          allCityPlaceholders.forEach((placeholder) => {
            placeholder.textContent = cityName;
          });
        }
        if (localStorage.getItem("savedCity")) {
          const savedCity = localStorage.getItem("savedCity");
          findElementOfCurrentCity(savedCity);
          console.log(`\u0421\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0439 \u0433\u043E\u0440\u043E\u0434: ${savedCity}`);
        } else {
          console.log("\u0421\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u043E\u0433\u043E \u0433\u043E\u0440\u043E\u0434\u0430 \u043D\u0435\u0442");
          func_locationApi();
        }
        all_cityButtons.forEach((cityButton) => {
          cityButton.addEventListener("click", function() {
            saveCity(cityButton);
            changeNamePlaceholder(cityButton);
          });
        });
        function findElementOfCurrentCity(textNameOfCity) {
          all_cityButtons.forEach((cityButton) => {
            if (cityButton.getAttribute("location-dropdown_button").toUpperCase() === textNameOfCity.toUpperCase()) {
              const currentCityButton = cityButton;
              changeNamePlaceholder(currentCityButton);
            }
          });
        }
      }, 2e3);
    }
  };

  // src/utils/exp-catalog-params.ts
  var expParams_func = () => {
    const expParams_el = document.querySelector("[catalog-page-city]");
    if (expParams_el) {
      const page_city = expParams_el.getAttribute("catalog-page-city");
      const array_expCollectionItems = document.querySelectorAll("[exp-collection-item]");
      array_expCollectionItems.forEach((expCollectionItem, index) => {
        function display_bestSeller() {
          const currentElement = expCollectionItem.querySelector(
            "[exp-columns_slider-header-meta-item=best]"
          );
          const currentAttributeValue = expCollectionItem.getAttribute("value-best");
          const array_params = currentAttributeValue.split(";");
          array_params.forEach((el) => {
            if (el === page_city) {
              currentElement.classList.remove("hide");
            }
          });
        }
        function display_age() {
          console.log(`Processing age for item ${index}`);
          const allIconPresets = document.querySelectorAll("[icon-age]");
          const currentElement = expCollectionItem.querySelector(
            "[exp-columns_slider-header-meta-item=age]"
          );
          const currentAttributeValue = expCollectionItem.getAttribute("value-age");
          const array_params = currentAttributeValue.split(";");
<<<<<<< HEAD
          array_params.forEach((param, id) => {
            if (param === "") {
              array_params.splice(id, 1);
            }
          });
          const fragment = document.createDocumentFragment();
=======
>>>>>>> parent of bf50110 (before: gpt update)
          array_params.forEach((param) => {
            const smallArray = param.split("@");
            if (smallArray[0] === page_city) {
              allIconPresets.forEach((icon) => {
                const iconAttribute = icon.getAttribute("icon-age");
                if (smallArray[1] === iconAttribute) {
                  const needToCloneIcon = icon.cloneNode(true);
                  fragment.appendChild(needToCloneIcon);
                  console.log(`Added icon for ${index}: `, iconAttribute);
                }
              });
            }
          });
          while (currentElement.firstChild) {
            currentElement.removeChild(currentElement.firstChild);
          }
          currentElement.appendChild(fragment);
        }
        function display_price() {
          const currentElement = expCollectionItem.querySelector(
            "[exp-columns_slider-header-meta-item=price]"
          );
          const currentAttributeValue = expCollectionItem.getAttribute("value-price");
          const array_params = currentAttributeValue.split(";");
          array_params.forEach((param) => {
            const smallArray = param.split("@");
            if (smallArray[0] === page_city) {
              const city = smallArray[0];
              const paramValue = smallArray[1];
              if (city === page_city) {
                currentElement.classList.remove("hide");
                const currentPriceTextValue = currentElement.querySelector(
                  '[exp-columns_slider-header-meta-item="price-text-value"]'
                );
                currentPriceTextValue.textContent = paramValue;
              }
            }
          });
        }
        function display_people() {
          const currentElement = expCollectionItem.querySelector(
            "[exp-columns_slider-header-meta-item=count]"
          );
          const currentAttributeValue = expCollectionItem.getAttribute("value-count");
          const array_params = currentAttributeValue.split(";");
          array_params.forEach((param) => {
            const smallArray = param.split("@");
            if (smallArray[0] === page_city) {
              const city = smallArray[0];
              const paramValue = smallArray[1];
              if (city === page_city) {
                currentElement.classList.remove("hide");
                const currentPriceTextValue = currentElement.querySelector(
                  '[exp-columns_slider-header-meta-item="count-text-value"]'
                );
                currentPriceTextValue.textContent = paramValue;
              }
            }
          });
        }
        display_bestSeller();
        display_age();
        display_price();
        display_people();
      });
    }
  };

  // src/utils/form-selectors.ts
  var formSelectors_func = () => {
    const formSelectors_el = document.querySelectorAll('[form-custom-dropdwn="component"]');
    if (formSelectors_el.length) {
      document.querySelectorAll('[form-custom-dropdwn="component"]').forEach((component) => {
        component.addEventListener("change", (event) => {
          if (event.target.type === "radio") {
            const radio = event.target;
            const label = component.querySelector(
              `[form-custom-dropdwn="radio-label"][for="${radio.id}"]`
            );
            const placeholder = component.querySelector('[form-custom-dropdwn="placeholder"]');
            if (label && placeholder) {
              placeholder.textContent = label.textContent;
              placeholder.classList.add("label-is-active");
              console.log(`Radio selected: ${label.textContent}`);
            }
            if (label) {
              label.classList.add("label-is-active");
            }
            const allLabels = component.querySelectorAll('[form-custom-dropdwn="radio-label"]');
            allLabels.forEach((lbl) => {
              if (lbl !== label) {
                lbl.classList.remove("label-is-active");
              }
            });
          }
        });
      });
    }
  };

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    cityDetector_func();
    formSelectors_func();
    expParams_func();
  });
})();
//# sourceMappingURL=index.js.map
