/// pobieram zmienne

const burgerBtn = document.querySelector('.header__button');
const headerNav = document.querySelector('.header__navigation');
const header = document.querySelector('.header');
const headerTopNav = document.querySelector('.header__top-nav');
const navElements = document.querySelectorAll('.header__element');
const sections = document.querySelectorAll('.title');
const companyName = document.querySelector('.header__company-name');
const offerImages = document.querySelectorAll('.offer__image');

///set menu depend on resolution

const setMenu = () => {
  if (window.innerWidth < 1000) {
    header.appendChild(headerNav);
  } else {
    headerTopNav.insertBefore(headerNav, headerTopNav.childNodes[2]);
  }
  burgerBtn.classList.remove('active');
  headerNav.classList.remove('active-menu');
};

window.addEventListener('load', setMenu);
window.addEventListener('resize', setMenu);

///activation and deacitvation of burger menu

const activeMenu = () => {
  burgerBtn.classList.toggle('active');
  headerNav.classList.toggle('active-menu');
};

window.addEventListener('click', (e) => {
  const [...list] = headerNav.classList;
  const [...burgerNodesList] = burgerBtn.childNodes;
  if (burgerNodesList.includes(e.target) || e.target === burgerBtn) {
    activeMenu();
  } else if (list.includes('active-menu') && e.target !== burgerBtn) {
    activeMenu();
  }
});

/// back to the top on click "company-name" in menu

companyName.addEventListener('click', () => {
  window.scrollTo(0, 0);
});

/// move to clicked section

moveToSection = function() {
  [...sections].filter((element) => {
    if (element.innerText === this.innerText) {
      const scroll = () => {
        window.scrollTo(0, element.offsetTop - headerTopNav.offsetHeight);
      };
      if (window.innerWidth < 1000) {
        activeMenu();
        setTimeout(scroll, 300);
      } else {
        scroll();
      }
    }
  });
};

navElements.forEach((element) => {
  element.addEventListener('click', moveToSection);
});

/// backlight actual section of menu

backlightSection = () => {
  const trueHeight = window.pageYOffset + headerTopNav.offsetHeight;

  navElements.forEach((section) => {
    section.classList.remove('active-section');
  });
  if (
    sections[0].offsetTop <= trueHeight &&
    sections[1].offsetTop > trueHeight
  ) {
    navElements[0].classList.add('active-section');
  } else if (
    sections[1].offsetTop <= trueHeight &&
    sections[2].offsetTop > trueHeight
  ) {
    navElements[1].classList.add('active-section');
  } else if (
    sections[2].offsetTop <= trueHeight &&
    sections[3].offsetTop > trueHeight
  ) {
    navElements[2].classList.add('active-section');
  } else if (sections[3].offsetTop <= trueHeight) {
    navElements[3].classList.add('active-section');
  }
};

window.addEventListener('scroll', backlightSection);

///animations on site
animate = (selector) => {
  const select = document.querySelector(selector);
  if (select.offsetTop < window.pageYOffset + window.outerHeight / 2) {
    select.classList.add('animated');
  }
};

///bannerName

animateBannerName = () => {
  setTimeout(() => animate('.banner__company-name'), 500);
};

window.addEventListener('load', animateBannerName);

///offerImage
offerImagesAnimate = () => {
  offerImages.forEach((image) => {
    if (image.offsetTop < window.pageYOffset + window.outerHeight / 3) {
      image.classList.add('animated');
    }
  });
};
///all animations
animations = () => {
  animate('.pricelist__list');
  animate('.aboutMe__info-container');
  offerImagesAnimate();
};

window.addEventListener('scroll', animations);
