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
});
