export const expSliderLinkCreator_func = () => {
  const expSliderLinkCreator_el = document.querySelectorAll('[colored-slider]');

  if (expSliderLinkCreator_el.length) {
    expSliderLinkCreator_el.forEach((linkCreator_el) => {
      console.log('test');
    });
  }
};
