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
    photos: [
      "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1528155124525-03a952c17e79?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516357231954-91487b459602?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    title: "Foil Axis ART 899 completo",
    seller: "Lucas Ribeiro",
    condition: "usado",
    price: "R$ 9.200",
    description:
      "Mastro 86cm + fuselagem ultra curta. Ideal para regatas de upwind/downwind.",
    photos: [
      "https://images.unsplash.com/photo-1528747045269-390fe33c19d4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1530885167139-40c78f746b0c?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    title: "Prancha custom 95L carbono",
    seller: "Marina Costa",
    condition: "novo",
    price: "R$ 11.800",
    description:
      "Shape assinado por shaper local. Deck em EVA memory foam, trilhos reforçados.",
    photos: [
      "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513352592664-3ad1a0f2ab95?auto=format&fit=crop&w=900&q=80",
    ],
  },
];

const albumData = [
  {
    id: 1,
    title: "Regata Estadual - Praia Vermelha",
    date: "2024-07-06",
    description:
      "Dia clássico de sudoeste constante. Largadas cronometradas e chegada diante do Pão de Açúcar.",
    photos: [
      "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1510662145379-0a3f4e49f06e?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1496865531661-4f2279f0e7c7?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1506795213374-5f18b0d437ef?auto=format&fit=crop&w=1100&q=80",
    ],
  },
  {
    id: 2,
    title: "Treino tático pré-regata",
    date: "2024-06-22",
    description:
      "Marcamos posições de marcação e simulamos situações de boia com troca de role entre os atletas.",
    photos: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1431440869543-efaf3388c585?auto=format&fit=crop&w=1100&q=80",
    ],
  },
];

let albumIdCounter = albumData.length;

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
const classifiedPhotoInput = document.getElementById("classifiedPhotos");
const classifiedPhotoPreview = document.getElementById("classifiedPhotoPreview");

const adminButton = document.getElementById("toggleAdminBtn");
const adminForm = document.getElementById("eventForm");
const classifiedForm = document.getElementById("classifiedForm");
const albumForm = document.getElementById("albumForm");

const eventSubmitBtn = document.getElementById("eventSubmitBtn");
const eventCancelBtn = document.getElementById("eventCancelBtn");
const classifiedSubmitBtn = document.getElementById("classifiedSubmitBtn");
const classifiedCancelBtn = document.getElementById("classifiedCancelBtn");
const albumSubmitBtn = document.getElementById("albumSubmitBtn");
const albumCancelBtn = document.getElementById("albumCancelBtn");

const adminLoginModal = document.getElementById("adminLoginModal");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminPasswordInput = document.getElementById("adminPassword");
const adminLoginError = document.getElementById("adminLoginError");
const adminLoginClose = document.getElementById("adminLoginClose");

const albumPhotoInput = document.getElementById("albumPhotos");
const albumPhotoPreview = document.getElementById("albumPhotoPreview");
const albumAdminPanel = document.getElementById("albumAdminPanel");
const albumAdminList = document.getElementById("albumAdminList");
const openAlbumModalBtn = document.getElementById("openAlbumModal");

const photoViewerModal = document.getElementById("photoViewerModal");
const photoViewerClose = document.getElementById("photoViewerClose");
const photoViewerImage = document.getElementById("photoViewerImage");
const photoViewerTitle = document.getElementById("photoViewerTitle");
const photoViewerSubtitle = document.getElementById("photoViewerSubtitle");
const photoViewerThumbs = document.getElementById("photoViewerThumbs");

const eventGalleryModal = document.getElementById("eventGalleryModal");
const eventGalleryClose = document.getElementById("eventGalleryClose");
const eventAlbumList = document.getElementById("eventAlbumList");
const eventGalleryEmpty = document.getElementById("eventGalleryEmpty");
const eventGalleryAlbum = document.getElementById("eventGalleryAlbum");
const eventAlbumTitle = document.getElementById("eventAlbumTitle");
const eventAlbumMeta = document.getElementById("eventAlbumMeta");
const eventAlbumDescription = document.getElementById("eventAlbumDescription");
const eventAlbumGrid = document.getElementById("eventAlbumGrid");

