import { isWebp, initSmoothScroll } from './modules/service.js';
import { Fancybox } from '@fancyapps/ui';
import { mask } from './libs/phoneMask/mask.js';

isWebp();
initSmoothScroll({});
Fancybox.bind();

const body = document.querySelector('body');
const header = document.querySelector('.header');
const navButton = header.querySelector('.header__nav-button');
const headerLinks = header.querySelectorAll('.header__link');
const documentTabElements = [
  ...document.querySelectorAll('a, input, button'),
].filter((elem) => !elem.closest('header'));

navButton.addEventListener('click', () => {
  body.classList.toggle('no-scroll');
  header.classList.toggle('header--active');
  if (header.classList.contains('header--active')) {
    documentTabElements.forEach((elem) => elem.setAttribute('tabindex', '-1'));
  } else {
    documentTabElements.forEach((elem) => elem.setAttribute('tabindex', '0'));
  }
});

headerLinks.forEach((linkElem) => {
  linkElem.addEventListener('click', () => {
    body.classList.remove('no-scroll');
    header.classList.remove('header--active');
  });
});

mask('[data-phone-mask]');
// Remove alone '+'
const phoneInputs = document.querySelectorAll('[data-phone-mask]');
phoneInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.value == '+') input.value = '';
  });
  input.addEventListener('focus', () => {
    if (input.value == '+') input.value = '';
  });
  input.addEventListener('blur', () => {
    if (input.value == '+') input.value = '';
  });
});

// Yandex Map
const mapContainerClassName = 'section-map__map';
const mapContainer = document.querySelector(`.${mapContainerClassName}`);

function loadScript(url, callback) {
  const script = document.createElement('script');
  script.onload = () => callback();
  script.src = url;
  document.head.appendChild(script);
}

// ymaps.ready(init);
function init() {
  var map = new ymaps.Map('map', {
    center: [59.943543, 30.338928],
    zoom: 16,
  });

  var placemark = new ymaps.Placemark(
    [59.943543, 30.338928],
    {
      balloonContent: `
        <div class="balloon">
          <div class="balloon__address">Наб. реки Фонтанки 10-15</div>
          <div class="balloon__contacts">
            <a href="tel:+78121234567">+8 (812) 123-45-67</a>
          </div>
        </div>
      `,
    },
    {
      iconLayout: 'default#image',
      iconImageHref: './img/icons.svg#location-pin',
      iconImageSize: [40, 40],
      iconImageOffset: [-20, -40],
    },
  );

  map.controls.remove('geolocationControl');
  map.controls.remove('searchControl');
  map.controls.remove('trafficControl');
  map.controls.remove('typeSelector');
  map.controls.remove('rulerControl');
  map.behaviors.disable(['scrollZoom']);

  map.geoObjects.add(placemark);
  placemark.balloon.open();

  mapContainer.classList.remove(`${mapContainerClassName}--active`);
}

mapContainer.addEventListener(
  'pointerenter',
  () => {
    mapContainer.classList.add(`${mapContainerClassName}--active`);
    loadScript(
      'https://api-maps.yandex.ru/2.1/?apikey=5a924eb6-d4d4-43b2-a7c6-8e4e556d320e&lang=ru_RU',
      () => ymaps.ready(init),
    );
  },
  { once: true },
);
