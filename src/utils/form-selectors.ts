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
            placeholder.classList.add('label-is-active');
            console.log(`Radio selected: ${label.textContent}`);
          }

          // Добавляем класс на выбранный label
          if (label) {
            label.classList.add('label-is-active');
          }

          // Убираем класс с невыбранных labels
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
