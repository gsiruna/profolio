function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('dark-theme');
  if (savedTheme === null || savedTheme === 'true') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('dark-theme', 'true');
  } else {
    document.body.classList.remove('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', isDark);
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
}

// Footer year auto-update
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  setupThemeToggle();
});
