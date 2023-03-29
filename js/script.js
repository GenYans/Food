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

// Slider 

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        slidePrev = document.querySelector('.offer__slider-prev'),
        slideNext = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width; //Получить элемент со страницы

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent  = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    //Slider Вариант №2

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden'; //Ограничиваем показ элементов, которые не попадают в область видимости


    slides.forEach(slide => {
        slide.style.width = width;
    });

    function dotsForEach() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    };

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
          dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot),
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    slideNext.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { //'500 px'
            offset = 0;
        } else {
            offset += deleteNotDigits(width); //При нажатие стрелки вперед, к офсету добавляется ширина еще одного слайда, и будет смещятся  
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        } 

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dotsForEach();
    });

    slidePrev.addEventListener('click', () => {
        if (offset == 0) { //'500 px' 
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        } 

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

       dotsForEach();
    });

    dots.forEach(dot => { //Добовляем обработчик событий для переключения слайдов при нажатие на доты
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dotsForEach();
        });
    });

//Slider Вариант №2

/*     showSlides(slideIndex);

    if (slides.length < 10) { // Изменение количества слайдов
        total.textContent  = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) { // Если мы перешли в крайнюю границу, т.е в 4 слайд, то мы перемещаемся назад на 1 слайд
            slideIndex = 1;
        }

        if (n < 1) { // Если мы переходим с 1 в 4 слайд
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none'); // Скрываем слайды

        slides[slideIndex - 1].style.display = 'block'; // Показывает нужный слайд

        if (slides.length < 10) { // Изменение счетчика
            current.textContent  = `0${slideIndex}`;
        } else {
            total.textContent = slideIndex;
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);//Взаимодействие цифр с слайдами
    }

    slidePrev.addEventListener('click', () => {
        plusSlides(-1);
    });

    slideNext.addEventListener('click', () => {
        plusSlides(1);
    }); */

/* Timer */

const deadLine = '2023-06-20T16:16:00';

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
          modalOpen = document.querySelector('.modal');

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
    

    modalOpen.addEventListener('click', (e) => {
        if (e.target === modalOpen || e.target.getAttribute('data-close')=== '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalOpen.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerID = setTimeout(openModal, 50000);

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

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);

        }

        return await res.json();
    };

/*     getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr,price}) => {
                new MenuCard(img, altimg, title, descr,price, '.menu .container').render();
            });
        }); */

        getResource('http://localhost:3000/menu')
        .then(data => createCard(data));

        function createCard(data) {
            data.forEach(({img, altimg, title, descr, price}) => {
                const element = document.createElement('div');
                
                element.classList.add('menu__item');

                element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> руб/день</div>
            </div>`;

            document.querySelector('.menu .container').append(element);
            });
        }

/*     axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr,price}) => {
                new MenuCard(img, altimg, title, descr,price, '.menu .container').render(); 
            });
        }); */

    /* Forms */

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро с вами свяжется наш оператор',
        failure: 'Упс, что-то пошло не так'
    };

    forms.forEach(item => {
        bindpostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindpostData(form) {
        form.addEventListener('submit',(e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);/* Позволяет помещять элемент в разные места верстки */


            /* request.setRequestHeader('Content-type', 'application/json'); */
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            }); 

/*             request.addEventListener('load', () => {
                if(request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                        statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            });   */
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>x</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

fetch('http://localhost:3000/menu')
    .then(data => data.json)
    /* .then(res => console.log(res)); */

    //Calc

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    function calcTotal() { //Посчитать конечный результат
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'Невозможно расчитать без заполнения данных';
            return;
        }

        if (sex === 'female') {
            result.textContent = (447.6 + (9.2 * weight) + (3.1 * height) – (4.3 * age)) * ratio;
        }
    }
});