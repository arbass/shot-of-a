export const catalogItemExp_func = () => {
  const catalogItemExp_el = document.querySelectorAll('[catalog-item-exp]');

  if (catalogItemExp_el.length) {
    catalogItemExp_el.forEach((cl_i) => {
      const firstSlide = cl_i.querySelector('[catalog-item-exp-gallery-item]');
      const currentLightbox = cl_i.querySelector('[ctatalog-video]');
      const embedVideo = cl_i.querySelector('[abs-video-for-hover]');
      const embedVideo_srcElement_toPut = cl_i.querySelector('[put-src-here]');

      firstSlide.appendChild(currentLightbox);

      const handleMouseOver = function () {
        if (window.innerWidth >= 992) {
          if (embedVideo_srcElement_toPut) {
            const src = embedVideo_srcElement_toPut.getAttribute('put-src-here');
            if (src) {
              embedVideo_srcElement_toPut.setAttribute('src', src);
            }
          }

          if (embedVideo) {
            embedVideo.classList.remove('hide');
          }

          let currentVideo = embedVideo.querySelector('video');
          if (currentVideo) {
            const newVideoElement = currentVideo.cloneNode(true);
            currentVideo.parentNode.replaceChild(newVideoElement, currentVideo);
            currentVideo = newVideoElement;

            currentVideo.addEventListener('canplay', () => {
              currentVideo.play().catch((error) => {});
            });

            currentVideo.addEventListener('play', () => {});

            currentVideo.addEventListener('pause', () => {});

            currentVideo.addEventListener('timeupdate', function () {});

            currentVideo.addEventListener('canplaythrough', () => {});
          }
        }
      };

      const handleMouseOut = function () {
        if (window.innerWidth >= 992) {
          if (embedVideo) {
            embedVideo.classList.add('hide');
          }

          const currentVideo = embedVideo.querySelector('video');
          if (currentVideo) {
            currentVideo.pause();
          }
        }
      };

      firstSlide.addEventListener('mouseover', handleMouseOver);
      firstSlide.addEventListener('mouseout', handleMouseOut);
    });
  }
};
