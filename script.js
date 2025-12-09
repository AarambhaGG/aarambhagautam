// GSAP Animations for Ultra-Modern Portfolio

// Wait for DOM to be fully loaded
window.addEventListener("DOMContentLoaded", () => {
  // Ensure GSAP and plugins are loaded
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }

  initAnimations();
  initParticles();
  initForm();
  initHamburgerMenu();
  initDesktopNavbar();
  initScrollProgress();
  initGlitch();
  initGSAPSmoothScroll(); // GSAP smooth scrolling
});

// Main Animation Function
function initAnimations() {
  const isMobile = window.innerWidth <= 768;
  
  // Hero Section Animations
  const heroTimeline = gsap.timeline();

  heroTimeline
    .from(".hero-name", {
      opacity: 0,
      y: isMobile ? 0 : 50,
      scale: 1, // No scale animation on desktop
      duration: 1.2,
      ease: "power3.out",
    })
    .from(
      ".hero-accent-line",
      {
        scaleX: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .from(
      ".hero-title",
      {
        opacity: 0,
        y: isMobile ? 0 : 30,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.6"
    )
    .from(
      ".hero-intro",
      {
        opacity: 0,
        y: isMobile ? 0 : 30,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.8"
    )
    .from(
      ".contact-cta",
      {
        opacity: 0,
        y: isMobile ? 0 : 20,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6"
    )
    .to(".contact-cta", {
      opacity: 1,
      duration: 0.1,
      ease: "none",
    });


  // Enhanced Parallax effects on hero - Desktop only
  if (!isMobile) {
    gsap.to(".hero-name", {
      y: -50,
      // No scale on scroll
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  // Keep hero title visible - no opacity change
  gsap.set(".hero-title", { opacity: 1 });

  // Keep hero intro visible - no opacity change
  gsap.set(".hero-intro", { opacity: 1 });

  // About Section Enhanced Animations - 2 column layout
  // Set initial state to prevent glitching
  gsap.set(".about-text", { opacity: 1 });
  gsap.set(".about-intro", { opacity: 1 });
  gsap.set(".about-paragraph-1", { opacity: 1 });
  gsap.set(".about-paragraph-2", { opacity: 1 });
  gsap.set(".about-image", { opacity: 1 });

  // Text appears from left - all together (fade only on mobile)
  gsap.from(".about-intro", {
    opacity: 0,
    x: isMobile ? 0 : -60,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#about",
      start: "top 70%",
      toggleActions: "play none none none",
      once: true,
    },
  });

  // Paragraphs fade in together without delay (fade only on mobile)
  gsap.from(".about-paragraph-1, .about-paragraph-2", {
    opacity: 0,
    y: isMobile ? 0 : 20,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".about-intro",
      start: "top 70%",
      toggleActions: "play none none none",
      once: true,
    },
  });

  // Image appears from right (fade only on mobile)
  gsap.from(".about-image", {
    opacity: 0,
    x: isMobile ? 0 : 60,
    scale: isMobile ? 1 : 0.95,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#about",
      start: "top 70%",
      toggleActions: "play none none none",
      once: true,
    },
  });

  // Stats animation - Stay visible
  gsap.from(".stat-item", {
    opacity: 0,
    y: 40,
    scale: 0.8,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".about-stats",
      start: "top 80%",
      toggleActions: "play none none reverse",
      once: true,
    },
  });

  // Ensure stats stay visible
  gsap.set(".stat-item", { opacity: 1 });

  // Skills cards animation - Stay visible
  gsap.from(".skill-card", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-skills",
      start: "top 75%",
      toggleActions: "play none none reverse",
      once: true,
    },
  });

  // Ensure skills stay visible
  gsap.set(".skill-card", { opacity: 1 });

  // Enhanced Section Titles Animation (no scale on desktop)
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      opacity: 0,
      y: isMobile ? 0 : 60,
      scale: 1, // No scale animation
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Subtle continuous animation on titles
    gsap.to(title, {
      y: -10,
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    });
  });

  // Tech Stack Scroll-Only Animation (fade only on mobile)
  gsap.from(".tech-item", {
    opacity: 0,
    y: isMobile ? 0 : 50,
    scale: isMobile ? 1 : 0.8,
    duration: 0.8,
    ease: "power2.out",
    stagger: {
      amount: 1,
      from: "start",
    },
    scrollTrigger: {
      trigger: "#tech",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  // Contact Section Enhanced Animation (fade only on mobile, no animation on heading for mobile)
  if (!isMobile) {
    gsap.from(".contact-card", {
      opacity: 0,
      y: 60,
      scale: 0.95,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  } else {
    // Mobile: only fade in the card, no animation on heading
    gsap.from(".contact-card", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // Parallax effect on contact card - DISABLED to prevent movement
  /*
  gsap.to(".contact-card", {
    y: -15,
    scrollTrigger: {
      trigger: "#contact",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });
  */

  // Contact form fields animation - ensure they stay interactive
  gsap.from(
    "#contact-form input, #contact-form textarea, #contact-form button",
    {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#contact-form",
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
      onComplete: () => {
        // Ensure all form elements are fully interactive after animation
        gsap.set(
          "#contact-form input, #contact-form textarea, #contact-form button",
          {
            opacity: 1,
            clearProps: "transform",
          }
        );
      },
    }
  );

  // Contact info animation - stay visible
  gsap.from(".contact-info", {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-info",
      start: "top 75%",
      toggleActions: "play none none none",
      once: true,
    },
  });


  gsap.from(".contact-detail-item", {
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".contact-info",
      start: "top 75%",
      toggleActions: "play none none none",
      once: true,
    },
  });
  
  // Ensure contact detail items stay visible
  gsap.set(".contact-detail-item", { opacity: 1, clearProps: "x" });

  // Social icons animation - stay visible after animating in
  gsap.from(".social-icon", {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(1.4)",
    scrollTrigger: {
      trigger: ".social-links",
      start: "top 80%",
      toggleActions: "play none none none",
      once: true,
    },
  });
  
  // Ensure social icons stay visible
  gsap.set(".social-icon", { opacity: 1, clearProps: "scale" });

  // Enhanced smooth reveal for all sections with scale
  gsap.utils.toArray("section").forEach((section, index) => {
    gsap.from(section, {
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Subtle parallax on sections
    if (index % 2 === 0) {
      gsap.to(section, {
        y: -30,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  });

  // Footer Animation - DISABLED
  /*
  gsap.from("footer", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });
  */
}

// Create additional particles dynamically
function initParticles() {
  const particlesContainer = document.querySelector(".particles");
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: ${
              Math.random() > 0.5
                ? "rgba(147, 51, 234, 0.4)"
                : "rgba(59, 130, 246, 0.4)"
            };
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${
              15 + Math.random() * 10
            }s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
    particlesContainer.appendChild(particle);
  }

  // Add CSS animation for particles
  const style = document.createElement("style");
  style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0.3;
            }
            50% {
                transform: translate(${Math.random() * 20 - 10}px, ${
    Math.random() * 20 - 10
  }px);
                opacity: 1;
            }
        }
    `;
  document.head.appendChild(style);
}

// Form Handling with Formspree
function initForm() {
  const form = document.getElementById("contact-form");
  const statusElement = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Simple form validation
      if (!name || !email || !message) {
        showFormStatus("Please fill in all fields", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormStatus("Please enter a valid email address", "error");
        return;
      }

      // Disable submit button
      const button = form.querySelector("button");
      const originalText = button.textContent;
      button.disabled = true;
      button.textContent = "Sending...";

      try {
        // Submit to Formspree
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showFormStatus("Message sent successfully! I'll get back to you soon.", "success");
          form.reset();
          
          // Animate button
          gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          });
        } else {
          showFormStatus("Oops! There was a problem sending your message.", "error");
        }
      } catch (error) {
        showFormStatus("Oops! There was a problem sending your message.", "error");
      } finally {
        // Re-enable submit button
        button.disabled = false;
        button.textContent = originalText;
      }
    });
  }
}

// Show form status message
function showFormStatus(message, type) {
  const statusElement = document.getElementById("form-status");
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.style.color = type === "success" ? "#4ade80" : "#f87171";
    
    // Clear message after 5 seconds
    setTimeout(() => {
      statusElement.textContent = "";
    }, 5000);
  }
}

// Notification Function
function showNotification(message, type) {
  // Remove existing notification if any
  const existing = document.querySelector(".notification");
  if (existing) {
    existing.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification fixed top-8 right-8 z-50 px-6 py-4 rounded-xl backdrop-blur-sm border ${
    type === "success"
      ? "bg-green-500/10 border-green-500/30 text-green-400"
      : "bg-red-500/10 border-red-500/30 text-red-400"
  } font-['Inter'] shadow-lg`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  gsap.fromTo(
    notification,
    {
      opacity: 0,
      x: 100,
      scale: 0.8,
    },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    }
  );

  // Animate out and remove
  gsap.to(notification, {
    opacity: 0,
    x: 100,
    scale: 0.8,
    duration: 0.3,
    delay: 3,
    ease: "power2.in",
    onComplete: () => notification.remove(),
  });
}

// Smooth scroll for anchor links with snap support
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Custom scroll navigation for desktop only - Smooth section scrolling
// DISABLED: Using CSS scroll-snap instead for more precise control
/*
function initSectionScroll() {
  // Only enable on desktop
  if (window.innerWidth <= 768) return;
  
  const sections = document.querySelectorAll('section');
  let currentSection = 0;
  let isScrolling = false;
  let scrollTimeout;
  let isFormFocused = false;
  
  // Track when user is interacting with form elements
  const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      isFormFocused = true;
    });
    input.addEventListener('blur', () => {
      isFormFocused = false;
    });
  });
  
  function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) return;
    
    isScrolling = true;
    currentSection = index;
    
    sections[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Longer timeout for smoother experience
    setTimeout(() => {
      isScrolling = false;
    }, 1200);
  }
  
  // Detect which section is currently in view
  function updateCurrentSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = index;
      }
    });
  }
  
  // Handle wheel events with better debouncing
  let accumulatedDelta = 0;
  const deltaThreshold = 100; // Require more scroll to trigger
  
  window.addEventListener('wheel', (e) => {
    // Don't interfere if on mobile, already scrolling, or user is typing in form
    if (window.innerWidth <= 768 || isScrolling || isFormFocused) return;
    
    // Check if scrolling inside contact form area
    const contactForm = document.getElementById('contact-form');
    if (contactForm && contactForm.contains(e.target)) {
      return; // Allow normal scrolling in form
    }
    
    e.preventDefault();
    
    accumulatedDelta += e.deltaY;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (Math.abs(accumulatedDelta) > deltaThreshold) {
        updateCurrentSection();
        
        if (accumulatedDelta > 0) {
          // Scrolling down
          scrollToSection(currentSection + 1);
        } else {
          // Scrolling up
          scrollToSection(currentSection - 1);
        }
        
        accumulatedDelta = 0;
      }
    }, 150);
  }, { passive: false });
  
  // Update current section on scroll
  window.addEventListener('scroll', updateCurrentSection, { passive: true });
  
  // Initialize
  updateCurrentSection();
}

// Initialize section scroll on desktop
if (window.innerWidth > 768) {
  initSectionScroll();
}

// Reinitialize on resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.innerWidth > 768) {
      initSectionScroll();
    }
  }, 250);
});
*/

// Intersection Observer for additional fade effects
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Cursor trail effect (optional, very subtle)
let cursorTrail = [];
const maxTrailLength = 5;

document.addEventListener("mousemove", (e) => {
  // Only add trail on hero section for subtlety
  const hero = document.getElementById("hero");
  if (hero && hero.contains(e.target)) {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (cursorTrail.length > maxTrailLength) {
      cursorTrail.shift();
    }

    // Clean old trails
    cursorTrail = cursorTrail.filter((point) => Date.now() - point.time < 500);
  }
});

// Hamburger Menu Functionality
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.menu-link');
  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
    
    if (isOpen) {
      // Open menu
      mobileMenu.style.opacity = '1';
      mobileMenu.style.visibility = 'visible';
      hamburger.classList.add('active');
    } else {
      // Close menu
      mobileMenu.style.opacity = '0';
      mobileMenu.style.visibility = 'invisible';
      hamburger.classList.remove('active');
    }
  }

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', toggleMenu);

  // Close menu when clicking a link
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) {
        toggleMenu();
      }
    });
  });
}

