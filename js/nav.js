// ===================================================
// EF NEXUS - Shared Navigation & Footer Builder
// ===================================================

(function () {
  const LOGO_URL = 'https://www.genspark.ai/api/files/s/l4qnwatw';

  const navHTML = `
  <nav id="navbar">
    <div class="container nav-inner">
      <a class="nav-logo" href="index.html">
        <img src="https://i.pinimg.com/1200x/11/70/a6/1170a68a546fbca34cfdd4afd90d76fa.jpg" alt="EF Nexus Logo" onerror="this.style.display='none'">
        <div class="nav-logo-text">
          <span class="brand">EF NEXUS</span>
          <span class="tagline">EduFacilitators Nexus </span>
        </div>
      </a>

      <ul class="nav-menu">
        <li><a href="index.html">Home</a></li>
        <li>
          <a href="about.html">About Us <i class="fa-solid fa-chevron-down chevron"></i></a>
          <div class="dropdown">
            <a href="about.html#who-we-are"><i class="fa-solid fa-building"></i> Who We Are</a>
            <a href="about.html#vision-mission"><i class="fa-solid fa-eye"></i> Vision & Mission</a>
            <a href="about.html#leadership"><i class="fa-solid fa-users"></i> Leadership</a>
            <a href="about.html#core-values"><i class="fa-solid fa-star"></i> Core Values</a>
            <a href="about.html#company-story"><i class="fa-solid fa-book-open"></i> Company Story</a>
          </div>
        </li>
        <li>
          <a href="divisions.html">Our Divisions <i class="fa-solid fa-chevron-down chevron"></i></a>
          <div class="dropdown">
            <a href="divisions.html#niit"><i class="fa-solid fa-graduation-cap"></i> NIIT</a>
            <a href="divisions.html#consulting"><i class="fa-solid fa-briefcase"></i> EF Nexus Consulting</a>
            <a href="divisions.html#innovation"><i class="fa-solid fa-lightbulb"></i> Innovation Initiatives</a>
            <a href="divisions.html#future"><i class="fa-solid fa-rocket"></i> Future Projects</a>
          </div>
        </li>
        <li>
          <a href="education.html">Education Solutions <i class="fa-solid fa-chevron-down chevron"></i></a>
          <div class="dropdown">
            <a href="education.html#hybrid"><i class="fa-solid fa-laptop-code"></i> Hybrid Learning</a>
            <a href="education.html#ai-learning"><i class="fa-solid fa-brain"></i> AI Learning Systems</a>
            <a href="education.html#digital-support"><i class="fa-solid fa-headset"></i> Digital Ed Support</a>
            <a href="education.html#student-success"><i class="fa-solid fa-trophy"></i> Student Success</a>
          </div>
        </li>
        <li>
          <a href="consulting.html">Consulting <i class="fa-solid fa-chevron-down chevron"></i></a>
          <div class="dropdown">
            <a href="consulting.html#business"><i class="fa-solid fa-chart-line"></i> Business Consulting</a>
            <a href="consulting.html#digital"><i class="fa-solid fa-globe"></i> Digital Transformation</a>
            <a href="consulting.html#ai"><i class="fa-solid fa-microchip"></i> AI Integration</a>
            <a href="consulting.html#training"><i class="fa-solid fa-chalkboard-user"></i> Training & Workshops</a>
          </div>
        </li>
        <li>
          <a href="innovation.html">Innovation & AI <i class="fa-solid fa-chevron-down chevron"></i></a>
          <div class="dropdown">
            <a href="innovation.html#ai-labs"><i class="fa-solid fa-flask"></i> AI Labs</a>
            <a href="innovation.html#edtech"><i class="fa-solid fa-puzzle-piece"></i> EdTech Innovation</a>
            <a href="innovation.html#automation"><i class="fa-solid fa-gears"></i> Automation</a>
            <a href="innovation.html#future-tech"><i class="fa-solid fa-satellite"></i> Future Technologies</a>
          </div>
        </li>
        
        <li>
          <a href="programs.html">Programs <i class="fa-solid fa-chevron-down chevron"></i></a>
          <div class="dropdown">
            <a href="programs.html#youth"><i class="fa-solid fa-person-running"></i> Youth Empowerment</a>
            <a href="programs.html#digital-skills"><i class="fa-solid fa-code"></i> Digital Skills</a>
            <a href="programs.html#bootcamps"><i class="fa-solid fa-robot"></i> AI Bootcamps</a>
            <a href="programs.html#community"><i class="fa-solid fa-people-group"></i> Community Programs</a>
          </div>
        </li>
       
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

  <!-- Mobile Menu -->
  <div class="mobile-menu">
    <div class="mobile-menu-inner">
      <div class="mobile-menu-item"><a href="index.html">Home</a></div>
     <div class="mobile-menu-item">
  <a href="about.html">
    About Us
    <i class="fa-solid fa-chevron-down mob-chevron"></i>
  </a>

  <div class="mobile-sub">
    <a href="about.html#who-we-are">Who We Are</a>
    <a href="about.html#vision-mission">Vision & Mission</a>
    <a href="about.html#leadership">Leadership</a>
    <a href="about.html#core-values">Core Values</a>
    <a href="about.html#company-story">Company Story</a>
  </div>
</div>
       
      <div class="mobile-menu-item">
        <a href="divisions.html">Our Divisions <i class="fa-solid fa-chevron-down mob-chevron" style="transition:all 0.3s;"></i></a>
        <div class="mobile-sub">
          <a href="divisions.html#niit"><i class="fa-solid fa-graduation-cap"></i> NIIT</a>
          <a href="divisions.html#consulting"><i class="fa-solid fa-briefcase"></i> EF Nexus Consulting</a>
          <a href="divisions.html#innovation"><i class="fa-solid fa-lightbulb"></i> Innovation Initiatives</a>
        </div>
      </div>
      <div class="mobile-menu-item">
        <a href="education.html">Education Solutions <i class="fa-solid fa-chevron-down mob-chevron" style="transition:all 0.3s;"></i></a>
        <div class="mobile-sub">
          <a href="education.html#hybrid"><i class="fa-solid fa-laptop-code"></i> Hybrid Learning</a>
          <a href="education.html#ai-learning"><i class="fa-solid fa-brain"></i> AI Learning</a>
        </div>
      </div>
      <div class="mobile-menu-item"><a href="consulting.html">Consulting Services</a></div>
      <div class="mobile-menu-item"><a href="innovation.html">Innovation & AI</a></div>
      <div class="mobile-menu-item"><a href="partnerships.html">Partnerships</a></div>
      <div class="mobile-menu-item"><a href="programs.html">Programs & Initiatives</a></div>
      <div class="mobile-menu-item"><a href="news.html">News & Insights</a></div>
      <div class="mobile-menu-item"><a href="careers.html">Careers</a></div>
      <div class="mobile-menu-item"><a href="contact.html">Contact Us</a></div>
      <div style="padding: 20px 0;">
        <a href="contact.html" class="btn btn-primary" style="width:100%;justify-content:center;">Get Started</a>
      </div>
    </div>
  </div>
  `;

  const footerHTML = `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="https://i.pinimg.com/1200x/11/70/a6/1170a68a546fbca34cfdd4afd90d76fa.jpg" alt="EF Nexus" onerror="this.style.display='none'">
          <p>EduFacilitators Nexus  — the backbone of transformative education and innovation across Africa and beyond. We empower minds, connect institutions, and build futures through technology and knowledge.</p>
          <div class="footer-social">
            <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.instagram.com/efnexus20?igsh=ZmNsMXhreTc2ZXI1" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="divisions.html">Our Divisions</a></li>
            <li><a href="education.html">Education Solutions</a></li>
            <li><a href="consulting.html">Consulting Services</a></li>
            <li><a href="partnerships.html">Partnerships</a></li>
            <li><a href="news.html">News & Insights</a></li>
            <li><a href="careers.html">Careers</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Our Divisions</h4>
          <ul class="footer-links">
            <li><a href="divisions.html#niit">NIIT</a></li>
            <li><a href="programs.html#bootcamps">AI Bootcamps</a></li>
            <li><a href="programs.html#youth">Youth Empowerment</a></li>
            <li><a href="education.html#hybrid">Hybrid Learning</a></li>
            <li><a href="innovation.html#ai-labs">AI Labs</a></li>
            <li><a href="consulting.html#business">Business Consulting</a></li>
            <li><a href="programs.html">Pathora Univ. Prep</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact Us</h4>
          <div class="footer-contact">
            <div class="footer-contact-item">
              <i class="fa-solid fa-location-dot"></i>
              <span>Norrsken House Kigali Regional Office<br>1KN 78 St</span>
            </div>
            <div class="footer-contact-item">
              <i class="fa-solid fa-envelope"></i>
              <span> info@efnexus.space<br> info@efnexus.spac</span>
            </div>
            <div class="footer-contact-item">
              <i class="fa-solid fa-phone"></i>
              <span>+250 786 498 103</span>
            </div>
            <div class="footer-contact-item">
              <i class="fa-solid fa-globe"></i>
              <span><a href="http://www.efnexus.space" style="color:var(--gold);">www.efnexus.space</a></span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} EduFacilitators Nexus . All rights reserved. | Powering Education Across Africa.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="admin.html">Admin</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Cookie Banner -->
  <div id="cookie-banner">
    <p><i class="fa-solid fa-cookie-bite" style="color:var(--gold);margin-right:8px;"></i> We use cookies to enhance your experience. By continuing to browse, you agree to our use of cookies.</p>
    <div class="cookie-btns">
      <button class="btn btn-outline-white btn-sm" id="cookie-decline">Decline</button>
      <button class="btn btn-gold btn-sm" id="cookie-accept">Accept All</button>
    </div>
  </div>

  <!-- Back to Top -->
  <button id="back-to-top" title="Back to top"><i class="fa-solid fa-arrow-up"></i></button>
  `;

  // Inject nav
  const navTarget = document.getElementById('nav-placeholder');
  if (navTarget) navTarget.innerHTML = navHTML;

  // Inject footer
  const footerTarget = document.getElementById('footer-placeholder');
  if (footerTarget) footerTarget.innerHTML = footerHTML;

})();
// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}
