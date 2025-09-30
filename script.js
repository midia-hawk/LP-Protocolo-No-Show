// DNA Animation Initialization
function initDNAAnimation() {
  const dnaContainer = document.getElementById("dna-container")
  const numberOfDNAElements = 40

  // Clear container
  dnaContainer.innerHTML = ""

  // Create DNA elements
  for (let i = 0; i < numberOfDNAElements; i++) {
    const dnaElement = document.createElement("div")
    dnaElement.className = "dna"

    // Set animation delay for each element
    const delay = -0.1 * i
    dnaElement.style.animationDelay = `${delay}s`

    dnaContainer.appendChild(dnaElement)
  }
}

// Floating Dots Animation
function createFloatingDots() {
  const dotsContainer = document.querySelector(".floating-dots")
  const numberOfDots = 20

  for (let i = 0; i < numberOfDots; i++) {
    const dot = document.createElement("div")
    dot.style.position = "absolute"
    dot.style.width = Math.random() * 6 + 4 + "px"
    dot.style.height = dot.style.width
    dot.style.background = "var(--neon-blue)"
    dot.style.borderRadius = "50%"
    dot.style.left = Math.random() * 100 + "%"
    dot.style.animationDelay = Math.random() * 15 + "s"
    dot.style.animationDuration = Math.random() * 10 + 10 + "s"
    dot.style.opacity = Math.random() * 0.5 + 0.3
    dot.style.boxShadow = "0 0 10px var(--neon-blue)"
    dot.classList.add("floating-dot")

    // Add floating animation
    dot.style.animation = `float ${Math.random() * 10 + 10}s infinite linear`
    dot.style.animationDelay = Math.random() * 15 + "s"

    dotsContainer.appendChild(dot)
  }
}

// Form Handling
function initFormHandling() {
  const form = document.getElementById("contactForm")
  const phoneInput = form.querySelector('input[name="telefone"]')

  // Phone mask
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length >= 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    } else if (value.length >= 7) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
    } else if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2")
    }
    e.target.value = value
  })

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    // Get UTM parameters and fbclid from URL
    const urlParams = new URLSearchParams(window.location.search)
    data.utm_source = urlParams.get("utm_source") || ""
    data.utm_medium = urlParams.get("utm_medium") || ""
    data.utm_campaign = urlParams.get("utm_campaign") || ""
    data.utm_term = urlParams.get("utm_term") || ""
    data.utm_content = urlParams.get("utm_content") || ""
    data.fbclid = urlParams.get("fbclid") || ""

    // Here you would send the data to your webhook
    console.log("Form data with UTM and fbclid:", data)

    // Show success message
    alert("Obrigado! Entraremos em contato em breve para seu diagnóstico gratuito.")
    form.reset()
  })
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Performance optimization for animations
function optimizeAnimations() {
  document.addEventListener("visibilitychange", () => {
    const dnaElements = document.querySelectorAll(".dna")
    const floatingDots = document.querySelectorAll(".floating-dot")

    if (document.hidden) {
      dnaElements.forEach((el) => (el.style.animationPlayState = "paused"))
      floatingDots.forEach((el) => (el.style.animationPlayState = "paused"))
    } else {
      dnaElements.forEach((el) => (el.style.animationPlayState = "running"))
      floatingDots.forEach((el) => (el.style.animationPlayState = "running"))
    }
  })
}

// Intersection Observer for animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for scroll animations
  document.querySelectorAll(".stat-item, .problem-item, .solution-item, .question-item, .method-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(0, 0, 0, 0.98)"
      header.style.borderBottom = "1px solid rgba(0, 212, 255, 0.4)"
    } else {
      header.style.background = "rgba(0, 0, 0, 0.9)"
      header.style.borderBottom = "1px solid rgba(0, 212, 255, 0.3)"
    }
  })
}

function addNeonEffects() {
  // Create animated neon lines
  const neonLines = document.querySelectorAll(".neon-light")

  // Add random neon accent lines throughout the page
  const sections = document.querySelectorAll(
    "section, .hero, .stats, .about, .problems, .solution, .cost-analysis, .method, .contact",
  )

  sections.forEach((section, index) => {
    if (index % 2 === 0) {
      const neonLine = document.createElement("div")
      neonLine.className = "neon-light"
      neonLine.style.position = "absolute"
      neonLine.style.top = Math.random() * 20 + 10 + "%"
      neonLine.style.right = "5%"
      neonLine.style.animationDelay = Math.random() * 3 + "s"
      section.style.position = "relative"
      section.appendChild(neonLine)
    }
  })
}

