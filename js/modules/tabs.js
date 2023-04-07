function tabs() {
     /* Tabs */
     const tabs = document.querySelectorAll('.tabheader__item'),
     tabsContant = document.querySelectorAll('.tabcontent'),
     tabsParent = document.querySelector('.tabheader__items');


        function hideTabContent() { /* Скрывает табы */
        tabsContant.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
        item.classList.remove('tabheader__item_active'); /* Скрывает класс активности */
        });
    }

        function showTabContant(i = 0) {
        tabsContant[i].classList.add('show', 'fade');
        tabsContant[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContant();

    tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
    tabs.forEach((item, i) => {
        if (target == item) {
            hideTabContent();
            showTabContant(i);
        }
    });
    }
    });

}

module.exports = tabs;