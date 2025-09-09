document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("toggle-theme");
  const icon = document.getElementById("theme-icon");
  const body = document.body;

  // Detecta tema guardado
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    icon.classList.remove("bi-moon-fill");
    icon.classList.add("bi-brightness-high-fill");
  } else {
    // Modo oscuro por defecto
    icon.classList.remove("bi-brightness-high-fill");
    icon.classList.add("bi-moon-fill");
  }

  btn.addEventListener("click", function () {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
      icon.classList.remove("bi-moon-fill");
      icon.classList.add("bi-brightness-high-fill");
      localStorage.setItem("theme", "light");
    } else {
      icon.classList.remove("bi-brightness-high-fill");
      icon.classList.add("bi-moon-fill");
      localStorage.setItem("theme", "dark");
    }
  });

  // Toggle de Experiencia Laboral
  const expBtn = document.getElementById("toggle-experience");
  const expIcon = document.getElementById("icon-experience");
  const expSection = document.getElementById("experience-content");
  if (expBtn && expIcon && expSection) {
    // Estado inicial desde localStorage
    const collapsed = localStorage.getItem("experience-collapsed") === "true";
    if (collapsed) {
      expSection.classList.add("d-none");
      expBtn.setAttribute("aria-expanded", "false");
      expIcon.classList.remove("bi-chevron-up");
      expIcon.classList.add("bi-chevron-down");
    }

    expBtn.addEventListener("click", function () {
      const isHidden = expSection.classList.toggle("d-none");
      expBtn.setAttribute("aria-expanded", (!isHidden).toString());
      expIcon.classList.toggle("bi-chevron-up", !isHidden);
      expIcon.classList.toggle("bi-chevron-down", isHidden);
      localStorage.setItem("experience-collapsed", isHidden ? "true" : "false");
    });
  }

  // Toggle de Social Media
  const socialBtn = document.getElementById("toggle-social");
  const socialIcon = document.getElementById("icon-social");
  const socialSection = document.getElementById("social-content");
  if (socialBtn && socialIcon && socialSection) {
    const socialCollapsed = localStorage.getItem("social-collapsed") === "true";
    if (socialCollapsed) {
      socialSection.classList.add("d-none");
      socialBtn.setAttribute("aria-expanded", "false");
      socialIcon.classList.remove("bi-chevron-up");
      socialIcon.classList.add("bi-chevron-down");
    }
    socialBtn.addEventListener("click", function () {
      const isHidden = socialSection.classList.toggle("d-none");
      socialBtn.setAttribute("aria-expanded", (!isHidden).toString());
      socialIcon.classList.toggle("bi-chevron-up", !isHidden);
      socialIcon.classList.toggle("bi-chevron-down", isHidden);
      localStorage.setItem("social-collapsed", isHidden ? "true" : "false");
    });
  }

  // Saludo dinámico bajo la foto (3s)
  const greetEl = document.getElementById("greeting");
  if (greetEl) {
    const hour = new Date().getHours();
    let saludo = "Buenas noches";
    if (hour >= 5 && hour < 12) saludo = "Buenos días";
    else if (hour >= 12 && hour < 19) saludo = "Buenas tardes";
    greetEl.textContent = `${saludo}, este es el CV de Juan Pablo Madriz.`;
    // Mostrar con animación
    greetEl.classList.remove("d-none");
    requestAnimationFrame(() => {
      greetEl.classList.add("show");
    });
    // Ocultar tras 3s
    setTimeout(() => {
      greetEl.classList.remove("show");
      setTimeout(() => {
        greetEl.classList.add("d-none");
      }, 400);
    }, 3000);
  }
});
