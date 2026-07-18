// Car data
const cars = [
    {
        "id": "001",
        "make": "Toyota",
        "model": "Land Cruiser",
        "year": 2022,
        "price": 85000000,
        "mileage": 12000,
        "fuel": "Petrol",
        "transmission": "Automatic",
        "bodyType": "SUV",
        "color": "Lunar Silver",
        "condition": "Foreign Used",
        "featured": true,
        "description": "The 2022 Toyota Land Cruiser is the pinnacle of luxury off-road capability. This Lunar Silver beast combines Toyota's legendary reliability with premium comfort features including a 12.3-inch infotainment screen, ventilated leather seats, and advanced 4WD system. Perfect for Kano's diverse terrain.",
        "specs": {
            "engine": "3.3L Twin-Turbo V6",
            "power": "309 hp",
            "torque": "516 Nm",
            "seats": 7,
            "drivetrain": "4WD"
        },
        "tags": ["4WD", "7 Seater", "Premium"]
    },
    {
        "id": "002",
        "make": "Mercedes-Benz",
        "model": "GLE 450",
        "year": 2021,
        "price": 75000000,
        "mileage": 18000,
        "fuel": "Petrol",
        "transmission": "Automatic",
        "bodyType": "SUV",
        "color": "Obsidian Black",
        "condition": "Foreign Used",
        "featured": true,
        "description": "The 2021 Mercedes-Benz GLE 450 blends executive styling with powerful performance. Finished in Obsidian Black with gold trim accents, this luxury SUV features the MBUX intelligent assistant, Burmester surround sound, and E-ACTIVE BODY CONTROL suspension for an unmatched ride in Kano.",
        "specs": {
            "engine": "3.0L Inline-6 Turbo",
            "power": "362 hp",
            "torque": "500 Nm",
            "seats": 5,
            "drivetrain": "4MATIC AWD"
        },
        "tags": ["AWD", "Premium Sound", "Executive"]
    },
    {
        "id": "003",
        "make": "Lexus",
        "model": "LX 570",
        "year": 2020,
        "price": 65000000,
        "mileage": 24000,
        "fuel": "Petrol",
        "transmission": "Automatic",
        "bodyType": "SUV",
        "color": "Starfire White",
        "condition": "Foreign Used",
        "featured": true,
        "description": "The 2020 Lexus LX 570 is Japanese luxury engineering at its finest. In Starfire White pearl, this full-size luxury SUV offers three rows of seating, a Mark Levinson 19-speaker audio system, and Lexus Safety System+ for a commanding presence on Kano's roads.",
        "specs": {
            "engine": "5.7L V8",
            "power": "383 hp",
            "torque": "544 Nm",
            "seats": 8,
            "drivetrain": "4WD"
        },
        "tags": ["4WD", "8 Seater", "V8 Power"]
    },
    {
        "id": "004",
        "make": "Range Rover",
        "model": "Sport HSE",
        "year": 2022,
        "price": 95000000,
        "mileage": 8500,
        "fuel": "Petrol",
        "transmission": "Automatic",
        "bodyType": "SUV",
        "color": "Carpathian Grey",
        "condition": "Foreign Used",
        "featured": true,
        "description": "The 2022 Range Rover Sport HSE in Carpathian Grey is the ultimate expression of British luxury. Nearly new with only 8,500 km, this stunning SUV features Terrain Response 2, Meridian Signature Sound, and a panoramic sunroof. An icon that commands attention on Kano's streets.",
        "specs": {
            "engine": "3.0L Inline-6 Turbo",
            "power": "395 hp",
            "torque": "550 Nm",
            "seats": 5,
            "drivetrain": "AWD"
        },
        "tags": ["Nearly New", "Panoramic Roof", "British Luxury"]
    },
    {
        "id": "005",
        "make": "Toyota",
        "model": "Camry XSE",
        "year": 2023,
        "price": 28000000,
        "mileage": 5200,
        "fuel": "Petrol",
        "transmission": "Automatic",
        "bodyType": "Sedan",
        "color": "Midnight Black",
        "condition": "Foreign Used",
        "featured": true,
        "description": "The 2023 Toyota Camry XSE is a bold statement sedan combining sport and luxury. In striking Midnight Black with sport-tuned suspension, this nearly-new Camry offers Toyota Safety Sense 2.5+, wireless charging, and a JBL premium audio system — executive comfort at an accessible price.",
        "specs": {
            "engine": "2.5L Dynamic Force 4-Cylinder",
            "power": "203 hp",
            "torque": "254 Nm",
            "seats": 5,
            "drivetrain": "FWD"
        },
        "tags": ["Nearly New", "Sport Package", "Fuel Efficient"]
    },
    {
        "id": "006",
        "make": "BMW",
        "model": "X5 xDrive40i",
        "year": 2021,
        "price": 58000000,
        "mileage": 21000,
        "fuel": "Petrol",
        "transmission": "Automatic",
        "bodyType": "SUV",
        "color": "Alpine White",
        "condition": "Foreign Used",
        "featured": false,
        "description": "The 2021 BMW X5 xDrive40i in Alpine White is a masterpiece of Bavarian engineering. Featuring iDrive 7 with 12.3-inch touchscreen, Harman Kardon surround sound, panoramic Sky Lounge LED roof, and BMW's signature xDrive all-wheel drive for confident performance across Kano.",
        "specs": {
            "engine": "3.0L TwinPower Turbo Inline-6",
            "power": "335 hp",
            "torque": "450 Nm",
            "seats": 5,
            "drivetrain": "xDrive AWD"
        },
        "tags": ["AWD", "Panoramic Roof", "German Engineering"]
    },
    {
        "id": "007",
        "make": "Lexus",
        "model": "RX 350 F Sport",
        "year": 2022,
        "price": 48000000,
        "mileage": 16000,
        "fuel": "Petrol",
        "transmission": "Automatic",
        "bodyType": "SUV",
        "color": "Atomic Silver",
        "condition": "Foreign Used",
        "featured": false,
        "description": "The 2022 Lexus RX 350 F Sport in Atomic Silver delivers a perfect harmony of sport dynamics and luxury refinement. With its F Sport-tuned suspension, Mark Levinson 15-speaker audio, and Lexus Safety System+ 2.5, this crossover is ideal for the discerning Kano executive.",
        "specs": {
            "engine": "3.5L V6",
            "power": "295 hp",
            "torque": "360 Nm",
            "seats": 5,
            "drivetrain": "AWD"
        },
        "tags": ["F Sport", "Premium Audio", "Refined"]
    },
    {
        "id": "008",
        "make": "Mercedes-Benz",
        "model": "C300 4MATIC",
        "year": 2022,
        "price": 38000000,
        "mileage": 14500,
        "fuel": "Petrol",
        "transmission": "Automatic",
        "bodyType": "Sedan",
        "color": "Selenite Grey",
        "condition": "Foreign Used",
        "featured": false,
        "description": "The 2022 Mercedes-Benz C300 4MATIC in Selenite Grey Metallic redefines the executive sedan segment. With an entirely new interior inspired by the S-Class, 64-colour ambient lighting, MBUX Hyperscreen-ready architecture, and turbocharged power — this is luxury that never compromises.",
        "specs": {
            "engine": "2.0L Turbocharged Inline-4",
            "power": "255 hp",
            "torque": "400 Nm",
            "seats": 5,
            "drivetrain": "4MATIC AWD"
        },
        "tags": ["AWD", "Ambient Lighting", "Executive Sedan"]
    }
];