const ADMIN_PASSWORD = "flotilha2024";
const MAX_CLASSIFIED_PHOTOS = 4;
const MAX_ALBUM_PHOTOS = 12;

let isAdmin = false;
let editingEventIndex = null;
let editingClassifiedIndex = null;
let editingAlbumId = null;
let classifiedPhotoDraft = [];
let albumPhotoDraft = [];
let activeAlbumId = albumData[0]?.id ?? null;
let currentPhotoSet = [];
let currentPhotoTitle = "";
let currentPhotoSubtitle = "";
let currentPhotoIndex = 0;

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
  classifiedPhotoDraft = [];
  classifiedPhotoInput.value = "";
  updateClassifiedPhotoPreview();
}

function resetAlbumForm() {
  albumForm.reset();
  editingAlbumId = null;
  albumSubmitBtn.textContent = "Publicar álbum";
  albumCancelBtn.classList.add("hidden");
  albumPhotoDraft = [];
  albumPhotoInput.value = "";
  updateAlbumPhotoPreview();
}

function renderPhotoPreview(container, photos, { removeHandler, emptyMessage, altPrefix }) {
  container.innerHTML = "";

  if (!photos.length) {
    const empty = document.createElement("p");
    empty.className = "photo-preview__empty";
    empty.textContent = emptyMessage;
    container.appendChild(empty);
    return;
  }

  photos.forEach((photo, index) => {
    const item = document.createElement("div");
    item.className = "photo-preview__item";

    const image = document.createElement("img");
    image.src = photo;
    image.alt = `${altPrefix} ${index + 1}`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "photo-preview__remove";
    removeButton.setAttribute("aria-label", "Remover foto");
    removeButton.textContent = "×";
    removeButton.addEventListener("click", () => removeHandler(index));

    item.append(image, removeButton);
    container.appendChild(item);
  });
}

function updateClassifiedPhotoPreview() {
  renderPhotoPreview(classifiedPhotoPreview, classifiedPhotoDraft, {
    removeHandler: (index) => {
      classifiedPhotoDraft.splice(index, 1);
      updateClassifiedPhotoPreview();
    },
    emptyMessage: "Nenhuma foto anexada ao anúncio ainda.",
    altPrefix: "Foto do anúncio",
  });
}

function updateAlbumPhotoPreview() {
  renderPhotoPreview(albumPhotoPreview, albumPhotoDraft, {
    removeHandler: (index) => {
      albumPhotoDraft.splice(index, 1);
      updateAlbumPhotoPreview();
    },
    emptyMessage: "Nenhuma foto adicionada ao álbum ainda.",
    altPrefix: "Foto do álbum",
  });
}

function getConditionLabel(condition) {
  const labels = {
    novo: "Novo",
    seminovo: "Seminovo",
    usado: "Usado",
  };

  return labels[condition] || condition;
}

function setPhotoViewerImage(index) {
  if (!currentPhotoSet[index]) {
    return;
  }

  currentPhotoIndex = index;
  photoViewerImage.src = currentPhotoSet[index];
  photoViewerImage.alt = `${currentPhotoTitle} - foto ${index + 1}`;

  const thumbs = Array.from(
    photoViewerThumbs.querySelectorAll(".photo-viewer__thumb")
  );
  thumbs.forEach((thumb, thumbIndex) => {
    thumb.classList.toggle("photo-viewer__thumb--active", thumbIndex === index);
  });
}

