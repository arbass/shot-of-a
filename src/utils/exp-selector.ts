export const expSelector_func = () => {
  const expSelector_el = document.querySelectorAll('[this-is-a-city-page]');

  if (expSelector_el.length) {
    expSelector_el.forEach((bodyElement) => {
      const currentCityBody = document
        .querySelector('[this-is-a-city-page]')
        .getAttribute('this-is-a-city-page');
      console.log(currentCityBody);

      const allDropdowns = document.querySelectorAll('[exp-dropdown-button-list]');

      allDropdowns.forEach((dropdown) => {
        const allSvg = dropdown.querySelectorAll('.icon-embed-custom');
        allSvg.forEach((svg) => {
          svg.classList.add('hide');
        });
      });
      const allDropdownsLists = document.querySelectorAll('[exp-city-dropdown-list]');
      allDropdownsLists.forEach((dropdownList) => {
        dropdownList.classList.add('hide');
      });

      allDropdowns.forEach((el) => {
        el.addEventListener('click', function () {
          const allLinks = el.querySelectorAll('a');
          allLinks.forEach((link) => {
            if (link.getAttribute('exp-city') === currentCityBody) {
              const currentUrl = link.getAttribute('href');
              window.location.href = currentUrl;
            }
          });
        });
      });
    });
  }
};
