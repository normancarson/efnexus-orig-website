# EF NEXUS — EduFacilitators Nexus Ltd
### Official Website Documentation

---

## 🏢 About This Project

This is the official website for **EduFacilitators Nexus Ltd (EF Nexus)** — Africa's premier education holding company and the institutional backbone of NIIT (Nexus Institute of Innovation and Technology). The website showcases all divisions, programs, partnerships, and initiatives.

**Brand Colors:** Blue `#1356B5` | Red `#F52D2D` | Gold `#F5A623` | Dark Navy `#071E4A`

---

## ✅ Completed Features

- **10 Full Pages:** Home, About Us, Our Divisions, Education Solutions, Consulting Services, Innovation & AI, Partnerships, Programs & Initiatives, News & Insights, Careers, Contact Us
- **Admin Portal** (`admin.html`) — full content management system
- **Responsive Design** — works on mobile, tablet, desktop
- **Animated Navigation** — scroll-responsive, dropdown menus, mobile hamburger
- **Hero Section** — animated typed text, floating stats, division cards
- **Ticker Bar** — live news ticker
- **Partner Overflow Marquee** — 3 rows of animated partner chips (like efnexus.space)
- **Smooth Animations** — fade-in, counter animations, progress bars
- **Contact Forms** — inquiry and partnership request forms
- **News Filtering** — filter by category
- **Tabs System** — Education Solutions with 4 tabbed content areas
- **NIIT Division** — prominently featured with "Visit NIIT Website" button (link placeholder ready)
- **Pathora University Prep Program** — dedicated section and process guide
- **Cookie Banner, Back-to-Top Button**
- **Footer** — with 4-column layout, social links, contact info

---

## 📁 File Structure

```
/
├── index.html              ← Home page
├── about.html              ← About Us page
├── divisions.html          ← Our Divisions (NIIT + others)
├── education.html          ← Education Solutions (tabbed)
├── consulting.html         ← Consulting Services
├── innovation.html         ← Innovation & AI
├── partnerships.html       ← Partnerships (overflow marquee)
├── programs.html           ← Programs & Initiatives (Pathora)
├── news.html               ← News & Insights
├── careers.html            ← Careers
├── contact.html            ← Contact Us
├── admin.html              ← Admin Portal
│
├── css/
│   ├── style.css           ← Main website styles
│   └── admin.css           ← Admin portal styles
│
├── js/
│   ├── main.js             ← Site-wide JavaScript
│   ├── nav.js              ← Shared navigation & footer builder
│   └── admin.js            ← Admin portal logic
│
└── README.md
```

---

## 🔗 Critical Links to Update

| Location | Placeholder | What to Insert |
|----------|-------------|----------------|
| `index.html` line ~130 | `NIIT_WEBSITE_LINK_HERE` | Your NIIT website URL |
| `divisions.html` line ~50 | `NIIT_WEBSITE_LINK_HERE` | Your NIIT website URL |
| `js/nav.js` | Social media `href="#"` | Real social media URLs |
| `contact.html` | Phone placeholder | Real phone number |
| `contact.html` | Map embed placeholder | Google Maps embed |

---

## 🔐 Admin Portal

**URL:** `admin.html`  
**Default Credentials:**
- Username: `admin`
- Password: `efnexus2025`

### Admin Portal Features:
| Section | What You Can Do |
|---------|-----------------|
| **News & Articles** | Add, edit, delete news articles with images, categories, dates |
| **Photo Gallery** | Update images on any page section without editing HTML |
| **Partners** | Add/manage partner organizations |
| **Team & Leadership** | Add team members with photos and bios |
| **Job Listings** | Post/manage open positions |
| **Programs** | Manage programs and initiatives |
| **Settings** | Update NIIT URL, change admin password |

> **Note:** Admin data is stored in `localStorage` for this static site version. For production deployment with a backend, the `DB` object in `js/admin.js` should be replaced with API calls.

---

## 💻 Using in VS Code

1. **Open folder** in VS Code
2. **Install Live Server extension** (ritwickdey.LiveServer)
3. **Right-click `index.html`** → "Open with Live Server"
4. All pages will be accessible via `http://127.0.0.1:5500/`

### To Permanently Update NIIT Links:
Search for `NIIT_WEBSITE_LINK_HERE` (Ctrl+Shift+F) and replace with your NIIT website URL.

### To Replace Placeholder Images:
Each image has an `id` attribute (e.g., `id="home-overview-img"`). Replace the `src` URL with your hosted image URL.

---

## 🌍 Navigation Structure

```
Home → Hero, Overview, Divisions, AI Section, CTA, Partners, News
About Us → Who We Are, Vision/Mission, Leadership, Core Values, Story
Our Divisions → NIIT (with external link), Consulting, Innovation, Future
Education Solutions → Hybrid, AI Systems, Digital Support, Student Success
Consulting → Business, Digital Transformation, AI Integration, Workshops
Innovation & AI → AI Labs, EdTech, Automation, Future Tech
Partnerships → Overflow Marquee, 4 Partner Types, Partnership Form
Programs → Pathora University Prep, Youth, Digital Skills, AI Bootcamps
News & Insights → Filtered articles grid, Newsletter signup
Careers → Open Positions, Internships, Application Form
Contact → Dual forms (General + Partnership), Office Info
```

---

## 🚀 Next Steps / Recommendations

1. **Insert NIIT Website URL** — Replace `NIIT_WEBSITE_LINK_HERE` in HTML files
2. **Add real team photos** — Use Admin Portal > Team section  
3. **Add office location** — Update contact.html with real address + Google Maps embed
4. **Add social media links** — Update `js/nav.js` social media `href` attributes
5. **Add real phone number** — Update footer and contact page
6. **Add partner logos** — Replace icon-based partner chips with actual logos
7. **Connect form backend** — Integrate contact forms with Formspree, EmailJS, or custom backend
8. **Add Google Analytics** — Insert tracking script before `</head>`
9. **Upgrade admin to backend** — For production, replace localStorage with a real API/database
10. **Add SSL/HTTPS** — Ensure site runs on HTTPS for security

---

## 📝 Notes

- All Unsplash images used are placeholder images — replace with EF Nexus's actual photos
- Admin portal uses `localStorage` — data persists in the browser but is not shared across devices
- The NIIT "Visit Website" button appears in: `index.html`, `divisions.html`, and navigation dropdowns
- Partnership overflow marquee on `partnerships.html` features 3 animated rows of partner organizations

---

*EduFacilitators Nexus Ltd — Powering Education Across Africa and Beyond*
