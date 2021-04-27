//windows size
let scrollHeight = window.innerHeight;
let scrollWidth = window.innerWidth;
const section = document.querySelectorAll("section");

function init() {
  scrollHeight = window.innerHeight;
  scrollWidth = window.innerWidth;

  section.forEach((elem) => {
    elem.style.height = `${Math.floor(scrollHeight) + 15}px`;
    elem.style.width = `${scrollWidth - 5}px`;
  });
}

window.addEventListener("resize", init);

init();

//autoscrolling page
const moveDown = document.querySelector(".scrolling-down");
const moveUp = document.querySelector(".scrolling-up");

moveDown.addEventListener(
  "click",
  // () => (document.documentElement.scrollTop += scrollHeight)
  () =>
    window.scrollTo({
      top: window.pageYOffset + scrollHeight,
      behavior: "smooth",
    })
);
moveUp.addEventListener(
  "click",

  () =>
    window.scrollTo({
      top: window.pageYOffset - scrollHeight,
      behavior: "smooth",
    })
);
