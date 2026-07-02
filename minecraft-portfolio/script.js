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
