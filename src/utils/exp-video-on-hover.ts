export const expVideoOnHover_func = () => {
  const expVideoOnHover_el = document.querySelectorAll('[video-on-hover]');

  if (expVideoOnHover_el.length) {
    expVideoOnHover_el.forEach((hover_el) => {
      hover_el.addEventListener('mouseover', function () {
        const currentSrcWaiter = hover_el.querySelector('[put-src-here]');
        if (currentSrcWaiter) {
          const src = currentSrcWaiter.getAttribute('put-src-here');
          if (src) {
            currentSrcWaiter.setAttribute('src', src);
            // console.log(`Установлен src: ${src}`);
          } else {
            // console.log('Нет атрибута put-src-here у элемента', currentSrcWaiter);
          }
        } else {
          // console.log('Не найден элемент с атрибутом [put-src-here]');
        }

        const currentEmbed = hover_el.querySelector('[abs-video-for-hover-hided]');
        if (currentEmbed) {
          currentEmbed.classList.remove('hide');
          // console.log('Класс hide снят с элемента', currentEmbed);
        } else {
          // console.log('Не найден элемент с атрибутом [abs-video-for-hover-hided]');
        }

        let currentVideo = hover_el.querySelector('video');
        if (currentVideo) {
          // Реинициализация видео элемента
          const newVideoElement = currentVideo.cloneNode(true);
          currentVideo.parentNode.replaceChild(newVideoElement, currentVideo);
          currentVideo = newVideoElement;

          currentVideo.addEventListener('canplay', () => {
            // console.log('Видео готово к воспроизведению');
            currentVideo.play().catch((error) => {
              // console.log('Ошибка при воспроизведении видео:', error);
            });
          });

          currentVideo.addEventListener('play', () => {
            // console.log('Видео начато воспроизведение');
          });

          currentVideo.addEventListener('pause', () => {
            // console.log('Видео на паузе');
          });

          currentVideo.addEventListener('timeupdate', function () {
            // console.log(`Current time: ${currentVideo.currentTime.toFixed(2)} seconds`);
          });

          currentVideo.addEventListener('canplaythrough', () => {
            // console.log('Видео полностью загружено и может воспроизводиться без прерываний');
          });
        } else {
          // console.log('Не найден элемент video');
        }

        // console.log(currentVideo);
      });

      hover_el.addEventListener('mouseout', function () {
        const currentEmbed = hover_el.querySelector('[abs-video-for-hover-hided]');
        if (currentEmbed) {
          currentEmbed.classList.add('hide');
          // console.log('Класс hide добавлен к элементу', currentEmbed);
        } else {
          // console.log('Не найден элемент с атрибутом [abs-video-for-hover-hided]');
        }

        const currentVideo = hover_el.querySelector('video');
        if (currentVideo) {
          currentVideo.pause();
          // console.log('Видео поставлено на паузу');
        } else {
          // console.log('Не найден элемент video');
        }
      });
    });
  } else {
    // console.log('Не найдено элементов с атрибутом [video-on-hover]');
  }
};
