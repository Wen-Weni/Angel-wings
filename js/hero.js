const hero = JSON.parse(localStorage.getItem("selectedHero"));
  
const nameElem = document.getElementById("heroName");
const imgElem = document.getElementById("heroImg");
const dateElem = document.getElementById("heroDate");
const descElem = document.getElementById("heroFullDesc");

if (hero) {
  const name = hero.name || "Ім'я відсутнє";

  nameElem.textContent = name;
  document.title = name;

  if (hero.img) {
    imgElem.src = hero.img;
    imgElem.alt = name;
  } else {
    imgElem.style.display = "none";
  }

  dateElem.textContent = hero.date || "Дата відсутня";
  descElem.innerHTML = (hero.fullDesc || "Опис відсутній")
    .split(/\n+/)
    .map(line => `<p>${line.trim()}</p>`)
    .join("");
} else {
  nameElem.textContent = "Помилка: Дані не знайдено";
  document.title = "Деталі Героя";
}
