export const expVideoOnHover_func = (): void => {
  const expVideoOnHover_el = document.querySelectorAll<HTMLElement>('[video-on-hover]');

  if (expVideoOnHover_el.length) {
    expVideoOnHover_el.forEach((hover_el) => {
      // Initialize state variables per element
      (hover_el as any).isPlaying = false;
      (hover_el as any).videoLoaded = false;

      // Function to play the video/GIF
      const playVideo = (hover_el: HTMLElement): void => {
        const currentSrcWaiter = hover_el.querySelector<HTMLImageElement>('[put-src-here]');
        if (currentSrcWaiter) {
          const src = currentSrcWaiter.getAttribute('put-src-here');
          if (src && currentSrcWaiter.getAttribute('src') !== src) {
            currentSrcWaiter.setAttribute('src', src);
          }
        }

        const currentEmbed = hover_el.querySelector<HTMLElement>('[abs-video-for-hover-hided]');
        if (currentEmbed) {
          currentEmbed.classList.remove('hide');
        }

        const currentVideo = hover_el.querySelector<HTMLVideoElement>('video');
        if (currentVideo) {
          if (!(hover_el as any).videoLoaded) {
            const handleCanPlayThrough = () => {
              (hover_el as any).videoLoaded = true;
              currentVideo
                .play()
                .then(() => {
                  (hover_el as any).isPlaying = true;
                })
                .catch((error) => {
                  console.error('Error playing video:', error);
                });
              currentVideo.removeEventListener('canplaythrough', handleCanPlayThrough);
            };

            currentVideo.addEventListener('canplaythrough', handleCanPlayThrough);
            currentVideo.load();
          } else if (!(hover_el as any).isPlaying) {
            currentVideo
              .play()
              .then(() => {
                (hover_el as any).isPlaying = true;
              })
              .catch((error) => {
                console.error('Error playing video:', error);
              });
          }
        }
      };

      // Function to pause the video/GIF
      const pauseVideo = (hover_el: HTMLElement): void => {
        const currentEmbed = hover_el.querySelector<HTMLElement>('[abs-video-for-hover-hided]');
        if (currentEmbed) {
          currentEmbed.classList.add('hide');
        }

        const currentVideo = hover_el.querySelector<HTMLVideoElement>('video');
        if (currentVideo && (hover_el as any).isPlaying) {
          currentVideo.pause();
          (hover_el as any).isPlaying = false;
        }
      };

      // Handle hover events for desktop
      const handlePointerEnter = (): void => {
        if (window.innerWidth >= 992) {
          playVideo(hover_el);
        }
      };

      const handlePointerLeave = (): void => {
        if (window.innerWidth >= 992) {
          pauseVideo(hover_el);
        }
      };

      hover_el.addEventListener('pointerenter', handlePointerEnter);
      hover_el.addEventListener('pointerleave', handlePointerLeave);

      // Observe class changes for mobile devices
      if (window.innerWidth < 992) {
        const slideEl = hover_el.closest<HTMLElement>('.swiper-slide');

        if (slideEl) {
          const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
              if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (slideEl.classList.contains('swiper-slide-active')) {
                  // Slide is active; play the video/GIF
                  playVideo(hover_el);
                } else {
                  // Slide is not active; pause the video/GIF
                  pauseVideo(hover_el);
                }
              }
            }
          });

          observer.observe(slideEl, { attributes: true });

          // Play the video if the slide is initially active
          if (slideEl.classList.contains('swiper-slide-active')) {
            playVideo(hover_el);
          }

          // Optional: Store the observer if you need to disconnect it later
          (hover_el as any).mutationObserver = observer;
        }
      }
    });
  }
};
