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
const classifiedForm = document.getElementById("classifiedForm");

const eventSubmitBtn = document.getElementById("eventSubmitBtn");
const eventCancelBtn = document.getElementById("eventCancelBtn");
const classifiedSubmitBtn = document.getElementById("classifiedSubmitBtn");
const classifiedCancelBtn = document.getElementById("classifiedCancelBtn");

const adminLoginModal = document.getElementById("adminLoginModal");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminPasswordInput = document.getElementById("adminPassword");
const adminLoginError = document.getElementById("adminLoginError");
const adminLoginClose = document.getElementById("adminLoginClose");

const ADMIN_PASSWORD = "flotilha2024";

let isAdmin = false;
let editingEventIndex = null;
let editingClassifiedIndex = null;

function openAdminModal() {
  adminLoginModal.classList.remove("hidden");
  adminLoginError.classList.add("hidden");
  adminPasswordInput.value = "";
  adminPasswordInput.focus();
}

function closeAdminModal() {
  adminLoginModal.classList.add("hidden");
  adminPasswordInput.value = "";
}

function resetEventForm() {
  adminForm.reset();
  editingEventIndex = null;
  eventSubmitBtn.textContent = "Salvar evento";
  eventCancelBtn.classList.add("hidden");
}

function resetClassifiedForm() {
  classifiedForm.reset();
  editingClassifiedIndex = null;
  classifiedSubmitBtn.textContent = "Salvar anúncio";
  classifiedCancelBtn.classList.add("hidden");
}

function updateAdminUI() {
  if (isAdmin) {
    adminForm.classList.remove("hidden");
    classifiedForm.classList.remove("hidden");
    adminButton.classList.remove("btn--outline");
    adminButton.classList.add("btn--primary");
    adminButton.textContent = "Sair da área do administrador";
  } else {
    adminForm.classList.add("hidden");
    classifiedForm.classList.add("hidden");
    adminButton.classList.add("btn--outline");
    adminButton.classList.remove("btn--primary");
    adminButton.textContent = "Área do administrador";
    resetEventForm();
    resetClassifiedForm();
  }

  renderEvents();
  renderClassifieds();
}

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
    .map((event, index) => ({ ...event, index }))
    .filter(
      (event) =>
        (typeValue === "all" || event.type === typeValue) &&
        (levelValue === "all" || event.level === levelValue)
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

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
    const item = clone.querySelector(".calendar__item");
    item.dataset.index = event.index;

    clone.querySelector(".calendar__date").textContent = formatDate(event.date);
    clone.querySelector(".calendar__title").textContent = event.title;
    clone.querySelector(".calendar__description").textContent = event.description;

    const typeBadge = clone.querySelector(".badge--type");
    const levelBadge = clone.querySelector(".badge--level");
    const actions = clone.querySelector(".admin-actions");

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

    if (isAdmin) {
      actions.classList.remove("hidden");
    } else {
      actions.classList.add("hidden");
    }

    eventList.appendChild(clone);
  });
}

function renderClassifieds() {
  const searchTerm = classifiedSearch.value.toLowerCase().trim();
  const activeCondition = conditionButtons.find((btn) =>
    btn.classList.contains("active")
  ).dataset.condition;

  classifiedList.innerHTML = "";

  const filtered = classifiedData
    .map((item, index) => ({ ...item, index }))
    .filter((item) => {
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
    const card = clone.querySelector(".classified");
    card.dataset.index = item.index;

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

    const actions = clone.querySelector(".admin-actions");
    if (isAdmin) {
      actions.classList.remove("hidden");
    } else {
      actions.classList.add("hidden");
    }

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
  if (isAdmin) {
    isAdmin = false;
    updateAdminUI();
  } else {
    openAdminModal();
  }
});

adminLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (adminPasswordInput.value === ADMIN_PASSWORD) {
    isAdmin = true;
    closeAdminModal();
    updateAdminUI();
  } else {
    adminLoginError.classList.remove("hidden");
    adminPasswordInput.focus();
  }
});

adminLoginClose.addEventListener("click", closeAdminModal);

