const secciones = document.querySelectorAll(".seccion");
const menuItems = document.querySelectorAll(".menu-item");
const tituloSeccion = document.getElementById("titulo-seccion");

const nombresSecciones = {
    panel: "Panel general",
    bandeja: "Bandeja de Operación",
    tarjetas: "Tarjetas activas",
    historial: "Historial de bloqueos",
    solicitudes: "Mis solicitudes",
    administracion: "Administración"
};

function mostrarSeccion(nombre) {
    secciones.forEach(seccion => {
        seccion.classList.remove("activa");
    });

    menuItems.forEach(item => {
        item.classList.remove("activo");
    });

    const seccionSeleccionada = document.getElementById(nombre);

    if (seccionSeleccionada) {
        seccionSeleccionada.classList.add("activa");
    }

    const indice = Object.keys(nombresSecciones).indexOf(nombre);

    if (indice !== -1 && menuItems[indice]) {
        menuItems[indice].classList.add("activo");
    }

    tituloSeccion.textContent = nombresSecciones[nombre] || "Panel general";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function nuevaSolicitud() {
    const mensaje = document.getElementById("mensaje");

    mensaje.classList.add("mostrar");

    setTimeout(() => {
        mensaje.classList.remove("mostrar");
    }, 3000);
}

function filtrarTarjetas() {
    const busqueda = document.getElementById("buscarTarjeta").value.toLowerCase();
    const filas = document.querySelectorAll("#tabla-tarjetas tr");

    filas.forEach(fila => {
        const contenido = fila.textContent.toLowerCase();

        if (contenido.includes(busqueda)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}

mostrarSeccion("panel");