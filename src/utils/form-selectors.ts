export const formSelectors_func = () => {
  const formSelectors_el = document.querySelectorAll('[form-custom-dropdwn="component"]');

  if (formSelectors_el.length) {
    document.querySelectorAll('[form-custom-dropdwn="component"]').forEach((component) => {
      component.addEventListener('change', (event) => {
        if (event.target.type === 'radio') {
          const radio = event.target;
          const label = component.querySelector(
            `[form-custom-dropdwn="radio-label"][for="${radio.id}"]`
          );
          const placeholder = component.querySelector('[form-custom-dropdwn="placeholder"]');

          if (label && placeholder) {
            placeholder.textContent = label.textContent;
            console.log(`Radio selected: ${label.textContent}`);
          }
        }
      });
    });
  }
};
