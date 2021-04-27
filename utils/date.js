module.exports = () => {
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  if (day < 10) day = `0${day}`;
  if (month < 10) month = `0${month}`;
  year = year.toString().slice(2);
  return `${day}.${month}.${year}`;
};
