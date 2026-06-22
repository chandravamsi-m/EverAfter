// ==========================================================================
// 1. Theme & Direction (RTL) Management
// ==========================================================================
function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const toggles = document.querySelectorAll('.theme-toggle');
  toggles.forEach(toggle => {
    if (isDark) {
      toggle.innerHTML = `
        <svg class="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      `;
    } else {
      toggle.innerHTML = `
        <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      `;
    }
  });
}

function updateDirTexts() {
  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
  const toggles = document.querySelectorAll('.rtl-toggle span');
  toggles.forEach(span => {
    span.textContent = isRtl ? 'LTR' : 'RTL';
  });
}

function initTheme() {
  const theme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (theme === 'dark' || (!theme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcons();
}

function toggleTheme() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
  updateThemeIcons();
}

function initDirection() {
  const dir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', dir);
  updateDirTexts();
}

function toggleDirection() {
  const currentDir = document.documentElement.getAttribute('dir');
  const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
  document.documentElement.setAttribute('dir', newDir);
  localStorage.setItem('dir', newDir);
  updateDirTexts();
}

// Mobile Menu Toggle
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close-btn');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  const panel = document.getElementById('mobile-menu-panel');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      if (panel) {
        menu.classList.remove('hidden');
        setTimeout(() => {
          panel.classList.add('translate-x-0');
        }, 10);
      } else {
        menu.classList.toggle('hidden');
      }
    });
  }

  function closeDrawer() {
    if (panel && menu) {
      panel.classList.remove('translate-x-0');
      setTimeout(() => {
        menu.classList.add('hidden');
      }, 300);
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }
}

// ==========================================================================
// 2. Authentication Page Interactions & Redirects
// ==========================================================================
function initAuthFeatures() {
  // Password Visibility Toggle
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const inputId = this.getAttribute('data-target');
      const input = document.getElementById(inputId);
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          this.innerHTML = `
            <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          `;
        } else {
          input.type = 'password';
          this.innerHTML = `
            <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          `;
        }
      }
    });
  });

  // Handle Login Redirection (now pointing to pages/ folder)
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      if (email.toLowerCase().includes('admin')) {
        window.location.href = 'admin-dashboard.html';
      } else {
        window.location.href = 'user-dashboard.html';
      }
    });
  }

  // Handle Signup Redirection
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = document.getElementById('role').value;
      if (role === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else {
        window.location.href = 'user-dashboard.html';
      }
    });
  }
}

// ==========================================================================
// 3. User & Admin Dashboards Modules
// ==========================================================================
function initDashboardTabs() {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('.dashboard-section');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSectionId = link.getAttribute('data-target');

      // Update active link styling
      sidebarLinks.forEach(item => {
        item.classList.remove('bg-primary-50', 'text-primary-600', 'dark:bg-primary-900/20', 'dark:text-primary-400');
        item.classList.add('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-50', 'dark:hover:bg-gray-800/50');
      });
      link.classList.add('bg-primary-50', 'text-primary-600', 'dark:bg-primary-900/20', 'dark:text-primary-400');
      link.classList.remove('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-50', 'dark:hover:bg-gray-800/50');

      // Switch active section
      sections.forEach(section => {
        if (section.id === targetSectionId) {
          section.classList.remove('hidden');
        } else {
          section.classList.add('hidden');
        }
      });

      // Mobile: collapse sidebar drawer
      const sidebarDrawer = document.getElementById('sidebar-drawer');
      if (sidebarDrawer && !sidebarDrawer.classList.contains('-translate-x-full')) {
        sidebarDrawer.classList.add('-translate-x-full');
      }
    });
  });

  // Mobile Drawer Toggle
  const toggleDrawerBtn = document.getElementById('toggle-sidebar-btn');
  const sidebarDrawer = document.getElementById('sidebar-drawer');
  if (toggleDrawerBtn && sidebarDrawer) {
    toggleDrawerBtn.addEventListener('click', () => {
      sidebarDrawer.classList.toggle('-translate-x-full');
    });
  }
}

