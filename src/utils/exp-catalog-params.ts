export const expParams_func = () => {
  const expParams_el = document.querySelector('[catalog-page-city]');

  if (expParams_el) {
    const page_city = expParams_el.getAttribute('catalog-page-city');
    const array_expCollectionItems = document.querySelectorAll('[exp-collection-item]');

    array_expCollectionItems.forEach((expCollectionItem, index) => {
      function display_bestSeller() {
        const currentElement = expCollectionItem.querySelector(
          '[exp-columns_slider-header-meta-item=best]'
        );
        const currentAttributeValue = expCollectionItem.getAttribute('value-best');
        const array_params = currentAttributeValue.split(';');

        array_params.forEach((el) => {
          if (el === page_city) {
            currentElement.classList.remove('hide');
          }
        });
      }

      function display_age() {
        console.log(`Processing age for item ${index}`);
        const allIconPresets = document.querySelectorAll('[icon-age]');
        const currentElement = expCollectionItem.querySelector(
          '[exp-columns_slider-header-meta-item=age]'
        );
        const currentAttributeValue = expCollectionItem.getAttribute('value-age');
        const array_params = currentAttributeValue.split(';');

<<<<<<< HEAD
        array_params.forEach((param, id) => {
          if (param === '') {
            array_params.splice(id, 1);
          }
        });

        const fragment = document.createDocumentFragment(); // Использование фрагмента для добавления иконок

=======
>>>>>>> parent of bf50110 (before: gpt update)
        array_params.forEach((param) => {
          const smallArray = param.split('@');
          if (smallArray[0] === page_city) {
            allIconPresets.forEach((icon) => {
              const iconAttribute = icon.getAttribute('icon-age');
              if (smallArray[1] === iconAttribute) {
                const needToCloneIcon = icon.cloneNode(true);
                fragment.appendChild(needToCloneIcon);
                console.log(`Added icon for ${index}: `, iconAttribute);
              }
            });
          }
        });

        // Очистка всех дочерних элементов перед добавлением новых иконок
        while (currentElement.firstChild) {
          currentElement.removeChild(currentElement.firstChild);
        }

        currentElement.appendChild(fragment); // Добавление фрагмента в элемент
      }

      function display_price() {
        const currentElement = expCollectionItem.querySelector(
          '[exp-columns_slider-header-meta-item=price]'
        );
        const currentAttributeValue = expCollectionItem.getAttribute('value-price');
        const array_params = currentAttributeValue.split(';');

        array_params.forEach((param) => {
          const smallArray = param.split('@');
          if (smallArray[0] === page_city) {
            const city = smallArray[0];
            const paramValue = smallArray[1];

            if (city === page_city) {
              currentElement.classList.remove('hide');
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
          '[exp-columns_slider-header-meta-item=count]'
        );
        const currentAttributeValue = expCollectionItem.getAttribute('value-count');
        const array_params = currentAttributeValue.split(';');

        array_params.forEach((param) => {
          const smallArray = param.split('@');
          if (smallArray[0] === page_city) {
            const city = smallArray[0];
            const paramValue = smallArray[1];

            if (city === page_city) {
              currentElement.classList.remove('hide');
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
