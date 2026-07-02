const buttons = document.querySelectorAll('.pixel-btn');
const slots = document.querySelectorAll('.inventory-slot');
const title = document.getElementById('project-title');
const desc = document.getElementById('project-desc');
const tech = document.getElementById('project-tech');
const loadingScreen = document.getElementById('loading-screen');
const skipLoadingButton = document.getElementById('skip-loading');
const modal = document.getElementById('project-modal');
const closeModalButton = document.getElementById('close-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTech = document.getElementById('modal-tech');
const modalDownload = document.getElementById('modal-download');
const openProjectButton = document.querySelector('.open-project');

const projects = [
  {
    title: 'Projeto 01 - Crafts',
    desc: 'Modelos e assets criados com foco em estética, organização e identidade visual.',
    tech: ['Blockbench', 'Blender', 'Pixel Art'],
    image: 'assets/textures/project-craft.svg',
    download: 'assets/textures/project-craft.svg'
  },
  {
    title: 'Projeto 02 - Animações',
    desc: 'Sequências animadas para dar vida a modelos, mobs e elementos de interface com uma estética mais dinâmica.',
    tech: ['After Effects', 'Blender', 'Motion'],
    image: 'assets/textures/project-animations.svg',
    download: 'assets/textures/project-animations.svg'
  },
  {
    title: 'Projeto 03 - Mods',
    desc: 'Modificações personalizadas para expandir gameplay, estética e experiência dentro do universo do jogo.',
    tech: ['Java', 'Minecraft API', 'UI'],
    image: 'assets/textures/project-mods.svg',
    download: 'assets/textures/project-mods.svg'
  },
  {
    title: 'Projeto 04 - Downloads',
    desc: 'Arquivos prontos para uso com versões, recursos e materiais de apoio.',
    tech: ['Pack', 'Recursos', 'Suporte'],
    image: 'assets/textures/project-downloads.svg',
    download: 'assets/textures/project-downloads.svg'
  }
];

function hideLoadingScreen() {
  if (!loadingScreen) return;
  loadingScreen.classList.add('hidden');
}

function openProject(index) {
  const project = projects[index];
  if (!project) return;

  title.textContent = project.title;
  desc.textContent = project.desc;
  tech.innerHTML = project.tech.map((item) => `<span>${item}</span>`).join('');

  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;
  modalTech.innerHTML = project.tech.map((item) => `<span>${item}</span>`).join('');
  modalDownload.href = project.download;
  modalDownload.textContent = 'Baixar';
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

window.addEventListener('load', () => {
  window.setTimeout(hideLoadingScreen, 700);
});

window.addEventListener('DOMContentLoaded', () => {
  window.setTimeout(() => {
    if (document.readyState === 'complete') {
      hideLoadingScreen();
    }
  }, 1200);
});

if (skipLoadingButton) {
  skipLoadingButton.addEventListener('click', hideLoadingScreen);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

slots.forEach((slot) => {
  slot.addEventListener('click', () => {
    slots.forEach((item) => item.classList.remove('active'));
    slot.classList.add('active');

    const index = Number(slot.dataset.project);
    openProject(index);
  });
});

if (openProjectButton) {
  openProjectButton.addEventListener('click', () => {
    const activeSlot = document.querySelector('.inventory-slot.active');
    const index = activeSlot ? Number(activeSlot.dataset.project) : 0;
    openProject(index);
  });
}

if (closeModalButton) {
  closeModalButton.addEventListener('click', closeProjectModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeProjectModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeProjectModal();
  }
});

// === Models gallery loader ===
const modelsGallery = document.getElementById('models-gallery');

function renderModels(models) {
  if (!modelsGallery) return;
  modelsGallery.innerHTML = '';
  if (!models || models.length === 0) {
    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = 'Nenhum modelo encontrado. Envie GIFs/imagens para minecraft-portfolio/assets/textures ou atualize models.json.';
    modelsGallery.appendChild(p);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'models-grid';

  models.forEach((m, i) => {
    const card = document.createElement('button');
    card.className = 'gallery-item pixel-btn';
    card.type = 'button';
    card.addEventListener('click', () => {
      // abrir modal com detalhes
      modalImage.src = m.src;
      modalImage.alt = m.title || `Modelo ${i+1}`;
      modalTitle.textContent = m.title || `Modelo ${i+1}`;
      modalDesc.textContent = m.desc || '';
      modalTech.innerHTML = (m.tech || []).map(t => `<span>${t}</span>`).join('');
      modalDownload.href = m.download || m.src || '#';
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    });

    const img = document.createElement('img');
    img.src = m.thumb || m.src;
    img.alt = m.title || `Modelo ${i+1}`;
    img.className = 'model-thumb';
    card.appendChild(img);

    const label = document.createElement('div');
    label.className = 'model-label';
    label.textContent = m.title || `Modelo ${i+1}`;
    card.appendChild(label);

    grid.appendChild(card);
  });

  modelsGallery.appendChild(grid);
}

function loadModelsJSON() {
  fetch('assets/textures/models.json')
    .then((res) => {
      if (!res.ok) throw new Error('models.json não encontrado');
      return res.json();
    })
    .then((data) => renderModels(data))
    .catch(() => renderModels([]));
}

// carregue ao iniciar a página
document.addEventListener('DOMContentLoaded', loadModelsJSON);
