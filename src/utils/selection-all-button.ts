export const selectionAllButton_func = () => {
  const selectionAllButton_el = document.querySelector('.exp-columns_inner');
  const currentSelectorButton = document.querySelector(
    '.dropdown-placeholder.is-exp-filter.is-new'
  );

  if (selectionAllButton_el) {
    if (
      (currentSelectorButton.textContent != 'All') &
      (currentSelectorButton.textContent != 'ALL')
    ) {
      const list_links_dropdown = selectionAllButton_el.querySelector(
        '.location-dropdown_list.is-form'
      );
      const allLinks = list_links_dropdown.querySelectorAll('.w-dyn-item');
      const firstLinkCloneAble = allLinks[0].cloneNode(true);
      const currentParent = allLinks[0].parentNode;
      firstLinkCloneAble.querySelector('a').textContent = 'ALL';
      const path = window.location.pathname;
      const newPath = path.substring(0, path.lastIndexOf('/'));
      firstLinkCloneAble.querySelector('a').setAttribute('href', newPath);

      // Заппендить firstLinkCloneAble перед allLinks[0]
      currentParent.insertBefore(firstLinkCloneAble, allLinks[0]);
    }
  }
};