function openPhotoViewer({ photos, title, subtitle = "", startIndex = 0 }) {
  if (!Array.isArray(photos) || photos.length === 0) {
    return;
  }

  currentPhotoSet = photos;
  currentPhotoTitle = title;
  currentPhotoSubtitle = subtitle;
  photoViewerTitle.textContent = title;
  photoViewerSubtitle.textContent = subtitle;
  photoViewerSubtitle.classList.toggle("hidden", subtitle.length === 0);
  photoViewerThumbs.innerHTML = "";

  photos.forEach((photo, index) => {
    const thumbButton = document.createElement("button");
    thumbButton.type = "button";
    thumbButton.className = "photo-viewer__thumb";
    thumbButton.setAttribute(
      "aria-label",
      `Visualizar foto ${index + 1} de ${title}`
    );
    const thumbImage = document.createElement("img");
    thumbImage.src = photo;
    thumbImage.alt = `${title} - miniatura ${index + 1}`;
    thumbButton.appendChild(thumbImage);
    thumbButton.addEventListener("click", () => setPhotoViewerImage(index));
    photoViewerThumbs.appendChild(thumbButton);
  });

  setPhotoViewerImage(Math.min(startIndex, photos.length - 1));
  photoViewerModal.classList.remove("hidden");
}

function closePhotoViewer() {
  photoViewerModal.classList.add("hidden");
  currentPhotoSet = [];
  currentPhotoTitle = "";
  currentPhotoSubtitle = "";
  photoViewerTitle.textContent = "";
  photoViewerSubtitle.textContent = "";
  photoViewerSubtitle.classList.remove("hidden");
  photoViewerImage.src = "";
  photoViewerImage.alt = "";
  photoViewerThumbs.innerHTML = "";
}

function openEventGalleryModal() {
  renderEventGallery(activeAlbumId);
  eventGalleryModal.classList.remove("hidden");
}

function closeEventGalleryModal() {
  eventGalleryModal.classList.add("hidden");
}

function updateAdminUI() {
  if (isAdmin) {
    adminForm.classList.remove("hidden");
    classifiedForm.classList.remove("hidden");
    albumForm.classList.remove("hidden");
    albumAdminPanel.classList.remove("hidden");
    adminButton.classList.remove("btn--outline");
    adminButton.classList.add("btn--primary");
    adminButton.textContent = "Sair da área do administrador";
  } else {
    adminForm.classList.add("hidden");
    classifiedForm.classList.add("hidden");
    albumForm.classList.add("hidden");
    albumAdminPanel.classList.add("hidden");
    adminButton.classList.add("btn--outline");
    adminButton.classList.remove("btn--primary");
    adminButton.textContent = "Área do administrador";
    resetEventForm();
    resetClassifiedForm();
    resetAlbumForm();
  }

  renderEvents();
  renderClassifieds();
  renderAlbumAdminList();
  renderEventGallery();
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

function formatFullDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
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

    const mediaBlock = clone.querySelector(".classified__media");
    const photoButton = clone.querySelector(".classified__photos-btn");
    if (item.photos && item.photos.length) {
      const photosCountLabel =
        item.photos.length === 1
          ? "Ver 1 foto do anúncio"
          : `Ver ${item.photos.length} fotos do anúncio`;
      photoButton.textContent = photosCountLabel;
      mediaBlock.classList.remove("hidden");
    } else {
      mediaBlock.classList.add("hidden");
    }

    const conditionBadge = clone.querySelector(".badge--condition");
    conditionBadge.textContent = getConditionLabel(item.condition);

    const actions = clone.querySelector(".admin-actions");
    if (isAdmin) {
      actions.classList.remove("hidden");
    } else {
      actions.classList.add("hidden");
    }

    classifiedList.appendChild(clone);
  });
}

