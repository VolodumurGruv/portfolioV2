// When the user clicks on <div>, open the popup

const popup = document.getElementById("myPopup");
const btnClose = document.querySelector(".btn-close");
const popupShow = document.querySelector(".btn-popup");

if (popupShow) {
  popupShow.addEventListener("click", function myRemove() {
    if (!popup.classList.contains("show")) {
      popup.classList.add("show");
    }
  });
}

if (popup) {
  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (popup.classList.contains("show")) popup.classList.remove("show");
  });
}

const btnMsg = document.querySelector(".btn-close-popupmsg");
const popupMsg = document.querySelector(".popup-msg");

if (btnMsg) {
  btnMsg.addEventListener("click", (e) => {
    popupMsg.style.display = "none";
  });
}
