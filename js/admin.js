// ===================================================
// EF NEXUS - Admin Portal JavaScript
// ===================================================

// ===== CONFIG — CHANGE CREDENTIALS HERE =====
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'efnexus2025'
};

// ===== DATA STORAGE (localStorage) =====
const DB = {
  get(key) { try { return JSON.parse(localStorage.getItem('efnexus_' + key)) || []; } catch { return []; } },
  set(key, data) { localStorage.setItem('efnexus_' + key, JSON.stringify(data)); },
  getOne(key) { try { return JSON.parse(localStorage.getItem('efnexus_' + key)); } catch { return null; } },
  setOne(key, data) { localStorage.setItem('efnexus_' + key, JSON.stringify(data)); }
};

// ===== INITIAL DATA =====
function initData() {
  // Initialize news if empty
  if (!DB.get('news').length) {
    DB.set('news', [
      { id: '1', title: 'NIIT Expands Digital Skills Programs Across East Africa', category: 'Education', date: '2025-06-01', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80', excerpt: 'The Nexus Institute of Innovation and Technology announces major expansion of its flagship digital skills programs to five new East African nations.', status: 'active' },
      { id: '2', title: 'EF Nexus Launches State-of-the-Art AI Learning Labs', category: 'AI & Innovation', date: '2025-05-15', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80', excerpt: 'Our new AI Labs are now fully operational, providing cutting-edge machine learning education to African technologists.', status: 'active' },
      { id: '3', title: 'Pathora Program Records 95% University Application Success Rate', category: 'Programs', date: '2025-04-10', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80', excerpt: 'Students enrolled in the Pathora University Preparation Program achieve record success rates in international applications.', status: 'active' }
    ]);
  }

  if (!DB.get('partners').length) {
    DB.set('partners', [
      { id: '1', name: 'University of Cape Town', type: 'Institutional', country: 'South Africa', status: 'active' },
      { id: '2', name: 'Microsoft Africa', type: 'Technology', country: 'Kenya', status: 'active' },
      { id: '3', name: 'UNESCO', type: 'NGO', country: 'International', status: 'active' },
      { id: '4', name: 'African Development Bank', type: 'International', country: 'Côte d\'Ivoire', status: 'active' }
    ]);
  }

  // Restore NIIT link
  const niitLink = DB.getOne('niit_link');
  if (niitLink) {
    document.querySelectorAll('a[href="NIIT_WEBSITE_LINK_HERE"]').forEach(a => {
      a.href = niitLink;
    });
  }

  // Restore custom photos
  const photos = DB.getOne('custom_photos') || {};
  Object.entries(photos).forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el && el.tagName === 'IMG') el.src = url;
  });
}

// ===== LOGIN =====
document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('efnexus_auth');
  if (stored) {
    showApp();
  }

  initData();
  setupPhotoSections();

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value;

    const savedPass = localStorage.getItem('efnexus_admin_pass') || ADMIN_CREDENTIALS.password;

    if (user === ADMIN_CREDENTIALS.username && pass === savedPass) {
      localStorage.setItem('efnexus_auth', 'true');
      document.getElementById('admin-name').textContent = 'Administrator';
      showApp();
    } else {
      const err = document.getElementById('login-error');
      err.style.display = 'block';
      setTimeout(() => err.style.display = 'none', 3000);
    }
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('efnexus_auth');
    document.getElementById('admin-app').classList.remove('logged-in');
    document.getElementById('login-page').style.display = 'flex';
  });

  // Sidebar nav
  document.querySelectorAll('.sidebar-link[data-section]').forEach(link => {
    link.addEventListener('click', () => {
      const section = link.getAttribute('data-section');
      switchSection(section);
    });
  });

  // Image URL preview
  document.getElementById('photo-url') && document.getElementById('photo-url').addEventListener('input', function () {
    const wrap = document.getElementById('photo-preview-wrap');
    const img = document.getElementById('photo-preview-img');
    if (this.value) {
      img.src = this.value;
      wrap.style.display = 'block';
    } else {
      wrap.style.display = 'none';
    }
  });

  // Settings
  const savedNIIT = DB.getOne('niit_link');
  if (savedNIIT && document.getElementById('niit-url')) document.getElementById('niit-url').value = savedNIIT;

  loadNewsTable();
  loadPartnersTable();
  loadTeamTable();
  loadJobsTable();
  loadProgramsTable();
  updateDashboardStats();
});

function showApp() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('admin-app').classList.add('logged-in');
  loadNewsTable();
  loadPartnersTable();
  loadTeamTable();
  loadJobsTable();
  loadProgramsTable();
  updateDashboardStats();
}

