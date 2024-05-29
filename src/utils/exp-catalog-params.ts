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

        array_params.forEach((param) => {
          const smallArray = param.split('@');
          if (smallArray[0] === page_city) {
            allIconPresets.forEach((icon) => {
              const iconAttribute = icon.getAttribute('icon-age');
              if (smallArray[1] === iconAttribute) {
                const needToCloneIcon = icon.cloneNode(true);
                currentElement?.appendChild(needToCloneIcon);
              }
            });
          }
        });
      }
      //функция для цены
      //функция для людей

      //энтри-пойнты
      display_bestSeller();
      display_age();
    });
  }
};
