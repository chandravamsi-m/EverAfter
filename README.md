# Wedding Planner & Coordinator — Template Development Blueprint

> Development README for building the "Wedding Planner & Coordinator" HTML/CSS/JS template.
> This document is the single source of truth for architecture, pages, components, and features.
> No frameworks assumed (vanilla HTML/CSS/JS). Minimize external JS plugins.

---

## 1. Template Overview

| Field | Detail |
|---|---|
| **Template Name** | Wedding Planner & Coordinator |
| **Template Category** | Booking/Reservation Template (Service-Based hybrid — Event Planning vertical) |
| **Target Audience** | Wedding planning agencies, independent wedding coordinators, event planning studios; secondary audience: engaged couples using the client-facing dashboard |
| **Template Purpose** | Deliver a premium, emotionally resonant marketing site that showcases a wedding planner's portfolio and services, paired with a couple-facing dashboard for managing vendor bookings, timelines, budgets, and inspiration boards — plus an admin dashboard for the planning agency to manage clients, vendors, and events. |

**Dashboard Required:** Yes — Dual dashboard (User/Couple Dashboard + Admin/Planner Dashboard), per the Booking/Reservation and Directory/Listing template rules in the architecture guide.

---

## 2. Architecture Overview

The template is composed of three distinct experiences sharing one design system:

1. **Public Marketing Website** — Premium, visually-driven site for prospective couples to discover the planner's services, view portfolios of past weddings, and inquire/book a consultation.
2. **User Dashboard (Couple Portal)** — A private, authenticated space where an engaged couple manages their own wedding: vendor bookings, event timeline, budget tracking, and a shared inspiration/mood board.
3. **Admin Dashboard (Planner/Agency Portal)** — Internal tool for the wedding planning business to manage all client couples, vendor relationships, bookings, payments, and overall business reporting.

All three share the same color system, typography, button styles, dark/light mode, and RTL logic, but **Login/Sign Up/Dashboard pages exclude the public navbar and footer**, per guideline.

---

## 3. Public Website Pages

| Page | Purpose |
|---|---|
| **Home 1** | Classic landing — emotive hero, services overview, portfolio teaser, testimonials, CTA |
| **Home 2** | Premium variant of Home 1 — richer visuals, parallax/gallery-forward storytelling, same content pillars, different layout/presentation |
| **About Us** | Planner/agency story, mission, philosophy, meet-the-team/coordinators |
| **Services** | Full breakdown of planning packages (Full Planning, Partial Planning, Day-of Coordination, Destination Weddings, etc.) |
| **Portfolio / Real Weddings** | Gallery of past weddings, filterable by theme/venue/season; links to individual wedding story pages |
| **Single Wedding/Project Detail** | Case-study style page: photos, story, vendors used, couple testimonial |
| **Pricing / Packages** | Comparison of planning package tiers (3-card layout; "Popular" package uses Primary button styling) |
| **Testimonials** | Dedicated social-proof page with couple reviews, ratings, photos |
| **Blog / Wedding Journal** | Planning tips, trends, real-wedding features (content-heavy support page) |
| **Vendors / Partners** | Showcase of trusted vendor network (caterers, florists, photographers, venues) — builds trust and previews dashboard vendor data |
| **Booking / Consultation Request** | Multi-step inquiry form (wedding date, venue status, budget range, guest count) leading into booking flow |
| **Contact** | Contact form, studio address/map, social links |
| **FAQ** | Common planning questions |
| **404 Page** | Custom themed error page with navigation back to Home |
| **Coming Soon** | Pre-launch placeholder page |

---

## 4. Homepage Layouts

### Home 1 — "Classic" Layout
1. Announcement bar (optional — e.g., "Now booking 2027 weddings")
2. Header with dropdown under **Home** (Home 1 / Home 2)
3. Hero — full-width romantic imagery, headline + subheadline, primary CTA ("Plan My Wedding") + secondary CTA ("View Portfolio")
4. Trust strip — featured-in press logos / years of experience / weddings planned counter (animated counter)
5. Services overview — 3–4 service cards (Full Planning, Partial Planning, Day-Of Coordination, Destination)
6. Featured Real Wedding — single large case-study spotlight
7. Why Choose Us — value propositions with icons
8. Process / How It Works — step-by-step planning journey (timeline-style)
9. Testimonials carousel
10. Pricing teaser (3-package preview)
11. Instagram-style inspiration gallery strip
12. Final CTA banner — consultation booking
13. Footer