// Color palette for car cards
const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCarGrid(cars);
    updateNavActive();
});

// Render car grid
function renderCarGrid(carList) {
    const carGrid = document.getElementById('carGrid');
    carGrid.innerHTML = '';

    if (carList.length === 0) {
        carGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #6B7280;">No vehicles found matching your criteria.</div>';
        return;
    }

    carList.forEach((car, index) => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <div class="car-image" style="background: ${gradients[index % gradients.length]};">
                🚗
            </div>
            <div class="car-info">
                <div class="car-title">${car.year} ${car.make} ${car.model}</div>
                <div class="car-price">₦${(car.price / 1000000).toFixed(1)}M</div>
                <div class="car-specs">
                    <span class="car-spec">${car.specs.power}</span>
                    <span class="car-spec">${car.bodyType}</span>
                    <span class="car-spec">${car.mileage.toLocaleString()} km</span>
                </div>
                <button class="car-action" onclick="showCarDetail('${car.id}')">View Details</button>
            </div>
        `;
        carGrid.appendChild(card);
    });
}

// Filter cars
function filterCars() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const bodyTypeFilter = document.getElementById('bodyTypeFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;

    let filtered = cars.filter(car => {
        // Search filter
        const searchMatch = car.make.toLowerCase().includes(searchInput) || 
                          car.model.toLowerCase().includes(searchInput);

        // Body type filter
        const bodyTypeMatch = !bodyTypeFilter || car.bodyType === bodyTypeFilter;

        // Price filter
        let priceMatch = true;
        if (priceFilter === 'budget') {
            priceMatch = car.price < 40000000;
        } else if (priceFilter === 'mid') {
            priceMatch = car.price >= 40000000 && car.price <= 70000000;
        } else if (priceFilter === 'premium') {
            priceMatch = car.price > 70000000;
        }

        return searchMatch && bodyTypeMatch && priceMatch;
    });

    renderCarGrid(filtered);
}

// Show car detail modal
function showCarDetail(carId) {
    const car = cars.find(c => c.id === carId);
    if (!car) return;

    const modal = document.getElementById('carModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="modal-detail">
            <div class="modal-header">
                <div class="modal-image" style="background: ${gradients[cars.indexOf(car) % gradients.length]};"></div>
                <div class="modal-specs">
                    <h2>${car.year} ${car.make} ${car.model}</h2>
                    <div class="price">₦${(car.price / 1000000).toFixed(1)}M</div>
                    <div class="specs-list">
                        <div class="spec-item">
                            <div class="spec-label">Engine</div>
                            <div class="spec-value">${car.specs.engine}</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Power</div>
                            <div class="spec-value">${car.specs.power}</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Torque</div>
                            <div class="spec-value">${car.specs.torque}</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Seats</div>
                            <div class="spec-value">${car.specs.seats}</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Drivetrain</div>
                            <div class="spec-value">${car.specs.drivetrain}</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Transmission</div>
                            <div class="spec-value">${car.transmission}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="description">
                <h3 style="margin-bottom: 12px; color: #1F2937;">About This Vehicle</h3>
                ${car.description}
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px;">
                <div class="spec-item">
                    <div class="spec-label">Mileage</div>
                    <div class="spec-value">${car.mileage.toLocaleString()} km</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Condition</div>
                    <div class="spec-value">${car.condition}</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Fuel Type</div>
                    <div class="spec-value">${car.fuel}</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Color</div>
                    <div class="spec-value">${car.color}</div>
                </div>
            </div>
            <button class="cta-button" style="width: 100%; margin-top: 20px;" onclick="handleContactSubmit({preventDefault: () => {}}, '${car.make} ${car.model}')">Inquire About This Vehicle</button>
        </div>
    `;

    modal.style.display = 'block';
}

// Close modal
function closeCarModal() {
    document.getElementById('carModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('carModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Handle contact form submission
function handleContactSubmit(event, vehicleInfo = null) {
    event.preventDefault();
    alert(`Thank you for your interest! We'll contact you soon about ${vehicleInfo || 'our vehicles'}.`);
    if (event.target && event.target.reset) {
        event.target.reset();
    }
    closeCarModal();
}

// Update navigation active state on scroll
function updateNavActive() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}
