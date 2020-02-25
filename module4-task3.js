'use strict';

var quantityOfObjects = 8;
// var PIN_HEIGHT = 70; // высота метки
var PIN_WIDTH = 50; // ширина метки
var MAP_WIDTH = 1200; // ширина блока .map__overlay
var MAIN_PIN_WIDTH = 65; // равна высоте в неактивном состоянии
var MAIN_PIN_HEIGHT = 65;
var ACTIVE_MAIN_PIN_HEIGHT = 84;
var HOUSE_TYPE = {
  palace: 'Дворец',
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};
var TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var userPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

// массивы
var adTitles = [
  'Милая, уютная квартирка в центре Токио',
  'Квартира в жилом комплексе бизнес-класса',
  'Срочно сдается 2-комнатная квартира',
  'Апартамент с готовым премиум-ремонтом в современном стиле!',
  'Квартира с террасой',
  'Сдается теплая, солнечная квартира',
  'Квартира сдается с мебелью и техникой!',
  'Сдаю студию 12,5 кв. м.'
];

var housingAddresses = [
  '600, 350',
  '540, 210',
  '119, 590',
  '26, 496',
  '232, 100',
  '503, 40',
  '360, 360',
  '540, 165'
];

var housingTypes = [
  'palace', 'flat', 'house', 'bungalo'
];

var arrivalTimes = [
  '12:00', '13:00', '14:00'
];

var proposedFeatures = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
];

var adDescriptions = [
  'На длительный срок сдается роскошная двухкомнатна квартира с дизайнерским ремонтом',
  'Только что построенная и отделанная квартира',
  'В аренду на длительный срок предлагается двухкомнатная квартира',
  'В зеленом районе столицы предлагается современная квартира',
  'Светлая и просторная трехкомнатная квартира с отделкой в современном стиле',
  'В аренду предлагается великолепная светлая 3-х комнатная квартира со свежим ремонтом.',
  'Великолепная трехкомнатная квартира по индивидуальному дизайн-проекту',
  'Предлагаем светлую, просторную, современную студию в одном из лучших и стильных районов столицы'
];

var adPhotoAddresses = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getRandomBetween = function (max, min) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomLengthArr = function (array) {
  var newArr = [];
  var newLength = getRandomBetween(array.length, 0);
  for (var i = 0; i < newLength; i++) {
    newArr[i] = array[i];
  }
  return newArr;
};

var createSimilarAds = function (titles, addresses, types, descriptions, photoAddresses) {
  var similarAds = [];
  for (var i = 0; i < quantityOfObjects; i++) {
    var checkinTime = arrivalTimes[getRandomBetween(2, 0)];
    var checkoutTime = arrivalTimes[getRandomBetween(2, 0)];
    similarAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },

      offer: {
        title: titles[i],
        address: addresses[i],
        price: Math.round(getRandomBetween(10000, 0) / 100) * 100, // выглядит реальнее
        type: types[getRandomBetween(types.length - 1, 0)],
        rooms: getRandomBetween(3, 1),
        guests: getRandomBetween(3, 1),
        checkin: checkinTime,
        checkout: checkoutTime,
        features: getRandomLengthArr(proposedFeatures),
        description: descriptions[i],
        photos: getRandomLengthArr(photoAddresses)
      },

      location: {
        x: getRandomBetween(0, MAP_WIDTH),
        y: getRandomBetween(630, 130),
      }
    };
  }
  return similarAds;
};

// записываем сгенерированные данные в переменную mock
var mock = createSimilarAds(adTitles, housingAddresses, housingTypes,
    adDescriptions, adPhotoAddresses);

var renderAds = function (adsArray) {
  var adElement = userPinTemplate.cloneNode(true);
  var adElementImg = adElement.querySelector('img');

  adElement.style.left = adsArray.location.x - PIN_WIDTH / 2 + 'px';
  adElement.style.top = adsArray.location.y + 'px';
  adElementImg.src = adsArray.author.avatar;
  adElementImg.alt = 'Заголовок объявления';

  // =================== //
  console.log(adElement);

  var onMapPinClick = function () {
    alert('address!\n' + adsArray.offer.address);
    insertCard(adsArray);
  };
  adElement.addEventListener('click', onMapPinClick);

  return adElement;
};

var addElement = function (elementsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elementsArray.length; i++) {
    fragment.appendChild(renderAds(elementsArray[i]));
  }
  return fragment;
};

var insertElements = function () {
  mapPins.appendChild(addElement(mock));

  // // вызов карточки по клику на метке
  // var mapPin = mapPins.querySelectorAll('.map__pin');
  // var onMapPinClick = function () {
  //   insertCard();
  // };

  // mapPin[1].addEventListener('click', onMapPinClick);
};

// 9. Личный проект: доверяй, но проверяй (часть 1)
// Активация страницы

var adMap = document.querySelector('.map');
var notice = document.querySelector('.notice');

var adForm = notice.querySelector('.ad-form');

var disabledFormElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters input');

var disableElements = function () {
  for (var i = 0; i < disabledFormElements.length; i++) {
    disabledFormElements[i].setAttribute('disabled', '');
  }
};

var anableElements = function () {
  for (var i = 0; i < disabledFormElements.length; i++) {
    disabledFormElements[i].removeAttribute('disabled', '');
  }
};

disableElements(); // по дефолту запущена, переопределяется при активации

