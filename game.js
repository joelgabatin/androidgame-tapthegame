let score = 0;
const scoreElement = document.getElementById('score');
const tapButton = document.getElementById('tapButton');
const installBtn = document.getElementById('installBtn');

tapButton.addEventListener('click', () => {
  score++;
  scoreElement.textContent = score;
});

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.addEventListener('click', () => {
  installBtn.hidden = true;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(() => {
    deferredPrompt = null;
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('SW registered:', reg))
      .catch(err => console.error('SW registration failed:', err));
  });
}
