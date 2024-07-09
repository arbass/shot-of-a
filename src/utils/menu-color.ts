export const menuColor_func = () => {
  const menuTrigger = document.querySelector('.menu-standart-trigger');

  if (menuTrigger) {
    function whereAreWeScroll() {
      const triggerRect = menuTrigger.getBoundingClientRect();

      if (triggerRect.bottom < 0) {
        const elementsWithToggleClass = document.querySelectorAll('[toggle-class-here]');

        elementsWithToggleClass.forEach((element) => {
          const toggleClass = element.getAttribute('toggle-class-here');
          if (toggleClass) {
            element.classList.add(toggleClass);
          }
        });
      } else {
        const elementsWithToggleClass = document.querySelectorAll('[toggle-class-here]');

        elementsWithToggleClass.forEach((element) => {
          const toggleClass = element.getAttribute('toggle-class-here');
          if (toggleClass) {
            element.classList.remove(toggleClass);
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
