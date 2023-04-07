    function modal() {
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
}

module.exports = modal;