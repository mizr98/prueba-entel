const buttons = document.querySelectorAll("#box");
const close = document.getElementsByClassName("close")[0];
const modal = document.querySelector("#miModal");
const listaPreguntas = document.querySelector("#lista-preguntas");

/*
  Funciones
*/

cargarEventListeners();

function cargarEventListeners() {
  listaPreguntas.addEventListener("click", mostrar);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", abrirModal);
  }
  close.addEventListener("click", closeModal);
}

/**
 * Modal
 */
function abrirModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

/**
 * Preguntas frecuentes
 */

function mostrar(e) {
  e.preventDefault();

  if (e.target.classList.contains("card-link")) {
    const tarjetaSeleccionada = e.target.parentElement;

    leerDatosTarjeta(tarjetaSeleccionada);
  }
}

function leerDatosTarjeta(tarjeta) {
  const divDesplegable = tarjeta.querySelector("div");

  cambiarIcono(tarjeta);

  if (divDesplegable.classList.contains("hidden")) {
    divDesplegable.classList.add("show");
    divDesplegable.classList.remove("hidden");
  } else {
    divDesplegable.classList.add("hidden");
    divDesplegable.classList.remove("show");
  }
}

function cambiarIcono(button) {
  const boton = button.querySelector("button");

  if (boton.classList.contains("open")) {
    boton.classList.remove("open");
  } else {
    boton.classList.add("open");
  }
}

/**
 *
 * Slider
 */

let slidePosition = 0;
const sliderList = document.querySelector(".slider-list");
const sliderItems = document.querySelectorAll(".slider-item");

let totalSlides = sliderItems.length;

let jump = 1;
let step = 100 / totalSlides;
let activeIndicator = 0;

let direction = -1;

const mediaQueryList = [
  window.matchMedia("(max-width: 768px)"),
  window.matchMedia("(max-width: 991px)"),
];

console.log(totalSlides);

loadIndicators();

// document.getElementById('slider-arrow-next').addEventListener('click', function () {
//   moveToNextSlide();
// });

// document.getElementById('slider-arrow-prev').addEventListener('click', function () {
//   moveToPrevSlide();
// });

document.querySelectorAll(".slider-indicators span").forEach((item) => {
  item.addEventListener("click", (e) => {
    let slideTo = parseInt(e.target.dataset.slideTo);

    let indicators = document.querySelectorAll(".slider-indicators span");

    indicators.forEach((item, index) => {
      if (item.classList.contains("active")) {
        activeIndicator = index;
      }
    });

    if (slideTo - activeIndicator > 1) {
      jump = slideTo - activeIndicator;
      step = jump * step;
      moveToNextSlide();
    } else if (slideTo - activeIndicator === 1) {
      moveToNextSlide();
    } else if (slideTo - activeIndicator < 0) {
      if (Math.abs(slideTo - activeIndicator) > 1) {
        jump = Math.abs(slideTo - activeIndicator);
        step = jump * step;
        moveToPrevSlide();
      }
      moveToPrevSlide();
    }
    step = 100 / totalSlides;
  });
});

const HandleScreen = () => {
  if (mediaQueryList[0].matches) {
    numberOfItems = 1;
    for (const slide of sliderItems) {
      slide.classList.remove("slider-item-visible");
      slide.classList.add("slider-item-hidden");
    }

    sliderItems[slidePosition].classList.add("slider-item-visible");
  } else if (mediaQueryList[1].matches) {
    for (const slide of sliderItems) {
      slide.classList.remove("slider-item-visible");
      slide.classList.add("slider-item-hidden");
    }

    sliderItems[slidePosition].classList.add("slider-item-visible");
  } else {
    numberOfItems = 3;
    if (sliderItems.length >= numberOfItems) {
      for (let i = 0; i < numberOfItems; i++) {
        sliderItems[i].classList.remove("slider-item-visible");
        sliderItems[i].classList.add("slider-item-visible");
      }
    } else {
      for (const slide of sliderItems) {
        slide.classList.remove("slider-item-visible");
        slide.classList.add("slider-item-hidden");
      }
    }

    // set width and height to item for when image does not load
  }
};

HandleScreen();
console.log(HandleScreen);
// Add listener to media query list items
for (let i = 0; i < mediaQueryList.length; i++) {
  mediaQueryList[i].addListener(HandleScreen);
}

function loadIndicators() {
  sliderItems.forEach((slide, index) => {
    if (index === 0) {
      document.querySelector(
        ".slider-indicators"
      ).innerHTML += `<span data-slide-to="${index}" class="active"></span>`;
    } else {
      document.querySelector(
        ".slider-indicators"
      ).innerHTML += `<span data-slide-to="${index}"></span>`;
    }
  });
}

function updateIndicators() {
  if (slidePosition > totalSlides - 1) {
    slidePosition = 0;
  } else if (slidePosition < 0) {
    slidePosition = totalSlides - 1;
  }
  document
    .querySelector(".slider-indicators span.active")
    .classList.remove("active");
  document
    .querySelectorAll(".slider-indicators span")
    [slidePosition].classList.add("active");
}

function updateSlidePosition() {
  for (const slide of sliderItems) {
    slide.classList.remove("slider-item-visible");
    slide.classList.add("slider-item-hidden");
  }

  sliderItems[slidePosition].classList.add("slider-item-visible");
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  HandleScreen();
  updateIndicators();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  HandleScreen();
  updateIndicators();
}
