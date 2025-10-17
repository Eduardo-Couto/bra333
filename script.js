const eventData = [
  {
    title: "Regata Estadual - Etapa 3",
    date: "2024-08-24",
    type: "regata",
    level: "avancado",
    description: "Percurso triangular com apoio de bote. Briefing às 09h na sede.",
  },
  {
    title: "Treino de foil pump",
    date: "2024-08-18",
    type: "treino",
    level: "intermediario",
    description: "Sessão guiada para otimizar velocidade de saída e transições.",
  },
  {
    title: "Clínica para iniciantes",
    date: "2024-08-11",
    type: "clinica",
    level: "iniciante",
    description: "Ajustes de footstrap, segurança no vento lateral e primeiros voos.",
  },
];

const classifiedData = [
  {
    title: "Wing Duotone Unit 2023 5m",
    seller: "Ana Prado",
    condition: "seminovo",
    price: "R$ 5.400",
    description:
      "Lona impecável, usado em 6 sessões. Inclui leash original e bolsa rígida.",
  },
  {
    title: "Foil Axis ART 899 completo",
    seller: "Lucas Ribeiro",
    condition: "usado",
    price: "R$ 9.200",
    description:
      "Mastro 86cm + fuselagem ultra curta. Ideal para regatas de upwind/downwind.",
  },
  {
    title: "Prancha custom 95L carbono",
    seller: "Marina Costa",
    condition: "novo",
    price: "R$ 11.800",
    description:
      "Shape assinado por shaper local. Deck em EVA memory foam, trilhos reforçados.",
  },
];

const eventList = document.getElementById("eventList");
const eventTemplate = document.getElementById("eventItemTemplate");
const filterType = document.getElementById("filterType");
const filterLevel = document.getElementById("filterLevel");

const classifiedList = document.getElementById("classifiedList");
const classifiedTemplate = document.getElementById("classifiedCardTemplate");
const classifiedSearch = document.getElementById("classifiedSearch");
const conditionButtons = Array.from(
  document.querySelectorAll(".pill-toggle__btn")
);

const adminButton = document.getElementById("toggleAdminBtn");
const adminForm = document.getElementById("eventForm");

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

function renderEvents() {
  const typeValue = filterType.value;
  const levelValue = filterLevel.value;

  eventList.innerHTML = "";

  const filtered = eventData
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter((event) =>
      (typeValue === "all" || event.type === typeValue) &&
      (levelValue === "all" || event.level === levelValue)
    );

  if (filtered.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "calendar__item";
    emptyItem.innerHTML =
      "<div><h3 class='calendar__title'>Nenhum evento encontrado</h3><p class='calendar__description'>Ajuste os filtros para visualizar novos compromissos.</p></div>";
    eventList.appendChild(emptyItem);
    return;
  }

  filtered.forEach((event) => {
    const clone = eventTemplate.content.cloneNode(true);
    clone.querySelector(".calendar__date").textContent = formatDate(event.date);
    clone.querySelector(".calendar__title").textContent = event.title;
    clone.querySelector(".calendar__description").textContent = event.description;

    const typeBadge = clone.querySelector(".badge--type");
    const levelBadge = clone.querySelector(".badge--level");

    const typeLabels = {
      regata: "Regata",
      treino: "Treino",
      clinica: "Clínica",
    };

    const levelLabels = {
      iniciante: "Iniciante",
      intermediario: "Intermediário",
      avancado: "Avançado",
    };

    typeBadge.textContent = typeLabels[event.type] || event.type;
    levelBadge.textContent = levelLabels[event.level] || event.level;

    eventList.appendChild(clone);
  });
}

function renderClassifieds() {
  const searchTerm = classifiedSearch.value.toLowerCase().trim();
  const activeCondition = conditionButtons.find((btn) =>
    btn.classList.contains("active")
  ).dataset.condition;

  classifiedList.innerHTML = "";

  const filtered = classifiedData.filter((item) => {
    const matchesCondition =
      activeCondition === "all" || item.condition === activeCondition;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm);
    return matchesCondition && matchesSearch;
  });

  if (filtered.length === 0) {
    const placeholder = document.createElement("div");
    placeholder.className = "card";
    placeholder.innerHTML =
      "<h3>Nenhum anúncio encontrado</h3><p class='text--muted'>Tente outros termos ou verifique com a flotilha sobre novas oportunidades.</p>";
    classifiedList.appendChild(placeholder);
    return;
  }

  filtered.forEach((item) => {
    const clone = classifiedTemplate.content.cloneNode(true);
    clone.querySelector(".classified__title").textContent = item.title;
    clone.querySelector(".classified__seller").textContent = `Anunciante: ${item.seller}`;
    clone.querySelector(".classified__description").textContent = item.description;
    clone.querySelector(".classified__price").textContent = item.price;

    const conditionBadge = clone.querySelector(".badge--condition");
    const conditionLabels = {
      novo: "Novo",
      seminovo: "Seminovo",
      usado: "Usado",
    };
    conditionBadge.textContent = conditionLabels[item.condition] || item.condition;

    classifiedList.appendChild(clone);
  });
}

filterType.addEventListener("change", renderEvents);
filterLevel.addEventListener("change", renderEvents);
classifiedSearch.addEventListener("input", renderClassifieds);

conditionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    conditionButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderClassifieds();
  });
});

adminButton.addEventListener("click", () => {
  adminForm.classList.toggle("hidden");
  adminButton.classList.toggle("btn--primary");
  adminButton.classList.toggle("btn--outline");
  adminButton.textContent = adminForm.classList.contains("hidden")
    ? "Área do administrador"
    : "Fechar área do administrador";
});

adminForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("eventTitle").value.trim();
  const date = document.getElementById("eventDate").value;
  const type = document.getElementById("eventType").value;
  const level = document.getElementById("eventLevel").value;
  const description = document.getElementById("eventDescription").value.trim();

  if (!title || !date || !type || !level || !description) {
    adminForm.reportValidity();
    return;
  }

  eventData.push({ title, date, type, level, description });
  adminForm.reset();
  renderEvents();

  adminButton.classList.add("btn--outline");
  adminButton.classList.remove("btn--primary");
});

// Realça seção ativa no menu lateral
const sidebarLinks = document.querySelectorAll(".sidebar__link");
const observerOptions = {
  root: null,
  rootMargin: "-40% 0px -50% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      sidebarLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(
        `.sidebar__link[href='#${entry.target.id}']`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}, observerOptions);

[...document.querySelectorAll("section.panel")].forEach((section) => {
  observer.observe(section);
});

renderEvents();
renderClassifieds();
