import { bookLinks_func } from '$utils/book-now-links';
import { cityDetector_func } from '$utils/city-detector';
import { expParams_func } from '$utils/exp-catalog-params';
import { expSelector_func } from '$utils/exp-selector';
import { expSliderLinkCreator_func } from '$utils/exp-slider-link-creator';
import { expVideoOnHover_func } from '$utils/exp-video-on-hover';
import { catalogItemExp_func } from '$utils/exp-video-on-hover-catalog-page';
import { faqHider_func } from '$utils/faq-hider';
import { formSelectors_func } from '$utils/form-selectors';
import { menuSelectorMobile_func } from '$utils/main-page-city-selector-mobile';
import { menuColor_func } from '$utils/menu-color';
import { coloredSlider_func } from '$utils/sliders-colors';

window.Webflow ||= [];
window.Webflow.push(() => {
  cityDetector_func();
  formSelectors_func();
  expParams_func();
  coloredSlider_func();
  expSliderLinkCreator_func();
  expVideoOnHover_func();
  catalogItemExp_func();
  menuColor_func();
  menuSelectorMobile_func();
  expSelector_func();
  faqHider_func();
  bookLinks_func();
});
