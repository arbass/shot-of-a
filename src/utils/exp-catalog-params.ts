export const expParams_func = () => {
  const expParams_el = document.querySelector('[catalog-page-city]');

  if (expParams_el) {
    //переменные
    const page_city = expParams_el.getAttribute('catalog-page-city');
    const array_expCollectionItems = document.querySelectorAll('[exp-collection-item]');

    array_expCollectionItems.forEach((expCollectionItem) => {
      //функция для бестселлера
      function display_bestSeller() {
        const currentElement = expCollectionItem.querySelector(
          '[exp-columns_slider-header-meta-item=best]'
        );
        const currentAttributeValue = expCollectionItem.getAttribute('value-best');
        const array_params = currentAttributeValue.split(';');

        array_params.forEach((param, id) => {
          if (param === '') {
            array_params.splice(id, 1);
          }
        });

        array_params.forEach((el) => {
          if (el === page_city) {
            currentElement.classList.remove('hide');
          }
        });
      }
      //функция для иконки возраста
      function display_age() {
        const allIconPresets = document.querySelectorAll('[icon-age]');
        const currentElement = expCollectionItem.querySelector(
          '[exp-columns_slider-header-meta-item=age]'
        );
        const currentAttributeValue = expCollectionItem.getAttribute('value-age');
        const array_params = currentAttributeValue.split(';');

        array_params.forEach((param, id) => {
          if (param === '') {
            array_params.splice(id, 1);
          }
        });

        array_params.forEach((param) => {
          const smallArray = param.split('@');

          if (smallArray[0] === page_city) {
            allIconPresets.forEach((icon) => {
              const iconAttribute = icon.getAttribute('icon-age');
              if (smallArray[1] === iconAttribute) {
                // Элемент, который мы хотим скопировать
                const elementToCopy = icon;

                // Новый родительский элемент
                const newParent = currentElement;

                // Создаем новый элемент и копируем HTML содержимое
                const newElement = document.createElement('div');
                newElement.innerHTML = elementToCopy.innerHTML;

                // Вставляем новый элемент в нового родителя
                newParent.appendChild(newElement);

                // const needToCloneIcon = icon.cloneNode(true);
                // currentElement?.appendChild(needToCloneIcon);
              }
            });
          }
        });
      }
      //функция для цены
      function display_price() {
        const currentElement = expCollectionItem.querySelector(
          '[exp-columns_slider-header-meta-item=price]'
        );
        const currentAttributeValue = expCollectionItem.getAttribute('value-price');
        const array_params = currentAttributeValue.split(';');

        array_params.forEach((param, id) => {
          if (param === '') {
            array_params.splice(id, 1);
          }
        });

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
      //функция для людей
      function display_people() {
        const currentElement = expCollectionItem.querySelector(
          '[exp-columns_slider-header-meta-item=count]'
        );
        const currentAttributeValue = expCollectionItem.getAttribute('value-count');
        const array_params = currentAttributeValue.split(';');

        array_params.forEach((param, id) => {
          if (param === '') {
            array_params.splice(id, 1);
          }
        });

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

      //энтри-пойнты
      display_bestSeller();
      display_age();
      display_price();
      display_people();
    });
  }
};
