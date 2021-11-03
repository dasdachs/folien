/**
 * Slides
 * ------
 * ©️ Jani Šumak <jani.sumak@gmail.com>
 */

const HIDDEN_CLASS_NAME = "hidden";
const SLIDE_CLASS_NAME = "slide";

let currentSlideIndex = 0;

// init

function init() {
  const slides = document.getElementsByClassName(SLIDE_CLASS_NAME);

  for (let i = 0; i < slides.length; i++) {
    if (i == 0) {
      toggleSlide(slides[i], "show");
    } else {
      toggleSlide(slides[i], "hide");
    }
  }
}

document.addEventListener("keydown", (e) => {
  const numberOfSlides =
    document.getElementsByClassName(SLIDE_CLASS_NAME).length;

  switch (e.key) {
    case "ArrowLeft":
      if (currentSlideIndex > 0) {
        changeSlide(currentSlideIndex, --currentSlideIndex);
      }
      break;
    case "ArrowRight":
      if (currentSlideIndex < numberOfSlides - 1) {
        changeSlide(currentSlideIndex, ++currentSlideIndex);
      }
      break;
  }
});

/**
 *
 * @param {number} prePosition
 * @param {number} activePosition
 *
 * @returns void
 */
function changeSlide(prePosition, activePosition) {
  const slides = document.getElementsByClassName(SLIDE_CLASS_NAME);

  toggleSlide(slides[prePosition], "hide");
  toggleSlide(slides[activePosition], "show");
}

/**
 *
 * @param {Element} slide
 * @param {"hide"|"show"} action
 *
 * @returns void
 */
function toggleSlide(slide, action = "hide") {
  const contains = slide.classList.contains(HIDDEN_CLASS_NAME);

  if (action == "hide" && !contains) {
    slide.classList.add(HIDDEN_CLASS_NAME);
  } else if (action == "show" && contains) {
    slide.classList.remove(HIDDEN_CLASS_NAME);
  }
}

init();
