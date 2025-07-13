// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functions
  initSmoothScrolling()
  initScrollAnimations()
  initHeaderEffects()
  initScrollToTop()
  initContactForm()
  initMobileMenu()
  initLoadingAnimation()
  initTypingEffect()
  initProductCardEffects()
  initParallaxEffects()
})

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navLinks = document.querySelector(".nav-links")
        navLinks.classList.remove("active")
      }
    })
  })
}

// Animate elements on scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")

        // Add staggered animation for product cards
        if (entry.target.classList.contains("product-card")) {
          const cards = document.querySelectorAll(".product-card")
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animationDelay = `${index * 0.2}s`
              card.classList.add("animated")
            }, index * 100)
          })
        }
      }
    })
  }, observerOptions)

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el)
  })
}

// Header effects on scroll
function initHeaderEffects() {
  const header = document.querySelector("header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Change header background
    if (scrollTop > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })
}

// Scroll to top functionality
function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scrollTop")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("visible")
    } else {
      scrollTopBtn.classList.remove("visible")
    }
  })

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Contact form submission with correct WhatsApp number
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Add loading state
    const submitBtn = this.querySelector(".submit-btn")
    submitBtn.classList.add("loading")
    submitBtn.disabled = true

    // Get form data
    const formData = new FormData(this)
    const name = formData.get("name")
    const phone = formData.get("phone")
    const message = formData.get("message")

    // Validate form
    if (!name || !phone || !message) {
      showNotification("Mohon lengkapi semua field yang wajib diisi", "error")
      submitBtn.classList.remove("loading")
      submitBtn.disabled = false
      return
    }

    // Simulate form processing
    setTimeout(() => {
      // Create WhatsApp message with correct number
      const whatsappMessage = encodeURIComponent(
        `Halo Pak Sarwan, saya ${name} dan saya ingin ${message}.\n\nNomor telepon saya: ${phone}\n\nTerima kasih!`,
      )
      const whatsappUrl = `https://wa.me/6285740007900?text=${whatsappMessage}`

      // Open WhatsApp
      window.open(whatsappUrl, "_blank")

      // Reset form
      this.reset()

      // Reset button
      submitBtn.classList.remove("loading")
      submitBtn.disabled = false

      // Show success message
      showNotification("Terima kasih! Anda akan diarahkan ke WhatsApp untuk menghubungi Pak Sarwan.", "success")
    }, 1000)
  })
}

// Mobile menu toggle
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu")
  const navLinks = document.querySelector(".nav-links")
  const navLinksItems = document.querySelectorAll(".nav-links a")

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      const isActive = navLinks.classList.contains("active")

      if (isActive) {
        closeMobileMenu()
      } else {
        openMobileMenu()
      }
    })

    // Close menu when clicking nav links
    navLinksItems.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu()
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest("nav") && navLinks.classList.contains("active")) {
        closeMobileMenu()
      }
    })

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("active")) {
        closeMobileMenu()
      }
    })
  }

  function openMobileMenu() {
    navLinks.classList.add("active")
    mobileMenuBtn.classList.add("active")
    mobileMenuBtn.setAttribute("aria-expanded", "true")
    document.body.style.overflow = "hidden"
  }

  function closeMobileMenu() {
    navLinks.classList.remove("active")
    mobileMenuBtn.classList.remove("active")
    mobileMenuBtn.setAttribute("aria-expanded", "false")
    document.body.style.overflow = ""
  }

  // Make functions globally accessible
  window.openMobileMenu = openMobileMenu
  window.closeMobileMenu = closeMobileMenu
}

// Loading animation
function initLoadingAnimation() {
  window.addEventListener("load", () => {
    document.body.classList.add("loading")

    setTimeout(() => {
      document.body.classList.remove("loading")
      document.body.classList.add("loaded")
    }, 500)
  })
}

