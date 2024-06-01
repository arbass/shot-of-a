export const expSliderLinkCreator_func = () => {
  const expSliderLinkCreator_el = document.querySelectorAll('[abs-link-for-append]');

  if (expSliderLinkCreator_el.length) {
    const abs_link_individual = document.querySelector('[abs-link-exp-individual]');
    const abs_link_group = document.querySelector('[abs-link-exp-group]');
    const all_sliders_individual = document.querySelectorAll('[exp-slider-individual]');
    const all_sliders_group = document.querySelectorAll('[exp-slider-group]');
    const city_current = document
      .querySelector('[page-city-current]')
      .getAttribute('page-city-current');
    all_sliders_individual.forEach((slider_individual) => {
      const clone_abs_link = abs_link_individual.cloneNode(true);
      clone_abs_link.classList.remove('hide');
      const link_updated =
        clone_abs_link.getAttribute('href') + '#' + slider_individual.getAttribute('exp-name');
      clone_abs_link.setAttribute('href', link_updated);

      slider_individual.appendChild(clone_abs_link);
    });
    //

    all_sliders_group.forEach((slider_group) => {
      const clone_abs_link = abs_link_group.cloneNode(true);
      clone_abs_link.classList.remove('hide');
      const link_updated =
        clone_abs_link.getAttribute('href') + '#' + slider_group.getAttribute('exp-name');
      clone_abs_link.setAttribute('href', link_updated);

      slider_group.appendChild(clone_abs_link);
    });
  }
};
