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
  let lastScrollTop = 0
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Change header background
    if (scrollTop > 100) {
      header.style.background = "rgba(34, 197, 94, 0.98)"
      header.style.backdropFilter = "blur(15px)"
      header.style.boxShadow = "0 2px 20px rgba(34, 197, 94, 0.3)"
    } else {
      header.style.background = "rgba(34, 197, 94, 0.95)"
      header.style.backdropFilter = "blur(10px)"
      header.style.boxShadow = "none"
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

// Contact form submission
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Add loading state
    const submitBtn = this.querySelector(".submit-btn")
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Mengirim..."
    submitBtn.disabled = true

    // Get form data
    const formData = new FormData(this)
    const name = formData.get("name")
    const phone = formData.get("phone")
    const message = formData.get("message")

    // Simulate form processing
    setTimeout(() => {
      // Create WhatsApp message with the requested format
      const whatsappMessage = encodeURIComponent(
        `Halo Pak Sarwan, saya ${name} dan saya ingin ${message}.\n\nNomor telepon saya: ${phone}\n\nTerima kasih!`,
      )
      const whatsappUrl = `https://wa.me/6281234567890?text=${whatsappMessage}`

      // Open WhatsApp
      window.open(whatsappUrl, "_blank")

      // Reset form
      this.reset()

      // Reset button
      submitBtn.textContent = originalText
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

  mobileMenuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active")

    // Animate hamburger icon
    const icon = this.querySelector("i")
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    } else {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav")) {
      navLinks.classList.remove("active")
      const icon = mobileMenuBtn.querySelector("i")
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })
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