// Couple dashboard features
function initUserDashboardFeatures() {
  if (!document.getElementById('user-dashboard-root')) return;

  // Chart setup
  const budgetCtx = document.getElementById('userBudgetChart');
  if (budgetCtx && typeof Chart !== 'undefined') {
    new Chart(budgetCtx, {
      type: 'doughnut',
      data: {
        labels: ['Venue & Catering', 'Photography', 'Florals & Decor', 'Attire', 'Music & Entertainment', 'Miscellaneous'],
        datasets: [{
          data: [15000, 4200, 3500, 2800, 2500, 1500],
          backgroundColor: ['#B28259', '#7A8E85', '#E6D2BF', '#C29B77', '#A3B899', '#D1CDC6'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: document.documentElement.classList.contains('dark') ? '#FAF6F0' : '#1A1A18',
              font: { family: 'Plus Jakarta Sans', size: 12 }
            }
          }
        }
      }
    });
  }

  // Add Expense form
  const expenseForm = document.getElementById('add-expense-form');
  const expenseList = document.getElementById('expense-list');
  if (expenseForm && expenseList) {
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = document.getElementById('expense-category').value;
      const desc = document.getElementById('expense-desc').value;
      const amount = parseFloat(document.getElementById('expense-amount').value);

      if (category && desc && amount) {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-gray-100 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300';
        tr.innerHTML = `
          <td class="py-3 px-4">${desc}</td>
          <td class="py-3 px-4 font-semibold">${category}</td>
          <td class="py-3 px-4 text-right font-medium">$${amount.toLocaleString()}</td>
        `;
        expenseList.prepend(tr);
        expenseForm.reset();
        
        const currentUsedElement = document.getElementById('stat-budget-used');
        if (currentUsedElement) {
          let currentVal = parseFloat(currentUsedElement.innerText.replace(/[^0-9.]/g, ''));
          currentVal += amount;
          currentUsedElement.innerText = `$${currentVal.toLocaleString()}`;
        }
      }
    });
  }

  // Add Guest form
  const addGuestForm = document.getElementById('add-guest-form');
  const guestListTable = document.getElementById('guest-list-table');
  if (addGuestForm && guestListTable) {
    addGuestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guest-name').value;
      const email = document.getElementById('guest-email').value;
      const tableNum = document.getElementById('guest-table').value || '-';
      const rsvp = document.getElementById('guest-rsvp').value;

      let badgeColor = 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      if (rsvp === 'Confirmed') badgeColor = 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      if (rsvp === 'Declined') badgeColor = 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';

      const tr = document.createElement('tr');
      tr.className = 'border-b border-gray-100 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300';
      tr.innerHTML = `
        <td class="py-3 px-4 font-medium">${name}</td>
        <td class="py-3 px-4">${email}</td>
        <td class="py-3 px-4">${tableNum}</td>
        <td class="py-3 px-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}">
            ${rsvp}
          </span>
        </td>
      `;
      guestListTable.prepend(tr);
      addGuestForm.reset();

      const guestCounter = document.getElementById('stat-guests-count');
      if (guestCounter) {
        let count = parseInt(guestCounter.innerText);
        guestCounter.innerText = (count + 1).toString();
      }
    });
  }

  // Pin board addition
  const addPinForm = document.getElementById('add-pin-form');
  const pinsGrid = document.getElementById('pins-grid');
  if (addPinForm && pinsGrid) {
    addPinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = document.getElementById('pin-image-url').value;
      const title = document.getElementById('pin-title').value;
      const cat = document.getElementById('pin-category').value;

      if (url && title) {
        const div = document.createElement('div');
        div.className = 'bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover-lift border border-gray-100 dark:border-gray-800 transition-custom';
        div.innerHTML = `
          <div class="h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
            <img src="${url}" alt="${title}" class="w-full h-full object-cover">
            <span class="absolute top-3 left-3 bg-white/95 dark:bg-black/95 px-3 py-1 rounded-full text-xs font-semibold text-primary-600 dark:text-primary-400">${cat}</span>
          </div>
          <div class="p-4">
            <h4 class="font-serif font-bold text-gray-900 dark:text-white">${title}</h4>
          </div>
        `;
        pinsGrid.prepend(div);
        addPinForm.reset();
      }
    });
  }

  // Checklist updates
  const checklistCheckboxes = document.querySelectorAll('.timeline-checkbox');
  checklistCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const checkedCount = document.querySelectorAll('.timeline-checkbox:checked').length;
      const totalCount = checklistCheckboxes.length;
      const progressPercent = Math.round((checkedCount / totalCount) * 100);
      
      const progressBar = document.getElementById('timeline-progress-bar');
      const progressText = document.getElementById('timeline-progress-text');
      
      if (progressBar) progressBar.style.width = `${progressPercent}%`;
      if (progressText) progressText.innerText = `${progressPercent}%`;
      
      const overviewTasks = document.getElementById('stat-tasks-completed');
      if (overviewTasks) {
        overviewTasks.innerText = `${checkedCount}/${totalCount}`;
      }
    });
  });
}

