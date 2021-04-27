const userName = document.querySelector(".popup-inpt");
const message = document.querySelector(".message");
const mail = document.querySelector("#email");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  checkMsg(userName, event);
  checkMsg(message, event);
  checkMail(event);
});

function checkMsg(elem, event) {
  if (elem.value.length >= 3) {
    elem.classList.add("success");
    elem.classList.remove("error");
  } else {
    event.preventDefault();
    elem.classList.add("error");
    elem.classList.remove("success");
  }
}

function checkMail(event) {
  let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (reg.test(mail.value) !== false) {
    mail.classList.add("success");
    mail.classList.remove("error");
  } else {
    event.preventDefault();
    mail.classList.add("error");
    mail.classList.remove("success");
  }
}