// Desktop Navbar Auto-Hide Functionality
function initDesktopNavbar() {
  const navbar = document.getElementById('desktop-navbar');
  if (!navbar) return; // Exit if navbar doesn't exist (mobile)
  
  let hideTimeout;
  let isHovering = false;

  function hideNavbar() {
    if (!isHovering) {
      navbar.style.transform = 'translateY(-100%)';
    }
  }

  function showNavbar() {
    navbar.style.transform = 'translateY(0)';
  }

  // Show navbar when mouse is at top of screen
  document.addEventListener('mousemove', (e) => {
    clearTimeout(hideTimeout);

    // Show navbar if mouse is in top 100px
    if (e.clientY < 100) {
      showNavbar();
    }

    // Hide navbar after 2 seconds of no movement
    hideTimeout = setTimeout(hideNavbar, 2000);
  });

  // Prevent hiding when hovering over navbar
  navbar.addEventListener('mouseenter', () => {
    isHovering = true;
    showNavbar();
  });

  navbar.addEventListener('mouseleave', () => {
    isHovering = false;
    hideTimeout = setTimeout(hideNavbar, 2000);
  });

  // Show navbar initially, then hide after 4 seconds
  showNavbar();
  setTimeout(hideNavbar, 4000);
}

// Scroll Progress Bar
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// PowerGlitch Effect for Hero Name
function initGlitch() {
  if (typeof PowerGlitch !== 'undefined') {
    PowerGlitch.glitch('.hero-name', {
      playMode: 'always',
      createContainers: true,
      hideOverflow: false,
      timing: {
        duration: 3000,
        iterations: Infinity,
      },
      glitchTimeSpan: {
        start: 0.6,
        end: 0.75,
      },
      shake: {
        velocity: 10,
        amplitudeX: 0.1,
        amplitudeY: 0.1,
      },
      slice: {
        count: 8,
        velocity: 10,
        minHeight: 0.02,
        maxHeight: 0.1,
        hueRotate: false,
      },
      pulse: false,
    });
  }
}

