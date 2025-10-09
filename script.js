const projects = [
  {
    id: 'p1',
    title: 'ToDo List (Vanilla JS)',
    desc: 'App per prendere appunti e liste di cose da fare. Salvataggio su LocalStorage, filtri, edit e drag & drop semplice.',
    tech: ['JavaScript', 'LocalStorage', 'HTML/CSS'],
    demo: '#',
    repo: '#'
  },
  {
    id: 'p2',
    title: 'Weather Widget (API)',
    desc: 'Widget che consuma un API (demo con dati finti). Mostra utilizzo di fetch e gestione errori.',
    tech: ['Fetch API', 'Responsive'],
    demo: '#',
    repo: '#'
  },
  {
    id: 'p3',
    title: 'Game: Memory',
    desc: 'Gioco Memory con logica per matching delle coppie.',
    tech: ['JavaScript', 'CSS Animations'],
    demo: '#',
    repo: '#'
  }
];

const grid = document.getElementById('grid');
const search = document.getElementById('search');
const filterTech = document.getElementById('filterTech');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTech = document.getElementById('modalTech');
const modalDemo = document.getElementById('modalDemo');
const modalCode = document.getElementById('modalCode');
const closeModal = document.getElementById('closeModal');
const yearEl = document.getElementById('year');
const themeToggle = document.getElementById('themeToggle');

yearEl.textContent = new Date().getFullYear();

function getAllTechs(){
  const set = new Set();
  projects.forEach(p => p.tech.forEach(t => set.add(t)));
  return Array.from(set).sort();
}

function populateFilter(){
  const techs = getAllTechs();
  techs.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t; opt.textContent = t;
    filterTech.appendChild(opt);
  });
}

function renderProjects(list){
  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('role','listitem');
    card.innerHTML = `
      <div class="thumb">${escapeHtml(p.title)}</div>
      <h3>${escapeHtml(p.title)}</h3>
      <p class="muted">${escapeHtml(p.desc)}</p>
      <div class="chips">${p.tech.map(t => `<span class="chip">${escapeHtml(t)}</span>`).join('')}</div>
      <div class="meta">
        <small class="muted">${p.tech.join(' • ')}</small>
        <div><button class="btn small" data-id="${p.id}">Dettagli</button></div>
      </div>`;
    grid.appendChild(card);
  });
  grid.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.currentTarget.getAttribute('data-id');
      const project = projects.find(p => p.id === id);
      if(project) openModal(project);
    });
  });
}

function openModal(project){
  modal.setAttribute('aria-hidden','false');
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;
  modalTech.innerHTML = project.tech.map(t => `<span class="chip">${escapeHtml(t)}</span>`).join('');
  modalDemo.href = project.demo || '#';
  modalCode.href = project.repo || '#';
}
function closeModalFn(){ modal.setAttribute('aria-hidden','true'); }
closeModal.addEventListener('click', closeModalFn);
modal.addEventListener('click', e => { if(e.target === modal) closeModalFn(); });
window.addEventListener('keydown', e => { if(e.key === 'Escape') closeModalFn(); });

function applyFilters(){
  const q = search.value.trim().toLowerCase();
  const tech = filterTech.value;
  const filtered = projects.filter(p => {
    const matchesQ = p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tech.join(' ').toLowerCase().includes(q);
    const matchesTech = tech ? p.tech.includes(tech) : true;
    return matchesQ && matchesTech;
  });
  renderProjects(filtered);
}
search.addEventListener('input', applyFilters);
filterTech.addEventListener('change', applyFilters);

function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

// Tema chiaro/scuro
function applySavedTheme(){
  const t = localStorage.getItem('theme');
  if(t === 'light') document.documentElement.setAttribute('data-theme','light');
}
themeToggle.addEventListener('click', ()=>{
  const current = document.documentElement.getAttribute('data-theme');
  if(current === 'light'){
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');
  } else {
    document.documentElement.setAttribute('data-theme','light');
    localStorage.setItem('theme','light');
  }
});

populateFilter();
renderProjects(projects);
applySavedTheme();

