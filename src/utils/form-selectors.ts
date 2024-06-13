export const formSelectors_func = () => {
  const formSelectors_el = document.querySelectorAll('[form-custom-dropdwn="component"]');

  if (formSelectors_el.length) {
    document.querySelectorAll('[form-custom-dropdwn="component"]').forEach((component) => {
      component.addEventListener('change', (event) => {
        if (event.target.type === 'radio') {
          const radio = event.target;
          let label = radio.nextElementSibling;
          if (label && label.getAttribute('form-custom-dropdwn') !== 'radio-label') {
            label = null;
          }
          const placeholder = component.querySelector('[form-custom-dropdwn="placeholder"]');
          if (label && placeholder) {
            placeholder.textContent = label.textContent;
            placeholder.classList.add('label-is-active');
          }
          if (label) {
            label.classList.add('label-is-active');
          }
          const allLabels = component.querySelectorAll('[form-custom-dropdwn="radio-label"]');
          allLabels.forEach((lbl) => {
            if (lbl !== label) {
              lbl.classList.remove('label-is-active');
            }
          });
        }
      });
    });
  }
};

formSelectors_func();
