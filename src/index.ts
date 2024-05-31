import { cityDetector_func } from '$utils/city-detector';
import { expParams_func } from '$utils/exp-catalog-params';
import { formSelectors_func } from '$utils/form-selectors';
import { coloredSlider_func } from '$utils/sliders-colors';

window.Webflow ||= [];
window.Webflow.push(() => {
  cityDetector_func();
  formSelectors_func();
  expParams_func();
  coloredSlider_func();
});
