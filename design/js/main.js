/* -----------------------------------------
   1. ANIMATION ON SCROLL (AOS)
   ----------------------------------------- */
// Initialize once with robust settings
AOS.init({
  offset: 100,      // Trigger a bit earlier
  delay: 0,
  duration: 800,    // Smoother animation
  easing: 'ease-out-cubic',
  once: true,       // TRUE: Prevents elements from disappearing when scrolling up
  mirror: false,
  anchorPlacement: 'top-bottom',
});

/* -----------------------------------------
   2. TEXT ROTATOR (Typewriter Effect)
   ----------------------------------------- */
const textRotateEl = document.querySelector(".text-rotate");

if (textRotateEl) {
  const roles = ["developer.", "problem solver.", "cyber enthusiast.", "builder."];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeWriter() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Deleting text
      textRotateEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Delete faster
    } else {
      // Typing text
      textRotateEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100; // Type normal speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Finished typing word, pause before delete
      isDeleting = true;
      typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next word
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
  }

  // Start the typing loop
  typeWriter();
}

/* -----------------------------------------
   3. PARTICLE BACKGROUND (Responsive)
   ----------------------------------------- */
const canvas = document.getElementById('particles');

if (canvas) {
  const ctx = canvas.getContext('2d');
  
  // Function to resize canvas dynamically
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Initial resize and Event Listener
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Create Particles
  const particlesArray = [];
  const numberOfParticles = 60; // Manageable number for performance

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5; // Varied sizes
      this.speedX = Math.random() * 0.5 - 0.25; // Slow float
      this.speedY = Math.random() * 0.5 - 0.25;
      // Randomly choose between Cyan and Violet for that Cyber look
      this.color = Math.random() > 0.5 ? 'rgba(0, 242, 255, 0.4)' : 'rgba(87, 6, 140, 0.4)';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around screen edges (Infinite loop)
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
}

/* -----------------------------------------
   4. 3D TILT EFFECT (Interactive Graphics)
   ----------------------------------------- */
const cards = document.querySelectorAll('.bg-base, .card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
    const rotateY = ((x - centerX) / centerX) * 10;

    // Apply the transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    
    // Add a sheen/shine effect
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1), rgba(255,255,255,0.03))`;
    card.style.borderColor = 'var(--accent-cyan)';
  });

  card.addEventListener('mouseleave', () => {
    // Reset position when mouse leaves
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    card.style.background = 'var(--bg-card)'; // Reset background
    card.style.borderColor = 'var(--border-glass)';
  });
});

/* -----------------------------------------
   5. NAVBAR ACTIVE STATE FIX (Center Line Detection)
   ----------------------------------------- */
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar .nav-link");

const observerOptions = {
  root: null,
  // This is the magic fix. 
  // It creates a thin "detection line" in the middle of the screen.
  // "-50% 0px -50% 0px" means "Ignore top 50% and bottom 50%".
  // Effectively: Trigger ONLY when the section hits the middle.
  rootMargin: "-50% 0px -50% 0px", 
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let current = entry.target.getAttribute("id");
      
      // Update Navbar
      navLi.forEach((li) => {
        li.classList.remove("active");
        // Check if href matches id (e.g. #skills matches id="skills")
        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

/* -----------------------------------------
   6. UI UTILITIES
   ----------------------------------------- */

// A. Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
      progressBar.style.width = scrollPercent + "%";
  }
});

// B. Dynamic Year Update
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
