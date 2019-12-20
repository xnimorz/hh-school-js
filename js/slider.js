let active = document.querySelector(".js-slide.slider-content_active");

const showSlide = slideId => {
  const slide = document.querySelector(`.js-slide[data-slide-id="${slideId}"]`);

  if (slide.classList.contains("slider-content_active")) {
    return;
  }

  slide.classList.add("slider-content_show");
  active.classList.add("slider-content_hide");
  active.classList.remove("slider-content_active");
  const previous = active;
  active = slide;

  document
    .querySelector(`.js-slide-button[data-slide-id="${slideId}"]`)
    .classList.add("slider-content-block-dots__dot-container_choosen");

  document
    .querySelector(
      `.js-slide-button[data-slide-id="${previous.dataset.slideId}"]`
    )
    .classList.remove("slider-content-block-dots__dot-container_choosen");

  active.addEventListener(      
    "animationend",
    () => {
      active.classList.add("slider-content_active");
      active.classList.remove("slider-content_show");
      previous.classList.remove("slider-content_hide");
      active.parentNode.insertBefore(active, previous);
    },
    { once: true }
  );
};

document.querySelector(".js-slide-buttons").addEventListener("click", e => {
  const data = e.target.dataset;
  if (!data.slideId) {
    return;
  }
  showSlide(data.slideId);
});
