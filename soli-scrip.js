const STORAGE_KEY = "enersa_solicitudes";

function obtenerSolicitudes() {
    const datos = localStorage.getItem(STORAGE_KEY);

    if (!datos) {
        return [];
    }

    try {
        return JSON.parse(datos);
    } catch (error) {
        console.error(error);
        return [];
    }
}

function guardarSolicitudes(solicitudes) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(solicitudes)
    );
}

function generarIdSolicitud() {
    const solicitudes = obtenerSolicitudes();
    let mayor = 0;

    solicitudes.forEach(solicitud => {
        if (!solicitud.id) return;

        const partes = solicitud.id.split("-");
        const numero = parseInt(partes[2]);

        if (!isNaN(numero) && numero > mayor) {
            mayor = numero;
        }
    });

    mayor++;

    return "BLQ-2026-" + String(mayor).padStart(4, "0");
}

function crearSolicitud(datos) {
    const solicitudes = obtenerSolicitudes();

    const nuevaSolicitud = {
        id: generarIdSolicitud(),
        equipment: datos.equipment || "",
        activity: datos.activity || "",
        executor: datos.executor || "",
        department: datos.department || "",
        supervisor: datos.supervisor || "",
        applicant: datos.applicant || "",
        dateTime: datos.dateTime || new Date().toLocaleString("es-HN"),
        cards: datos.cards || "0",
        status: "Borrador",
        blockedTime: "0 h 00 min",
        area: datos.area || "",
        description: datos.description || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    solicitudes.push(nuevaSolicitud);
    guardarSolicitudes(solicitudes);

    return nuevaSolicitud;
}

function actualizarEstado(id, nuevoEstado) {
    const solicitudes = obtenerSolicitudes();

    const indice = solicitudes.findIndex(
        solicitud => solicitud.id === id
    );

    if (indice === -1) {
        return false;
    }

    solicitudes[indice].status = nuevoEstado;
    solicitudes[indice].updatedAt = new Date().toISOString();

    guardarSolicitudes(solicitudes);

    return true;
}

function obtenerSolicitud(id) {
    const solicitudes = obtenerSolicitudes();

    return solicitudes.find(
        solicitud => solicitud.id === id
    );
}

function getStatusClass(status) {
    switch (status) {
        case "Borrador":
            return "draft";

        case "Pendiente de aprobación":
            return "pending";

        case "Bloqueo activo":
            return "active";

        case "Pendiente de cierre":
            return "closing";

        case "Terminado":
            return "finished";

        default:
            return "";
    }
}

function obtenerMisSolicitudes() {
    const solicitudes = obtenerSolicitudes();

    return solicitudes.filter(
        solicitud =>
            solicitud.status === "Borrador" ||
            solicitud.status === "Pendiente de aprobación"
    );
}

function renderRequests() {
    const tabla = document.getElementById("requestsTable");
    const contador = document.getElementById("requestCount");

    if (!tabla) {
        return;
    }

    const solicitudes = obtenerMisSolicitudes();

    if (solicitudes.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="10" style="text-align:center;padding:30px;">
                    No hay solicitudes registradas.
                </td>
            </tr>
        `;
    } else {
        tabla.innerHTML = solicitudes.map(
            solicitud => `
                <tr>
                    <td class="id-cell">
                        ${solicitud.id}
                    </td>

                    <td class="equipment">
                        <strong>
                            ${solicitud.equipment || "-"}
                        </strong>

                        ${
                            solicitud.activity
                                ? `<small>${solicitud.activity}</small>`
                                : ""
                        }
                    </td>

                    <td>
                        ${solicitud.executor || "-"}
                    </td>

                    <td>
                        ${solicitud.department || "-"}
                    </td>

                    <td>
                        ${solicitud.supervisor || "-"}
                    </td>

                    <td>
                        ${solicitud.dateTime || "-"}
                    </td>

                    <td>
                        ${solicitud.cards || "0"}
                    </td>

                    <td>
                        <span class="status ${getStatusClass(solicitud.status)}">
                            ${solicitud.status}
                        </span>
                    </td>

                    <td class="time-cell">
                        ${solicitud.blockedTime}
                    </td>

                    <td>
                        <button
                            class="detail-button"
                            onclick="openRequestDetail('${solicitud.id}')"
                        >
                            ›
                        </button>
                    </td>
                </tr>
            `
        ).join("");
    }

    if (contador) {
        contador.textContent = solicitudes.length;
    }
}

function openRequestDetail(id) {
    const solicitud = obtenerSolicitud(id);

    if (!solicitud) {
        return;
    }

    window.solicitudSeleccionada = id;

    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");

    if (modalTitle) {
        modalTitle.textContent = solicitud.id;
    }

    if (modalBody) {
        modalBody.innerHTML = `
            <div class="detail-item">
                <span>ID</span>
                <strong>${solicitud.id}</strong>
            </div>

            <div class="detail-item">
                <span>EQUIPO / ACTIVIDAD</span>
                <strong>${solicitud.equipment || "-"}</strong>
                ${
                    solicitud.activity
                        ? `<small>${solicitud.activity}</small>`
                        : ""
                }
            </div>

            <div class="detail-item">
                <span>EJECUTANTE</span>
                <strong>${solicitud.executor || "-"}</strong>
            </div>

            <div class="detail-item">
                <span>DEPARTAMENTO</span>
                <strong>${solicitud.department || "-"}</strong>
            </div>

            <div class="detail-item">
                <span>SUPERVISOR</span>
                <strong>${solicitud.supervisor || "-"}</strong>
            </div>

            <div class="detail-item">
                <span>FECHA / HORA DE BLOQUEO</span>
                <strong>${solicitud.dateTime || "-"}</strong>
            </div>

            <div class="detail-item">
                <span>TARJETAS</span>
                <strong>${solicitud.cards || "0"}</strong>
            </div>

            <div class="detail-item">
                <span>ESTADO</span>
                <strong>${solicitud.status}</strong>
            </div>

            <div class="detail-item">
                <span>TIEMPO BLOQUEADO</span>
                <strong>${solicitud.blockedTime}</strong>
            </div>

            <div class="detail-item">
                <span>ÁREA</span>
                <strong>${solicitud.area || "-"}</strong>
            </div>

            <div class="detail-item">
                <span>DESCRIPCIÓN</span>
                <strong>${solicitud.description || "-"}</strong>
            </div>
        `;
    }

    const overlay = document.getElementById("overlay");
    const detailModal = document.getElementById("detailModal");

    if (overlay) {
        overlay.style.display = "block";
    }

    if (detailModal) {
        detailModal.classList.add("show");
    }
}

function closeDetail() {
    const detailModal = document.getElementById("detailModal");
    const overlay = document.getElementById("overlay");

    if (detailModal) {
        detailModal.classList.remove("show");
    }

    if (overlay) {
        overlay.style.display = "none";
    }
}

function enviarSolicitudAOperacion() {
    const id = window.solicitudSeleccionada;

    if (!id) {
        alert("No hay ninguna solicitud seleccionada.");
        return;
    }

    const solicitud = obtenerSolicitud(id);

    if (!solicitud) {
        alert("No se encontró la solicitud.");
        return;
    }

    if (solicitud.status !== "Borrador") {
        alert("Esta solicitud ya fue enviada.");
        return;
    }

    actualizarEstado(
        id,
        "Pendiente de aprobación"
    );

    closeDetail();
    renderRequests();

    alert(
        "La solicitud fue enviada a Operación correctamente."
    );
}

const closeModal =
    document.getElementById("closeModal");

if (closeModal) {
    closeModal.addEventListener(
        "click",
        closeDetail
    );
}

const overlay =
    document.getElementById("overlay");

if (overlay) {
    overlay.addEventListener(
        "click",
        closeDetail
    );
}

const mobileMenu =
    document.getElementById("mobileMenu");

if (mobileMenu) {
    mobileMenu.addEventListener(
        "click",
        () => {
            const sidebar =
                document.getElementById("sidebar");

            if (sidebar) {
                sidebar.classList.toggle("open");
            }
        }
    );
}

renderRequests();