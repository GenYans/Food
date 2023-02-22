window.addEventListener('DOMContentLoaded', () => {
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


    
/* Timer */

const deadLine = '2023-02-22T16:16:00';

    function getTimeRemaining(endtime) {
        let days,hours,minutes,seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        } /* Добавление 0 перед значение типа 1-9 */
    }

        function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

        updateClock(); /* Для остутсвия моргания верстки */

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            } 
        }
    }

    setClock('.timer', deadLine);

    /* Modal */

    const call = document.querySelectorAll('[data-modal]'),
          modalOpen = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modalOpen.classList.add('show');
        modalOpen.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerID);
    }

    call.forEach(btn => {
        btn.addEventListener('click',openModal);
    });



    function closeModal() {
        modalOpen.classList.toggle('show');
        document.body.style.overflow = '';
    }
    
    modalCloseBtn.addEventListener('click', closeModal);


    modalOpen.addEventListener('click', (e) => {
        if (e.target === modalOpen) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalOpen.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerID = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
    /* Классы для карточек */

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() { /* Сформировывает верстку */
            const element = document.createElement('div');
            if (this.classes.length === 0 ) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        '.menu .container', /* Родительский селектор */
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        "Меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        15,
        '.menu .container' /* Родительский селектор */
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        7,
        '.menu .container' /* Родительский селектор */
    ).render();
});



