function slider() {
  // SLIDER

  const
    slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer_slider__inner'),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  function dotsOpacity(index) {
    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[index - 1].style.opacity = 1;
  }

  function currentSlideIndex(index) {
    if (slides.length < 10) {
      current.textContent = `0${index}`;
    } else {
      current.textContent = index;
    }
  }
  function slideOffset(params) {
    slidesField.style.transform = `translateX(-${params}px)`;
  }

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }

  currentSlideIndex(slideIndex);

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const
    indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');

  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i === 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotNumbers(str) {
    return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
    if (offset === deleteNotNumbers(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotNumbers(width);
    }

    slideOffset(offset);

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    currentSlideIndex(slideIndex);
    dotsOpacity(slideIndex);
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotNumbers(width) * (slides.length - 1);
    } else {
      offset -= deleteNotNumbers(width);
    }

    slideOffset(offset);

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    currentSlideIndex(slideIndex);
    dotsOpacity(slideIndex);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotNumbers(width) * (slideTo - 1);


      slideOffset(offset);
      currentSlideIndex(slideIndex);
      dotsOpacity(slideIndex);
    })
  });
}

module.exports = slider;