// Admin dashboard features
function initAdminDashboardFeatures() {
  if (!document.getElementById('admin-dashboard-root')) return;

  const adminCtx = document.getElementById('adminRevenueChart');
  if (adminCtx && typeof Chart !== 'undefined') {
    new Chart(adminCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Monthly Earnings ($)',
          data: [12000, 15000, 18500, 22000, 31000, 28000, 35000, 42000, 39000, 45000, 48000, 52000],
          borderColor: '#B28259',
          backgroundColor: 'rgba(178, 130, 89, 0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            ticks: {
              color: document.documentElement.classList.contains('dark') ? '#FAF6F0' : '#605E5A'
            },
            grid: {
              color: document.documentElement.classList.contains('dark') ? '#2E2D2A' : '#EBE7E0'
            }
          },
          x: {
            ticks: {
              color: document.documentElement.classList.contains('dark') ? '#FAF6F0' : '#605E5A'
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  // Add Client
  const addClientForm = document.getElementById('add-client-form');
  const clientListTable = document.getElementById('client-list-table');
  if (addClientForm && clientListTable) {
    addClientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const couple = document.getElementById('client-couple').value;
      const date = document.getElementById('client-date').value;
      const budget = parseFloat(document.getElementById('client-budget').value);
      const stage = document.getElementById('client-stage').value;

      let badgeColor = 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      if (stage === 'Completed') badgeColor = 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      if (stage === 'Negotiation') badgeColor = 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';

      const tr = document.createElement('tr');
      tr.className = 'border-b border-gray-100 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300';
      tr.innerHTML = `
        <td class="py-3 px-4 font-semibold text-gray-900 dark:text-white">${couple}</td>
        <td class="py-3 px-4">${date}</td>
        <td class="py-3 px-4">$${budget.toLocaleString()}</td>
        <td class="py-3 px-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}">
            ${stage}
          </span>
        </td>
      `;
      clientListTable.prepend(tr);
      addClientForm.reset();

      const clientCount = document.getElementById('stat-active-clients');
      if (clientCount) {
        let count = parseInt(clientCount.innerText);
        clientCount.innerText = (count + 1).toString();
      }
    });
  }
}

// Navbar Scroll Transition
function initNavbarScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  function handleScroll() {
    if (window.scrollY > 50) {
      nav.classList.remove('navbar-transparent-init');
      nav.classList.add('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-md', 'border-b', 'border-gray-100', 'dark:border-gray-800', 'shadow-sm');
    } else {
      nav.classList.add('navbar-transparent-init');
      nav.classList.remove('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-md', 'border-b', 'border-gray-100', 'dark:border-gray-800', 'shadow-sm');
    }
  }

  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

// Document Load Init
function init() {
  initTheme();
  initDirection();
  initMobileMenu();
  initNavbarScroll();
  
  // Attach general listeners
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
  });

  const dirToggles = document.querySelectorAll('.rtl-toggle');
  dirToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleDirection);
  });

  // Mobile drawer dropdown toggle listener
  const drawerDropdownBtns = document.querySelectorAll('.mobile-drawer-dropdown-btn');
  drawerDropdownBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const svg = btn.querySelector('svg');
      if (content) {
        content.classList.toggle('hidden');
      }
      if (svg) {
        svg.classList.toggle('rotate-180');
      }
    });
  });

  // Init Auth logic if on signup/login page
  initAuthFeatures();

  // Init Dashboard tab managers & features
  initDashboardTabs();
  initUserDashboardFeatures();
  initAdminDashboardFeatures();

  // Init homepage estimator slider
  initHomepageCalculator();
}

// ==========================================================================
// 4. Homepage Interactive Modules (Timeline, Estimator, Portfolio Filter, FAQs)
// ==========================================================================

// Timeline Step Switcher
function switchTimelineStep(stepNum) {
  document.querySelectorAll('.timeline-panel').forEach(p => p.classList.add('hidden'));
  const targetPanel = document.getElementById(`timeline-panel-${stepNum}`);
  if (targetPanel) targetPanel.classList.remove('hidden');

  const buttons = document.querySelectorAll('.timeline-tab-btn');
  buttons.forEach(btn => {
    btn.className = "timeline-tab-btn px-4 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-custom border bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-950/20";
  });

  const activeButton = document.getElementById(`timeline-btn-${stepNum}`);
  if (activeButton) {
    activeButton.className = "timeline-tab-btn px-4 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-custom border bg-primary-600 border-primary-600 text-white shadow-md";
  }
}

// Budget Estimator State Variables
let selectedTier = 'partial';
let selectedLocation = 'local';