// функция активации страницы
var activate = function () {
  insertElements();

  adForm.classList.remove('ad-form--disabled');
  adMap.classList.remove('map--faded');

  anableElements();

  mainPinY = parseInt((mainPinButton.style.top), 10) + ACTIVE_MAIN_PIN_HEIGHT;
  address.setAttribute('value', mainPinX + ', ' + mainPinY);
};

var mainPin = mapPins.querySelector('.map__pin--main');

var notActivatedYet = true;
mainPin.addEventListener('mousedown', function (evt) {
  if (notActivatedYet === false) {
    return;
  }
  if (evt.button === 0) {
    activate();
    notActivatedYet = false;
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (notActivatedYet === false) {
    return;
  }
  if (evt.key === 'Enter') {
    activate();
    notActivatedYet = false;
  }
});

// Заполнение поля адреса

var address = notice.querySelector('#address');

var mainPinButton = mapPins.querySelector('.map__pin--main');
var mainPinX = parseInt((mainPinButton.style.left), 10) + Math.round(MAIN_PIN_WIDTH / 2);
var mainPinY = parseInt((mainPinButton.style.top), 10) + Math.round(MAIN_PIN_HEIGHT / 2);

address.setAttribute('value', mainPinX + ', ' + mainPinY);

// Непростая валидация

// обработчик события 'change' на форме
var onAdFormChange = function () {
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  // количество комнат -- количество гостей
  roomNumber.setCustomValidity('');
  if ((roomNumber.value === '100') && (capacity.value !== '0')) {
    roomNumber.setCustomValidity('100 комнат не для гостей');
  } else if (roomNumber.value < capacity.value) {
    roomNumber.setCustomValidity('Количество мест не должно превышать количество комнат');
  } else if (roomNumber.value !== '100' && capacity.value === '0') {
    roomNumber.setCustomValidity('Укажите количество мест');
  }
};

// запуск валидации по событию 'change' на форме
adForm.addEventListener('change', onAdFormChange);

// 7. Личный проект: больше деталей (часть 2)

var renderCard = function (mockData) {
  var userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // записываем массив с данными для первого предложения в переменную
  // var firstAd = mockData;

  // записываем клонированный шаблон в переменную
  var popupCard = userCardTemplate.cloneNode(true);

  // создаем переменные для элементов карточки popupCard
  var popupTitle = popupCard.querySelector('.popup__title');
  var popupAddress = popupCard.querySelector('.popup__text--address');
  var popupPrice = popupCard.querySelector('.popup__text--price');
  var popupType = popupCard.querySelector('.popup__type');
  var popupTextCapacity = popupCard.querySelector('.popup__text--capacity');
  var popupTextTime = popupCard.querySelector('.popup__text--time');
  var popupFeatures = popupCard.querySelector('.popup__features');
  var popupDescriptions = popupCard.querySelector('.popup__description');
  var popupPhotos = popupCard.querySelector('.popup__photos');
  var popupAvatar = popupCard.querySelector('.popup__avatar');

  // в каждый элемент карточки записываем данные из сгенерированного массива
  popupTitle.textContent = mockData.offer.title;
  popupAddress.textContent = mockData.offer.address;
  popupPrice.textContent = mockData.offer.price + '₽/ночь'; // ???

  // функция выбора окончаний
  var plural = function (n, forms) {
    var id;
    if (n % 10 === 1 && n % 100 !== 11) {
      id = 0;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      id = 1;
    } else {
      id = 2;
    }
    return forms[id] || '';
  };

  var room = plural(mockData.offer.rooms, [' комната', ' комнаты', ' комнат']);
  var guest = plural(mockData.offer.guests, [' гостя', ' гостей', ' гостей']);

  popupTextCapacity.textContent = mockData.offer.rooms + room + ' для ' +
  mockData.offer.guests + guest;

  popupType.textContent = HOUSE_TYPE[mockData.offer.type];

  popupTextTime.textContent = 'Заезд после ' + mockData.offer.checkin +
  ', выезд до ' + mockData.offer.checkout;

  // вывод доступных удобств

  while (popupFeatures.firstChild) {
    popupFeatures.removeChild(popupFeatures.firstChild);
  }
  for (var i = 0; i < mockData.offer.features.length; i++) {
    var item = document.createElement('li');
    item.setAttribute('class', 'popup__feature popup__feature--' + TYPES[i]);
    popupFeatures.appendChild(item);
  }

  popupDescriptions.textContent = mockData.offer.description;
  popupAvatar.setAttribute('src', mockData.author.avatar);

  // добавление фотографий в блок popupPhotos
  var img = popupPhotos.querySelector('.popup__photo');
  popupPhotos.removeChild(img);
  var insertedImg;
  for (var num = 0; num < mockData.offer.photos.length; num++) {
    insertedImg = img.cloneNode(true);
    insertedImg.setAttribute('src', mockData.offer.photos[num]);
    popupPhotos.appendChild(insertedImg);
  }

  return popupCard;
};

// функция вставки карточки в DOM
var insertCard = function (data) {
  var mapfiltersContainer = adMap.querySelector('.map__filters-container');
  adMap.insertBefore(renderCard(data), mapfiltersContainer);
};

// ============== отладка ============== //
// вставляем карточку
// insertCard();

// console.log(mapPins);

// путь для подключения: <script src="../Intensive_JS-1/module4-task3.js"></script>
