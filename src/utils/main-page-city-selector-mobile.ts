export const menuSelectorMobile_func = () => {
  const menuTrigger = document.querySelector('.menu-standart-trigger-city');

  if (menuTrigger) {
    function whereAreWeScroll() {
      const triggerRect = menuTrigger.getBoundingClientRect();

      if (triggerRect.bottom < 0) {
        const elementsWithToggleClass = document.querySelectorAll('[toggle-class-here-selector]');

        elementsWithToggleClass.forEach((element) => {
          const toggleClass = element.getAttribute('toggle-class-here-selector');
          if (toggleClass) {
            element.classList.remove(toggleClass);
          }
        });
      } else {
        const elementsWithToggleClass = document.querySelectorAll('[toggle-class-here-selector]');

        elementsWithToggleClass.forEach((element) => {
          const toggleClass = element.getAttribute('toggle-class-here-selector');
          if (toggleClass) {
            element.classList.add(toggleClass);
          }
        });
      }
    }

    function handleScroll() {
      whereAreWeScroll();
    }

    whereAreWeScroll();

    window.addEventListener('scroll', handleScroll);
  }
};
