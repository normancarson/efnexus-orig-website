// ===================================================
// EF NEXUS COMPANY - Main JavaScript
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar && navbar.classList.add('scrolled');
      backToTop && backToTop.classList.add('visible');
    } else {
      navbar && navbar.classList.remove('scrolled');
      backToTop && backToTop.classList.remove('visible');
    }
  });

  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburger && hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu && mobileMenu.classList.toggle('open');
  });

  // Mobile sub menus
  document.querySelectorAll('.mobile-menu-item > a').forEach(link => {
    link.addEventListener('click', (e) => {
      const sub = link.nextElementSibling;
      if (sub && sub.classList.contains('mobile-sub')) {
        e.preventDefault();
        sub.classList.toggle('open');
        const chevron = link.querySelector('.mob-chevron');
        if (chevron) chevron.style.transform = sub.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
      }
    });
  });

  // Close mobile on outside click
  document.addEventListener('click', (e) => {
    if (hamburger && mobileMenu && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });

  // ===== INTERSECTION OBSERVER - FADE ANIMATIONS =====
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .fade-left, .fade-right').forEach(el => observer.observe(el));

  // ===== COUNTER ANIMATION =====
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, step);
  }

  // ===== PROGRESS BARS =====
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-bar-fill');
        if (fill) {
          setTimeout(() => {
            fill.style.width = fill.getAttribute('data-width') + '%';
          }, 200);
        }
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.progress-bar-wrap').forEach(el => progressObserver.observe(el));

  // ===== ACCORDION =====
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close others in same container
      const accordion = item.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.accordion-item.open').forEach(openItem => {
          if (openItem !== item) openItem.classList.remove('open');
        });
      }

      item.classList.toggle('open', !isOpen);
    });
  });

  // ===== TABS =====
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.closest('[data-tabs]') || btn.closest('.tabs-container');
      const target = btn.getAttribute('data-tab');

      if (tabGroup) {
        tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        tabGroup.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const pane = tabGroup.querySelector(`[data-pane="${target}"]`);
        if (pane) pane.classList.add('active');
      }
    });
  });

  // ===== STICKY ACTIVE NAV =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu > li > a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `${current}.html`) {
        link.classList.add('active');
      }
    });
  });

  // ===== COOKIE BANNER =====
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('ef_nexus_cookie')) {
    setTimeout(() => cookieBanner.classList.add('show'), 1200);

    document.getElementById('cookie-accept') && document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem('ef_nexus_cookie', 'accepted');
      cookieBanner.classList.remove('show');
    });

    document.getElementById('cookie-decline') && document.getElementById('cookie-decline').addEventListener('click', () => {
      localStorage.setItem('ef_nexus_cookie', 'declined');
      cookieBanner.classList.remove('show');
    });
  }

  // ===== HERO VIDEO / IMAGE SLIDER =====
  let heroSlide = 0;
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    setInterval(() => {
      heroSlides[heroSlide].classList.remove('active');
      heroSlide = (heroSlide + 1) % heroSlides.length;
      heroSlides[heroSlide].classList.add('active');
    }, 5000);
  }

  // ===== SMOOTH ANCHOR SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== FORM VALIDATION =====
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          valid = false;
          if (group) {
            field.style.borderColor = 'var(--primary-red)';
            let err = group.querySelector('.field-error');
            if (!err) {
              err = document.createElement('span');
              err.className = 'field-error';
              err.style.cssText = 'color:var(--primary-red);font-size:0.8rem;margin-top:4px;display:block;';
              group.appendChild(err);
            }
            err.textContent = 'This field is required';
          }
        } else {
          field.style.borderColor = '';
          const err = group && group.querySelector('.field-error');
          if (err) err.remove();
        }
      });

      if (valid) {
        const btn = form.querySelector('[type="submit"]');
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
          btn.style.background = 'var(--success)';
          form.reset();
          setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        }, 1800);
      }
    });

    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
        const group = field.closest('.form-group');
        const err = group && group.querySelector('.field-error');
        if (err) err.remove();
      });
    });
  });

  // ===== TYPED TEXT EFFECT =====
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const words = typedEl.getAttribute('data-words').split('|');
    let wIdx = 0, cIdx = 0, isDeleting = false;

    function typeNext() {
      const word = words[wIdx];
      typedEl.textContent = isDeleting ? word.substring(0, cIdx - 1) : word.substring(0, cIdx + 1);
      isDeleting ? cIdx-- : cIdx++;

      if (!isDeleting && cIdx === word.length + 1) {
        isDeleting = true;
        setTimeout(typeNext, 1800);
        return;
      }
      if (isDeleting && cIdx === 0) {
        isDeleting = false;
        wIdx = (wIdx + 1) % words.length;
      }

      setTimeout(typeNext, isDeleting ? 60 : 100);
    }

    typeNext();
  }

  // ===== NEWS FILTER =====
  document.querySelectorAll('[data-filter-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('[data-filter-container]');
      if (!container) return;

      container.querySelectorAll('[data-filter-btn]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter-btn');
      container.querySelectorAll('[data-filter-item]').forEach(item => {
        if (filter === 'all' || item.getAttribute('data-filter-item') === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

});

// ===== UTILITY =====
window.EFNexus = {
  showToast(msg, type = 'success') {
    const container = document.getElementById('toast-container') || (() => {
      const c = document.createElement('div');
      c.id = 'toast-container';
      c.className = 'toast-container';
      document.body.appendChild(c);
      return c;
    })();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fa-solid fa-${type === 'success' ? 'circle-check' : type === 'error' ? 'circle-xmark' : 'triangle-exclamation'} toast-icon"></i>
      <span class="toast-text">${msg}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }
};
