import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
        const modalTimerID = setTimeout(() => openModal('.modal', modalTimerID), 50000);

         tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
         modal('[data-modal]','.modal', modalTimerID);
         timer('.timer', '2023-06-11');
         cards();
         calc();
         forms('form', modalTimerID);
         slider({
            slide: '.offer__slide',
            container: '.offer__slider',
            nextArrow: '.offer__slider-next',
            prevArrow: '.offer__slider-prev',
            currentCounter: '#current',
            wrapper: '.offer__slider-wrapper',
            totalCounter: '#total',
            field: '.offer__slider-inner'
         });
});