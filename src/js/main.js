import '../../node_modules/focus-visible/dist/focus-visible';
import '../../node_modules/just-validate/dist/js/just-validate';
import Inputmask from "inputmask";
import '../scss/main.scss';
import '../index.html';
// import $ from 'jquery';

// document.addEventListener('DOMContentLoaded', function () {

//   let screen = 0;
//   // console.log(screen);
//   let inscroll = false;
//   const container = $('.maincontainer');
//   const pages = $('.page');
//   // console.log(pages);
//   $('.page:first-child').addClass('active');

// $('body').on('mousewheel', (event) => {
//   console.log(event.deltaY);
//   const activePage = $('.page').filter('.active');

//   if (!inscroll) {
//     inscroll = true;
//   if (event.deltaY > 0) {
//      if (activePage.prev().length) {
//       screen--;
//      }
//   }
//   else {
//     if (activePage.next().length) {
//       screen++;
//      }
//   }
// }
//   let position = (-screen * 100) + '%';
//   pages.eq(screen).addClass('active').siblings().removeClass('active');
//   container.css('top', position);

//   setTimeout(() => {
//     inscroll = false;
//   }, 1300)
// })
// })

(function() {
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

  // Scrolling sections by mouse/touchpad.
  window.addEventListener('wheel', event => {
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

  });

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

})();

let selector = document.querySelectorAll('input[type="tel"]');
selector = Array.from(selector);
// console.log(selector);
// let selector = document.querySelector('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(selector);


// let selector2 = document.querySelector('input[type="tel"]');

// selector2.addEventListener('input', function(){
// 	console.log(selector2.value)


// 	const re = /^\d*(\.\d+)?$/

// 	console.log(selector2.value.match(/[0-9]/g).length)


// 	console.log(selector2.value.replace(/[0-9]/g, "0"));

// });



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



let validateForms = function(selector, rules, successModal, yaGoal) {
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
						console.log('Отправлено');
					}
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

}} }, '.thanks-popup', 'send goal');
