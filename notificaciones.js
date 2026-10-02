const notificationButton = document.getElementById("notificationButton");
const notificationPanel = document.getElementById("notificationPanel");
const notificationOverlay = document.getElementById("notificationOverlay");
const notificationClose = document.getElementById("notificationClose");
const notificationList = document.getElementById("notificationList");

function abrirNotificaciones() {
    if (!notificationPanel || !notificationOverlay) return;

    notificationPanel.classList.add("open");
    notificationOverlay.classList.add("open");
}

function cerrarNotificaciones() {
    if (!notificationPanel || !notificationOverlay) return;

    notificationPanel.classList.remove("open");
    notificationOverlay.classList.remove("open");
}

if (notificationButton) {
    notificationButton.addEventListener("click", abrirNotificaciones);
}

if (notificationClose) {
    notificationClose.addEventListener("click", cerrarNotificaciones);
}

if (notificationOverlay) {
    notificationOverlay.addEventListener("click", cerrarNotificaciones);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        cerrarNotificaciones();
    }
});