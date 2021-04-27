const images = document.querySelectorAll(".slider .slider-line .slider-img");
const sliderLine = document.querySelector(".slider-line");
const slider = document.querySelector(".slider");
let count = 0;
let width;

function init() {
  // get a width
  width = slider.offsetWidth;
  sliderLine.style.width = width * images.length + "px";
  images.forEach((item) => {
    item.style.width = width + "px";
    item.style.height = "auto";
  });
  rollSlider();
}

window.addEventListener("resize", init);

init();

document.querySelector(".slider-next").addEventListener("click", (event) => {
  count++;
  if (count >= images.length) count = 0;
  rollSlider();
});

document.querySelector(".slider-prev").addEventListener("click", () => {
  count--;
  if (count < 0) {
    count = images.length - 1;
  }
  rollSlider();
});

function rollSlider() {
  sliderLine.style.transform = "translate(-" + count * width + "px)";
}

setInterval(() => {
  count++;
  if (count >= images.length) count = 0;
  rollSlider();
}, 8000);