// Typing effect for hero title
function initTypingEffect() {
  function typeWriter(element, text, speed = 150) {
    let i = 0
    element.textContent = ""
    element.style.borderRight = "2px solid white"

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
        setTimeout(type, speed)
      } else {
        // Remove cursor after typing
        setTimeout(() => {
          element.style.borderRight = "none"
        }, 1000)
      }
    }
    type()
  }

  // Start typing effect after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      const heroTitle = document.querySelector(".hero h1")
      if (heroTitle) {
        typeWriter(heroTitle, "MRATANI", 200)
      }
    }, 1000)
  })
}

// Product card hover effects
function initProductCardEffects() {
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Add pulse animation
      this.style.animation = "pulse 0.6s ease"

      // Add glow effect
      this.style.boxShadow = "0 20px 40px rgba(34, 197, 94, 0.3)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.animation = ""
      this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)"
    })

    // Add click ripple effect
    card.addEventListener("click", function (e) {
      const ripple = document.createElement("div")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(34, 197, 94, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add ripple animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)
}

// Parallax effects
function initParallaxEffects() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".hero, .village")

    parallaxElements.forEach((element) => {
      const speed = 0.5
      const yPos = -(scrolled * speed)
      element.style.backgroundPosition = `center ${yPos}px`
    })
  })
}

// Utility function to show notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#22c55e" : "#3b82f6"};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInFromRight 0.3s ease;
        max-width: 300px;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutToRight 0.3s ease"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

// Add notification animations
const notificationStyle = document.createElement("style")
notificationStyle.textContent = `
    @keyframes slideInFromRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutToRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(notificationStyle)

// Add floating animation to CTA button
function initFloatingAnimation() {
  const ctaButton = document.querySelector(".cta-button")
  if (ctaButton) {
    setInterval(() => {
      ctaButton.style.animation = "none"
      setTimeout(() => {
        ctaButton.style.animation = "bounce 2s infinite"
      }, 10)
    }, 5000)
  }
}

// Initialize floating animation
initFloatingAnimation()

// Add mouse trail effect
function initMouseTrail() {
  const trail = []
  const trailLength = 10

  document.addEventListener("mousemove", (e) => {
    trail.push({ x: e.clientX, y: e.clientY })

    if (trail.length > trailLength) {
      trail.shift()
    }

    // Remove existing trail elements
    document.querySelectorAll(".mouse-trail").forEach((el) => el.remove())

    // Create new trail elements
    trail.forEach((point, index) => {
      const trailElement = document.createElement("div")
      trailElement.className = "mouse-trail"
      trailElement.style.cssText = `
                position: fixed;
                width: ${(index + 1) * 2}px;
                height: ${(index + 1) * 2}px;
                background: rgba(34, 197, 94, ${(index + 1) / trailLength});
                border-radius: 50%;
                left: ${point.x}px;
                top: ${point.y}px;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                transition: all 0.1s ease;
            `
      document.body.appendChild(trailElement)

      setTimeout(() => {
        trailElement.remove()
      }, 100)
    })
  })
}

// Initialize mouse trail (optional - can be enabled/disabled)
// initMouseTrail();

// Add scroll progress indicator
function initScrollProgress() {
  const progressBar = document.createElement("div")
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #22c55e, #16a34a);
        z-index: 10001;
        transition: width 0.1s ease;
    `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progressBar.style.width = scrollPercent + "%"
  })
}

// Initialize scroll progress
initScrollProgress()

// Add easter egg - Konami code
function initEasterEgg() {
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]
  const userInput = []

  document.addEventListener("keydown", (e) => {
    userInput.push(e.code)

    if (userInput.length > konamiCode.length) {
      userInput.shift()
    }

    if (userInput.join(",") === konamiCode.join(",")) {
      // Easter egg activated!
      document.body.style.animation = "rainbow 2s ease infinite"
      showNotification("🌶️ Selamat! Anda menemukan easter egg MRATANI! 🌶️", "success")

      setTimeout(() => {
        document.body.style.animation = ""
      }, 5000)
    }
  })
}