function renderAlbumAdminList() {
  albumAdminList.innerHTML = "";

  if (!albumData.length) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "album-admin__empty";
    emptyItem.textContent = "Nenhum álbum cadastrado até o momento.";
    albumAdminList.appendChild(emptyItem);
    return;
  }

  albumData.forEach((album, index) => {
    const listItem = document.createElement("li");
    listItem.className = "album-admin__item";
    listItem.dataset.albumId = String(album.id);

    const cover = document.createElement("img");
    cover.className = "album-admin__cover";
    cover.src = album.photos[0];
    cover.alt = `Capa do álbum ${album.title}`;

    const info = document.createElement("div");
    const title = document.createElement("p");
    title.className = "album-admin__title";
    title.textContent = album.title;

    const meta = document.createElement("p");
    meta.className = "text--muted";
    const photoCountLabel =
      album.photos.length === 1
        ? "1 foto"
        : `${album.photos.length} fotos`;
    meta.textContent = `${formatFullDate(album.date)} · ${photoCountLabel}`;

    info.append(title, meta);

    const actions = document.createElement("div");
    actions.className = "album-admin__actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "btn btn--ghost";
    editButton.dataset.action = "edit";
    editButton.textContent = "Editar";

    const moveUpButton = document.createElement("button");
    moveUpButton.type = "button";
    moveUpButton.className = "btn btn--ghost";
    moveUpButton.dataset.action = "move-up";
    moveUpButton.textContent = "Mover ↑";
    moveUpButton.disabled = index === 0;

    const moveDownButton = document.createElement("button");
    moveDownButton.type = "button";
    moveDownButton.className = "btn btn--ghost";
    moveDownButton.dataset.action = "move-down";
    moveDownButton.textContent = "Mover ↓";
    moveDownButton.disabled = index === albumData.length - 1;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn btn--ghost btn--danger";
    deleteButton.dataset.action = "delete";
    deleteButton.textContent = "Excluir";

    actions.append(editButton, moveUpButton, moveDownButton, deleteButton);

    listItem.append(cover, info, actions);
    albumAdminList.appendChild(listItem);
  });
}

function renderEventGallery(selectAlbumId = activeAlbumId) {
  eventAlbumList.innerHTML = "";

  if (!albumData.length) {
    activeAlbumId = null;
    eventGalleryEmpty.classList.remove("hidden");
    eventGalleryAlbum.classList.add("hidden");
    return;
  }

  if (!selectAlbumId || !albumData.some((album) => album.id === selectAlbumId)) {
    selectAlbumId = albumData[0].id;
  }

  activeAlbumId = selectAlbumId;

  albumData.forEach((album) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.albumId = String(album.id);

    if (album.id === activeAlbumId) {
      button.classList.add("event-gallery__list-item--active");
    }

    const title = document.createElement("strong");
    title.textContent = album.title;

    const meta = document.createElement("span");
    meta.className = "text--muted";
    const photoCountLabel =
      album.photos.length === 1
        ? "1 foto"
        : `${album.photos.length} fotos`;
    meta.textContent = `${formatFullDate(album.date)} · ${photoCountLabel}`;

    button.append(title, meta);
    listItem.appendChild(button);
    eventAlbumList.appendChild(listItem);
  });

  displayActiveAlbum();
}

function displayActiveAlbum() {
  const album = albumData.find((item) => item.id === activeAlbumId);

  if (!album) {
    eventGalleryEmpty.classList.remove("hidden");
    eventGalleryAlbum.classList.add("hidden");
    return;
  }

  eventGalleryEmpty.classList.add("hidden");
  eventGalleryAlbum.classList.remove("hidden");

  const photoCountLabel =
    album.photos.length === 1 ? "1 foto" : `${album.photos.length} fotos`;

  eventAlbumTitle.textContent = album.title;
  eventAlbumMeta.textContent = `${formatFullDate(album.date)} • ${photoCountLabel}`;
  eventAlbumDescription.textContent = album.description;

  eventAlbumGrid.innerHTML = "";

  album.photos.forEach((photo, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute(
      "aria-label",
      `Abrir foto ${index + 1} do álbum ${album.title}`
    );
    const image = document.createElement("img");
    image.src = photo;
    image.alt = `${album.title} - foto ${index + 1}`;
    button.appendChild(image);
    button.addEventListener("click", () =>
      openPhotoViewer({
        photos: album.photos,
        title: album.title,
        subtitle: `${formatFullDate(album.date)} • ${photoCountLabel}`,
        startIndex: index,
      })
    );
    eventAlbumGrid.appendChild(button);
  });
}

