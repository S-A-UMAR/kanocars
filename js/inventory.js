/* =============================================
   AUNA AUTOMOTIVE — INVENTORY LOGIC
   Loads cars.json, handles filtering, search, and dynamic render
   ============================================= */

let allCars = [];
let filteredCars = [];
const CARS_PER_PAGE = 6;
let displayedCount = CARS_PER_PAGE;

document.addEventListener('DOMContentLoaded', () => {
  initInventory();
  initMobileDrawerFilters();
});

async function initInventory() {
  try {
    const response = await fetch('data/cars.json');
    if (!response.ok) throw new Error('Failed to load inventory data');
    allCars = await response.json();
    filteredCars = [...allCars];

    // Setup filter selections dynamically based on data
    populateFilterDropdowns();

    // Parse URL params for pre-applied filters (e.g., from home page)
    parseUrlParams();

    // Render current inventory
    renderInventory();

    // Bind event listeners
    setupFilterListeners();
  } catch (error) {
    console.error('Error initializing inventory:', error);
    const grid = document.getElementById('inventory-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="no-results" style="grid-column: 1/-1; padding: var(--space-3xl) 0;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="var(--clr-accent)" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01"/></svg>
          <h3 style="margin-top: var(--space-md); font-weight: 400;">Failed to load inventory</h3>
          <p>We are currently experiencing technical difficulties. Please try again later.</p>
        </div>
      `;
    }
  }
}

function populateFilterDropdowns() {
  const selectMake = document.getElementById('filter-make');
  const selectBody = document.getElementById('filter-body');
  const priceRange = document.getElementById('filter-price-range');
  const priceValueLabel = document.getElementById('price-value-label');

  if (!selectMake || !selectBody) return;

  // Extract unique values
  const makes = [...new Set(allCars.map(car => car.make))].sort();
  const bodies = [...new Set(allCars.map(car => car.bodyType))].sort();
  const prices = allCars.map(car => car.price);
  const maxPrice = Math.max(...prices, 100000000); // fallback max price 100M

  // Populate Make selector
  makes.forEach(make => {
    const opt = document.createElement('option');
    opt.value = make;
    opt.textContent = make;
    selectMake.appendChild(opt);
  });

  // Populate Body Type selector
  bodies.forEach(body => {
    const opt = document.createElement('option');
    opt.value = body;
    opt.textContent = body;
    selectBody.appendChild(opt);
  });

  // Setup Price slider
  if (priceRange && priceValueLabel) {
    priceRange.min = 10000000;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValueLabel.textContent = `₦${(maxPrice / 1000000).toFixed(0)}M`;

    priceRange.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      priceValueLabel.textContent = `₦${(val / 1000000).toFixed(1)}M`;
    });
  }
}

function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const make = params.get('make');
  const body = params.get('bodyType');
  const search = params.get('search');

  if (make) {
    const selectMake = document.getElementById('filter-make');
    if (selectMake) selectMake.value = make;
  }
  if (body) {
    const selectBody = document.getElementById('filter-body');
    if (selectBody) selectBody.value = body;
  }
  if (search) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = search;
  }

  // If any parameters are set, filter the array immediately
  if (make || body || search) {
    applyFilters();
  }
}

function setupFilterListeners() {
  const selectMake = document.getElementById('filter-make');
  const selectBody = document.getElementById('filter-body');
  const selectTransmission = document.getElementById('filter-transmission');
  const priceRange = document.getElementById('filter-price-range');
  const searchInput = document.getElementById('search-input');
  const resetBtn = document.getElementById('reset-filters');

  const triggers = [selectMake, selectBody, selectTransmission, priceRange, searchInput];
  triggers.forEach(el => {
    if (!el) return;
    const eventType = el.tagName === 'INPUT' && el.type === 'text' ? 'input' : 'change';
    el.addEventListener(eventType, () => {
      displayedCount = CARS_PER_PAGE;
      applyFilters();
    });
  });

  if (priceRange) {
    priceRange.addEventListener('input', () => {
      clearTimeout(this.priceTimeout);
      this.priceTimeout = setTimeout(() => {
        displayedCount = CARS_PER_PAGE;
        applyFilters();
      }, 100);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (selectMake) selectMake.value = '';
      if (selectBody) selectBody.value = '';
      if (selectTransmission) selectTransmission.value = '';
      if (searchInput) searchInput.value = '';
      if (priceRange) {
        priceRange.value = priceRange.max;
        const maxVal = parseInt(priceRange.max, 10);
        const priceLabel = document.getElementById('price-value-label');
        if (priceLabel) priceLabel.textContent = `₦${(maxVal / 1000000).toFixed(0)}M`;
      }
      displayedCount = CARS_PER_PAGE;
      applyFilters();
      
      // Close filter drawer on mobile after clear
      if (window.innerWidth <= 900) {
        closeFilterDrawer();
      }
    });
  }
}

function applyFilters() {
  const selectMake = document.getElementById('filter-make')?.value;
  const selectBody = document.getElementById('filter-body')?.value;
  const selectTransmission = document.getElementById('filter-transmission')?.value;
  const maxPrice = parseInt(document.getElementById('filter-price-range')?.value || '9999999999', 10);
  const searchQuery = document.getElementById('search-input')?.value.toLowerCase().trim();

  filteredCars = allCars.filter(car => {
    if (selectMake && car.make !== selectMake) return false;
    if (selectBody && car.bodyType !== selectBody) return false;
    if (selectTransmission && car.transmission !== selectTransmission) return false;
    if (car.price > maxPrice) return false;
    
    if (searchQuery) {
      const matchText = `${car.make} ${car.model} ${car.year} ${car.color} ${car.bodyType} ${car.tags.join(' ')}`.toLowerCase();
      if (!matchText.includes(searchQuery)) return false;
    }

    return true;
  });

  renderInventory();
}

function renderInventory() {
  const grid = document.getElementById('inventory-grid');
  const countLabel = document.getElementById('inventory-count');
  const loadMoreWrapper = document.querySelector('.load-more-wrapper');

  if (!grid) return;

  grid.innerHTML = '';

  // Update total count labels
  if (countLabel) {
    countLabel.innerHTML = `Showing <strong>${Math.min(filteredCars.length, displayedCount)}</strong> of <strong>${filteredCars.length}</strong> cars`;
  }

  if (filteredCars.length === 0) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: var(--space-3xl) 0;">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="var(--clr-text-dim)" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <h3 style="margin-top: var(--space-md); font-weight:400; color: var(--clr-text);">No fleet matches</h3>
        <p style="font-size:0.88rem;">Try resetting the filters or adjusting your price limit.</p>
      </div>
    `;
    if (loadMoreWrapper) loadMoreWrapper.style.display = 'none';
    return;
  }

  // Render subset of cars based on paging
  const carsToRender = filteredCars.slice(0, displayedCount);

  carsToRender.forEach((car, index) => {
    const card = document.createElement('article');
    card.className = 'fleet-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.addEventListener('click', () => {
      window.location.href = `car-detail.html?id=${car.id}`;
    });

    const formattedPrice = `₦${(car.price / 1000000).toFixed(1)}M`;
    const formattedMileage = car.mileage.toLocaleString() + ' km';

    card.innerHTML = `
      <div class="fleet-card-media">
        <img src="${car.image}" alt="${car.make} ${car.model}" loading="lazy">
      </div>
      <div class="fleet-card-details">
        <div class="fleet-card-header">
          <span class="fleet-year">${car.year} • ${car.condition}</span>
          <h3 class="fleet-title">${car.make} ${car.model}</h3>
        </div>
        <div class="fleet-specs">
          <span>${car.transmission}</span>
          <span class="spec-separator">•</span>
          <span>${formattedMileage}</span>
          <span class="spec-separator">•</span>
          <span>${car.fuel}</span>
        </div>
        <div class="fleet-footer">
          <span class="fleet-price">${formattedPrice}</span>
          <span class="fleet-action-text">Explore</span>
        </div>
      </div>
    `;

    grid.appendChild(card);

    // Staggered fade-in for each card
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 60 + index * 80);
  });

  // Show/hide load more button
  if (loadMoreWrapper) {
    if (filteredCars.length > displayedCount) {
      loadMoreWrapper.style.display = 'block';
    } else {
      loadMoreWrapper.style.display = 'none';
    }
  }
}