// Add rainbow animation for easter egg
const easterEggStyle = document.createElement("style")
easterEggStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`
document.head.appendChild(easterEggStyle)

// Initialize easter egg
initEasterEgg()

// Performance optimization - Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading
initLazyLoading()

console.log("🌶️ MRATANI Website Loaded Successfully! 🌶️")

// Modern JavaScript with ES6+ features and better performance
class MRATANIWebsite {
  constructor() {
    this.isLoaded = false
    this.scrollPosition = 0
    this.ticking = false

    // Initialize when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.init())
    } else {
      this.init()
    }
  }

  init() {
    this.showLoadingScreen()
    this.initializeComponents()
    this.setupEventListeners()
    this.hideLoadingScreen()
  }

  showLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen")
    if (loadingScreen) {
      loadingScreen.style.display = "flex"
    }
  }

  hideLoadingScreen() {
    setTimeout(() => {
      const loadingScreen = document.getElementById("loadingScreen")
      if (loadingScreen) {
        loadingScreen.classList.add("hidden")
        setTimeout(() => {
          loadingScreen.style.display = "none"
          this.isLoaded = true
          document.body.classList.add("loaded")
        }, 500)
      }
    }, 1500)
  }

  initializeComponents() {
    this.initSmoothScrolling()
    this.initScrollAnimations()
    this.initHeaderEffects()
    this.initScrollToTop()
    this.initContactForm()
    this.initMobileMenu()
    this.initProductInteractions()
    this.initParallaxEffects()
    this.initAccessibility()
  }

  setupEventListeners() {
    // Optimized scroll listener
    window.addEventListener("scroll", () => this.handleScroll(), { passive: true })

    // Resize listener
    window.addEventListener(
      "resize",
      this.debounce(() => this.handleResize(), 250),
    )

    // Keyboard navigation
    document.addEventListener("keydown", (e) => this.handleKeyboard(e))

    // Form validation
    document.addEventListener("input", (e) => this.handleFormInput(e))
  }

  handleScroll() {
    this.scrollPosition = window.pageYOffset

    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updateScrollEffects()
        this.ticking = false
      })
      this.ticking = true
    }
  }

  updateScrollEffects() {
    this.updateHeader()
    this.updateScrollToTop()
    this.updateParallax()
  }

  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))

        if (target) {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = target.offsetTop - headerHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })

          // Close mobile menu if open
          this.closeMobileMenu()

          // Update URL without triggering scroll
          history.pushState(null, null, anchor.getAttribute("href"))
        }
      })
    })
  }

  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated")

          // Staggered animations for product cards
          if (entry.target.classList.contains("product-card")) {
            this.animateProductCards()
          }
        }
      })
    }, observerOptions)

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el)
    })
  }

  animateProductCards() {
    const cards = document.querySelectorAll(".product-card")
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.animationDelay = `${index * 0.2}s`
        card.classList.add("animated")
      }, index * 100)
    })
  }

  initHeaderEffects() {
    this.header = document.querySelector("header")
    this.lastScrollTop = 0
  }

  updateHeader() {
    if (!this.header) return

    // Add scrolled class for styling
    if (this.scrollPosition > 100) {
      this.header.classList.add("scrolled")
    } else {
      this.header.classList.remove("scrolled")
    }

    // Hide/show header on scroll
    if (this.scrollPosition > this.lastScrollTop && this.scrollPosition > 200) {
      this.header.style.transform = "translateY(-100%)"
    } else {
      this.header.style.transform = "translateY(0)"
    }

    this.lastScrollTop = this.scrollPosition
  }

  initScrollToTop() {
    this.scrollTopBtn = document.getElementById("scrollTop")

    if (this.scrollTopBtn) {
      this.scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  }

  updateScrollToTop() {
    if (!this.scrollTopBtn) return

    if (this.scrollPosition > 300) {
      this.scrollTopBtn.classList.add("visible")
    } else {
      this.scrollTopBtn.classList.remove("visible")
    }
  }

  initContactForm() {
    const contactForm = document.getElementById("contactForm")

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => this.handleFormSubmit(e))
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault()

    const form = e.target
    const submitBtn = form.querySelector(".submit-btn")
    const formStatus = form.querySelector(".form-status")

    // Validate form
    if (!this.validateForm(form)) {
      return
    }

    // Show loading state
    this.setFormLoading(submitBtn, true)

    try {
      // Get form data
      const formData = new FormData(form)
      const name = formData.get("name")
      const phone = formData.get("phone")
      const message = formData.get("message")

      // Simulate processing delay
      await this.delay(1000)

      // Create WhatsApp message with correct number
      const whatsappMessage = encodeURIComponent(
        `Halo Pak Sarwan, saya ${name} dan saya ingin ${message}.\n\nNomor telepon saya: ${phone}\n\nTerima kasih!`,
      )
      const whatsappUrl = `https://wa.me/6285740007900?text=${whatsappMessage}`

      // Open WhatsApp
      window.open(whatsappUrl, "_blank", "noopener,noreferrer")

      // Show success message
      this.showFormStatus(formStatus, "success", "Pesan berhasil dikirim! Anda akan diarahkan ke WhatsApp.")

      // Reset form
      form.reset()
      this.clearFormErrors(form)
    } catch (error) {
      console.error("Form submission error:", error)
      this.showFormStatus(formStatus, "error", "Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      this.setFormLoading(submitBtn, false)
    }
  }

  validateForm(form) {
    const requiredFields = form.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      const value = field.value.trim()
      const fieldGroup = field.closest(".form-group")
      const errorElement = fieldGroup.querySelector(".error-message")

      if (!value) {
        this.showFieldError(fieldGroup, errorElement, "Field ini wajib diisi")
        isValid = false
      } else if (field.type === "email" && !this.isValidEmail(value)) {
        this.showFieldError(fieldGroup, errorElement, "Format email tidak valid")
        isValid = false
      } else if (field.type === "tel" && !this.isValidPhone(value)) {
        this.showFieldError(fieldGroup, errorElement, "Format nomor telepon tidak valid")
        isValid = false
      } else {
        this.clearFieldError(fieldGroup, errorElement)
      }
    })

    return isValid
  }

  showFieldError(fieldGroup, errorElement, message) {
    fieldGroup.classList.add("error")
    if (errorElement) {
      errorElement.textContent = message
    }
  }

  clearFieldError(fieldGroup, errorElement) {
    fieldGroup.classList.remove("error")
    if (errorElement) {
      errorElement.textContent = ""
    }
  }

  clearFormErrors(form) {
    const errorGroups = form.querySelectorAll(".form-group.error")
    errorGroups.forEach((group) => {
      group.classList.remove("error")
      const errorElement = group.querySelector(".error-message")
      if (errorElement) {
        errorElement.textContent = ""
      }
    })
  }

  setFormLoading(button, isLoading) {
    if (isLoading) {
      button.classList.add("loading")
      button.disabled = true
    } else {
      button.classList.remove("loading")
      button.disabled = false
    }
  }

  showFormStatus(statusElement, type, message) {
    if (statusElement) {
      statusElement.className = `form-status ${type}`
      statusElement.textContent = message

      // Auto hide after 5 seconds
      setTimeout(() => {
        statusElement.className = "form-status"
        statusElement.textContent = ""
      }, 5000)
    }
  }

  initMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu")
    const navLinks = document.querySelector(".nav-links")
    const navLinksItems = document.querySelectorAll(".nav-links a")

    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        const isActive = navLinks.classList.contains("active")

        if (isActive) {
          this.closeMobileMenu()
        } else {
          this.openMobileMenu()
        }
      })

      // Close menu when clicking nav links
      navLinksItems.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu()
        })
      })

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!e.target.closest("nav") && navLinks.classList.contains("active")) {
          this.closeMobileMenu()
        }
      })

      // Close menu on escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navLinks.classList.contains("active")) {
          this.closeMobileMenu()
        }
      })
    }
  }

  openMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu")
    const navLinks = document.querySelector(".nav-links")

    navLinks.classList.add("active")
    mobileMenuBtn.classList.add("active")
    mobileMenuBtn.setAttribute("aria-expanded", "true")

    // Prevent body scroll
    document.body.style.overflow = "hidden"
  }

  closeMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu")
    const navLinks = document.querySelector(".nav-links")

    navLinks.classList.remove("active")
    mobileMenuBtn.classList.remove("active")
    mobileMenuBtn.setAttribute("aria-expanded", "false")

    // Restore body scroll
    document.body.style.overflow = ""
  }

  initProductInteractions() {
    const productCards = document.querySelectorAll(".product-card")

    productCards.forEach((card) => {
      // Hover effects
      card.addEventListener("mouseenter", () => this.handleProductHover(card, true))
      card.addEventListener("mouseleave", () => this.handleProductHover(card, false))

      // Click effects
      card.addEventListener("click", (e) => this.handleProductClick(e, card))

      // Quick view functionality
      const quickViewBtn = card.querySelector(".quick-view-btn")
      if (quickViewBtn) {
        quickViewBtn.addEventListener("click", (e) => {
          e.stopPropagation()
          this.showProductQuickView(card)
        })
      }
    })
  }

  handleProductHover(card, isHovering) {
    if (isHovering) {
      card.style.transform = "translateY(-8px) scale(1.02)"
      card.style.boxShadow = "0 25px 50px -12px rgba(34, 197, 94, 0.25)"
    } else {
      card.style.transform = ""
      card.style.boxShadow = ""
    }
  }

  handleProductClick(e, card) {
    // Create ripple effect
    const ripple = document.createElement("div")
    const rect = card.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(34, 197, 94, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 10;
    `

    card.style.position = "relative"
    card.style.overflow = "hidden"
    card.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  }

  showProductQuickView(card) {
    const productName = card.querySelector(".product-title").textContent
    const productDescription = card.querySelector(".product-description").textContent
    const productImage = card.querySelector(".product-image").src

    // Create modal (simplified version)
    const modal = document.createElement("div")
    modal.className = "product-modal"
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close" aria-label="Close modal">&times;</button>
          <img src="${productImage}" alt="${productName}" class="modal-image">
          <h3 class="modal-title">${productName}</h3>
          <p class="modal-description">${productDescription}</p>
          <a href="https://wa.me/6281234567890?text=Halo%20Pak%20Sarwan,%20saya%20tertarik%20dengan%20${encodeURIComponent(productName)}" 
             class="modal-cta" target="_blank" rel="noopener">
            <i class="fab fa-whatsapp"></i>
            Pesan Sekarang
          </a>
        </div>
      </div>
    `

    document.body.appendChild(modal)
    document.body.style.overflow = "hidden"

    // Close modal functionality
    const closeModal = () => {
      modal.remove()
      document.body.style.overflow = ""
    }

    modal.querySelector(".modal-close").addEventListener("click", closeModal)
    modal.querySelector(".modal-overlay").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeModal()
    })

    document.addEventListener("keydown", function escapeHandler(e) {
      if (e.key === "Escape") {
        closeModal()
        document.removeEventListener("keydown", escapeHandler)
      }
    })
  }

  initParallaxEffects() {
    this.parallaxElements = document.querySelectorAll(".hero-background, .village-background")
  }

  updateParallax() {
    if (window.innerWidth <= 768) return // Disable on mobile for performance

    this.parallaxElements.forEach((element) => {
      const speed = 0.5
      const yPos = -(this.scrollPosition * speed)
      element.style.transform = `translate3d(0, ${yPos}px, 0)`
    })
  }

  initAccessibility() {
    // Skip link functionality
    const skipLink = document.createElement("a")
    skipLink.href = "#main"
    skipLink.className = "skip-link"
    skipLink.textContent = "Skip to main content"
    document.body.insertBefore(skipLink, document.body.firstChild)

    // Add main landmark
    const mainContent = document.querySelector("#about")
    if (mainContent) {
      mainContent.setAttribute("id", "main")
      mainContent.setAttribute("role", "main")
    }

    // Improve focus management
    this.improveFocusManagement()
  }

  improveFocusManagement() {
    // Trap focus in mobile menu when open
    const navLinks = document.querySelector(".nav-links")
    const mobileMenuBtn = document.querySelector(".mobile-menu")

    if (navLinks && mobileMenuBtn) {
      navLinks.addEventListener("keydown", (e) => {
        if (e.key === "Tab" && navLinks.classList.contains("active")) {
          const focusableElements = navLinks.querySelectorAll("a")
          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      })
    }
  }

  handleKeyboard(e) {
    // Global keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "k":
          e.preventDefault()
          this.focusSearchOrContact()
          break
      }
    }

    // Escape key handling
    if (e.key === "Escape") {
      this.closeMobileMenu()
      // Close any open modals
      const modals = document.querySelectorAll(".product-modal")
      modals.forEach((modal) => modal.remove())
      document.body.style.overflow = ""
    }
  }

  focusSearchOrContact() {
    const contactForm = document.querySelector('#contactForm input[name="name"]')
    if (contactForm) {
      contactForm.focus()
      contactForm.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  handleFormInput(e) {
    if (e.target.matches("input, textarea")) {
      // Real-time validation
      const fieldGroup = e.target.closest(".form-group")
      const errorElement = fieldGroup?.querySelector(".error-message")

      if (fieldGroup && errorElement) {
        // Clear error on input
        if (fieldGroup.classList.contains("error")) {
          this.clearFieldError(fieldGroup, errorElement)
        }
      }
    }
  }

  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      this.closeMobileMenu()
    }

    // Recalculate parallax elements
    this.updateParallax()
  }

  // Utility functions
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  isValidPhone(phone) {
    const phoneRegex = /^[+]?[0-9\s\-$$$$]{10,}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  // Performance monitoring
  measurePerformance() {
    if ("performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType("navigation")[0]
          console.log("🌶️ MRATANI Performance Metrics:")
          console.log(`Page Load Time: ${perfData.loadEventEnd - perfData.fetchStart}ms`)
          console.log(`DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.fetchStart}ms`)
          console.log(`First Paint: ${performance.getEntriesByType("paint")[0]?.startTime}ms`)
        }, 0)
      })
    }
  }
}

