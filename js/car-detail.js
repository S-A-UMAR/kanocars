/* =============================================
   AUNA AUTOMOTIVE — DETAIL LOGIC
   Loads a specific car detail based on URL '?id=xxx'
   ============================================= */

const AUNA_PHONE = '2347045003128';
const AUNA_LOCATION = 'Kano, Kano State, Nigeria';

document.addEventListener('DOMContentLoaded', () => {
  initCarDetail();
});

async function initCarDetail() {
  const params = new URLSearchParams(window.location.search);
  const carId = params.get('id');

  if (!carId) {
    showError('No Car Specified', 'Please browse our showroom index to select a vehicle.');
    return;
  }

  try {
    const response = await fetch('data/cars.json');
    if (!response.ok) throw new Error('Failed to load inventory data');
    const cars = await response.json();
    const car = cars.find(c => c.id === carId);

    if (!car) {
      showError('Car Not Found', 'The requested vehicle is not available in our collection.');
      return;
    }

    populateCarDetail(car);
    injectVehicleSchema(car);
  } catch (error) {
    console.error('Error loading car details:', error);
    showError('Error Loading Details', 'An unexpected error occurred while fetching the vehicle details.');
  }
}

function populateCarDetail(car) {
  // Update document metadata
  document.title = `${car.year} ${car.make} ${car.model} | AUNA`;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content',
      `Check out the ${car.year} ${car.make} ${car.model} in Kano. Price: ₦${(car.price / 1000000).toFixed(1)}M. Mileage: ${car.mileage.toLocaleString()} km. Foreign Used, Automatic.`
    );
  }

  // Populate visual text elements
  setTextContent('detail-title', `${car.make} ${car.model}`);
  setTextContent('detail-year', car.year);
  setTextContent('detail-condition', car.condition);
  setTextContent('detail-fuel', car.fuel);
  
  const formattedPrice = `₦${(car.price / 1000000).toFixed(1)}M`;
  setTextContent('detail-price', formattedPrice);
  setTextContent('detail-description', car.description);

  // Set main image
  const mainImage = document.getElementById('detail-main-img');
  if (mainImage) {
    mainImage.src = car.image;
    mainImage.alt = `${car.make} ${car.model}`;
  }

  // Set up thumbnails (3 views using the same image)
  const thumbContainer = document.getElementById('detail-thumbs');
  if (thumbContainer) {
    thumbContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const img = document.createElement('img');
      img.src = car.image;
      img.alt = `${car.make} ${car.model} View ${i + 1}`;
      img.className = `detail-thumb ${i === 0 ? 'active' : ''}`;
      img.addEventListener('click', (e) => {
        if (mainImage) mainImage.src = car.image;
        document.querySelectorAll('.detail-thumb').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
      });
      thumbContainer.appendChild(img);
    }
  }

  // Specs Table Grid
  const specs = [
    { label: 'Make',         value: car.make },
    { label: 'Model',        value: car.model },
    { label: 'Year',         value: car.year },
    { label: 'Mileage',      value: `${car.mileage.toLocaleString()} km` },
    { label: 'Transmission', value: car.transmission },
    { label: 'Fuel Type',    value: car.fuel },
    { label: 'Color',        value: car.color },
    { label: 'Body Type',    value: car.bodyType },
    { label: 'Engine',       value: car.specs?.engine || 'N/A' },
    { label: 'Power',        value: car.specs?.power  || 'N/A' },
    { label: 'Torque',       value: car.specs?.torque || 'N/A' },
    { label: 'Seats',        value: car.specs?.seats  ? `${car.specs.seats} Seater` : 'N/A' },
    { label: 'Drivetrain',   value: car.specs?.drivetrain || 'N/A' },
  ];

  const tableContainer = document.getElementById('specs-table');
  if (tableContainer) {
    tableContainer.innerHTML = '';
    specs.forEach(spec => {
      const row = document.createElement('div');
      row.className = 'spec-row';
      row.innerHTML = `
        <span class="spec-label">${spec.label}</span>
        <span class="spec-value">${spec.value}</span>
      `;
      tableContainer.appendChild(row);
    });
  }

  // Tags list
  const tagsContainer = document.getElementById('detail-tags');
  if (tagsContainer && Array.isArray(car.tags)) {
    tagsContainer.innerHTML = '';
    car.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'tag';
      tagSpan.textContent = tag;
      tagsContainer.appendChild(tagSpan);
    });
  }

  // Contact CTAs (WhatsApp & Phone)
  const currentUrl = window.location.href;
  const whatsappMsg = encodeURIComponent(
    `Hello AUNA, I am interested in the ${car.year} ${car.make} ${car.model} (${car.color}) listed for ${formattedPrice}. Here is the link: ${currentUrl}`
  );
  const whatsappUrl = `https://wa.me/${AUNA_PHONE}?text=${whatsappMsg}`;
  const callUrl    = `tel:+${AUNA_PHONE}`;

  const btnWhatsapp       = document.getElementById('btn-detail-whatsapp');
  const btnCall           = document.getElementById('btn-detail-call');
  const btnMobileWhatsapp = document.getElementById('btn-mobile-whatsapp');

  if (btnWhatsapp)       btnWhatsapp.href = whatsappUrl;
  if (btnCall)           btnCall.href     = callUrl;
  if (btnMobileWhatsapp) btnMobileWhatsapp.href = whatsappUrl;
}

function setTextContent(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function showError(title, message) {
  const container = document.getElementById('detail-layout-container');
  if (container) {
    container.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1; min-height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; text-align: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" stroke="var(--clr-error)" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        <h2 style="font-family: var(--font-display); font-weight: 300; font-size: 2rem; color: var(--clr-text);">${title}</h2>
        <p style="color: var(--clr-text-muted); max-width: 400px;">${message}</p>
        <a href="inventory.html" class="btn btn-outline" style="margin-top: 16px;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width:14px;height:14px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to Showroom
        </a>
      </div>
    `;
  }
}

/* ─── Dynamic SEO Structured Data Injection ─── */
function injectVehicleSchema(car) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": `${car.year} ${car.make} ${car.model}`,
    "image": window.location.origin + '/' + car.image,
    "description": car.description,
    "vehicleModelDate": car.year,
    "brand": { "@type": "Brand", "name": car.make },
    "model": car.model,
    "color": car.color,
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": car.mileage,
      "unitCode": "KMT"
    },
    "vehicleTransmission": car.transmission,
    "fuelType": car.fuel,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "NGN",
      "price": car.price,
      "itemCondition": car.condition === "New"
        ? "https://schema.org/NewCondition"
        : "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "name": "AUNA Showroom",
        "telephone": "+2347045003128",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kano",
          "addressRegion": "Kano State",
          "addressCountry": "NG"
        }
      }
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}
