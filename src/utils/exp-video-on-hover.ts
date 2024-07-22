export const expVideoOnHover_func = () => {
  const expVideoOnHover_el = document.querySelectorAll('[video-on-hover]');

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  if (expVideoOnHover_el.length) {
    expVideoOnHover_el.forEach((hover_el) => {
      let isPlaying = false;
      let videoLoaded = false;

      const handlePointerEnter = function () {
        if (window.innerWidth >= 992) {
          const currentSrcWaiter = hover_el.querySelector('[put-src-here]');
          if (currentSrcWaiter) {
            const src = currentSrcWaiter.getAttribute('put-src-here');
            if (src && currentSrcWaiter.getAttribute('src') !== src) {
              currentSrcWaiter.setAttribute('src', src);
            }
          }

          const currentEmbed = hover_el.querySelector('[abs-video-for-hover-hided]');
          if (currentEmbed) {
            currentEmbed.classList.remove('hide');
          }

          const currentVideo = hover_el.querySelector('video');
          if (currentVideo) {
            if (isSafari) {
              currentVideo.setAttribute('loop', '');
            }

            const handleVideoEnded = () => {
              currentVideo.currentTime = 0;
              currentVideo.play();
            };

            if (!videoLoaded) {
              const handleCanPlayThrough = () => {
                videoLoaded = true;
                currentVideo
                  .play()
                  .then(() => {
                    isPlaying = true;
                  })
                  .catch((error) => {
                    console.error('Error playing video:', error);
                  });
                currentVideo.removeEventListener('canplaythrough', handleCanPlayThrough);
                currentVideo.addEventListener('ended', handleVideoEnded); // Add event listener for loop
              };

              currentVideo.addEventListener('canplaythrough', handleCanPlayThrough);
              currentVideo.load();
            } else if (!isPlaying) {
              currentVideo
                .play()
                .then(() => {
                  isPlaying = true;
                })
                .catch((error) => {
                  console.error('Error playing video:', error);
                });
              currentVideo.addEventListener('ended', handleVideoEnded); // Add event listener for loop
            }
          }
        }
      };

      const handlePointerLeave = function () {
        if (window.innerWidth >= 992) {
          const currentEmbed = hover_el.querySelector('[abs-video-for-hover-hided]');
          if (currentEmbed) {
            currentEmbed.classList.add('hide');
          }

          const currentVideo = hover_el.querySelector('video');
          if (currentVideo && isPlaying) {
            currentVideo.pause();
            currentVideo.currentTime = 0;
            isPlaying = false;
          }
        }
      };

      hover_el.addEventListener('pointerenter', handlePointerEnter);
      hover_el.addEventListener('pointerleave', handlePointerLeave);
    });
  }
};