// GSAP Smooth Scrolling Implementation
function initGSAPSmoothScroll() {
  // Only enable on desktop
  if (window.innerWidth <= 768) return;
  
  const sections = document.querySelectorAll('section, footer');
  let currentSection = 0;
  let isScrolling = false;
  let scrollTimeout;
  
  // Detect which section is currently in view
  function updateCurrentSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = index;
      }
    });
  }
  
  // Smooth scroll to section using GSAP
  function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) return;
    
    isScrolling = true;
    currentSection = index;
    
    // Use GSAP to smoothly scroll to the section
    gsap.to(window, {
      duration: 0.2, // Ultra-fast
      scrollTo: {
        y: sections[index],
        autoKill: false,
        offsetY: 0
      },
      ease: "power3.out", // Smoother deceleration
      onComplete: () => {
        isScrolling = false;
      }
    });
  }
  
  // Handle wheel events for section-by-section scrolling
  let accumulatedDelta = 0;
  const deltaThreshold = 20; // Very responsive
  
  window.addEventListener('wheel', (e) => {
    // Don't interfere if on mobile or already scrolling
    if (window.innerWidth <= 768 || isScrolling) return;
    
    // Check if scrolling inside contact form area
    const contactForm = document.getElementById('contact-form');
    if (contactForm && contactForm.contains(e.target)) {
      return; // Allow normal scrolling in form
    }
    
    e.preventDefault();
    
    accumulatedDelta += e.deltaY;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (Math.abs(accumulatedDelta) > deltaThreshold) {
        updateCurrentSection();
        
        if (accumulatedDelta > 0) {
          // Scrolling down
          scrollToSection(currentSection + 1);
        } else {
          // Scrolling up
          scrollToSection(currentSection - 1);
        }
        
        accumulatedDelta = 0;
      }
    }, 30); // Faster response
  }, { passive: false });
  
  // Update current section on scroll
  window.addEventListener('scroll', updateCurrentSection, { passive: true });
  
  // Initialize
  updateCurrentSection();
  
  // Handle anchor link clicks with GSAP smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        isScrolling = true;
        gsap.to(window, {
          duration: 0.2,
          scrollTo: {
            y: target,
            autoKill: false,
            offsetY: 0
          },
          ease: "power3.out",
          onComplete: () => {
            isScrolling = false;
            updateCurrentSection();
          }
        });
      }
    });
  });
}
