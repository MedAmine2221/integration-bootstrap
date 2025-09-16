document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const html = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "light";
  html.setAttribute("data-bs-theme", savedTheme);
  updateThemeIcon(savedTheme);
  updateThemeImages(savedTheme);

  updateNavbarStyle(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    html.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    updateThemeIcon(newTheme);
    updateThemeImages(newTheme);
    updateNavbarStyle(newTheme);

    document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";
    setTimeout(() => {
      document.body.style.transition = "";
    }, 300);
  });

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.className = "bi bi-moon-fill";
    } else {
      themeIcon.className = "bi bi-sun-fill";
    }
  }

  // Fonction pour mettre à jour les images selon le thème
  function updateThemeImages(theme) {
    const themeImages = document.querySelectorAll(".theme-image");
    themeImages.forEach((img) => {
      const lightSrc = img.getAttribute("data-light-src");
      const darkSrc = img.getAttribute("data-dark-src");

      if (theme === "dark" && darkSrc) {
        img.src = darkSrc;
      } else if (theme === "light" && lightSrc) {
        img.src = lightSrc;
      }
    });
  }

  function updateNavbarStyle(theme) {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    
    if (window.scrollY > 50) {
      navbar.style.background = theme === "dark" 
        ? "rgba(26, 26, 46, 0.98)" 
        : "rgba(255, 255, 255, 0.98)";
    } else {
      navbar.style.background = theme === "dark" 
        ? "rgba(26, 26, 46, 0.95)" 
        : "rgba(255, 255, 255, 0.95)";
    }
  }

  window.addEventListener("scroll", () => {
    const currentTheme = html.getAttribute("data-bs-theme");
    updateNavbarStyle(currentTheme);
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Loading animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loaded");
      }
    });
  }, observerOptions);

  // Add loading class to elements and observe them
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("loading");
    observer.observe(section);
  });

  // Newsletter form handling
  const newsletterForm = document.querySelector(".newsletter-input-group");
  if (newsletterForm) {
    const submitBtn = newsletterForm.querySelector("button");
    const emailInput = newsletterForm.querySelector('input[type="email"]');

    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (email && isValidEmail(email)) {
        // Simulate subscription
        submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Subscribed!';
        submitBtn.classList.remove("btn-light");
        submitBtn.classList.add("btn-success");
        emailInput.value = "";

        setTimeout(() => {
          submitBtn.innerHTML = "Subscribe <i class='bi bi-arrow-right ms-2'></i>";
          submitBtn.classList.remove("btn-success");
          submitBtn.classList.add("btn-light");
        }, 3000);
      } else {
        emailInput.classList.add("is-invalid");
        setTimeout(() => {
          emailInput.classList.remove("is-invalid");
        }, 3000);
      }
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Mobile menu close on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
});