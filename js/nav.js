// ===================================================
// EF NEXUS - SAFE NAV + FOOTER INJECTION
// FIXED: DOM timing + reliability issues
// ===================================================

document.addEventListener("DOMContentLoaded", function () {

  const navHTML = `
  <nav id="navbar">
    <div class="container nav-inner">
      <a class="nav-logo" href="index.html">
        <img src="https://i.pinimg.com/1200x/11/70/a6/1170a68a546fbca34cfdd4afd90d76fa.jpg" alt="EF Nexus Logo">
        <div class="nav-logo-text">
          <span class="brand">EF NEXUS</span>
          <span class="tagline">EduFacilitators Nexus</span>
        </div>
      </a>

      <ul class="nav-menu">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="divisions.html">Divisions</a></li>
        <li><a href="education.html">Education</a></li>
        <li><a href="consulting.html">Consulting</a></li>
        <li><a href="innovation.html">Innovation</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>

      <div class="nav-cta">
        <a href="contact.html" class="btn btn-primary btn-sm">Get Started</a>
      </div>

      <button class="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <div class="mobile-menu">
    <div class="mobile-menu-inner">
      <div class="mobile-menu-item"><a href="index.html">Home</a></div>
      <div class="mobile-menu-item"><a href="about.html">About</a></div>
      <div class="mobile-menu-item"><a href="divisions.html">Divisions</a></div>
      <div class="mobile-menu-item"><a href="education.html">Education</a></div>
      <div class="mobile-menu-item"><a href="consulting.html">Consulting</a></div>
      <div class="mobile-menu-item"><a href="innovation.html">Innovation</a></div>
      <div class="mobile-menu-item"><a href="contact.html">Contact</a></div>
    </div>
  </div>
  `;

  const footerHTML = `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="https://i.pinimg.com/1200x/11/70/a6/1170a68a546fbca34cfdd4afd90d76fa.jpg" alt="EF Nexus">
          <p>EduFacilitators Nexus — empowering education and innovation globally.</p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} EF Nexus. All rights reserved.</p>
      </div>
    </div>
  </footer>
  `;

  // SAFE INJECTION (prevents null errors)
  const navTarget = document.getElementById("nav-placeholder");
  const footerTarget = document.getElementById("footer-placeholder");

  if (navTarget) {
    navTarget.innerHTML = navHTML;
  } else {
    console.warn("Nav placeholder missing");
  }

  if (footerTarget) {
    footerTarget.innerHTML = footerHTML;
  } else {
    console.warn("Footer placeholder missing");
  }

  // SAFE mobile menu binding (after injection)
  function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!hamburger || !mobileMenu) return;

  // avoid double-binding
  if (hamburger.dataset.bound === "true") return;
  hamburger.dataset.bound = "true";

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });
}

// Run immediately if already exists
initMobileMenu();

// Also watch for injected nav
const observer = new MutationObserver(() => {
  initMobileMenu();
});

observer.observe(document.body, { childList: true, subtree: true });
