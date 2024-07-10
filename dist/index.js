"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/city-detector.ts
  var cityDetector_func = () => {
    const elements_cityDropdown = document.querySelectorAll("[location-dropdown]");
    const elements_navHomeLinks = document.querySelectorAll("[nav-home-link]");
    if (elements_cityDropdown.length) {
      let getCurrentPosition2 = function() {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      }, setDefaultCity2 = function() {
        let defaultCitySet = false;
        all_cityButtons.forEach((cityButton) => {
          if (cityButton.textContent.toUpperCase() === defaultCity.toUpperCase()) {
            element_detectedCity = cityButton;
            defaultCitySet = true;
            cityGuess2();
          }
        });
      }, cityGuess2 = function() {
        el_cityName.textContent = element_detectedCity.textContent;
        el_cityName.classList.remove("opacity-0");
        el_cityPopup.classList.remove("hide");
        elements_cityDropdown.forEach((element) => {
          element.classList.remove("opacity-0");
        });
        const allCityPlaceholders = document.querySelectorAll("[city-dropdown-name-placeholder]");
        allCityPlaceholders.forEach((placeholder) => {
          placeholder.classList.remove("opacity-0");
        });
      }, saveCity2 = function(city) {
        const currentCity = city.getAttribute("location-dropdown_button");
        const currentCityLink = city.getAttribute("href");
        console.log(`Saving city: ${currentCity}, link: ${currentCityLink}`);
        localStorage.setItem("savedCity", currentCity);
        updateCityPlaceholders2(city);
        el_cityPopup.classList.add("hide");
        window.location.href = currentCityLink;
      }, updateCityPlaceholders2 = function(city) {
        const cityName = city.getAttribute("location-dropdown_button");
        const allCityPlaceholders = document.querySelectorAll("[city-dropdown-name-placeholder]");
        allCityPlaceholders.forEach((placeholder) => {
          placeholder.textContent = cityName;
          placeholder.classList.remove("opacity-0");
        });
        elements_cityDropdown.forEach((element) => {
          element.classList.remove("opacity-0");
        });
      }, findElementOfCurrentCity2 = function(textNameOfCity) {
        let cityFound = false;
        all_cityButtons.forEach((cityButton) => {
          if (cityButton.getAttribute("location-dropdown_button").toUpperCase() === textNameOfCity.toUpperCase()) {
            const currentCityButton = cityButton;
            console.log(
              `Found city button: ${currentCityButton.textContent}, link: ${currentCityButton.getAttribute("href")}`
            );
            element_detectedCity = currentCityButton;
            updateCityPlaceholders2(currentCityButton);
            cityFound = true;
          }
        });
        if (!cityFound) {
          console.log("City not found, setting to default city");
          setDefaultCity2();
        }
      };
      var getCurrentPosition = getCurrentPosition2, setDefaultCity = setDefaultCity2, cityGuess = cityGuess2, saveCity = saveCity2, updateCityPlaceholders = updateCityPlaceholders2, findElementOfCurrentCity = findElementOfCurrentCity2;
      const defaultCity = "New York";
      const all_cityButtons = document.querySelectorAll(
        "[section_menu] [location-dropdown_button], [location-dropdown_list] [location-dropdown_button]"
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
      async function func_locationApi() {
        if (!navigator.geolocation) {
          setDefaultCity2();
          return;
        }
        try {
          const position = await getCurrentPosition2();
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          await codeLatLng(lat, lng);
        } catch (error) {
          setDefaultCity2();
        }
      }
      async function codeLatLng(lat, lng) {
        const geocoder = new google.maps.Geocoder();
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
                let cityMatched = false;
                all_cityButtons.forEach((cityButton) => {
                  if (cityButton.textContent.toUpperCase() === city.long_name.toUpperCase()) {
                    element_detectedCity = cityButton;
                    cityMatched = true;
                    cityGuess2();
                  }
                });
                if (!cityMatched) {
                  setDefaultCity2();
                }
              } else {
                setDefaultCity2();
              }
            } else {
              setDefaultCity2();
            }
          } else {
            setDefaultCity2();
          }
        });
      }
      button_yes.addEventListener("click", function() {
        saveCity2(element_detectedCity);
      });
      button_no.addEventListener("click", function() {
        el_cityPopup.classList.add("hide");
        el_locationDropdownList.classList.add("w--open");
      });
      button_close.addEventListener("click", function() {
        el_cityPopup.classList.add("hide");
      });
      if (localStorage.getItem("savedCity")) {
        const savedCity = localStorage.getItem("savedCity");
        console.log(`Loaded saved city: ${savedCity}`);
        findElementOfCurrentCity2(savedCity);
        elements_cityDropdown.forEach((element) => {
          element.classList.remove("opacity-0");
        });
      } else {
        func_locationApi();
      }
      all_cityButtons.forEach((cityButton) => {
        cityButton.addEventListener("click", function() {
          saveCity2(cityButton);
          updateCityPlaceholders2(cityButton);
          elements_cityDropdown.forEach((element) => {
            element.classList.remove("opacity-0");
          });
        });
      });
      elements_navHomeLinks.forEach((navHomeLink) => {
        navHomeLink.addEventListener("click", function() {
          if (element_detectedCity) {
            const cityLink = element_detectedCity.getAttribute("href");
            console.log(`Navigating to city: ${element_detectedCity.textContent}, link: ${cityLink}`);
            window.location.href = cityLink;
          } else {
            setDefaultCity2();
            const cityLink = element_detectedCity.getAttribute("href");
            console.log(
              `Navigating to default city: ${element_detectedCity.textContent}, link: ${cityLink}`
            );
            window.location.href = cityLink;
          }
        });
      });
    }
  };

  // src/utils/exp-catalog-params.ts
  var expParams_func = () => {
    const expParams_el = document.querySelector("[catalog-page-city]");
    if (expParams_el) {
      const page_city = expParams_el.getAttribute("catalog-page-city");
      const array_expCollectionItems = document.querySelectorAll("[exp-collection-item]");
      array_expCollectionItems.forEach((expCollectionItem) => {
        function display_bestSeller() {
          const currentElement = expCollectionItem.querySelector(
            "[exp-columns_slider-header-meta-item=best]"
          );
          const currentAttributeValue = expCollectionItem.getAttribute("value-best");
          const array_params = currentAttributeValue.split(";");
          array_params.forEach((param, id) => {
            if (param === "") {
              array_params.splice(id, 1);
            }
          });
          array_params.forEach((el) => {
            if (el === page_city) {
              currentElement.classList.remove("hide");
            }
          });
        }
        function display_age() {
          const allIconPresets = document.querySelectorAll("[icon-age]");
          const currentElement = expCollectionItem.querySelector(
            "[exp-columns_slider-header-meta-item=age]"
          );
          const currentAttributeValue = expCollectionItem.getAttribute("value-age");
          const array_params = currentAttributeValue.split(";");
          array_params.forEach((param, id) => {
            if (param === "") {
              array_params.splice(id, 1);
            }
          });
          array_params.forEach((param) => {
            const smallArray = param.split("@");
            if (smallArray[0] === page_city) {
              allIconPresets.forEach((icon) => {
                const iconAttribute = icon.getAttribute("icon-age");
                if (smallArray[1] === iconAttribute) {
                  const elementToCopy = icon;
                  const newParent = currentElement;
                  const newElement = document.createElement("div");
                  newElement.innerHTML = elementToCopy.innerHTML;
                  newParent.appendChild(newElement);
                }
              });
            }
          });
        }
        function display_price() {
          const currentElement = expCollectionItem.querySelector(
            "[exp-columns_slider-header-meta-item=price]"
          );
          const currentAttributeValue = expCollectionItem.getAttribute("value-price");
          const array_params = currentAttributeValue.split(";");
          array_params.forEach((param, id) => {
            if (param === "") {
              array_params.splice(id, 1);
            }
          });
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
          array_params.forEach((param, id) => {
            if (param === "") {
              array_params.splice(id, 1);
            }
          });
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

  // src/utils/exp-selector.ts
  var expSelector_func = () => {
    const expSelector_el = document.querySelectorAll("[this-is-a-city-page]");
    if (expSelector_el.length) {
      expSelector_el.forEach((bodyElement) => {
        const currentCityBody = document.querySelector("[this-is-a-city-page]").getAttribute("this-is-a-city-page");
        console.log(currentCityBody);
        const allDropdowns = document.querySelectorAll("[exp-dropdown-button-list]");
        allDropdowns.forEach((dropdown) => {
          const allSvg = dropdown.querySelectorAll(".icon-embed-custom");
          allSvg.forEach((svg) => {
            svg.classList.add("hide");
          });
        });
        const allDropdownsLists = document.querySelectorAll("[exp-city-dropdown-list]");
        allDropdownsLists.forEach((dropdownList) => {
          dropdownList.classList.add("hide");
        });
        allDropdowns.forEach((el) => {
          el.addEventListener("click", function() {
            const allLinks = el.querySelectorAll("a");
            allLinks.forEach((link) => {
              if (link.getAttribute("exp-city") === currentCityBody) {
                const currentUrl = link.getAttribute("href");
                window.location.href = currentUrl;
              }
            });
          });
        });
      });
    }
  };

  // src/utils/exp-slider-link-creator.ts
  var expSliderLinkCreator_func = () => {
    const expSliderLinkCreator_el = document.querySelectorAll("[abs-link-for-append]");
    if (expSliderLinkCreator_el.length) {
      const abs_link_individual = document.querySelector("[abs-link-exp-individual]");
      const abs_link_group = document.querySelector("[abs-link-exp-group]");
      const all_sliders_individual = document.querySelectorAll("[exp-slider-individual]");
      const all_sliders_group = document.querySelectorAll("[exp-slider-group]");
      const city_current = document.querySelector("[page-city-current]").getAttribute("page-city-current");
      all_sliders_individual.forEach((slider_individual) => {
        const clone_abs_link = abs_link_individual.cloneNode(true);
        clone_abs_link.classList.remove("hide");
        const link_updated = clone_abs_link.getAttribute("href") + "#" + slider_individual.getAttribute("exp-name");
        clone_abs_link.setAttribute("href", link_updated);
        slider_individual.appendChild(clone_abs_link);
      });
      all_sliders_group.forEach((slider_group) => {
        const clone_abs_link = abs_link_group.cloneNode(true);
        clone_abs_link.classList.remove("hide");
        const link_updated = clone_abs_link.getAttribute("href") + "#" + slider_group.getAttribute("exp-name");
        clone_abs_link.setAttribute("href", link_updated);
        slider_group.appendChild(clone_abs_link);
      });
    }
  };

  // src/utils/exp-video-on-hover.ts
  var expVideoOnHover_func = () => {
    const expVideoOnHover_el = document.querySelectorAll("[video-on-hover]");
    if (expVideoOnHover_el.length) {
      expVideoOnHover_el.forEach((hover_el) => {
        let isPlaying = false;
        let videoLoaded = false;
        const handlePointerEnter = function() {
          if (window.innerWidth >= 992) {
            const currentSrcWaiter = hover_el.querySelector("[put-src-here]");
            if (currentSrcWaiter) {
              const src = currentSrcWaiter.getAttribute("put-src-here");
              if (src && currentSrcWaiter.getAttribute("src") !== src) {
                currentSrcWaiter.setAttribute("src", src);
              }
            }
            const currentEmbed = hover_el.querySelector("[abs-video-for-hover-hided]");
            if (currentEmbed) {
              currentEmbed.classList.remove("hide");
            }
            const currentVideo = hover_el.querySelector("video");
            if (currentVideo) {
              if (!videoLoaded) {
                const handleCanPlayThrough = () => {
                  videoLoaded = true;
                  currentVideo.play().then(() => {
                    isPlaying = true;
                  }).catch((error) => {
                    console.error("Error playing video:", error);
                  });
                  currentVideo.removeEventListener("canplaythrough", handleCanPlayThrough);
                };
                currentVideo.addEventListener("canplaythrough", handleCanPlayThrough);
                currentVideo.load();
              } else if (!isPlaying) {
                currentVideo.play().then(() => {
                  isPlaying = true;
                }).catch((error) => {
                  console.error("Error playing video:", error);
                });
              }
            }
          }
        };
        const handlePointerLeave = function() {
          if (window.innerWidth >= 992) {
            const currentEmbed = hover_el.querySelector("[abs-video-for-hover-hided]");
            if (currentEmbed) {
              currentEmbed.classList.add("hide");
            }
            const currentVideo = hover_el.querySelector("video");
            if (currentVideo && isPlaying) {
              currentVideo.pause();
              isPlaying = false;
            }
          }
        };
        hover_el.addEventListener("pointerenter", handlePointerEnter);
        hover_el.addEventListener("pointerleave", handlePointerLeave);
      });
    }
  };

  // src/utils/exp-video-on-hover-catalog-page.ts
  var catalogItemExp_func = () => {
    const catalogItemExp_el = document.querySelectorAll("[catalog-item-exp]");
    if (catalogItemExp_el.length) {
      catalogItemExp_el.forEach((cl_i) => {
        const firstSlide = cl_i.querySelector("[catalog-item-exp-gallery-item]");
        const currentLightbox = cl_i.querySelector("[ctatalog-video]");
        const embedVideo = cl_i.querySelector("[abs-video-for-hover]");
        const embedVideo_srcElement_toPut = cl_i.querySelector("[put-src-here]");
        firstSlide.appendChild(currentLightbox);
        const handleMouseOver = function() {
          if (window.innerWidth >= 992) {
            if (embedVideo_srcElement_toPut) {
              const src = embedVideo_srcElement_toPut.getAttribute("put-src-here");
              if (src) {
                embedVideo_srcElement_toPut.setAttribute("src", src);
              }
            }
            if (embedVideo) {
              embedVideo.classList.remove("hide");
            }
            let currentVideo = embedVideo.querySelector("video");
            if (currentVideo) {
              const newVideoElement = currentVideo.cloneNode(true);
              currentVideo.parentNode.replaceChild(newVideoElement, currentVideo);
              currentVideo = newVideoElement;
              currentVideo.addEventListener("canplay", () => {
                currentVideo.play().catch((error) => {
                });
              });
              currentVideo.addEventListener("play", () => {
              });
              currentVideo.addEventListener("pause", () => {
              });
              currentVideo.addEventListener("timeupdate", function() {
              });
              currentVideo.addEventListener("canplaythrough", () => {
              });
            }
          }
        };
        const handleMouseOut = function() {
          if (window.innerWidth >= 992) {
            if (embedVideo) {
              embedVideo.classList.add("hide");
            }
            const currentVideo = embedVideo.querySelector("video");
            if (currentVideo) {
              currentVideo.pause();
            }
          }
        };
        firstSlide.addEventListener("mouseover", handleMouseOver);
        firstSlide.addEventListener("mouseout", handleMouseOut);
      });
    }
  };

  // src/utils/faq-hider.ts
  var faqHider_func = () => {
    const faqHider_el = document.querySelectorAll(".section_faq");
    if (faqHider_el.length) {
      faqHider_el.forEach((faq_section) => {
        const allFaqItems = faq_section.querySelectorAll(".cl-i_faq");
        if (!allFaqItems.length) {
          faq_section.classList.add("hide");
        }
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
            let label = radio.nextElementSibling;
            if (label && label.getAttribute("form-custom-dropdwn") !== "radio-label") {
              label = null;
            }
            const placeholder = component.querySelector('[form-custom-dropdwn="placeholder"]');
            if (label && placeholder) {
              placeholder.textContent = label.textContent;
              placeholder.classList.add("label-is-active");
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
  formSelectors_func();

  // src/utils/main-page-city-selector-mobile.ts
  var menuSelectorMobile_func = () => {
    const menuTrigger = document.querySelector(".menu-standart-trigger-city");
    if (menuTrigger) {
      let whereAreWeScroll2 = function() {
        const triggerRect = menuTrigger.getBoundingClientRect();
        if (triggerRect.bottom < 0) {
          const elementsWithToggleClass = document.querySelectorAll("[toggle-class-here-selector]");
          elementsWithToggleClass.forEach((element) => {
            const toggleClass = element.getAttribute("toggle-class-here-selector");
            if (toggleClass) {
              element.classList.remove(toggleClass);
            }
          });
        } else {
          const elementsWithToggleClass = document.querySelectorAll("[toggle-class-here-selector]");
          elementsWithToggleClass.forEach((element) => {
            const toggleClass = element.getAttribute("toggle-class-here-selector");
            if (toggleClass) {
              element.classList.add(toggleClass);
            }
          });
        }
      }, handleScroll2 = function() {
        whereAreWeScroll2();
      };
      var whereAreWeScroll = whereAreWeScroll2, handleScroll = handleScroll2;
      whereAreWeScroll2();
      window.addEventListener("scroll", handleScroll2);
    }
  };

  // src/utils/menu-color.ts
  var menuColor_func = () => {
    const menuTrigger = document.querySelector(".menu-standart-trigger");
    if (menuTrigger) {
      let whereAreWeScroll2 = function() {
        const triggerRect = menuTrigger.getBoundingClientRect();
        if (triggerRect.bottom < 0) {
          const elementsWithToggleClass = document.querySelectorAll("[toggle-class-here]");
          elementsWithToggleClass.forEach((element) => {
            const toggleClass = element.getAttribute("toggle-class-here");
            if (toggleClass) {
              element.classList.add(toggleClass);
            }
          });
        } else {
          const elementsWithToggleClass = document.querySelectorAll("[toggle-class-here]");
          elementsWithToggleClass.forEach((element) => {
            const toggleClass = element.getAttribute("toggle-class-here");
            if (toggleClass) {
              element.classList.remove(toggleClass);
            }
          });
        }
      }, handleScroll2 = function() {
        whereAreWeScroll2();
      };
      var whereAreWeScroll = whereAreWeScroll2, handleScroll = handleScroll2;
      whereAreWeScroll2();
      window.addEventListener("scroll", handleScroll2);
    }
  };

  // src/utils/sliders-colors.ts
  var coloredSlider_func = () => {
    const coloredSlider_el = document.querySelectorAll("[colored-slider]");
    if (coloredSlider_el.length) {
      coloredSlider_el.forEach((swiperColored) => {
        const currentColorPattern = swiperColored.getAttribute("colored-slider");
        const colors = currentColorPattern.split(",").map((color) => color.trim());
        const allSwiperSlides = swiperColored.querySelectorAll(".swiper-slide");
        allSwiperSlides.forEach((slide, index) => {
          const colorIndex = index % colors.length;
          slide.style.backgroundColor = colors[colorIndex];
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
    coloredSlider_func();
    expSliderLinkCreator_func();
    expVideoOnHover_func();
    catalogItemExp_func();
    menuColor_func();
    menuSelectorMobile_func();
    expSelector_func();
    faqHider_func();
  });
})();
//# sourceMappingURL=index.js.map