// ===== NAVIGATION =====
const sectionTitles = {
  dashboard: ['Dashboard', 'Welcome to EF Nexus Admin Portal'],
  news: ['News & Articles', 'Manage news articles and insights'],
  photos: ['Photo Gallery', 'Update images across website pages'],
  partners: ['Partner Organizations', 'Manage your facilitation network'],
  team: ['Team & Leadership', 'Manage leadership profiles'],
  jobs: ['Job Listings', 'Manage career opportunities'],
  programs: ['Programs & Initiatives', 'Manage programs offered'],
  messages: ['Contact Messages', 'View submitted inquiry messages'],
  'partnerships-req': ['Partnership Requests', 'Review partnership inquiries'],
  settings: ['Site Settings', 'Configure website settings & links']
};

window.switchSection = function (section) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));

  const el = document.getElementById('section-' + section);
  if (el) el.classList.add('active');

  const link = document.querySelector(`.sidebar-link[data-section="${section}"]`);
  if (link) link.classList.add('active');

  const [title, sub] = sectionTitles[section] || [section, ''];
  document.getElementById('section-title').textContent = title;
  document.getElementById('section-sub').textContent = sub;
};

// ===== MODAL CONTROLS =====
window.openModal = function (id) {
  document.getElementById(id).classList.add('open');
};

window.closeModal = function (id) {
  document.getElementById(id).classList.remove('open');
};

// Close on outside click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// ===== TOAST =====
function toast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-xmark'} toast-icon"></i><span class="toast-text">${msg}</span>`;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ===== STATS =====
function updateDashboardStats() {
  document.getElementById('stat-news').textContent = DB.get('news').length;
  document.getElementById('stat-partners').textContent = DB.get('partners').length + 20;
  document.getElementById('stat-photos').textContent = Object.keys(DB.getOne('custom_photos') || {}).length;
}