adminLoginModal.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal__overlay")) {
    closeAdminModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !adminLoginModal.classList.contains("hidden")) {
    closeAdminModal();
  }
});

adminForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isAdmin) {
    return;
  }

  const title = document.getElementById("eventTitle").value.trim();
  const date = document.getElementById("eventDate").value;
  const type = document.getElementById("eventType").value;
  const level = document.getElementById("eventLevel").value;
  const description = document.getElementById("eventDescription").value.trim();

  if (!adminForm.reportValidity()) {
    return;
  }

  const payload = { title, date, type, level, description };

  if (editingEventIndex !== null) {
    eventData[editingEventIndex] = payload;
  } else {
    eventData.push(payload);
  }

  resetEventForm();
  renderEvents();
});

eventCancelBtn.addEventListener("click", () => {
  resetEventForm();
});

eventList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || !isAdmin) {
    return;
  }

  const listItem = button.closest(".calendar__item");
  const index = Number(listItem?.dataset.index);

  if (Number.isNaN(index)) {
    return;
  }

  if (button.dataset.action === "edit") {
    const eventToEdit = eventData[index];
    document.getElementById("eventTitle").value = eventToEdit.title;
    document.getElementById("eventDate").value = eventToEdit.date;
    document.getElementById("eventType").value = eventToEdit.type;
    document.getElementById("eventLevel").value = eventToEdit.level;
    document.getElementById("eventDescription").value = eventToEdit.description;
    editingEventIndex = index;
    eventSubmitBtn.textContent = "Atualizar evento";
    eventCancelBtn.classList.remove("hidden");
    adminForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (button.dataset.action === "delete") {
    const confirmation = window.confirm(
      "Tem certeza de que deseja excluir este evento?"
    );
    if (!confirmation) {
      return;
    }

    eventData.splice(index, 1);
    if (editingEventIndex === index) {
      resetEventForm();
    } else if (editingEventIndex !== null && editingEventIndex > index) {
      editingEventIndex -= 1;
    }
    renderEvents();
  }
});

classifiedForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isAdmin) {
    return;
  }

  const title = document.getElementById("classifiedTitle").value.trim();
  const seller = document.getElementById("classifiedSeller").value.trim();
  const price = document.getElementById("classifiedPrice").value.trim();
  const condition = document.getElementById("classifiedCondition").value;
  const description = document
    .getElementById("classifiedDescription")
    .value.trim();

  if (!classifiedForm.reportValidity()) {
    return;
  }

  const payload = { title, seller, price, condition, description };

  if (editingClassifiedIndex !== null) {
    classifiedData[editingClassifiedIndex] = payload;
  } else {
    classifiedData.push(payload);
  }

  resetClassifiedForm();
  renderClassifieds();
});

classifiedCancelBtn.addEventListener("click", () => {
  resetClassifiedForm();
});

classifiedList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || !isAdmin) {
    return;
  }

  const card = button.closest(".classified");
  const index = Number(card?.dataset.index);

  if (Number.isNaN(index)) {
    return;
  }

  if (button.dataset.action === "edit") {
    const item = classifiedData[index];
    document.getElementById("classifiedTitle").value = item.title;
    document.getElementById("classifiedSeller").value = item.seller;
    document.getElementById("classifiedPrice").value = item.price;
    document.getElementById("classifiedCondition").value = item.condition;
    document.getElementById("classifiedDescription").value = item.description;
    editingClassifiedIndex = index;
    classifiedSubmitBtn.textContent = "Atualizar anúncio";
    classifiedCancelBtn.classList.remove("hidden");
    classifiedForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (button.dataset.action === "delete") {
    const confirmation = window.confirm(
      "Tem certeza de que deseja excluir este anúncio?"
    );
    if (!confirmation) {
      return;
    }

    classifiedData.splice(index, 1);
    if (editingClassifiedIndex === index) {
      resetClassifiedForm();
    } else if (editingClassifiedIndex !== null && editingClassifiedIndex > index) {
      editingClassifiedIndex -= 1;
    }
    renderClassifieds();
  }
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

updateAdminUI();
