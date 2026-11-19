const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const backTop = document.getElementById('backTop');

function setTheme(theme) {
  body.classList.toggle('dark', theme === 'dark');
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light appearance' : 'Switch to dark appearance');
  try { localStorage.setItem('kartik-portfolio-theme', theme); } catch (e) {}
}
try {
  const savedTheme = localStorage.getItem('kartik-portfolio-theme');
  if (savedTheme) setTheme(savedTheme);
} catch (e) {}
themeToggle.addEventListener('click', () => setTheme(body.classList.contains('dark') ? 'light' : 'dark'));

menuToggle.addEventListener('click', () => {
  const opened = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
  menuToggle.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const filterButtons = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  projectCards.forEach(card => {
    const categories = card.dataset.category.split(' ');
    card.classList.toggle('hidden', filter !== 'all' && !categories.includes(filter));
  });
}));

const projectDetails = {
  kart: {
    eyebrow: 'PROJECT 01 · DYNAMIC BOOSTERS 8.0',
    title: 'Go-Kart — Team Management',
    summary: 'A national-level student go-kart project involving coordinated work across design, manufacturing, procurement, testing and competition preparation.',
    purpose: 'Bring multiple engineering workstreams together and keep the project moving against its milestones.',
    contribution: 'Worked as Team Manager. Led teams and coordinated project planning, budgeting, procurement, sponsor communication, technical documentation and competition activities.',
    tools: 'Project planning, budgeting, procurement coordination, sponsor communication and technical documentation.',
    learning: 'Team leadership, ownership, communication and an understanding of how engineering disciplines connect during a real build.'
  },
  tifan: {
    eyebrow: 'PROJECT 02 · TIFAN 2025 & 2026',
    title: 'Multi-vegetable Transplanter',
    summary: 'An agricultural automation project for which I led the electronics subsystem as Electronics Head of Team Bhumiputra.',
    purpose: 'Support synchronized operation of planting and drive mechanisms through an embedded electronics and control subsystem.',
    contribution: 'Led the design and implementation of the electronics subsystem; worked on sensor interfacing and control algorithms.',
    tools: 'ESP32, TB6600 motor drivers, ultrasonic sensors and embedded programming.',
    learning: 'Sensor integration, motor-control coordination, embedded programming and system-level automation.'
  },
  telemetry: {
    eyebrow: 'PROJECT 03 · DYNAMIC BOOSTERS 8.0',
    title: 'Go-Kart Telemetry System',
    summary: 'An ESP32-based telemetry system designed to monitor vehicle health and performance parameters in real time.',
    purpose: 'Collect and transmit vehicle information so the team can observe speed, vehicle dynamics, location and system status during testing.',
    contribution: 'Worked as a team member on data acquisition, processing and wireless transmission for live tracking.',
    tools: 'ESP32, data acquisition, data processing and wireless communication.',
    learning: 'Real-time monitoring concepts, telemetry data flow and using test information to support vehicle tuning and maintenance decisions.'
  },
  medcare: {
    eyebrow: 'PROJECT 04 · DIPEX 2025',
    title: 'MedCare Innovators',
    summary: 'A concept for a bladder restoration system using electrical stimulation technology for a healthcare application.',
    purpose: 'Explore a system workflow connecting patient monitoring, signal processing and stimulation-control modules.',
    contribution: 'Conceptualized the system workflow, led project research and technical documentation, and presented the project at DIPEX 2025.',
    tools: 'System workflow design, patient-monitoring concept, signal-processing and stimulation-control modules.',
    learning: 'System-level thinking, research, documentation and communicating a technical concept.'
  },
  wireless: {
    eyebrow: 'PROJECT 05 · WIRELESS POWER',
    title: 'Wireless Charging System',
    summary: 'A low-power wireless power-transfer prototype based on inductive coupling.',
    purpose: 'Demonstrate wireless energy transfer through a developed and tested circuit.',
    contribution: 'Worked as Team Lead, designed the prototype, developed and tested the circuitry, and demonstrated it at technical exhibitions.',
    tools: 'Inductive coupling, circuit development, low-power charging prototype and testing.',
    learning: 'Prototype development, circuit testing and explaining a working electronics demonstration.'
  },
  robot: {
    eyebrow: 'PROJECT 06 · MINI PROJECT',
    title: 'Fire-Fighting Robot',
    summary: 'An ESP32-based robot integrating sensing and motor-control hardware for fire detection and response.',
    purpose: 'Build a mobile robot with autonomous navigation, fire detection and extinguishing functionality.',
    contribution: 'Developed the robot by integrating flame sensors, ultrasonic sensors and motor drivers, and programmed the required functions.',
    tools: 'ESP32, flame sensors, ultrasonic sensors and motor drivers.',
    learning: 'Sensor integration, embedded control, autonomous response and mechatronic system integration.'
  }
};