function readFilesAsDataURLs(files) {
  return Promise.all(
    files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
          reader.readAsDataURL(file);
        })
    )
  );
}

async function handleClassifiedPhotoSelection(event) {
  const files = Array.from(event.target.files || []);

  if (!files.length) {
    return;
  }

  const availableSlots = MAX_CLASSIFIED_PHOTOS - classifiedPhotoDraft.length;

  if (availableSlots <= 0) {
    window.alert("Você já atingiu o limite de quatro fotos para este anúncio.");
    classifiedPhotoInput.value = "";
    return;
  }

  const filesToProcess = files.slice(0, availableSlots);

  try {
    const newPhotos = await readFilesAsDataURLs(filesToProcess);
    classifiedPhotoDraft = classifiedPhotoDraft.concat(newPhotos);
    updateClassifiedPhotoPreview();
  } catch (error) {
    console.error(error);
    window.alert("Não foi possível carregar algumas fotos. Tente novamente.");
  } finally {
    classifiedPhotoInput.value = "";
  }

  if (files.length > availableSlots) {
    window.alert(
      "Algumas imagens não foram adicionadas para manter o limite máximo de quatro fotos."
    );
  }
}

async function handleAlbumPhotoSelection(event) {
  const files = Array.from(event.target.files || []);

  if (!files.length) {
    return;
  }

  const availableSlots = MAX_ALBUM_PHOTOS - albumPhotoDraft.length;

  if (availableSlots <= 0) {
    window.alert("O álbum já possui o número máximo de fotos.");
    albumPhotoInput.value = "";
    return;
  }

  const filesToProcess = files.slice(0, availableSlots);

  try {
    const newPhotos = await readFilesAsDataURLs(filesToProcess);
    albumPhotoDraft = albumPhotoDraft.concat(newPhotos);
    updateAlbumPhotoPreview();
  } catch (error) {
    console.error(error);
    window.alert("Não foi possível carregar algumas fotos. Tente novamente.");
  } finally {
    albumPhotoInput.value = "";
  }

  if (files.length > availableSlots) {
    window.alert(
      "Foram adicionadas apenas as primeiras imagens para manter o limite de 12 fotos por álbum."
    );
  }
}

filterType.addEventListener("change", renderEvents);
filterLevel.addEventListener("change", renderEvents);
classifiedSearch.addEventListener("input", renderClassifieds);

classifiedPhotoInput.addEventListener("change", handleClassifiedPhotoSelection);
albumPhotoInput.addEventListener("change", handleAlbumPhotoSelection);

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
  if (event.key !== "Escape") {
    return;
  }

  if (!adminLoginModal.classList.contains("hidden")) {
    closeAdminModal();
  }

  if (!photoViewerModal.classList.contains("hidden")) {
    closePhotoViewer();
  }

  if (!eventGalleryModal.classList.contains("hidden")) {
    closeEventGalleryModal();
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

  const payload = {
    title,
    seller,
    price,
    condition,
    description,
    photos: [...classifiedPhotoDraft],
  };

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

albumForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isAdmin) {
    return;
  }

  if (!albumForm.reportValidity()) {
    return;
  }

  if (albumPhotoDraft.length === 0) {
    window.alert("Inclua ao menos uma foto no álbum.");
    return;
  }

  const title = document.getElementById("albumTitle").value.trim();
  const date = document.getElementById("albumDate").value;
  const description = document.getElementById("albumDescription").value.trim();

  const payload = {
    title,
    date,
    description,
    photos: [...albumPhotoDraft],
  };

  if (editingAlbumId !== null) {
    const index = albumData.findIndex((album) => album.id === editingAlbumId);
    if (index !== -1) {
      albumData[index] = { ...albumData[index], ...payload };
      activeAlbumId = albumData[index].id;
    }
  } else {
    const newAlbum = {
      id: ++albumIdCounter,
      ...payload,
    };
    albumData.unshift(newAlbum);
    activeAlbumId = newAlbum.id;
  }

  resetAlbumForm();
  renderAlbumAdminList();
  renderEventGallery(activeAlbumId);
});

