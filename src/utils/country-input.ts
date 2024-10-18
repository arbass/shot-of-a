export const countryInput_func = () => {
  // Список вариантов для USA
  const usaVariants = [
    'USA',
    'usa',
    'United States of America',
    'united states of america',
    'United States',
    'united states',
  ];

  // Получаем все элементы с data-country атрибутом
  const countryInputs = document.querySelectorAll('[data-country]');

  // Добавляем слушатель на изменение значения для каждого инпута
  countryInputs.forEach((countryElement) => {
    countryElement.addEventListener('input', () => {
      // Получаем связанный state элемент
      const stateInput = document.querySelector(`[data-state="${countryElement.dataset.country}"]`);

      const stateDropdown = document.querySelector(
        `[data-state-dropdown="${countryElement.dataset.country}"]`
      );

      // Проверка, если страна не одна из вариантов USA
      if (!usaVariants.includes(countryElement.value)) {
        // Скрыть поле state
        stateDropdown.style.display = 'none';
        // Сделать его необязательным
        stateInput.required = false;
      } else {
        // Показать поле state
        stateDropdown.style.display = 'block';
        // Сделать его обязательным
        stateInput.required = true;
      }
    });
  });
};
