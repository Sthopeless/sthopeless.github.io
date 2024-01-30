function toggleTheme() {
    var body = document.getElementsByTagName('body')[0];
    var themeButton = document.getElementById('themeButton');
  
    if (body.classList.contains('light-theme')) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      themeButton.innerText = 'Light Theme';
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      themeButton.innerText = 'Dark Theme';
    }
}