albumCancelBtn.addEventListener("click", () => {
  resetAlbumForm();
});

openAlbumModalBtn.addEventListener("click", openEventGalleryModal);
photoViewerClose.addEventListener("click", closePhotoViewer);
eventGalleryClose.addEventListener("click", closeEventGalleryModal);

photoViewerModal.addEventListener("click", (event) => {
  if (event.target.dataset.action === "close") {
    closePhotoViewer();
  }
});

eventGalleryModal.addEventListener("click", (event) => {
  if (event.target.dataset.action === "close") {
    closeEventGalleryModal();
  }
});

classifiedList.addEventListener("click", (event) => {
  const photoButton = event.target.closest(".classified__photos-btn");
  if (!photoButton) {
    return;
  }

  const card = photoButton.closest(".classified");
  const index = Number(card?.dataset.index);
  if (Number.isNaN(index)) {
    return;
  }

  const item = classifiedData[index];
  if (!item?.photos?.length) {
    return;
  }

  const subtitle = `${
    item.photos.length === 1 ? "1 foto" : `${item.photos.length} fotos`
  } • ${getConditionLabel(item.condition)}`;

  openPhotoViewer({
    photos: item.photos,
    title: item.title,
    subtitle,
  });
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
    classifiedPhotoDraft = [...(item.photos || [])];
    classifiedPhotoInput.value = "";
    updateClassifiedPhotoPreview();
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

albumAdminList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || !isAdmin) {
    return;
  }

  const listItem = button.closest(".album-admin__item");
  const albumId = Number(listItem?.dataset.albumId);

  if (Number.isNaN(albumId)) {
    return;
  }

  const index = albumData.findIndex((album) => album.id === albumId);

  if (index === -1) {
    return;
  }

  if (button.dataset.action === "edit") {
    const album = albumData[index];
    document.getElementById("albumTitle").value = album.title;
    document.getElementById("albumDate").value = album.date;
    document.getElementById("albumDescription").value = album.description;
    albumPhotoDraft = [...album.photos];
    albumPhotoInput.value = "";
    updateAlbumPhotoPreview();
    editingAlbumId = album.id;
    albumSubmitBtn.textContent = "Atualizar álbum";
    albumCancelBtn.classList.remove("hidden");
    albumForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (button.dataset.action === "delete") {
    const confirmation = window.confirm(
      "Tem certeza de que deseja excluir este álbum?"
    );
    if (!confirmation) {
      return;
    }

    const wasActive = activeAlbumId === albumId;
    albumData.splice(index, 1);

    if (editingAlbumId === albumId) {
      resetAlbumForm();
    }

    if (wasActive) {
      const fallback =
        albumData[index] || albumData[index - 1] || albumData[0] || null;
      activeAlbumId = fallback ? fallback.id : null;
    }

    renderAlbumAdminList();
    renderEventGallery(activeAlbumId);
  }

  if (button.dataset.action === "move-up" && index > 0) {
    const [album] = albumData.splice(index, 1);
    albumData.splice(index - 1, 0, album);
    renderAlbumAdminList();
    renderEventGallery(activeAlbumId);
  }

  if (button.dataset.action === "move-down" && index < albumData.length - 1) {
    const [album] = albumData.splice(index, 1);
    albumData.splice(index + 1, 0, album);
    renderAlbumAdminList();
    renderEventGallery(activeAlbumId);
  }
});

eventAlbumList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-album-id]");
  if (!button) {
    return;
  }

  const albumId = Number(button.dataset.albumId);
  if (Number.isNaN(albumId)) {
    return;
  }

  renderEventGallery(albumId);
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
