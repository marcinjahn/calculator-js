export function setupThemeSwitcher() {
  const lightThemeButton = document.getElementById('light-theme');
  lightThemeButton.addEventListener('click', () => {
    document.body.setAttribute('data-theme', 'light');
  });

  const darkThemeButton = document.getElementById('dark-theme');
  darkThemeButton.addEventListener('click', () => {
    document.body.setAttribute('data-theme', 'dark');
  });
}
