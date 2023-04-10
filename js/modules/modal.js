    function openModal(modalSelector, modalTimerID) {
        const modalOpen = document.querySelector(modalSelector);

        modalOpen.classList.add('show');
        modalOpen.classList.remove('hide');
        document.body.style.overflow = 'hidden';

        console.log(modalTimerID);
        if(modalTimerID) {
            clearInterval(modalTimerID);
        }
    }
    function closeModal(modalSelector) {
        const modalOpen = document.querySelector(modalSelector);

        modalOpen.classList.toggle('show');
        document.body.style.overflow = '';
    }
    
    function modal(triggerSelector, modalSelector, modalTimerID) {
    /* Modal */

    const call = document.querySelectorAll(triggerSelector),
    modalOpen = document.querySelector(modalSelector);

    call.forEach(btn => {
        btn.addEventListener('click',() => openModal(modalSelector,modalTimerID));
    });

    

    modalOpen.addEventListener('click', (e) => {
        if (e.target === modalOpen || e.target.getAttribute('data-close')=== '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalOpen.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerID);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
    /* Классы для карточек */
}

export default modal;
export {closeModal};
export {openModal};