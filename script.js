const buttons = document.querySelectorAll('.pixel-btn');
const slots = document.querySelectorAll('.inventory-slot');
const title = document.getElementById('project-title');
const desc = document.getElementById('project-desc');
const tech = document.getElementById('project-tech');
const detailsCard = document.getElementById('project-details');
const loadingScreen = document.getElementById('loading-screen');
const skipLoadingButton = document.getElementById('skip-loading');

function hideLoadingScreen() {
  if (!loadingScreen) return;
  loadingScreen.classList.add('hidden');
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

const projects = [
  {
    title: 'Projeto 01 - MineCraft',
    desc: 'Um universo de construção em pixel com foco em interfaces imersivas e interação simples.',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Projeto 02 - Blocos',
    desc: 'Uma experiência visual feita para destacar componentes, animações e layouts com identidade.',
    tech: ['CSS', 'Animações', 'UI']
  },
  {
    title: 'Projeto 03 - Portais',
    desc: 'Integrações com navegação fluida e elementos de interface com estética de jogo.',
    tech: ['UX', 'HTML', 'JS']
  },
  {
    title: 'Projeto 04 - Combate',
    desc: 'Uma abordagem forte para destacar projetos com uma estética marcante e dinâmica.',
    tech: ['Design', 'Frontend', 'Motion']
  }
];

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

function updateProject(index) {
  const project = projects[index];
  if (!project) return;

  if (title) title.textContent = project.title;
  if (desc) desc.textContent = project.desc;
  if (tech) {
    tech.innerHTML = project.tech.map((item) => `<span>${item}</span>`).join('');
  }
  if (detailsCard) {
    detailsCard.dataset.model = String(index);
  }
}

slots.forEach((slot) => {
  slot.addEventListener('click', () => {
    slots.forEach((item) => item.classList.remove('active'));
    slot.classList.add('active');

    const index = Number(slot.dataset.project);
    updateProject(index);
  });
});

updateProject(0);
