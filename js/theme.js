// Load saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
});


// Toggle Theme
function toggleTheme() {
  const themeLink = document.getElementById("theme-style");

  if (themeLink.getAttribute("href") === "css/styles.css") {
    themeLink.setAttribute("href", "css/styles-light.css");
  } else {
    themeLink.setAttribute("href", "css/styles.css");
  }
}