function selectTier(tierId) {
  selectedTier = tierId;
  const buttons = document.querySelectorAll('.tier-card-btn');
  buttons.forEach(btn => {
    btn.classList.remove('bg-primary-50', 'dark:bg-primary-950/20', 'border-primary-500', 'ring-2', 'ring-primary-500/20', 'text-primary-600', 'font-bold');
    btn.classList.add('bg-white', 'dark:bg-gray-900', 'border-gray-150', 'dark:border-gray-800', 'hover:border-primary-500');
  });

  const activeBtn = document.getElementById(`tier-btn-${tierId}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-white', 'dark:bg-gray-900', 'border-gray-150', 'dark:border-gray-800');
    activeBtn.classList.add('bg-primary-50', 'dark:bg-primary-950/20', 'border-primary-500', 'ring-2', 'ring-primary-500/20', 'text-primary-600', 'font-bold');
  }
  updateBudgetCalculator();
}

function selectLocation(locId) {
  selectedLocation = locId;
  const buttons = document.querySelectorAll('.location-card-btn');
  buttons.forEach(btn => {
    btn.classList.remove('bg-primary-50', 'dark:bg-primary-950/20', 'border-primary-500', 'ring-2', 'ring-primary-500/20', 'text-primary-600', 'font-bold');
    btn.classList.add('bg-white', 'dark:bg-gray-900', 'border-gray-150', 'dark:border-gray-800', 'hover:border-primary-500');
  });

  const activeBtn = document.getElementById(`location-btn-${locId}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-white', 'dark:bg-gray-900', 'border-gray-150', 'dark:border-gray-800');
    activeBtn.classList.add('bg-primary-50', 'dark:bg-primary-950/20', 'border-primary-500', 'ring-2', 'ring-primary-500/20', 'text-primary-600', 'font-bold');
  }
  updateBudgetCalculator();
}

function updateBudgetCalculator() {
  const slider = document.getElementById('guest-slider');
  if (!slider) return;
  const guestCount = parseInt(slider.value);

  const badge = document.getElementById('guest-value');
  if (badge) badge.innerText = `${guestCount} Guests`;

  let basePrice = 0;
  let pricePerGuest = 0;

  if (selectedTier === 'day-of') {
    basePrice = 2500;
    pricePerGuest = 10;
  } else if (selectedTier === 'partial') {
    basePrice = 5000;
    pricePerGuest = 18;
  } else if (selectedTier === 'full') {
    basePrice = 8500;
    pricePerGuest = 25;
  }

  let multiplier = 1.0;
  if (selectedLocation === 'destination') {
    multiplier = 1.4;
  } else if (selectedLocation === 'elopement') {
    multiplier = 0.7;
  }

  const rawEstimate = (basePrice + (guestCount * pricePerGuest)) * multiplier;
  const lowerRange = Math.round((rawEstimate * 0.9) / 50) * 50;
  const upperRange = Math.round((rawEstimate * 1.1) / 50) * 50;

  const resultDisplay = document.getElementById('calculator-result');
  if (resultDisplay) {
    resultDisplay.innerText = `$${lowerRange.toLocaleString()} - $${upperRange.toLocaleString()}`;
  }
}

// Portfolio Category Filter
function filterPortfolio(category) {
  const buttons = document.querySelectorAll('.portfolio-filter-btn');
  buttons.forEach(btn => {
    btn.className = "portfolio-filter-btn px-4 py-2 text-xs font-semibold rounded-full border transition-custom bg-white dark:bg-gray-900 border-gray-150 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary-500";
  });

  const activeBtn = document.getElementById(`portfolio-filter-${category}`);
  if (activeBtn) {
    activeBtn.className = "portfolio-filter-btn px-4 py-2 text-xs font-semibold rounded-full border transition-custom bg-primary-600 border-primary-600 text-white shadow-sm";
  }

  const items = document.querySelectorAll('.portfolio-item');
  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// FAQ Accordion Toggle
function toggleFaq(faqId) {
  const content = document.getElementById(`faq-content-${faqId}`);
  const chevron = document.getElementById(`faq-chevron-${faqId}`);
  
  if (content && chevron) {
    const isHidden = content.classList.contains('hidden');
    
    document.querySelectorAll('.faq-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="faq-chevron-"]').forEach(el => el.classList.remove('rotate-180'));

    if (isHidden) {
      content.classList.remove('hidden');
      chevron.classList.add('rotate-180');
    }
  }
}

// Set up calculator event listeners on load
function initHomepageCalculator() {
  const slider = document.getElementById('guest-slider');
  if (slider) {
    slider.addEventListener('input', updateBudgetCalculator);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
