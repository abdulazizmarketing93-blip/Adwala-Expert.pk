/**
 * ADWALA EXPERTS — Core JavaScript
 * Handles navigation, video player controls, smooth scrolling, animations & contact form
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY NAVBAR ON SCROLL
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. MOBILE MENU TOGGLE
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
      navToggle.innerHTML = isExpanded 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }

  // 3. ACTIVE NAV LINK ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // 4. VIDEO ELEMENTS SAFE INITIALIZATION
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.play().catch(() => {
      // Autoplay with video file might be pending user video drop; poster fallback displays automatically
    });
  }

  const cinematicVideo = document.getElementById('strategyVideo');
  if (cinematicVideo) {
    cinematicVideo.play().catch(() => {});
  }
  const playBtn = document.getElementById('cinematicPlayBtn');
  const muteBtn = document.getElementById('cinematicMuteBtn');

  if (cinematicVideo && playBtn) {
    playBtn.addEventListener('click', () => {
      if (cinematicVideo.paused) {
        cinematicVideo.play().then(() => {
          playBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
          playBtn.setAttribute('title', 'Pause');
        }).catch(() => {});
      } else {
        cinematicVideo.pause();
        playBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
        playBtn.setAttribute('title', 'Play');
      }
    });
  }

  if (cinematicVideo && muteBtn) {
    muteBtn.addEventListener('click', () => {
      cinematicVideo.muted = !cinematicVideo.muted;
      muteBtn.innerHTML = cinematicVideo.muted
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
      muteBtn.setAttribute('title', cinematicVideo.muted ? 'Unmute' : 'Mute');
    });
  }

  // 5. CONTACT FORM HANDLING
  const contactForm = document.getElementById('agencyContactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const company = document.getElementById('contactCompany')?.value.trim();
      const service = document.getElementById('contactService')?.value;
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) {
        alert('Please fill in your name, email, and project message.');
        return;
      }

      // Format WhatsApp message
      const waText = encodeURIComponent(
        `*Adwala Experts Project Inquiry*\n\n` +
        `• *Name:* ${name}\n` +
        `• *Email:* ${email}\n` +
        `• *Company:* ${company || 'N/A'}\n` +
        `• *Service:* ${service || 'General Inquiry'}\n` +
        `• *Message:* ${message}`
      );
      
      // Show clean confirmation status
      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <strong>Thank you, ${name}!</strong> Your inquiry has been prepared.
          <br><span style="font-size:0.84rem;color:#cbd5e1;">Opening direct connection via WhatsApp or email to mshafqat6552@gmail.com...</span>
        `;
        formStatus.style.display = 'block';
      }

      // Reset form
      contactForm.reset();

      // Open WhatsApp inquiry window directly for swift client engagement
      setTimeout(() => {
        window.open(`https://wa.me/923316318530?text=${waText}`, '_blank');
      }, 900);
    });
  }

  // 6. ENHANCED SCROLL REVEAL OBSERVER
  const revealElements = document.querySelectorAll(
    '.service-card, .portfolio-card, .process-card, .pillar-card, .trust-visual-card, ' +
    '.about-image-card, .section-header, .hero-orbit-wrapper, .testimonial-card, ' +
    '.testimonial-full-card, .info-card, .big-process-step, .faq-item, .contact-cta-card, .contact-form-card'
  );
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el, index) => {
      el.classList.add('reveal-fade-up');
      const staggerIndex = (index % 6) + 1;
      el.classList.add(`stagger-${staggerIndex}`);
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 7. STYLISH INTERACTIVE CUSTOM CURSOR
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        isVisible = true;
      }
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      isVisible = false;
    });

    // Smooth physics trailing ring
    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Dynamic hover expansion on interactive elements
    const interactiveSelectors = 'a, button, input, select, textarea, .service-card, .portfolio-card, .testimonial-card, .testimonial-full-card, .info-card, .slider-btn';
    const addHoverState = () => {
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
    };
    const removeHoverState = () => {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
    };

    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', addHoverState);
      el.addEventListener('mouseleave', removeHoverState);
    });
  }

  // 8. BRANDED SPLASH PRELOADER DISMISS
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const hidePreloader = () => {
      preloader.classList.add('loaded');
      setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 700);
    };
    // Ensure smooth load dismissal
    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 400);
    } else {
      window.addEventListener('load', () => setTimeout(hidePreloader, 450));
    }
    // Fail-safe dismissal after max 2.5s
    setTimeout(hidePreloader, 2500);
  }

  // 9. ANIMATED NUMBER COUNTERS (Visibly rolls from 0 to target on scroll into view)
  const counterItems = document.querySelectorAll('.counter-item');
  if (counterItems.length > 0) {
    // Reset to initial 0 state so user clearly sees the animation counting up
    counterItems.forEach(el => {
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      el.textContent = (0).toFixed(decimals) + suffix;
    });

    const animatedElements = new WeakSet();

    const animateNumber = (el) => {
      if (animatedElements.has(el)) return;
      animatedElements.add(el);

      const targetStr = el.getAttribute('data-target') || '0';
      const target = parseFloat(targetStr);
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const duration = 1600; // 1.6s smooth count
      const startTime = performance.now();

      const updateFrame = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth ease out quartic
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = target * easeOut;

        el.textContent = current.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateFrame);
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      };

      requestAnimationFrame(updateFrame);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateNumber(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      counterItems.forEach(item => observer.observe(item));
    }

    // Scroll fallback trigger
    const checkScrollPosition = () => {
      counterItems.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 50 && rect.bottom >= 0) {
          animateNumber(el);
        }
      });
    };
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    // Initial check in case stats are in viewport on load
    setTimeout(checkScrollPosition, 400);
  }

  // 10. TESTIMONIALS SLIDER / CAROUSEL (EXACTLY 1 CARD AT A TIME: Prev / Next Side Buttons & Dots)
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const indicatorsContainer = document.getElementById('sliderIndicators');
  const sliderWrapper = document.getElementById('testimonialsSlider');

  if (track && (prevBtn || nextBtn)) {
    const cards = Array.from(track.children);
    let currentIndex = 0;
    const totalCards = cards.length;
    let autoSlideTimer = null;

    const updateIndicators = () => {
      if (!indicatorsContainer) return;
      indicatorsContainer.innerHTML = '';
      for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${i === currentIndex ? 'active' : ''}`;
        dot.setAttribute('data-index', i);
        dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
        dot.addEventListener('click', () => {
          currentIndex = i;
          slideToIndex();
          resetAutoSlide();
        });
        indicatorsContainer.appendChild(dot);
      }
    };

    const slideToIndex = () => {
      if (currentIndex >= totalCards) currentIndex = 0;
      if (currentIndex < 0) currentIndex = totalCards - 1;

      // Translate by 100% per card for pure 1-card presentation
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      if (indicatorsContainer) {
        const dots = indicatorsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
          if (idx === currentIndex) dot.classList.add('active');
          else dot.classList.remove('active');
        });
      }
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % totalCards;
      slideToIndex();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      slideToIndex();
    };

    const resetAutoSlide = () => {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(nextSlide, 5000); // Auto-advance every 5s
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        resetAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        resetAutoSlide();
      });
    }

    // Touch swipe support for mobile
    let startX = 0;
    let endX = 0;
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) nextSlide();
        else prevSlide();
        resetAutoSlide();
      }
    }, { passive: true });

    // Pause on hover
    if (sliderWrapper) {
      sliderWrapper.addEventListener('mouseenter', () => {
        if (autoSlideTimer) clearInterval(autoSlideTimer);
      });
      sliderWrapper.addEventListener('mouseleave', () => {
        resetAutoSlide();
      });
    }

    window.addEventListener('resize', () => {
      slideToIndex();
    });

    updateIndicators();
    slideToIndex();
    resetAutoSlide();
  }
});
