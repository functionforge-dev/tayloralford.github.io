// Mobile menu functionality
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('active');
        }
    });
});

// Add animation to service cards on hover
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Handle "Other Breed" field visibility
const breedSelect = document.querySelector('select[placeholder="Select Breed"]');
const otherBreedInput = document.querySelector('.other-breed');

if (breedSelect && otherBreedInput) {
    breedSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            otherBreedInput.classList.add('visible');
            otherBreedInput.required = true;
        } else {
            otherBreedInput.classList.remove('visible');
            otherBreedInput.required = false;
        }
    });
}

// Form validation and submission
const bookingForm = document.querySelector('.contact-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the data to a server
        console.log('Booking submitted:', formObject);
        
        // Show success message
        alert('Thank you for your booking! We will contact you shortly to confirm your appointment.');
        this.reset();
        
        // Hide other breed input if it was visible
        if (otherBreedInput) {
            otherBreedInput.classList.remove('visible');
            otherBreedInput.required = false;
        }
    });
}

// Lightbox functionality for gallery images
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

if (lightboxModal && lightboxImg && lightboxClose) {
    document.querySelectorAll('.gallery .expandable').forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.getAttribute('data-full');
            lightboxImg.alt = this.alt;
            lightboxModal.classList.add('active');
        });
    });
    lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
        lightboxImg.src = '';
    });
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.classList.remove('active');
            lightboxImg.src = '';
        }
    });
    // Optional: Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            lightboxModal.classList.remove('active');
            lightboxImg.src = '';
        }
    });
}

// Hero Carousel Functionality
(function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const leftArrow = document.querySelector('.carousel-arrow.left');
    const rightArrow = document.querySelector('.carousel-arrow.right');
    let current = 0;
    let interval = null;
    const slideCount = slides.length;
    const slideDuration = 5000; // ms

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
        current = idx;
    }

    function nextSlide() {
        showSlide((current + 1) % slideCount);
    }
    function prevSlide() {
        showSlide((current - 1 + slideCount) % slideCount);
    }
    function goToSlide(idx) {
        showSlide(idx);
    }
    function startAutoPlay() {
        interval = setInterval(nextSlide, slideDuration);
    }
    function stopAutoPlay() {
        clearInterval(interval);
    }

    // Arrow navigation
    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
        rightArrow.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }
    // Dot navigation
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(i);
            startAutoPlay();
        });
    });
    // Pause on hover (desktop)
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    // Initialize
    showSlide(0);
    startAutoPlay();
})();

// Rehome Modal Functionality
const rehomeDogs = [
  {
    id: 1,
    name: 'Buddy',
    img: 'images/dog1.jpg',
    desc: '2-year-old German Shepherd. Friendly, energetic, and loves walks!',
    extra: '<strong>Good with:</strong> Adults, older children, other dogs.<br><strong>Needs:</strong> Active home, daily exercise.'
  },
  {
    id: 2,
    name: 'Luna',
    img: 'images/dog2.jpg',
    desc: '3-year-old German Shepherd. Gentle, loyal, and great with kids.',
    extra: '<strong>Good with:</strong> Kids, other dogs.<br><strong>Needs:</strong> Loving family, garden to play.'
  }
];
const rehomeModal = document.getElementById('rehome-modal');
const rehomeModalImg = document.getElementById('rehome-modal-img');
const rehomeModalName = document.getElementById('rehome-modal-name');
const rehomeModalDesc = document.getElementById('rehome-modal-desc');
const rehomeModalExtra = document.getElementById('rehome-modal-extra');
const rehomeModalClose = document.querySelector('.rehome-modal-close');

document.querySelectorAll('.view-profile-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const dogId = parseInt(this.getAttribute('data-dog'));
    const dog = rehomeDogs.find(d => d.id === dogId);
    if (dog) {
      rehomeModalImg.src = dog.img;
      rehomeModalImg.alt = dog.name + ' profile photo';
      rehomeModalName.textContent = dog.name;
      rehomeModalDesc.textContent = dog.desc;
      rehomeModalExtra.innerHTML = dog.extra;
      rehomeModal.classList.add('active');
    }
  });
});
if (rehomeModalClose) {
  rehomeModalClose.addEventListener('click', () => {
    rehomeModal.classList.remove('active');
  });
}
rehomeModal.addEventListener('click', (e) => {
  if (e.target === rehomeModal) {
    rehomeModal.classList.remove('active');
  }
});

// Animated Paw Print Trail (throttled, less draggy)
(function() {
  const isDesktop = () => window.innerWidth > 800;
  let lastX = 0, lastY = 0;
  const minDist = 30; // px
  document.addEventListener('mousemove', function(e) {
    if (!isDesktop()) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if (Math.sqrt(dx*dx + dy*dy) < minDist) return;
    lastX = e.clientX;
    lastY = e.clientY;
    const paw = document.createElement('img');
    paw.src = 'images/paw-cursor.png';
    paw.className = 'paw-trail';
    paw.style.left = (e.clientX - 11) + 'px';
    paw.style.top = (e.clientY - 11) + 'px';
    document.body.appendChild(paw);
    setTimeout(() => { paw.remove(); }, 600);
  });
})();

// Rotating Dog Fact/Quote Banner
(function() {
  const facts = [
    '“Dogs do speak, but only to those who know how to listen.” – Orhan Pamuk',
    'Dogs have about 1,700 taste buds. Humans have about 9,000!',
    'A dog’s sense of smell is 40x better than a human’s.',
    '“The better I get to know men, the more I find myself loving dogs.” – Charles de Gaulle',
    'Dogs can learn more than 1000 words and gestures.',
    'The Basenji is the only barkless dog.',
    '“Happiness is a warm puppy.” – Charles M. Schulz'
  ];
  const banner = document.getElementById('dog-fact-banner');
  let idx = 0;
  function showFact() {
    if (!banner) return;
    banner.innerHTML = '<span class="paw-icon">🐾</span> ' + facts[idx];
    idx = (idx + 1) % facts.length;
  }
  showFact();
  setInterval(showFact, 7000);
})();

// Dog Bone Progress Bar for Booking Form
(function() {
  const form = document.querySelector('.contact-form');
  const bar = document.querySelector('.bone-bar-fill');
  const bone = document.querySelector('.bone-emoji');
  if (!form || !bar) return;
  const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
  function updateProgress() {
    let filled = 0;
    requiredFields.forEach(f => {
      if ((f.type === 'checkbox' && f.checked) || (f.type !== 'checkbox' && f.value.trim() !== '')) {
        filled++;
      }
    });
    const percent = Math.round((filled / requiredFields.length) * 100);
    bar.style.width = percent + '%';
    if (bone) {
      bone.style.left = `calc(${percent}% - 18px)`;
    }
  }
  form.addEventListener('input', updateProgress);
  updateProgress();
})(); 