// Bind load more button
const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    displayedCount += CARS_PER_PAGE;
    renderInventory();
  });
}

/* ─── DYNAMIC MOBILE FILTER DRAWER SWITCHING ─── */
function initMobileDrawerFilters() {
  const filterElements = document.getElementById('filterElements');
  const sidebarContainer = document.getElementById('filterSidebarContainer');
  const drawerBody = document.getElementById('drawerBody');
  const mobileFilterBtn = document.getElementById('mobileFilterBtn');
  const filterDrawer = document.getElementById('filterDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerClose = document.getElementById('drawerClose');

  if (!filterElements || !sidebarContainer || !drawerBody) return;

  const handleReparenting = () => {
    if (window.innerWidth <= 900) {
      if (filterElements.parentElement !== drawerBody) {
        drawerBody.appendChild(filterElements);
      }
    } else {
      if (filterElements.parentElement !== sidebarContainer) {
        sidebarContainer.appendChild(filterElements);
        closeFilterDrawer();
      }
    }
  };

  const openFilterDrawer = () => {
    if (filterDrawer) filterDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeFilterDrawer = () => {
    if (filterDrawer) filterDrawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Run on start and listen to resize
  handleReparenting();
  window.addEventListener('resize', handleReparenting);

  // Bind toggle events
  if (mobileFilterBtn) mobileFilterBtn.addEventListener('click', openFilterDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeFilterDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeFilterDrawer);

  // Expose close helper globally
  window.closeFilterDrawer = closeFilterDrawer;
}
