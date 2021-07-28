import '../../node_modules/focus-visible/dist/focus-visible';
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
