'use strict';

window.addEventListener('DOMContentLoaded', () => {
    function onSlider (slidesWrapper, slidesClass, nextBtnClass, prevBtnClass) {
        const slider = document.querySelector(slidesWrapper),
                slides = document.querySelectorAll(slidesClass),
                nextBtn = document.querySelector(nextBtnClass),
                prevBtn = document.querySelector(prevBtnClass),
                width = window.getComputedStyle(slider).width;


        let offset = 0;
        let touchStartX = 0;
        let touchEndX = 0;

        if(window.innerWidth <= 767.98 ) {
            slider.style.width = slides.length * 100 + '%';
        }

        slider.style.transition = '0.5s all';
        

        function prevSlide () {
            prevBtn.style.opacity = 0.5;
     
            if(offset == 0){
                offset = (+width.replace("px", "")) * (slides.length - 1);
            } else{
                offset -= (+width.replace("px", ""));
            }

            slider.style.transform = `translateX(-${offset}px)`;
            prevBtn.style.opacity = 1;
        }

        function nextSlide () {
            if(offset == (+width.replace("px", "")) * (slides.length - 1)){
                offset = 0;
            } else{
                offset += (+width.replace("px", ""));
            }

            slider.style.transform = `translateX(-${offset}px)`;
        }


        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        })

        slider.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        })

        slider.addEventListener('touchend', (e) => {
            let distance = touchEndX - touchStartX;

            if (distance > 0) {
                prevSlide()
            } else if (distance < 0 ) {
                nextSlide()
            }
        })
        
        prevBtn.addEventListener('click', prevSlide);

        nextBtn.addEventListener('click', nextSlide);
    }

    onSlider('.home__footer-items', '.home__footer-item', '.home__footer .slider-btn_right', '.home__footer .slider-btn_left');
    onSlider('.buildVr-block__cards', '.buildVr-block__card-item', '.buildVr-block__content .slider-btn_right', '.buildVr-block__content .slider-btn_left');
    onSlider('.technolodies-hardware-block__brands-items', '.technolodies-hardware-block__brands-item', '.technolodies-hardware-block__brands .slider-btn_right', '.technolodies-hardware-block__brands .slider-btn_left');
    onSlider('.building-process-block__content-items', '.building-process-block__content-item', '.building-process-block__content .slider-btn_right', '.building-process-block__content .slider-btn_left');

    function openBurger () {
        document.querySelector('.home__burger').style.display = 'none';
        document.querySelector('.burger').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeBurger () {
        document.querySelector('.home__burger').style.display = 'flex';
        document.querySelector('.burger').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    document.querySelector('.burger').addEventListener('click', (e) => {
        // console.log(e.target);

        if (e.target === document.querySelector('.burger') || e.target === document.querySelector('.burger__btn-close')) {
            closeBurger();
        }

    });
    
    document.querySelector('.home__burger').addEventListener('click', () => {
        openBurger();
    });



    const forms = document.querySelectorAll('form');
    const prevModalDialog = document.querySelector('.modal__wrapper');
    const modal = document.querySelector('.modal');

    const message = {
        loading: "Loading...",
        success: "Thank you! We will contact you later",
        failue: "Something went wrong. Try again."
    };

    forms.forEach(item => {
        bindpostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function onChangePhone () {
        

    }

    document.querySelector('.form__tel').addEventListener('input', (e) => {
        let phone = document.querySelector('.form__tel');
   
        // console.log(phone.value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+38($1)$2-$3-$4"));
        phone.value = phone.value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+38($1)$2-$3-$4")
        // let res = 

        console.log(phone.value);
        // if(phone.value.length > 10) return
    })

    function showThanksModal(message) {

        modal.style.display = 'block'

        document.querySelector('.modal__subTitle').textContent = message;

        let timout = setTimeout(() => {
            modal.style.display = 'none'
            document.querySelector('.modal__subTitle').textContent = '';
        }, 4000);

        modal.addEventListener('click',  (e) => {
            if(e.target === document.querySelector('.modal__close') || 
            e.target === document.querySelector('.modal__closeBtn') ||
            e.target === modal) {
                clearTimeout(timout);
                closeModal();
            }
        })
    }

    function closeModal () {
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        document.querySelector('.modal').style.display = 'none';
    }

    function bindpostData (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            console.log(object);


            postData('http://localhost:3000/requests', JSON.stringify(object))
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                }).catch(() => {
                    console.log('error');
                    showThanksModal(message.failue);
                })
                .finally(() => {
                    form.reset();
                });

        });
    }


});













