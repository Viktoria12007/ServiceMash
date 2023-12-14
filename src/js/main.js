import '../../node_modules/focus-visible/dist/focus-visible';
import '../../node_modules/just-validate/dist/js/just-validate';
import Inputmask from "inputmask";
import '../scss/main.scss';
import '../index.html';

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.maincontent');
    const items = Array.from(container.querySelectorAll('.page'));
    let itemsNumber = items.length;
    const navLinks = Array.from(document.querySelectorAll('.js-nav-link'));
    const navScrollLinks = Array.from(document.querySelectorAll('.scroll-list__link'));
    let currentItemIndex = 0;
    let scroll = true;

    const moveSection = index => {
        let positionTop = (-index * 100) + '%';
        container.style.top = positionTop;
    };

    const setLocation = index => window.location = `#${items[index].id}`;

    // Set strart params
    container.style.top = 0;
    setLocation(currentItemIndex);
    itemsNumber--;

    // Scrolling section by navigation.
    navLinks.forEach(element => {
        element.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();

            let sectionID = element.getAttribute('href').slice(1);

            currentItemIndex = items.findIndex(element => {
                return element.id === sectionID;
            });

            if (element.classList.contains('scroll-list__link')) {
                navScrollLinks.forEach((el) => {
                    el.classList.remove('active');
                });
                element.classList.add('active');
            }

            moveSection(currentItemIndex);
        });
    });

    // Scrolling sections by mouse
    function handleWheel(event) {
        // event.preventDefault();
        event.stopPropagation();
        console.log(event.deltaY);

        let direction = event.deltaY;

        if (scroll) {
            if (direction > 0 && currentItemIndex < itemsNumber) {
                currentItemIndex++;
                scroll = false;
            } else if (direction < 0 && currentItemIndex !== 0) {
                currentItemIndex--;
                scroll = false;
            }
            moveSection(currentItemIndex);
        }
    }
    window.addEventListener('wheel', handleWheel);

    // Scrolling sections by touchpad
    const sensitivity = 20;
    let touchStart = null;
    let touchPosition = null;

    window.addEventListener("touchstart", TouchStart);
    window.addEventListener("touchmove", TouchMove);
    window.addEventListener("touchend", TouchEnd);
    window.addEventListener("touchcancel", TouchEnd);

    function TouchStart (e) {
        //Получаем текущую позицию касания
        touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        touchPosition = { x: touchStart.x, y: touchStart.y };
    };

    function TouchMove(e) {
        //Получаем новую позицию
        touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }

    function TouchEnd(e) {
        CheckAction(); //Определяем, какой жест совершил пользователь
        //Очищаем позиции
        touchStart = null;
        touchPosition = null;
    }

    function CheckAction() {
        let d = {
            x: touchStart.x - touchPosition.x,
            y: touchStart.y - touchPosition.y
        }; //Получаем расстояния от начальной до конечной точек по обеим осям

        if (Math.abs(d.x) > Math.abs(d.y)) { //Проверяем, движение по какой оси было длиннее
            if(Math.abs(d.x) > sensitivity) { //Проверяем, было ли движение достаточно длинным
                if(d.x > 0) { //Если значение больше нуля, значит пользователь двигал пальцем справа налево
                    console.log("Swipe Left");
                }
                else { //Иначе он двигал им слева направо
                    console.log("Swipe Right");
                }
            }
        }
        else { //Аналогичные проверки для вертикальной оси
            if(Math.abs(d.y) > sensitivity) {
                if(d.y > 0 && currentItemIndex < itemsNumber) { //Свайп вверх
                    console.log("Swipe up");
                    currentItemIndex++;
                }
                else if (d.y < 0 && currentItemIndex !== 0) { //Свайп вниз
                    console.log("Swipe down");
                    currentItemIndex--;
                }
                moveSection(currentItemIndex);
            }
        }
    }

    container.addEventListener('transitionstart', () => {
        navScrollLinks.forEach((el) => {
            el.classList.remove('active');
        });
        document.querySelectorAll('.scroll-list__item')[currentItemIndex].querySelector('a').classList.add('active');
    });

    container.addEventListener('transitionend', () => {
        scroll = true;
        setLocation(currentItemIndex);
        // navScrollLinks.forEach((el) => {
        //   el.classList.remove('active');
        // });
        // document.querySelectorAll('.scroll-list__item')[currentItemIndex].querySelector('a').classList.add('active');
    });

    // window.addEventListener('scroll', (event) => {
    //   let scrollDistance = window.scrollY;


    //     document.querySelectorAll('.page').forEach((el, i) => {
    //       console.log(el.offsetTop);
    //       console.log(scrollDistance);
    //       if (el.offsetTop <= scrollDistance) {
    //         document.querySelectorAll('.scroll-list__link').forEach((el) => {
    //           if (el.classList.contains('active')) {
    //             el.classList.remove('active');
    //           }
    //         });

    //         document.querySelectorAll('.scroll-list__item')[i].querySelector('a').classList.add('active');
    //       }
    //     });

    // });

    // маска телефона
    let selector = document.querySelectorAll('input[type="tel"]');
    selector = Array.from(selector);
    // console.log(selector);
    // let selector = document.querySelector('input[type="tel"]');
    let im = new Inputmask('+7 (999) 999-99-99');
    im.mask(selector);

    // Прикрепить файл
    const fileInput = document.querySelector('input[type="file"]');

    fileInput.addEventListener('change', (e) => {
        let files = e.currentTarget.files;
        console.log(files);

        if (files.length) {
            const namesFiles = [];
            files = Array.from(files);
            files.forEach((el) => {
                namesFiles.push(el.name);
            })
            console.log(namesFiles);
            fileInput.closest('label').querySelector('span').textContent = namesFiles.join(', ');
        }
        else {
            fileInput.closest('label').querySelector('span').textContent = 'Прикрепить файл';
        }
    });

    // управление модалкой
    const overlay = document.querySelector('.overlay');
    const resultModal = document.querySelector('.result-modal');
    const closeResultModal = document.querySelector('.result-modal__close');
    const textResultModal = document.querySelector('.result-modal__text');
    function closeModal() {
        resultModal.classList.remove('result-modal_show');
        overlay.classList.remove('overlay_show');
        window.addEventListener('wheel', handleWheel);
        window.addEventListener("touchstart", TouchStart);
        window.addEventListener("touchmove", TouchMove);
        window.addEventListener("touchend", TouchEnd);
        window.addEventListener("touchcancel", TouchEnd);
    }
    closeResultModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // валидация формы
    const validateForms = function(selector, rules) {
        new window.JustValidate(selector, {
            rules: rules,
            messages: {
                name: {
                    required: 'Как к вам можно обращаться?',
                    minLength: 'Имя должно содержать минимум 2 символа',
                    maxLength: 'Имя должно содержать не более 30 символов'
                },
                company: {
                    required: 'Как называется ваша компания?',
                    minLength: 'Название компании должно содержать минимум 2 символа',
                    maxLength: 'Название компании должно содержать не более 40 символов'
                },
                message: {
                    required: 'Пожалуйста, введите сообщение',
                    minLength: 'Ваше сообщение должно содержать минимум 5 символов',
                    maxLength: 'Ваше сообщение должно содержать не более 300 символов'
                },
                tel: {
                    required: 'Укажите ваш телефон',
                    function: 'Пожалуйста, введите правильный номер'
                },
                email: {
                    required: 'Укажите ваш e-mail',
                    email: 'Пожалуйста, введите правильный e-mail',
                    minLength: 'Ваш e-mail должен содержать минимум 6 символов',
                    maxLength: 'Ваш e-mail должен содержать не более 50 символов'
                }
            },
            submitHandler: function(form) {
                let formData = new FormData(form);

                let xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            textResultModal.innerHTML = 'Отправлено!';
                        } else {
                            textResultModal.innerHTML = 'Не отправлено! Попробуйте ещё раз!';
                        }
                        window.removeEventListener('wheel', handleWheel);
                        window.removeEventListener("touchstart", TouchStart);
                        window.removeEventListener("touchmove", TouchMove);
                        window.removeEventListener("touchend", TouchEnd);
                        window.removeEventListener("touchcancel", TouchEnd);
                        overlay.classList.add('overlay_show');
                        resultModal.classList.add('result-modal_show');
                    }
                }

                xhr.open('POST', 'mail.php', true);
                xhr.send(formData);

                form.reset();

                fileInput.closest('label').querySelector('span').textContent = 'Прикрепить файл';
            }
        });
    }
    validateForms('.application-form', { name: {required: true, minLength: 2, maxLength: 30}, company: {required: true, minLength: 2, maxLength: 40}, message: {required: true, minLength: 5, maxLength: 300}, email: {required: true, email: true, minLength: 6, maxLength: 50}, tel: {required: true, function: () => {
                // selector.map((el) => {
                //   const phone = el.inputmask.unmaskedvalue();
                //   console.log(el);
                //   console.log(phone.length);
                //   console.log(Number (phone));
                //   return Number (phone) && phone.length === 10
                // })
                for (let value of selector) {
                    // console.log(selector);
                    const phone = value.inputmask.unmaskedvalue();
                    // console.log(value);
                    // console.log(phone.length);
                    // console.log(Number (phone));
                    return Number (phone) && phone.length === 10
                }
                // const phone = selector.inputmask.unmaskedvalue()
                //   console.log(selector);
                //   console.log(phone);
                //   console.log(phone.length);
                //   console.log(Number (phone));

                //   return Number (phone) && phone.length === 10

            }} });

    // карта
    try {
        ymaps.ready(init);
    } catch (e) {
     console.error(e);
    }
    function init() {
        const myMap = new ymaps.Map("map", {
            center: [50.619549, 36.630674],
            zoom: 13
        });

        const myPlacemark = new ymaps.Placemark([50.619549, 36.630674], {}, {
            iconColor: '#e67008',
        });
        myMap.geoObjects.add(myPlacemark);
        myMap.controls.remove('geolocationControl');
        myMap.controls.remove('searchControl');
        myMap.controls.remove('trafficControl');
        myMap.controls.remove('typeSelector');
        myMap.controls.remove('fullscreenControl');
        // myMap.controls.remove('zoomControl');
        myMap.controls.remove('rulerControl');
        myMap.behaviors.disable(['scrollZoom']);
    };
});
