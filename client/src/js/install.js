const installBtn = document.getElementById('installBtn');

// Logic for installing the PWA

// event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
  installBtn.classList.toggle('hidden', false);
});

// click event handler on the `butInstall` element
installBtn.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  promptEvent.prompt();
  window.deferredPrompt = null;
  installBtn.classList.toggle('hidden', true);
});

// handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});
