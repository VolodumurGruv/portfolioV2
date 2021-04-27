// Get the modal
const modal = document.querySelector(".modal-alert");

// Get the <span> element that closes the modal
const span = document.querySelector(".close-alert");

// When the user clicks on <span> (x), close the modal
if (span) {
  span.onclick = function () {
    modal.style.display = "none";
    location.href = "/";
  };
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    location.href = "/";
    setTimeout(() => location.reload(), 300);
  }
};
