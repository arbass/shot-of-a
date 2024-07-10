export const faqHider_func = () => {
  const faqHider_el = document.querySelectorAll('.section_faq');

  if (faqHider_el.length) {
    faqHider_el.forEach((faq_section) => {
      const allFaqItems = faq_section.querySelectorAll('.cl-i_faq');
      if (!allFaqItems.length) {
        faq_section.classList.add('hide');
      }
    });
  }
};
