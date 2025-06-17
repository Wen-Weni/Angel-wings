async function loadHeroes() {
  const sheetID = "17bXqEsmhGgxUcu6xFw5FanlMiF6JU-KP_4X1w4nSIcs";
  const sheetName = "Лист1";
  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

  const res = await fetch(url);
  const text = await res.text();
  const json = JSON.parse(text.substr(47).slice(0, -2));
  const rows = json.table.rows;

  const container = document.getElementById("heroes");
  const searchInput = document.getElementById("searchInput");

  container.innerHTML = "";

  const heroCards = [];

  rows.forEach(row => {
    const name = row.c[1]?.v || "";                  // Ім’я
    const imgId = row.c[2]?.v || "";                 // Зображення
    const img = `hero/${imgId}`;

    let birthDate = row.c[3]?.v || "";               // Дата народження (D)
    if (row.c[3]?.f) birthDate = row.c[3].f;

    let deathDate = row.c[4]?.v || "";               // Дата загибелі (E)
    if (row.c[4]?.f) deathDate = row.c[4].f;

    const shortDesc = row.c[5]?.v || "";             // Короткий опис (F)
    const fullDesc = row.c[6]?.v || "";              // Повний опис (G)

    const params = new URLSearchParams({
      name: name,
      img: img,
      date: `${birthDate} – ${deathDate}`,
      fullDesc: fullDesc
    }).toString();

    const card = document.createElement("div");
    card.className = "hero-card";
    card.innerHTML = `
      <img src="${img}" alt="${name}">
      <h3>${name}</h3>
      <p><strong></strong> ${birthDate} – ${deathDate}</p>
      <p>${shortDesc}</p>
      <a href="hero.html?${params}" class="read-more-btn">Читати більше</a>
    `;

    container.appendChild(card);
    heroCards.push({ element: card, name: name.toLowerCase() });
  });

  // Живий пошук
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();
      heroCards.forEach(({ element, name }) => {
        const match = name.includes(query);
        element.style.display = match ? "block" : "none";
      });
    });
  }
}

loadHeroes();
