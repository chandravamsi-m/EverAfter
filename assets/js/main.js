// ==========================================================================
// 1. Theme & Direction (RTL) Management
// ==========================================================================
function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const toggles = document.querySelectorAll('.theme-toggle');
  toggles.forEach(toggle => {
    if (isDark) {
      toggle.innerHTML = `
        <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

  // Update active Chart.js colors dynamically on theme switch
  if (window.activeCharts) {
    window.activeCharts.forEach(chart => {
      const darkEnabled = document.documentElement.classList.contains('dark');
      if (chart.config.type === 'doughnut') {
        if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
          chart.options.plugins.legend.labels.color = darkEnabled ? '#FAF6F0' : '#1A1A18';
        }
      } else if (chart.config.type === 'line') {
        if (chart.options.scales) {
          if (chart.options.scales.x && chart.options.scales.x.ticks) {
            chart.options.scales.x.ticks.color = darkEnabled ? '#FAF6F0' : '#605E5A';
          }
          if (chart.options.scales.y && chart.options.scales.y.ticks) {
            chart.options.scales.y.ticks.color = darkEnabled ? '#FAF6F0' : '#605E5A';
          }
        }
      }
      chart.update();
    });
  }
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

      // Force Chart.js to recalculate dimensions and redraw now that container is visible
      if (window.activeCharts) {
        window.activeCharts.forEach(chart => {
          chart.resize();
          chart.update();
        });
      }

      // Scroll viewport back to the top
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      const mainContainer = document.querySelector('main');
      if (mainContainer) {
        mainContainer.scrollTop = 0;
      }

      // Update dynamic header text
      const headerTitle = document.querySelector('header h1');
      const headerSubtitle = document.querySelector('header p');
      const newTitle = link.getAttribute('data-title');
      const newSubtitle = link.getAttribute('data-subtitle');
      if (headerTitle && newTitle) {
        headerTitle.textContent = newTitle;
      }
      if (headerSubtitle && newSubtitle) {
        headerSubtitle.textContent = newSubtitle;
      }

      // Mobile: collapse sidebar drawer
      closeSidebar();
    });
  });

  // Mobile Drawer Toggle
  const toggleDrawerBtn = document.getElementById('toggle-sidebar-btn');
  const sidebarDrawer = document.getElementById('sidebar-drawer');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');

  function closeSidebar() {
    if (sidebarDrawer) {
      sidebarDrawer.classList.add('-translate-x-full');
    }
    if (sidebarBackdrop) {
      sidebarBackdrop.classList.add('hidden');
    }
  }

  function openSidebar() {
    if (sidebarDrawer) {
      sidebarDrawer.classList.remove('-translate-x-full');
    }
    if (sidebarBackdrop) {
      sidebarBackdrop.classList.remove('hidden');
    }
  }

  if (toggleDrawerBtn && sidebarDrawer) {
    toggleDrawerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebarDrawer.classList.contains('-translate-x-full')) {
        openSidebar();
      } else {
        closeSidebar();
      }
    });
  }

  const closeDrawerBtn = document.getElementById('close-sidebar-btn');
  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeSidebar);
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeSidebar);
  }
}

// Couple dashboard features
function initUserDashboardFeatures() {
  if (!document.getElementById('user-dashboard-root')) return;

  // Add Expense form
  const expenseForm = document.getElementById('add-expense-form');
  const expenseList = document.getElementById('expense-list');

  function updateBudgetCalculations() {
    if (!expenseList) return;
    const totalLimit = 50000;
    let totalAllocated = 0;
    
    const categoryTotals = {
      'Venue & Catering': 0,
      'Photography': 0,
      'Florals & Decor': 0,
      'Attire': 0,
      'Music & Entertainment': 0,
      'Miscellaneous': 0
    };

    const rows = expenseList.querySelectorAll('tr');
    rows.forEach(row => {
      const categoryCell = row.cells[1];
      const amountCell = row.cells[2];
      if (categoryCell && amountCell) {
        const category = categoryCell.textContent.trim();
        const amount = parseFloat(amountCell.textContent.replace(/[^0-9.]/g, '')) || 0;
        totalAllocated += amount;
        if (categoryTotals.hasOwnProperty(category)) {
          categoryTotals[category] += amount;
        }
      }
    });

    const remaining = totalLimit - totalAllocated;
    const percentage = totalLimit > 0 ? Math.round((totalAllocated / totalLimit) * 100) : 0;

    const statUsed = document.getElementById('stat-budget-used');
    const statRemaining = document.getElementById('stat-budget-remaining');
    const overviewUsed = document.getElementById('overview-budget-used');
    const overviewSubtext = document.getElementById('overview-budget-subtext');

    if (statUsed) statUsed.innerText = `$${totalAllocated.toLocaleString()}`;
    if (statRemaining) {
      statRemaining.innerText = `$${remaining.toLocaleString()}`;
      if (remaining < 0) {
        statRemaining.className = 'text-2xl font-serif font-bold text-red-655';
      } else {
        statRemaining.className = 'text-2xl font-serif font-bold text-green-600';
      }
    }
    if (overviewUsed) overviewUsed.innerText = `$${totalAllocated.toLocaleString()}`;
    if (overviewSubtext) {
      overviewSubtext.innerText = `Out of $${totalLimit.toLocaleString()} budget • ${percentage}%`;
      if (remaining < 0) {
        overviewSubtext.className = 'text-xs font-semibold text-red-655';
      } else {
        overviewSubtext.className = 'text-xs font-semibold text-primary-600 dark:text-primary-400';
      }
    }

    const progressBar = document.getElementById('budget-progress-bar');
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
      if (remaining < 0) {
        progressBar.className = 'bg-red-500 h-3 rounded-full transition-all duration-500';
      } else {
        progressBar.className = 'bg-primary-500 h-3 rounded-full transition-all duration-500';
      }
    }
  }

  if (expenseForm && expenseList) {
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = document.getElementById('expense-category').value;
      const desc = document.getElementById('expense-desc').value;
      const amount = parseFloat(document.getElementById('expense-amount').value);

      if (category && desc && amount) {
        const tr = document.createElement('tr');
        tr.className = 'flex flex-col md:table-row border-b border-gray-100 dark:border-gray-800 text-sm text-gray-755 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors p-4 md:p-0 mb-4 md:mb-0 bg-white dark:bg-gray-900 rounded-xl md:rounded-none border md:border-0 border-gray-100 dark:border-gray-800 shadow-xs md:shadow-none';
        tr.innerHTML = `
          <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6 font-semibold text-gray-900 dark:text-white">
            <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Description:</span>
            <span>${desc}</span>
          </td>
          <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6">
            <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Category:</span>
            <span>${category}</span>
          </td>
          <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6 text-start md:text-end font-medium text-primary-600 dark:text-primary-400">
            <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Amount:</span>
            <span>$${amount.toLocaleString()}</span>
          </td>
          <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6 text-end">
            <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Action:</span>
            <button class="remove-expense-btn text-xs text-red-655 hover:text-red-800 dark:hover:text-red-400 font-semibold">Remove</button>
          </td>
        `;
        expenseList.prepend(tr);
        expenseForm.reset();
        updateBudgetCalculations();
      }
    });

    expenseList.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-expense-btn') || e.target.closest('.remove-expense-btn')) {
        const btn = e.target.classList.contains('remove-expense-btn') ? e.target : e.target.closest('.remove-expense-btn');
        const row = btn.closest('tr');
        if (row) {
          row.remove();
          updateBudgetCalculations();
        }
      }
    });

    // Initialize calculations on load
    updateBudgetCalculations();
  }

  // Add Guest form Toggles
  const toggleAddGuestBtn = document.getElementById('toggle-add-guest-btn');
  const cancelGuestBtn = document.getElementById('cancel-guest-btn');
  const addGuestPanel = document.getElementById('add-guest-panel');

  if (toggleAddGuestBtn && addGuestPanel) {
    toggleAddGuestBtn.addEventListener('click', () => {
      addGuestPanel.classList.toggle('hidden');
    });
  }

  if (cancelGuestBtn && addGuestPanel) {
    cancelGuestBtn.addEventListener('click', () => {
      addGuestPanel.classList.add('hidden');
      if (addGuestForm) addGuestForm.reset();
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
      const dietary = document.getElementById('guest-dietary').value || 'None';
      const rsvp = document.getElementById('guest-rsvp').value;

      let badgeColor = 'bg-yellow-50 text-yellow-750 dark:bg-yellow-950/20 dark:text-yellow-405';
      if (rsvp === 'Confirmed') badgeColor = 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400';
      if (rsvp === 'Declined') badgeColor = 'bg-red-50 text-red-750 dark:bg-red-950/20 dark:text-red-400';

      const dietaryClass = dietary !== 'None' && dietary !== '' ? 'font-semibold text-amber-600' : 'italic text-gray-400';

      const tr = document.createElement('tr');
      tr.className = 'flex flex-col md:table-row border-b border-gray-100 dark:border-gray-800 text-sm text-gray-757 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors p-4 md:p-0 mb-4 md:mb-0 bg-white dark:bg-gray-900 rounded-xl md:rounded-none border md:border-0 border-gray-100 dark:border-gray-800 shadow-xs md:shadow-none';
      tr.innerHTML = `
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6 font-semibold text-gray-900 dark:text-white">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Name:</span>
          <span>${name}</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Email:</span>
          <span>${email}</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6 font-medium text-primary-600 dark:text-primary-400">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Table:</span>
          <span>${tableNum}</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Dietary Needs:</span>
          <span class="text-xs ${dietaryClass}">${dietary}</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Status:</span>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor}">
            ${rsvp}
          </span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6 text-end">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Action:</span>
          <button type="button" class="text-xs text-red-655 hover:text-red-800 dark:hover:text-red-400 font-semibold" onclick="this.closest('tr').remove()">Remove</button>
        </td>
      `;
      guestListTable.prepend(tr);
      addGuestForm.reset();
      if (addGuestPanel) {
        addGuestPanel.classList.add('hidden');
      }

      const guestCounter = document.getElementById('stat-guests-count');
      if (guestCounter) {
        let count = parseInt(guestCounter.innerText);
        guestCounter.innerText = (count + 1).toString();
      }
    });
  }

  // Vendor Bookings Management
  const toggleAddVendorBtn = document.getElementById('toggle-add-vendor-btn');
  const cancelVendorBtn = document.getElementById('cancel-vendor-btn');
  const addVendorPanel = document.getElementById('add-vendor-panel');
  const addVendorForm = document.getElementById('add-vendor-form');
  const vendorListGrid = document.getElementById('vendor-list-grid');

  function updateVendorCalculations() {
    if (!vendorListGrid) return;
    const cards = vendorListGrid.children;
    const totalCount = cards.length;
    let confirmedCount = 0;
    let pendingCount = 0;

    for (let i = 0; i < cards.length; i++) {
      const badge = cards[i].querySelector('.vendor-status-badge');
      if (badge) {
        const text = badge.textContent.trim().toLowerCase();
        if (text === 'confirmed') {
          confirmedCount++;
        } else {
          pendingCount++;
        }
      }
    }

    const statCount = document.getElementById('stat-vendors-count');
    const statSubtext = document.getElementById('stat-vendors-subtext');

    if (statCount) {
      statCount.innerText = `${confirmedCount}/${totalCount} Contracts`;
    }
    if (statSubtext) {
      if (pendingCount > 0) {
        statSubtext.innerText = `${pendingCount} pending coordinator review`;
        statSubtext.className = 'text-[10px] text-amber-655 mt-1';
      } else {
        statSubtext.innerText = `All bookings finalized`;
        statSubtext.className = 'text-[10px] text-green-600 mt-1';
      }
    }
  }

  if (toggleAddVendorBtn && addVendorPanel) {
    toggleAddVendorBtn.addEventListener('click', () => {
      addVendorPanel.classList.toggle('hidden');
    });
  }

  if (cancelVendorBtn && addVendorPanel) {
    cancelVendorBtn.addEventListener('click', () => {
      addVendorPanel.classList.add('hidden');
      if (addVendorForm) addVendorForm.reset();
    });
  }

  if (addVendorForm && vendorListGrid) {
    addVendorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('vendor-name').value;
      const category = document.getElementById('vendor-category').value;
      const contact = document.getElementById('vendor-contact').value;
      const deposit = parseFloat(document.getElementById('vendor-deposit').value) || 0;
      const total = parseFloat(document.getElementById('vendor-total').value) || 0;
      const status = document.getElementById('vendor-status').value;

      let badgeColor = 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400';
      if (status === 'Confirmed') {
        badgeColor = 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400';
      } else if (status === 'Proposal Shared') {
        badgeColor = 'bg-blue-50 text-blue-750 dark:bg-blue-950/20 dark:text-blue-400';
      }

      const percent = total > 0 ? Math.round((deposit / total) * 100) : 0;
      const barColor = percent === 100 ? 'bg-green-500' : (percent > 0 ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-700');

      const card = document.createElement('div');
      card.className = 'bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4 flex flex-col justify-between';
      card.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="vendor-status-badge text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeColor}">${status}</span>
            <span class="text-xs font-bold uppercase text-gray-400 tracking-wider">${category}</span>
          </div>
          <div>
            <h3 class="font-serif text-xl font-bold text-gray-900 dark:text-white">${name}</h3>
            <p class="text-xs text-gray-505 mt-1">Contact: ${contact}</p>
          </div>
          <div class="space-y-1">
            <div class="flex justify-between text-xs text-gray-500">
              <span>Deposit Paid</span>
              <span>$${deposit.toLocaleString()} / $${total.toLocaleString()}</span>
            </div>
            <div class="w-full bg-gray-100 dark:bg-gray-850 h-1.5 rounded-full">
              <div class="${barColor} h-1.5 rounded-full" style="width: ${percent}%"></div>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
          <a href="#" class="inline-flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400 font-bold hover:underline">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Download Quote (PDF)</span>
          </a>
          <button class="remove-vendor-btn text-xs text-red-655 hover:text-red-800 dark:hover:text-red-400 font-semibold">Remove</button>
        </div>
      `;

      vendorListGrid.prepend(card);
      addVendorForm.reset();
      addVendorPanel.classList.add('hidden');
      updateVendorCalculations();
    });
  }

  if (vendorListGrid) {
    vendorListGrid.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-vendor-btn') || e.target.closest('.remove-vendor-btn')) {
        const btn = e.target.classList.contains('remove-vendor-btn') ? e.target : e.target.closest('.remove-vendor-btn');
        const card = btn.closest('.bg-white');
        if (card) {
          card.remove();
          updateVendorCalculations();
        }
      }
    });

    // Run initial counts on load
    updateVendorCalculations();
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
  let adminChart;
  if (adminCtx && typeof Chart !== 'undefined') {
    adminChart = new Chart(adminCtx, {
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
    window.activeCharts = window.activeCharts || [];
    window.activeCharts.push(adminChart);
  }

  // Client Management Toggles
  const toggleAddClientBtn = document.getElementById('toggle-add-client-btn');
  const cancelClientBtn = document.getElementById('cancel-client-btn');
  const addClientPanel = document.getElementById('add-client-panel');

  if (toggleAddClientBtn && addClientPanel) {
    toggleAddClientBtn.addEventListener('click', () => {
      addClientPanel.classList.toggle('hidden');
    });
  }

  if (cancelClientBtn && addClientPanel) {
    cancelClientBtn.addEventListener('click', () => {
      addClientPanel.classList.add('hidden');
      if (addClientForm) addClientForm.reset();
    });
  }

  // Add Client
  const addClientForm = document.getElementById('add-client-form');
  const clientListTable = document.getElementById('client-list-table');

  function updateClientCount() {
    if (!clientListTable) return;
    const clientCount = document.getElementById('stat-active-clients');
    if (clientCount) {
      clientCount.innerText = clientListTable.children.length.toString();
    }
  }

  if (addClientForm && clientListTable) {
    addClientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const couple = document.getElementById('client-couple').value;
      const date = document.getElementById('client-date').value;
      const budget = parseFloat(document.getElementById('client-budget').value);
      const stage = document.getElementById('client-stage').value;

      let badgeColor = 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      if (stage === 'Contract Finalized') badgeColor = 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      if (stage === 'Negotiation') badgeColor = 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';

      // Parse date to prettier format
      let formattedDate = date;
      try {
        const d = new Date(date);
        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        formattedDate = d.toLocaleDateString('en-US', options);
      } catch (err) {}

      const tr = document.createElement('tr');
      tr.className = 'flex flex-col md:table-row border-b border-gray-100 dark:border-gray-800 text-sm text-gray-755 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors p-4 md:p-0 mb-4 md:mb-0 bg-white dark:bg-gray-900 rounded-xl md:rounded-none border md:border-0 border-gray-100 dark:border-gray-800 shadow-xs md:shadow-none';
      tr.innerHTML = `
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6 font-semibold text-gray-900 dark:text-white">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Couple:</span>
          <span>${couple}</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Wedding Date:</span>
          <span>${formattedDate}</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6 font-medium text-primary-600 dark:text-primary-400">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Budget:</span>
          <span>$${budget.toLocaleString()}</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Planning Stage:</span>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor}">
            ${stage}
          </span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6 text-end">
          <span class="md:hidden text-xs font-bold text-gray-405 dark:text-gray-500 uppercase tracking-wider">Action:</span>
          <button class="remove-client-btn text-xs text-red-655 hover:text-red-800 dark:hover:text-red-400 font-semibold">Remove</button>
        </td>
      `;
      clientListTable.prepend(tr);
      addClientForm.reset();
      addClientPanel.classList.add('hidden');
      updateClientCount();
    });

    clientListTable.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-client-btn') || e.target.closest('.remove-client-btn')) {
        const btn = e.target.classList.contains('remove-client-btn') ? e.target : e.target.closest('.remove-client-btn');
        const row = btn.closest('tr');
        if (row) {
          row.remove();
          updateClientCount();
        }
      }
    });

    // Run initial count on load
    updateClientCount();
  }

  // Invoice Management
  const addInvoiceForm = document.getElementById('add-invoice-form');
  const invoiceListTable = document.getElementById('invoice-list-table');

  if (addInvoiceForm && invoiceListTable) {
    addInvoiceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const couple = document.getElementById('invoice-client').value;
      const amount = parseFloat(document.getElementById('invoice-amount').value) || 0;
      const purpose = document.getElementById('invoice-purpose').value;
      
      // Random Invoice ID
      const randomNum = Math.floor(100 + Math.random() * 900);
      const invoiceId = `INV-2026-${randomNum}`;

      // Prettier date
      const today = new Date();
      const options = { month: 'short', day: '2-digit', year: 'numeric' };
      const formattedDate = today.toLocaleDateString('en-US', options);

      const tr = document.createElement('tr');
      tr.className = 'flex flex-col md:table-row border-b border-gray-100 dark:border-gray-800 text-sm text-gray-755 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors p-4 md:p-0 mb-4 md:mb-0 bg-white dark:bg-gray-900 rounded-xl md:rounded-none border md:border-0 border-gray-100 dark:border-gray-800 shadow-xs md:shadow-none';
      tr.innerHTML = `
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6 font-mono font-semibold text-gray-900 dark:text-white">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Invoice ID:</span>
          <span>${invoiceId}</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Client:</span>
          <span>${couple}</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Purpose:</span>
          <span>${purpose}</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6 font-medium text-primary-600 dark:text-primary-400">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Amount:</span>
          <span>$${amount.toLocaleString()}</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Due Date:</span>
          <span>${formattedDate}</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Status:</span>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">Awaiting Approval</span>
        </td>
        <td class="flex justify-between items-center md:table-cell py-2 px-0 md:py-4 md:px-6 text-end">
          <span class="md:hidden text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Action:</span>
          <button class="remove-invoice-btn text-xs text-red-655 hover:text-red-800 dark:hover:text-red-400 font-semibold">Remove</button>
        </td>
      `;

      invoiceListTable.prepend(tr);
      addInvoiceForm.reset();
    });

    invoiceListTable.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-invoice-btn') || e.target.closest('.remove-invoice-btn')) {
        const btn = e.target.classList.contains('remove-invoice-btn') ? e.target : e.target.closest('.remove-invoice-btn');
        const row = btn.closest('tr');
        if (row) {
          row.remove();
        }
      }
    });
  }

  // Scratchpad Autosave
  const scratchpad = document.getElementById('planner-scratchpad');
  if (scratchpad) {
    const savedNotes = localStorage.getItem('everafter_planner_notes');
    if (savedNotes) {
      scratchpad.value = savedNotes;
    }
    scratchpad.addEventListener('input', () => {
      localStorage.setItem('everafter_planner_notes', scratchpad.value);
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
