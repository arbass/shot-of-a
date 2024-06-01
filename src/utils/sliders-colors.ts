export const coloredSlider_func = () => {
  const coloredSlider_el = document.querySelectorAll('[colored-slider]');

  if (coloredSlider_el.length) {
    coloredSlider_el.forEach((swiperColored) => {
      const currentColorPattern = swiperColored.getAttribute('colored-slider');
      const colors = currentColorPattern.split(',').map((color) => color.trim());
      const allSwiperSlides = swiperColored.querySelectorAll('.swiper-slide');

      allSwiperSlides.forEach((slide, index) => {
        const colorIndex = index % colors.length;
        // console.log(`Applying color ${colors[colorIndex]} to slide ${index}`);
        slide.style.backgroundColor = colors[colorIndex];
      });
    });
  }
};