### Home 2 — "Premium" Layout
1. Header (shared component, dropdown under Home)
2. Immersive hero — split-screen or full-bleed video/image hero with elegant typography overlay, single strong CTA
3. Editorial-style intro statement (large pull-quote framing the brand philosophy)
4. Portfolio masonry/gallery grid (visual-first, more image-forward than Home 1's card layout)
5. Signature services — presented as an editorial list rather than cards (alternating image/text rows)
6. Featured testimonial — full-width quote with couple photo
7. Vendor network highlight (logos/partners section)
8. By-the-numbers stats band (animated counters: weddings planned, vendors partnered, years in business)
9. Journal/blog preview (3 latest posts)
10. Dual CTA banner — "Book a Consultation" / "Explore Packages"
11. Footer

> Both homepages share identical branding (colors, fonts, button styles) per guideline; only layout, content arrangement, and visual treatment differ.

---

## 5. Authentication Pages

No navbar/footer on any auth page. Login and Sign Up are **separate pages** (no toggle).

| Page | Key Elements |
|---|---|
| **Login** | Email/password fields (vertical stack), "Remember Me" + "Forgot Password" on same line, password visibility eye icon, Google/Apple social login buttons with proper logos, CTA width matches input fields |
| **Sign Up** | Couple names (vertical field stack for long name entries), email, password + confirm, role context (Couple vs. Planner/Admin sign-up — separate flows or a selector), social sign-up options, no demo credentials shown |
| **Forgot Password** | Email input, clear instructional copy, submit CTA |
| **Reset Password** | New password + confirm fields, password visibility toggle, strength indicator |

If a card layout is used: logo inside the card; Dark Mode and RTL toggle icons fixed at top-right corner, equal width/height.

---

## 6. User Dashboard Pages (Couple Portal)

| Page | Purpose |
|---|---|
| **Dashboard Overview** | Welcome message ("Welcome back, [Couple Names]"), wedding countdown, quick-stat cards (days left, budget used, tasks completed, vendors booked) |
| **Wedding Timeline** | Visual planning timeline/checklist (12-month, 6-month, day-of milestones), task status indicators |
| **Vendor Bookings** | List of booked/inquired vendors by category (venue, catering, photography, florals, music), booking status, contact details |
| **Budget Tracker** | Budget overview chart, category-wise allocation vs. actual spend, expense log |
| **Inspiration / Mood Board** | Shared visual board — saved images, color palettes, theme notes, pinning/collection interface |
| **Guest List** | Guest management table — RSVP status, meal preference, table assignment |
| **Documents & Contracts** | Vendor contracts, invoices, uploaded files |
| **Messages** | Communication thread with planner/coordinator |
| **Profile** | Couple profile, wedding details (date, venue, guest count) |
| **Settings** | Account settings, notification preferences, theme (dark/light) |
| **Logout** | — |

---

## 7. Admin Dashboard Pages (Planner/Agency Portal)

| Page | Purpose |
|---|---|
| **Admin Overview** | Business stats: active clients, upcoming weddings (next 30/60/90 days), revenue snapshot, pending tasks |
| **Client (Couple) Management** | List/profile view of all couples, wedding dates, planning stage, assigned coordinator |
| **Vendor Management** | Vendor directory — categories, contact info, performance/ratings, availability |
| **Booking Management** | All vendor bookings across clients, status tracking, calendar view |
| **Event Timeline Management** | Master calendar of all weddings, scheduling conflicts view |
| **Content Management** | Manage portfolio entries, blog posts, testimonials shown on public site |
| **Payments & Invoices** | Payment tracking per client, invoice generation/history |
| **Messages/Notifications** | Centralized inbox for client and vendor communications |
| **Reports & Analytics** | Revenue trends, booking conversion rates, popular packages |
| **Settings** | Team/staff management, business profile, integrations config |

> Per guideline: side navigation bar with no unnecessary scrolling; every dashboard page has unique, fully developed content (no placeholder/empty states); includes logout, notifications, and profile icon consistently.

---

## 8. Navigation Structure

### Public Navbar
```
Logo | Home (dropdown: Home 1, Home 2) | About | Services | Portfolio | Pricing | Blog | Contact
                                                                    [Secondary CTA: Login]
                                                                    [Primary CTA: Book Consultation]
                                                                    [Dark/Light Toggle] [RTL Toggle]
```
- Maximum two header CTAs (one Primary, one Secondary) — no extra CTAs.
- Dashboard link, if shown to logged-in users, appears **last** in the header order.
- Icons (theme toggle, RTL toggle) maintain identical width/height across states.

### Dashboard Sidebar (User & Admin — structurally shared, content differs)
```
[Logo]
─────────────
Overview
Timeline / Event Management
Vendor Bookings / Vendor Management
Budget Tracker / Payments
Inspiration Board / Content Management
Guest List / Client Management   (User / Admin respectively)
Messages
Documents / Reports
─────────────
Settings
Profile
Logout
```
- Persistent, collapsible on tablet; converts to off-canvas drawer on mobile.
- Active state clearly indicated; icons from a professional library (Lucide/Heroicons), no colored icons.

---

## 9. Component Library

**Shared / Global**
- Header (with Home dropdown, CTA pair, theme + RTL toggles)
- Footer (sitemap links, social icons, newsletter signup placeholder)
- Buttons (Primary, Secondary — consistent shape/size/color/behavior across the whole site)
- Form elements (input, textarea, select, checkbox, radio) with client-side validation states + tooltips
- Modal / Dialog
- Toast / Notification banner
- Skeleton loaders (for dashboard data, vendor lists, gallery loads)
- Breadcrumbs

**Marketing Site Specific**
- Hero section (two variants: Home 1 / Home 2)
- Service card
- Portfolio/gallery grid item + lightbox
- Testimonial card / carousel
- Pricing card (3-card layout, "Popular" plan in Primary style, others Secondary)
- Animated stat counter
- Step/process timeline component
- Blog card

**Dashboard Specific**
- Sidebar navigation (with active/hover states, icon + label)
- Dashboard summary card (stat + icon + trend indicator)
- Data table (sortable, paginated — for vendors, guests, bookings, invoices)
- Budget chart (progress bar / donut chart component)
- Booking status badge (Confirmed / Pending / Cancelled)
- Inspiration board pin/card with tagging
- Timeline/checklist item (with completion toggle)
- Notification dropdown
- Profile menu dropdown

**Authentication Specific**
- Auth card container (logo inside card, theme/RTL icons top-right)
- Social login button group
- Password input with visibility toggle
- Form-pair line element (Remember Me + Forgot Password)

---

## 10. Feature Breakdown

Derived directly from the requirement description:

- **Vendor booking system UI** — browse, request, and track vendor bookings by category, with status states (Inquired / Confirmed / Paid / Completed)
- **Event timeline / planning checklist** — milestone-based wedding planning timeline shared between couple and planner
- **Budget tracking tool** — category-based budget allocation vs. actual spend, visualized with progress/donut charts
- **Inspiration / mood board** — collaborative visual board for couples to save and organize design inspiration, shareable with the planner
- **Guest list management** — RSVP and seating data table
- **Portfolio showcase** — filterable real-wedding gallery on the public site
- **Multi-step consultation/booking inquiry form** — captures wedding date, venue, budget range, guest count
- **Package/pricing comparison** — 3-tier package display with highlighted "Popular" tier
- **Admin client & vendor management** — centralized CRM-style views for the agency
- **Dark/Light mode** with automatic system preference detection
- **RTL layout support** for Arabic/Hebrew markets
- **Accessibility (WCAG 2.1 AA)** — keyboard navigation, screen-reader support, proper contrast in both themes

---

## 11. Folder Structure

```
wedding-planner-template/
├── assets/
│   ├── css/
│   │   ├── style.css              (main/shared styles, design tokens via CSS variables)
│   │   ├── dark-mode.css
│   │   ├── rtl.css
│   │   └── dashboard.css          (dashboard-specific layout styles)
│   ├── js/
│   │   ├── main.js                (public site interactions: nav dropdown, theme toggle)
│   │   ├── dashboard.js           (sidebar nav, charts init, table interactions)
│   │   ├── auth.js                (form validation for login/signup/reset)
│   │   └── plugins/               (minimal third-party JS, e.g., lightbox, chart lib)
│   ├── images/
│   │   ├── portfolio/
│   │   ├── hero/
│   │   └── icons/
│   └── fonts/
├── pages/
│   ├── index.html                 (Home 1)
│   ├── home-2.html
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   ├── portfolio-single.html
│   ├── pricing.html
│   ├── testimonials.html
│   ├── blog.html
│   ├── blog-single.html
│   ├── vendors.html
│   ├── booking-inquiry.html
│   ├── contact.html
│   ├── faq.html
│   ├── 404.html
│   └── coming-soon.html
├── auth/
│   ├── login.html
│   ├── signup.html
│   ├── forgot-password.html
│   └── reset-password.html
├── dashboard/
│   ├── user/
│   │   ├── overview.html
│   │   ├── timeline.html
│   │   ├── vendor-bookings.html
│   │   ├── budget-tracker.html
│   │   ├── inspiration-board.html
│   │   ├── guest-list.html
│   │   ├── documents.html
│   │   ├── messages.html
│   │   ├── profile.html
│   │   └── settings.html
│   └── admin/
│       ├── overview.html
│       ├── client-management.html
│       ├── vendor-management.html
│       ├── booking-management.html
│       ├── event-timeline.html
│       ├── content-management.html
│       ├── payments.html
│       ├── reports.html
│       └── settings.html
├── documentation/
│   ├── installation-guide.md
│   ├── customization-guide.md
│   ├── page-structure.md
│   └── credits.md
└── README.md
```

---

## 12. Responsive Design Strategy

Mobile-first build, following standard breakpoints:

```
Mobile:  < 640px
Tablet:  640px – 1024px
Desktop: 1024px – 1280px
Large:   > 1280px
```

- **Mobile:** Hamburger menu replaces header nav (Home dropdown becomes accordion); dashboard sidebar collapses into an off-canvas drawer triggered by a menu icon; touch targets minimum 44px; hover-dependent interactions (e.g., portfolio gallery hover reveals) are replaced with tap states; data tables (guest list, bookings) simplify into stacked card views; images served at reduced/optimized sizes.
- **Tablet:** Two-column layouts for service/portfolio grids; sidebar may auto-collapse to icon-only with expand-on-tap.
- **Desktop:** Full multi-column grids, persistent expanded sidebar, hover-enabled interactions enabled.
- **Large:** Max-width content containers to prevent overly wide line lengths; additional whitespace, not additional density.

---

## 13. Animation & Interaction Ideas

- Subtle fade/slide-in on scroll for portfolio gallery items and service cards
- Animated counters for "weddings planned," "years of experience," "vendors partnered" stats
- Hover lift + shadow on portfolio/service cards (desktop only — tap/active state equivalent on mobile)
- Smooth accordion expand for the Home navigation dropdown
- Animated progress bars/donut charts on the Budget Tracker page (animate on view)
- Checklist item completion micro-interaction (checkmark animation) on the Timeline page
- Sidebar active-link indicator slide/transition between dashboard sections
- Skeleton-loader shimmer while dashboard data (bookings, charts, tables) loads
- Soft cross-fade transition between Home 1 and Home 2 hero imagery if linked via toggle/preview
- Toast slide-in for booking confirmations / form submission success

All animations should remain subtle and performance-conscious, reduced or disabled on mobile per guideline.

---

## 14. SEO & Performance Strategy

**On-Page SEO**
- Unique, descriptive title tags per page (≤60 characters) — e.g., "Wedding Planning Packages | [Brand]"
- Meta descriptions (150–160 characters) tailored per page, emphasizing premium positioning
- Single H1 per page with correct heading hierarchy (H2/H3 for sections)
- Image alt text for all portfolio/gallery images; WebP format with fallback
- JSON-LD structured data for: LocalBusiness/EventPlanner schema, Reviews/AggregateRating (testimonials), and Event schema where applicable
- XML sitemap and production-ready robots.txt included
- Clean, descriptive URLs (e.g., `/portfolio/garden-wedding-hyderabad`)

**Performance Targets**
- PageSpeed score: 90+ on mobile and desktop
- LCP < 2.5s, FID < 100ms, CLS < 0.1
- Optimize hero and portfolio imagery aggressively (largest content on the site); lazy-load below-the-fold gallery images
- Minify CSS/JS for production; no console logs shipped

---

## 15. Development Notes

- Build the **shared design system first** (CSS variables for color, spacing scale on a 4px/8px base unit, typography — max 2–3 font families, Google Fonts preferred) before building individual pages, since both homepages and both dashboards must inherit identical tokens.
- Use only **two primary brand colors** site-wide; reserve additional colors strictly for status indicators (e.g., booking status badges, budget over/under indicators).
- Build Home 1 and Home 2 from the same component library — differentiate via layout/composition, not by introducing new design tokens.
- Authentication and dashboard pages are built as a separate layout shell (no shared navbar/footer partial) — keep this distinct from the public site's header/footer include.
- Treat the **Vendor Bookings**, **Budget Tracker**, and **Inspiration Board** pages as the core differentiators of this template — invest the most design/interaction effort here, since they are the unique selling features named in the client requirement.
- Use placeholder data that feels real (realistic couple names, vendor categories, believable budget figures) rather than Lorem Ipsum, especially in dashboard views, to sell the premium positioning.
- Keep external JS plugin usage minimal — a lightweight chart library (for budget visualizations) and a lightbox/gallery script (for portfolio) are the only plugins likely necessary; everything else (dropdowns, theme toggle, tab switching, form validation) should be hand-built vanilla JS.
- Validate all pages with the W3C validator and test keyboard navigation + screen reader flow before final delivery, per the quality checklist.
- Document customization points (brand colors, fonts, content placeholders) clearly in `documentation/customization-guide.md` so end-users can rebrand without touching core logic.
