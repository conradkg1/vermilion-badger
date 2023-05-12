const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    // Save prompt event 
    deferredPrompt = event;
    // Ensure button is displayed in navbar
    butInstall.hidden = false;
    butInstall.addEventListener("click", installJATE);
});
async function installTextEditor() {
    // Show prompt
    deferredPrompt.prompt();
    butInstall.disabled = true;

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
        butInstall.hidden = true;
    }
    butInstall.disabled = false;
    deferredPrompt = null;
}
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