// Add ripple animation styles
const rippleStyles = document.createElement("style")
rippleStyles.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .product-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  }
  
  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
  }
  
  .modal-content {
    position: relative;
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    animation: slideInUp 0.3s ease;
  }
  
  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
  }
  
  .modal-close:hover {
    background: #f3f4f6;
    color: #333;
  }
  
  .modal-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }
  
  .modal-description {
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .modal-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #25d366;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
  }
  
  .modal-cta:hover {
    background: #128c7e;
    transform: translateY(-1px);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
document.head.appendChild(rippleStyles)

// Initialize the website
const mrataniWebsite = new MRATANIWebsite()

// Performance monitoring
mrataniWebsite.measurePerformance()

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
  // Google Analytics 4 or other analytics service
  // Placeholder for gtag declaration
  const gtag = window.gtag || (() => {})

  if (typeof gtag !== "undefined") {
    gtag("event", eventName, eventData)
  }

  console.log("Event tracked:", eventName, eventData)
}

// Track important user interactions
document.addEventListener("click", (e) => {
  if (e.target.matches(".whatsapp-btn, .whatsapp-float")) {
    trackEvent("whatsapp_click", {
      product: e.target.closest(".product-card")?.querySelector(".product-title")?.textContent || "general",
    })
  }

  if (e.target.matches(".cta-primary, .cta-secondary")) {
    trackEvent("cta_click", {
      button_text: e.target.textContent.trim(),
    })
  }
})

console.log("🌶️ MRATANI Website Loaded Successfully! 🌶️")
console.log("Modern, SEO-optimized, and user-friendly experience ready!")
