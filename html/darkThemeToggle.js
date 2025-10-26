function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const btn = document.querySelector('.theme-toggle');
  
  if (document.body.classList.contains('dark-mode')) {
    btn.textContent = '☀️ Светлая тема';
    localStorage.setItem('theme', 'dark');
  } else {
    btn.textContent = '🌙 Темная тема';
    localStorage.setItem('theme', 'light');
  }
}

// Загрузка темы при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  const btn = document.querySelector('.theme-toggle');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    btn.textContent = '☀️ Светлая тема';
  } else {
    btn.textContent = '🌙 Темная тема';
  }
});