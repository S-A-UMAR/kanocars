/* =============================================
   AUNA AUTOMOTIVE — MAIN LOGIC
   Global interactions, animations, and behaviors
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initHeroParallax();
  initStatsCounter();
  initScrollAnimations();
});

/* ─── NAVBAR SCROLL BEHAVIOR ─── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Run on load and scroll
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ─── MOBILE MENU OVERLAY ─── */
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  
  if (!navToggle || !navMobile) return;

  const toggleMenu = () => {
    const isOpen = navMobile.classList.contains('open');
    if (isOpen) {
      navMobile.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    } else {
      navMobile.classList.add('open');
      navToggle.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  };

  navToggle.addEventListener('click', toggleMenu);

  // Close menu when clicking a link
  const mobileLinks = navMobile.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ─── INTERACTIVE HERO PARALLAX (CSS 3D) ─── */
function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const carVisual = document.getElementById('heroCarImg');
  
  if (!hero || !carVisual) return;

  hero.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 900) return; // Disable on mobile

    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Degrees of rotation (max 10 deg)
    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 12;

    carVisual.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`;
  });

  hero.addEventListener('mouseenter', () => {
    carVisual.style.transition = 'transform 0.1s ease-out';
  });

  hero.addEventListener('mouseleave', () => {
    carVisual.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    carVisual.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  });
}

/* ─── STATS COUNT-UP ANIMATION ─── */
function initStatsCounter() {
  const statsPanel = document.querySelector('.stats-panel');
  const statValues = document.querySelectorAll('.stat-value');
  
  if (!statsPanel || statValues.length === 0) return;

  let animated = false;

  const startCounting = () => {
    statValues.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const duration = 2000; // 2 seconds
      const frameRate = 1000 / 60; // 60 FPS
      const totalFrames = duration / frameRate;
      const increment = target / totalFrames;

      const updateCount = () => {
        count += increment;
        if (count >= target) {
          stat.textContent = target.toLocaleString() + suffix;
        } else {
          stat.textContent = Math.floor(count).toLocaleString() + suffix;
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        startCounting();
        animated = true;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(statsPanel);
}

/* ─── SCROLL ENTRY/EXIT REVEAL EFFECTS ─── */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.scroll-fade');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => {
    el.classList.add('scroll-fallback-init');
    observer.observe(el);
  });
}
