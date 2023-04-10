function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, ActiveClass) {
     /* Tabs */
     const tabs = document.querySelectorAll(tabsSelector),
     tabsContant = document.querySelectorAll(tabsContentSelector),
     tabsParent = document.querySelector(tabsParentSelector);


        function hideTabContent() { /* Скрывает табы */
        tabsContant.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
        item.classList.remove(ActiveClass); /* Скрывает класс активности */
        });
    }

        function showTabContant(i = 0) {
        tabsContant[i].classList.add('show', 'fade');
        tabsContant[i].classList.remove('hide');
        tabs[i].classList.add(ActiveClass);
    }

    hideTabContent();
    showTabContant();

    tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
    tabs.forEach((item, i) => {
        if (target == item) {
            hideTabContent();
            showTabContant(i);
        }
    });
    }
    });

}

export default tabs;