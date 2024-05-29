import { cityDetector_func } from '$utils/city-detector';
import { expParams_func } from '$utils/exp-catalog-params';
import { formSelectors_func } from '$utils/form-selectors';

window.Webflow ||= [];
window.Webflow.push(() => {
  cityDetector_func();
  formSelectors_func();
  expParams_func();
});