const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
let previousFocus = null;
function openProject(key) {
  const item = projectDetails[key];
  if (!item) return;
  previousFocus = document.activeElement;
  document.getElementById('modalEyebrow').textContent = item.eyebrow;
  document.getElementById('modalTitle').textContent = item.title;
  document.getElementById('modalSummary').textContent = item.summary;
  document.getElementById('modalPurpose').textContent = item.purpose;
  document.getElementById('modalContribution').textContent = item.contribution;
  document.getElementById('modalTools').textContent = item.tools;
  document.getElementById('modalLearning').textContent = item.learning;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  body.style.overflow = 'hidden';
  modalClose.focus();
}
function closeProject() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  body.style.overflow = '';
  if (previousFocus) previousFocus.focus();
}
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.open)));
modalClose.addEventListener('click', closeProject);
modal.addEventListener('click', event => { if (event.target === modal) closeProject(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeProject();
});

window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 500);
  const sections = [...document.querySelectorAll('main section[id]')];
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) current = section.id;
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


// Photo gallery: add images from the page without editing source code.
// Added images are stored locally in this browser with IndexedDB.
(() => {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  const input = document.getElementById('galleryUpload');
  const dropzone = document.getElementById('galleryDropzone');
  const count = document.getElementById('galleryCount');
  const manageBtn = document.getElementById('galleryManage');
  const managePanel = document.getElementById('galleryManagePanel');
  const userList = document.getElementById('galleryUserList');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('galleryLightboxImage');
  const lightboxCaption = document.getElementById('galleryLightboxCaption');
  const dbName = 'KartikPortfolioGallery';
  const storeName = 'photos';
  let db;
  let currentItems = [];
  let currentIndex = 0;
  const supportsDB = 'indexedDB' in window;

  function openDB() {
    return new Promise((resolve, reject) => {
      if (!supportsDB) return reject(new Error('This browser does not support local photo storage.'));
      const request = indexedDB.open(dbName, 1);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(storeName)) database.createObjectStore(storeName, { keyPath: 'id' });
      };
      request.onsuccess = () => { db = request.result; resolve(db); };
      request.onerror = () => reject(request.error);
    });
  }
  function transaction(mode='readonly') { return db.transaction(storeName, mode).objectStore(storeName); }
  function getAll() {
    return new Promise((resolve, reject) => {
      const request = transaction().getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }
  function savePhoto(photo) {
    return new Promise((resolve, reject) => {
      const request = transaction('readwrite').put(photo);
      request.onsuccess = resolve; request.onerror = () => reject(request.error);
    });
  }
  function deletePhoto(id) {
    return new Promise((resolve, reject) => {
      const request = transaction('readwrite').delete(id);
      request.onsuccess = resolve; request.onerror = () => reject(request.error);
    });
  }
  function makeId() { return 'photo-' + Date.now() + '-' + Math.random().toString(16).slice(2); }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  const hiddenBuiltinsKey = 'kartikPortfolioHiddenGalleryPhotosV1';
  function getHiddenBuiltins() {
    try { return JSON.parse(localStorage.getItem(hiddenBuiltinsKey) || '[]'); } catch { return []; }
  }
  function saveHiddenBuiltins(items) {
    try { localStorage.setItem(hiddenBuiltinsKey, JSON.stringify(items)); } catch (error) { console.warn('Could not save gallery settings', error); }
  }
  function installBuiltinDeleteButtons() {
    grid.querySelectorAll('.gallery-card:not([data-user-photo])').forEach((card, index) => {
      if (card.dataset.builtinDeleteReady) return;
      card.dataset.builtinDeleteReady = '1';
      const image = card.querySelector('img');
      const key = image?.getAttribute('src') || '';
      if (getHiddenBuiltins().includes(key)) { card.remove(); return; }
      const actions = document.createElement('div');
      actions.className = 'gallery-card-actions';
      actions.innerHTML = '<button type="button" class="gallery-delete" aria-label="Remove this gallery photo" title="Remove photo">×</button>';
      actions.querySelector('button').addEventListener('click', event => {
        event.stopPropagation();
        if (!confirm('Remove this photo from your portfolio gallery on this browser?')) return;
        saveHiddenBuiltins([...new Set([...getHiddenBuiltins(), key])]);
        card.remove();
        count.textContent = `${grid.querySelectorAll('.gallery-card').length} moments`;
      });
      card.appendChild(actions);
    });
  }

  function addUserCard(photo) {
    const url = URL.createObjectURL(photo.blob);
    const figure = document.createElement('figure');
    figure.className = 'gallery-card user-added';
    figure.dataset.userPhoto = photo.id;
    figure.innerHTML = `<span class="user-photo-tag">Your photo</span><button class="gallery-photo" type="button"><img alt="${escapeHTML(photo.name)}" loading="lazy"></button><figcaption><span>${escapeHTML(photo.name)}</span><small>Added from this device</small></figcaption>`;
    figure.querySelector('img').src = url;
    figure.querySelector('button').addEventListener('click', () => openLightbox(url, photo.name, [...grid.querySelectorAll('.gallery-photo')].indexOf(figure.querySelector('.gallery-photo'))));
    grid.appendChild(figure);
    figure.dataset.objectUrl = url;
  }
  async function refreshUserPhotos() {
    const photos = await getAll();
    grid.querySelectorAll('[data-user-photo]').forEach(card => {
      if (card.dataset.objectUrl) URL.revokeObjectURL(card.dataset.objectUrl);
      card.remove();
    });
    photos.forEach(addUserCard);
    installBuiltinDeleteButtons();
    userList.innerHTML = '';
    if (!photos.length) userList.innerHTML = '<span class="gallery-user-item">No added photos yet.</span>';
    photos.forEach(photo => {
      const item = document.createElement('span');
      item.className = 'gallery-user-item';
      item.innerHTML = `<span>${escapeHTML(photo.name)}</span><button type="button" aria-label="Remove ${escapeHTML(photo.name)}">Remove</button>`;
      item.querySelector('button').addEventListener('click', async () => {
        await deletePhoto(photo.id);
        await refreshUserPhotos();
      });
      userList.appendChild(item);
    });
    count.textContent = `${grid.querySelectorAll('.gallery-card').length} moments`;
  }
  async function handleFiles(files) {
    const valid = [...files].filter(file => file.type.startsWith('image/'));
    if (!valid.length) { alert('Please choose image files (JPG, PNG, WEBP, etc.).'); return; }
    try {
      await Promise.all(valid.map(file => savePhoto({ id: makeId(), name: file.name, type: file.type, blob: file, addedAt: Date.now() })));
      await refreshUserPhotos();
      dropzone.querySelector('strong').textContent = `${valid.length} photo${valid.length === 1 ? '' : 's'} added`;
      setTimeout(() => { dropzone.querySelector('strong').textContent = 'Drop photos here'; }, 2600);
    } catch (error) {
      alert('Could not save these photos. Try using the portfolio through the included Run_Portfolio.bat file in Chrome or Edge.');
    }
  }
  input.addEventListener('change', async event => { await handleFiles(event.target.files); input.value = ''; });
  ['dragenter','dragover'].forEach(name => dropzone.addEventListener(name, event => { event.preventDefault(); dropzone.classList.add('dragover'); }));
  ['dragleave','drop'].forEach(name => dropzone.addEventListener(name, event => { event.preventDefault(); dropzone.classList.remove('dragover'); }));
  dropzone.addEventListener('drop', event => handleFiles(event.dataTransfer.files));
  dropzone.addEventListener('click', () => input.click());
  dropzone.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); input.click(); } });
  manageBtn.addEventListener('click', () => {
    managePanel.hidden = !managePanel.hidden;
    manageBtn.textContent = managePanel.hidden ? 'Manage added photos' : 'Hide photo manager';
  });

  function getGalleryItems() {
    return [...grid.querySelectorAll('.gallery-card')].map(card => {
      const button = card.querySelector('.gallery-photo');
      const img = button.querySelector('img');
      return { src: img.src, caption: card.querySelector('figcaption span')?.textContent || img.alt, button };
    });
  }
  function openLightbox(src, caption, index) {
    currentItems = getGalleryItems();
    currentIndex = Math.max(0, index || 0);
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function showAt(index) {
    currentItems = getGalleryItems();
    if (!currentItems.length) return;
    currentIndex = (index + currentItems.length) % currentItems.length;
    lightboxImg.src = currentItems[currentIndex].src;
    lightboxCaption.textContent = currentItems[currentIndex].caption;
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.removeAttribute('src');
    document.body.style.overflow = '';
  }
  grid.querySelectorAll('.gallery-photo').forEach((button, index) => button.addEventListener('click', () => {
    const card = button.closest('.gallery-card');
    openLightbox(button.querySelector('img').src, card.querySelector('figcaption span')?.textContent, index);
  }));
  document.getElementById('galleryLightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('galleryPrev').addEventListener('click', () => showAt(currentIndex - 1));
  document.getElementById('galleryNext').addEventListener('click', () => showAt(currentIndex + 1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showAt(currentIndex - 1);
    if (event.key === 'ArrowRight') showAt(currentIndex + 1);
  });


  // Reliable hosted resume download: validate the response before saving it.
  document.querySelectorAll('a[href*="Kartik_Jadhav_Resume.pdf"]').forEach(link => {
    link.setAttribute('download', 'Kartik_Jadhav_Resume.pdf');
    link.addEventListener('click', async event => {
      event.preventDefault();
      const originalText = link.dataset.originalText || link.textContent.trim();
      link.dataset.originalText = originalText;
      link.setAttribute('aria-busy', 'true');
      try {
        const response = await fetch(new URL(link.getAttribute('href'), document.baseURI).href, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Resume file returned HTTP ${response.status}`);
        const blob = await response.blob();
        const header = new Uint8Array(await blob.slice(0, 5).arrayBuffer());
        const signature = String.fromCharCode(...header);
        if (signature !== '%PDF-') throw new Error('The hosted file is not a PDF. Upload the complete assets folder with the website.');
        const pdfBlob = new Blob([blob], { type: 'application/pdf' });
        const objectUrl = URL.createObjectURL(pdfBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = objectUrl;
        downloadLink.download = 'Kartik_Jadhav_Resume.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
      } catch (error) {
        console.error('Resume download failed:', error);
        alert('Resume PDF could not be found on the website. Please redeploy the complete portfolio folder, including assets/Kartik_Jadhav_Resume.pdf.');
      } finally {
        link.removeAttribute('aria-busy');
      }
    });
  });

  installBuiltinDeleteButtons();
  openDB().then(refreshUserPhotos).catch(error => {
    console.warn('Gallery local storage unavailable:', error);
    count.textContent = '12 moments · photo storage needs local server';
  });
})();