// ===== NEWS =====
function loadNewsTable() {
  const tbody = document.getElementById('news-table-body');
  if (!tbody) return;
  const articles = DB.get('news');
  if (!articles.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-gray);">No articles yet. Click "Add Article" to get started.</td></tr>';
    return;
  }
  tbody.innerHTML = articles.map(a => `
    <tr>
      <td><img src="${a.image || ''}" alt="${a.title}" onerror="this.src='';this.style.background='#eee';"></td>
      <td><strong>${a.title}</strong></td>
      <td><span class="badge badge-active">${a.category}</span></td>
      <td>${a.date || '—'}</td>
      <td><span class="badge ${a.status === 'active' ? 'badge-active' : 'badge-draft'}">${a.status === 'active' ? 'Published' : 'Draft'}</span></td>
      <td style="white-space:nowrap;">
        <button class="action-btn edit" onclick="editNews('${a.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
        <button class="action-btn delete" onclick="confirmDelete('news', '${a.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

window.saveNews = function () {
  const id = document.getElementById('news-edit-id').value || Date.now().toString();
  const article = {
    id,
    title: document.getElementById('news-title').value.trim(),
    category: document.getElementById('news-category').value,
    date: document.getElementById('news-date').value,
    image: document.getElementById('news-image').value.trim(),
    excerpt: document.getElementById('news-excerpt').value.trim(),
    content: document.getElementById('news-content').value.trim(),
    status: document.getElementById('news-status').value
  };

  if (!article.title) { toast('Please enter a title', 'error'); return; }

  const articles = DB.get('news');
  const existingIdx = articles.findIndex(a => a.id === id);
  if (existingIdx >= 0) {
    articles[existingIdx] = article;
  } else {
    articles.unshift(article);
  }
  DB.set('news', articles);
  closeModal('news-modal');
  loadNewsTable();
  updateDashboardStats();
  toast('Article saved successfully!');
  clearNewsForm();
};

window.editNews = function (id) {
  const articles = DB.get('news');
  const article = articles.find(a => a.id === id);
  if (!article) return;
  document.getElementById('news-edit-id').value = id;
  document.getElementById('news-modal-title').textContent = 'Edit Article';
  document.getElementById('news-title').value = article.title;
  document.getElementById('news-category').value = article.category;
  document.getElementById('news-date').value = article.date;
  document.getElementById('news-image').value = article.image;
  document.getElementById('news-excerpt').value = article.excerpt;
  document.getElementById('news-content').value = article.content || '';
  document.getElementById('news-status').value = article.status;
  openModal('news-modal');
};

function clearNewsForm() {
  ['news-edit-id', 'news-title', 'news-date', 'news-image', 'news-excerpt', 'news-content'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('news-modal-title').textContent = 'Add News Article';
}

// ===== PARTNERS =====
function loadPartnersTable() {
  const tbody = document.getElementById('partners-table-body');
  if (!tbody) return;
  const partners = DB.get('partners');
  if (!partners.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-gray);">No partners added.</td></tr>';
    return;
  }
  tbody.innerHTML = partners.map(p => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td>${p.type}</td>
      <td>${p.country}</td>
      <td><span class="badge ${p.status === 'active' ? 'badge-active' : 'badge-inactive'}">${p.status}</span></td>
      <td style="white-space:nowrap;">
        <button class="action-btn edit" onclick="editPartner('${p.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
        <button class="action-btn delete" onclick="confirmDelete('partners', '${p.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

window.savePartner = function () {
  const id = document.getElementById('partner-edit-id').value || Date.now().toString();
  const partner = {
    id,
    name: document.getElementById('partner-name').value.trim(),
    type: document.getElementById('partner-type').value,
    country: document.getElementById('partner-country').value.trim(),
    website: document.getElementById('partner-website').value.trim(),
    status: document.getElementById('partner-status').value
  };
  if (!partner.name) { toast('Please enter partner name', 'error'); return; }
  const partners = DB.get('partners');
  const idx = partners.findIndex(p => p.id === id);
  if (idx >= 0) partners[idx] = partner; else partners.push(partner);
  DB.set('partners', partners);
  closeModal('partner-modal');
  loadPartnersTable();
  updateDashboardStats();
  toast('Partner saved!');
  document.getElementById('partner-edit-id').value = '';
};

window.editPartner = function (id) {
  const partner = DB.get('partners').find(p => p.id === id);
  if (!partner) return;
  document.getElementById('partner-edit-id').value = id;
  document.getElementById('partner-modal-title').textContent = 'Edit Partner';
  document.getElementById('partner-name').value = partner.name;
  document.getElementById('partner-type').value = partner.type;
  document.getElementById('partner-country').value = partner.country;
  document.getElementById('partner-website').value = partner.website || '';
  document.getElementById('partner-status').value = partner.status;
  openModal('partner-modal');
};

// ===== TEAM =====
function loadTeamTable() {
  const tbody = document.getElementById('team-table-body');
  if (!tbody) return;
  const team = DB.get('team');
  if (!team.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-gray);">No team members added yet.</td></tr>';
    return;
  }
  tbody.innerHTML = team.map(m => `
    <tr>
      <td><img src="${m.photo || ''}" alt="${m.name}" onerror="this.src='';this.style.background='#eee';"></td>
      <td><strong>${m.name}</strong></td>
      <td>${m.role}</td>
      <td>${m.division}</td>
      <td style="white-space:nowrap;">
        <button class="action-btn edit" onclick="editTeamMember('${m.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
        <button class="action-btn delete" onclick="confirmDelete('team', '${m.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

window.saveTeamMember = function () {
  const id = document.getElementById('team-edit-id').value || Date.now().toString();
  const member = {
    id,
    name: document.getElementById('team-name').value.trim(),
    role: document.getElementById('team-role').value.trim(),
    division: document.getElementById('team-division').value,
    photo: document.getElementById('team-photo').value.trim(),
    bio: document.getElementById('team-bio').value.trim(),
    linkedin: document.getElementById('team-linkedin').value.trim(),
    twitter: document.getElementById('team-twitter').value.trim()
  };
  if (!member.name) { toast('Please enter name', 'error'); return; }
  const team = DB.get('team');
  const idx = team.findIndex(m => m.id === id);
  if (idx >= 0) team[idx] = member; else team.push(member);
  DB.set('team', team);
  closeModal('team-modal');
  loadTeamTable();
  toast('Team member saved!');
  document.getElementById('team-edit-id').value = '';
};

window.editTeamMember = function (id) {
  const member = DB.get('team').find(m => m.id === id);
  if (!member) return;
  document.getElementById('team-edit-id').value = id;
  document.getElementById('team-modal-title').textContent = 'Edit Team Member';
  document.getElementById('team-name').value = member.name;
  document.getElementById('team-role').value = member.role;
  document.getElementById('team-division').value = member.division;
  document.getElementById('team-photo').value = member.photo || '';
  document.getElementById('team-bio').value = member.bio || '';
  document.getElementById('team-linkedin').value = member.linkedin || '';
  document.getElementById('team-twitter').value = member.twitter || '';
  openModal('team-modal');
};

// ===== JOBS =====
function loadJobsTable() {
  const tbody = document.getElementById('jobs-table-body');
  if (!tbody) return;
  const jobs = DB.get('jobs');
  if (!jobs.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-gray);">No jobs added yet.</td></tr>';
    return;
  }
  tbody.innerHTML = jobs.map(j => `
    <tr>
      <td><strong>${j.title}</strong><br><small style="color:var(--text-gray);">${j.location || ''}</small></td>
      <td>${j.division}</td>
      <td><span class="badge badge-draft">${j.type}</span></td>
      <td><span class="badge ${j.status === 'active' ? 'badge-active' : j.status === 'inactive' ? 'badge-inactive' : 'badge-draft'}">${j.status === 'active' ? 'Open' : j.status === 'inactive' ? 'Closed' : 'Draft'}</span></td>
      <td style="white-space:nowrap;">
        <button class="action-btn edit" onclick="editJob('${j.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
        <button class="action-btn delete" onclick="confirmDelete('jobs', '${j.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

window.saveJob = function () {
  const id = document.getElementById('job-edit-id').value || Date.now().toString();
  const job = {
    id,
    title: document.getElementById('job-title').value.trim(),
    division: document.getElementById('job-division').value,
    type: document.getElementById('job-type').value,
    location: document.getElementById('job-location').value.trim(),
    description: document.getElementById('job-desc').value.trim(),
    status: document.getElementById('job-status').value
  };
  if (!job.title) { toast('Please enter job title', 'error'); return; }
  const jobs = DB.get('jobs');
  const idx = jobs.findIndex(j => j.id === id);
  if (idx >= 0) jobs[idx] = job; else jobs.push(job);
  DB.set('jobs', jobs);
  closeModal('job-modal');
  loadJobsTable();
  toast('Job saved!');
  document.getElementById('job-edit-id').value = '';
};

window.editJob = function (id) {
  const job = DB.get('jobs').find(j => j.id === id);
  if (!job) return;
  document.getElementById('job-edit-id').value = id;
  document.getElementById('job-modal-title').textContent = 'Edit Job';
  document.getElementById('job-title').value = job.title;
  document.getElementById('job-division').value = job.division;
  document.getElementById('job-type').value = job.type;
  document.getElementById('job-location').value = job.location || '';
  document.getElementById('job-desc').value = job.description || '';
  document.getElementById('job-status').value = job.status;
  openModal('job-modal');
};

// ===== PROGRAMS =====
function loadProgramsTable() {
  const tbody = document.getElementById('programs-table-body');
  if (!tbody) return;
  const programs = DB.get('programs');
  if (!programs.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-gray);">No programs added yet.</td></tr>';
    return;
  }
  tbody.innerHTML = programs.map(p => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td>${p.category}</td>
      <td>${p.duration || '—'}</td>
      <td><span class="badge ${p.status === 'active' ? 'badge-active' : p.status === 'inactive' ? 'badge-inactive' : 'badge-draft'}">${p.status === 'active' ? 'Open' : p.status === 'inactive' ? 'Closed' : 'Coming Soon'}</span></td>
      <td style="white-space:nowrap;">
        <button class="action-btn edit" onclick="editProgram('${p.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
        <button class="action-btn delete" onclick="confirmDelete('programs', '${p.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

window.saveProgram = function () {
  const id = document.getElementById('program-edit-id').value || Date.now().toString();
  const program = {
    id,
    name: document.getElementById('program-name').value.trim(),
    category: document.getElementById('program-cat').value,
    duration: document.getElementById('program-duration').value.trim(),
    description: document.getElementById('program-desc').value.trim(),
    status: document.getElementById('program-status').value
  };
  if (!program.name) { toast('Please enter program name', 'error'); return; }
  const programs = DB.get('programs');
  const idx = programs.findIndex(p => p.id === id);
  if (idx >= 0) programs[idx] = program; else programs.push(program);
  DB.set('programs', programs);
  closeModal('program-modal');
  loadProgramsTable();
  toast('Program saved!');
  document.getElementById('program-edit-id').value = '';
};

window.editProgram = function (id) {
  const program = DB.get('programs').find(p => p.id === id);
  if (!program) return;
  document.getElementById('program-edit-id').value = id;
  document.getElementById('program-modal-title').textContent = 'Edit Program';
  document.getElementById('program-name').value = program.name;
  document.getElementById('program-cat').value = program.category;
  document.getElementById('program-duration').value = program.duration || '';
  document.getElementById('program-desc').value = program.description || '';
  document.getElementById('program-status').value = program.status;
  openModal('program-modal');
};

// ===== PHOTOS =====
const photoSections = [
  { id: 'home-overview-img', label: 'Home — Overview', page: 'index.html' },
  { id: 'about-team-img', label: 'About — Team Photo', page: 'about.html' },
  { id: 'edu-hybrid-img', label: 'Education — Hybrid', page: 'education.html' },
  { id: 'edu-ai-img', label: 'Education — AI Learning', page: 'education.html' },
  { id: 'edu-digital-img', label: 'Education — Digital', page: 'education.html' },
  { id: 'edu-success-img', label: 'Education — Success', page: 'education.html' },
  { id: 'careers-team-img', label: 'Careers — Team', page: 'careers.html' },
  { id: 'news-page-img-1', label: 'News Article 1', page: 'news.html' },
  { id: 'news-page-img-2', label: 'News Article 2', page: 'news.html' },
  { id: 'news-page-img-3', label: 'News Article 3', page: 'news.html' },
  { id: 'news-page-img-4', label: 'News Article 4', page: 'news.html' },
  { id: 'news-page-img-5', label: 'News Article 5', page: 'news.html' },
  { id: 'news-page-img-6', label: 'News Article 6', page: 'news.html' }
];

function setupPhotoSections() {
  const grid = document.getElementById('photo-sections-grid');
  if (!grid) return;
  const customPhotos = DB.getOne('custom_photos') || {};
  grid.innerHTML = photoSections.map(ps => `
    <div style="background:var(--white);border-radius:12px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);border:1px solid var(--mid-gray);">
      <div style="width:100%;height:100px;background:var(--light-gray);border-radius:8px;overflow:hidden;margin-bottom:10px;">
        <img src="${customPhotos[ps.id] || ''}" alt="${ps.label}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';">
      </div>
      <p style="font-size:0.8rem;font-weight:600;color:var(--deep-blue);margin-bottom:4px;">${ps.label}</p>
      <p style="font-size:0.7rem;color:var(--text-gray);margin-bottom:10px;">${ps.page}</p>
      <button class="action-btn edit" style="width:100%;justify-content:center;" onclick="openPhotoModal('${ps.id}')">
        <i class="fa-solid fa-pen"></i> Update
      </button>
    </div>
  `).join('');
}

window.openPhotoModal = function (imageId) {
  const section = photoSections.find(ps => ps.id === imageId);
  if (section) {
    document.getElementById('photo-page').value = imageId;
  }
  openModal('photo-modal');
};

window.savePhoto = function () {
  const imageId = document.getElementById('photo-page').value;
  const url = document.getElementById('photo-url').value.trim();
  if (!url) { toast('Please enter an image URL', 'error'); return; }

  const customPhotos = DB.getOne('custom_photos') || {};
  customPhotos[imageId] = url;
  DB.setOne('custom_photos', customPhotos);

  toast('Image updated! Note: Open the page in browser to see the change. For permanent HTML update, modify the src attribute in the HTML file.');
  closeModal('photo-modal');
  document.getElementById('photo-url').value = '';
  document.getElementById('photo-preview-wrap').style.display = 'none';
  setupPhotoSections();
  updateDashboardStats();
};

// ===== DELETE =====
let deleteTarget = { key: null, id: null };

window.confirmDelete = function (key, id) {
  deleteTarget = { key, id };
  openModal('delete-modal');
};

document.getElementById('confirm-delete-btn').addEventListener('click', () => {
  const { key, id } = deleteTarget;
  if (!key || !id) return;
  const items = DB.get(key);
  DB.set(key, items.filter(i => i.id !== id));
  closeModal('delete-modal');
  if (key === 'news') loadNewsTable();
  if (key === 'partners') loadPartnersTable();
  if (key === 'team') loadTeamTable();
  if (key === 'jobs') loadJobsTable();
  if (key === 'programs') loadProgramsTable();
  updateDashboardStats();
  toast('Item deleted.');
});

// ===== SETTINGS =====
window.saveNIITLink = function () {
  const url = document.getElementById('niit-url').value.trim();
  if (!url) { toast('Please enter a URL', 'error'); return; }
  DB.setOne('niit_link', url);
  toast('NIIT link saved! Update NIIT_WEBSITE_LINK_HERE in HTML files for permanent change.');
};

window.changePassword = function () {
  const newPass = document.getElementById('new-password').value;
  if (!newPass || newPass.length < 6) { toast('Password must be at least 6 characters', 'error'); return; }
  localStorage.setItem('efnexus_admin_pass', newPass);
  document.getElementById('new-password').value = '';
  toast('Password updated successfully!');
};

window.openAddModal = function () { /* handled per section */ };
