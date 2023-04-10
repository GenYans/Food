function slider({container, slide, nextArrow, prevArrow, totalCounter,currentCounter, wrapper, field}) {
// Slider 

    const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    slidePrev = document.querySelector(prevArrow),
    slideNext = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
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

    const indicators = document.createElement('ol'),
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
}
export default slider;