// Carousel Functionality
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const indicators = document.querySelectorAll('.indicator');
  
  if (!track || !prevBtn || !nextBtn) return;
  
  let currentSlide = 0;
  const totalSlides = 9; // Images 1-9
  let slidesToShow = 3; // Default: 3 slides per view
  let autoPlayInterval;
  let isTransitioning = false;
  
  // Duplicate slides for infinite loop
  function setupInfiniteLoop() {
    const slides = track.children;
    const slideArray = Array.from(slides);
    
    // Clone first few slides and append to end
    for (let i = 0; i < slidesToShow; i++) {
      const clone = slideArray[i].cloneNode(true);
      track.appendChild(clone);
    }
    
    // Clone last few slides and prepend to beginning
    for (let i = totalSlides - slidesToShow; i < totalSlides; i++) {
      const clone = slideArray[i].cloneNode(true);
      track.insertBefore(clone, track.firstChild);
    }
    
    // Adjust starting position
    currentSlide = slidesToShow;
    updateCarousel(false); // Update without transition
  }
  
  // Update slides to show based on screen size
  function updateSlidesToShow() {
    if (window.innerWidth <= 768) {
      slidesToShow = 1;
    } else if (window.innerWidth <= 1024) {
      slidesToShow = 2;
    } else {
      slidesToShow = 3;
    }
  }
  
  function updateCarousel(withTransition = true) {
    updateSlidesToShow();
    
    if (withTransition) {
      track.style.transition = 'transform 0.5s ease';
    } else {
      track.style.transition = 'none';
    }
    
    const translateX = -currentSlide * (100 / slidesToShow);
    track.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators - show current slide position (only for original slides)
    const indicatorIndex = ((currentSlide - slidesToShow) % totalSlides + totalSlides) % totalSlides;
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === indicatorIndex);
    });
  }
  
  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentSlide++;
    updateCarousel();
    
    // Check if we need to reset for infinite loop
    setTimeout(() => {
      if (currentSlide >= totalSlides + slidesToShow) {
        currentSlide = slidesToShow;
        updateCarousel(false);
      }
      isTransitioning = false;
    }, 500);
  }
  
  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentSlide--;
    updateCarousel();
    
    // Check if we need to reset for infinite loop
    setTimeout(() => {
      if (currentSlide < slidesToShow) {
        currentSlide = totalSlides;
        updateCarousel(false);
      }
      isTransitioning = false;
    }, 500);
  }
  
  function goToSlide(slideIndex) {
    if (isTransitioning) return;
    currentSlide = slideIndex + slidesToShow;
    updateCarousel();
  }
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 8000); // Change slide every 8 seconds (ainda mais lento)
  }
  
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  
  // Handle window resize
  function handleResize() {
    updateCarousel();
  }
  
  window.addEventListener('resize', handleResize);
  
  // Event listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoPlay();
    startAutoPlay(); // Restart autoplay
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoPlay();
    startAutoPlay(); // Restart autoplay
  });
  
  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
      stopAutoPlay();
      startAutoPlay(); // Restart autoplay
    });
  });
  
  // Pause autoplay on hover
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
  }
  
  // Touch/swipe support for mobile
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoPlay();
  });
  
  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });
  
  track.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    
    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    startAutoPlay(); // Restart autoplay
  });
  
  // Start autoplay
  startAutoPlay();
  
  // Setup infinite loop and initial update
  setupInfiniteLoop();
  updateCarousel();
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initDNAAnimation()
  createFloatingDots()
  initFormHandling()
  initSmoothScrolling()
  optimizeAnimations()
  initScrollAnimations()
  initHeaderScroll()
  addNeonEffects()
  initCarousel() // Initialize carousel
})

// Handle window resize
window.addEventListener("resize", () => {
  // Mobile optimizations for DNA animation
  if (window.innerWidth < 768) {
    document.querySelectorAll(".dna").forEach((el) => {
      el.style.transform = "scale(0.5)"
    })
  } else {
    document.querySelectorAll(".dna").forEach((el) => {
      el.style.transform = "scale(1)"
    })
  }
})
