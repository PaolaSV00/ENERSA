const STORAGE_KEY = "enersa_solicitudes";

function obtenerSolicitudes() {
    const datos = localStorage.getItem(STORAGE_KEY);

    if (!datos) {
        return [];
    }

    try {
        return JSON.parse(datos);
    } catch (error) {
        return [];
    }
}

function guardarSolicitudes(solicitudes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solicitudes));
}

function obtenerMisSolicitudes() {
    return obtenerSolicitudes().filter(
        solicitud => solicitud.status === "Borrador"
    );
}

function obtenerSolicitud(id) {
    return obtenerSolicitudes().find(
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

function formatearFecha(fecha) {
    if (!fecha) {
        return "-";
    }

    const date = new Date(fecha);

    if (isNaN(date.getTime())) {
        return fecha;
    }

    return date.toLocaleString("es-HN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function obtenerTarjetas(solicitud) {
    if (Array.isArray(solicitud.cards)) {
        return solicitud.cards;
    }

    if (typeof solicitud.cards === "string" && solicitud.cards.trim() !== "") {
        try {
            const tarjetas = JSON.parse(solicitud.cards);

            if (Array.isArray(tarjetas)) {
                return tarjetas;
            }
        } catch (error) {
        }

        return [
            {
                id: solicitud.cards,
                description: "Punto de aislamiento"
            }
        ];
    }

    return [];
}

function renderRequests() {
    const tabla = document.getElementById("requestsTable");
    const contador = document.getElementById("requestCount");

    if (!tabla) {
        return;
    }

    const solicitudes = obtenerMisSolicitudes();

    if (contador) {
        contador.textContent = solicitudes.length;
    }

    if (solicitudes.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="10" style="text-align:center;padding:35px;">
                    No hay solicitudes en borrador.
                </td>
            </tr>
        `;
        return;
    }

    tabla.innerHTML = solicitudes.map(solicitud => `
        <tr>
            <td class="id-cell">
                ${solicitud.id}
            </td>

            <td class="equipment">
                <strong>${solicitud.equipment || "-"}</strong>
                <span>${solicitud.activity || ""}</span>
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
                ${obtenerTarjetas(solicitud).length}
            </td>

            <td>
                <span class="status ${getStatusClass(solicitud.status)}">
                    ${solicitud.status}
                </span>
            </td>

            <td class="time-cell">
                ${solicitud.blockedTime || "0 h 00 min"}
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
    `).join("");
}

function openRequestDetail(id) {
    const solicitud = obtenerSolicitud(id);

    if (!solicitud) {
        return;
    }

    window.solicitudSeleccionada = id;

    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const overlay = document.getElementById("overlay");
    const detailModal = document.getElementById("detailModal");

    const tarjetas = obtenerTarjetas(solicitud);

    if (modalTitle) {
        modalTitle.textContent = `${solicitud.id} — ${solicitud.status}`;
    }

    if (modalBody) {
        modalBody.innerHTML = `
            <div class="equipment-card">
                <h3>${solicitud.equipment || "-"}</h3>
                <p>${solicitud.activity || "Sin actividad registrada"}</p>
            </div>

            <div class="request-info-grid">

                <div class="info-item">
                    <span>EJECUTANTE</span>
                    <strong>${solicitud.executor || "-"}</strong>
                </div>

                <div class="info-item">
                    <span>DEPARTAMENTO</span>
                    <strong>${solicitud.department || "-"}</strong>
                </div>

                <div class="info-item">
                    <span>SUPERVISOR</span>
                    <strong>${solicitud.supervisor || "-"}</strong>
                </div>

                <div class="info-item">
                    <span>SOLICITANTE</span>
                    <strong>${solicitud.applicant || "-"}</strong>
                </div>

                <div class="info-item">
                    <span>ÁREA</span>
                    <strong>${solicitud.area || "-"}</strong>
                </div>

                <div class="info-item">
                    <span>FECHA / HORA DE BLOQUEO</span>
                    <strong>${solicitud.dateTime || "-"}</strong>
                </div>

                <div class="info-item">
                    <span>ESTADO</span>
                    <strong>${solicitud.status}</strong>
                </div>

                <div class="info-item">
                    <span>TIEMPO BLOQUEADO</span>
                    <strong>${solicitud.blockedTime || "0 h 00 min"}</strong>
                </div>

                <div class="info-item">
                    <span>DESCRIPCIÓN</span>
                    <strong>${solicitud.description || "-"}</strong>
                </div>

            </div>

            <div class="cards-section">

                <div class="cards-header">
                    <strong>🏷 Tarjetas / puntos de aislamiento</strong>
                    <span class="cards-count">${tarjetas.length}</span>
                </div>

                ${
                    tarjetas.length > 0
                    ? tarjetas.map((tarjeta, index) => `
                        <div class="card-row">
                            <strong>${tarjeta.id || tarjeta.codigo || `Tarjeta ${index + 1}`}</strong>
                            <span>${tarjeta.description || tarjeta.descripcion || tarjeta.name || tarjeta.nombre || "Punto de aislamiento"}</span>
                            <span class="card-status">Prevista</span>
                        </div>
                    `).join("")
                    : `
                        <div class="empty-cards">
                            No hay tarjetas o puntos de aislamiento registrados.
                        </div>
                    `
                }

            </div>

            <div class="timeline-section">

                <div class="timeline-title">
                    Línea de tiempo y auditoría
                </div>

                <div class="timeline-item">
                    <strong>Borrador creado</strong>
                    <small>${formatearFecha(solicitud.createdAt)}</small>
                    <span>
                        Borrador · Supervisor: ${solicitud.supervisor || "-"}
                    </span>
                </div>

                ${
                    solicitud.status === "Pendiente de aprobación"
                    ? `
                        <div class="timeline-item">
                            <strong>Solicitud enviada a Operación</strong>
                            <small>${formatearFecha(solicitud.updatedAt)}</small>
                            <span>
                                Pendiente de aprobación
                            </span>
                        </div>
                    `
                    : ""
                }

            </div>

            ${
                solicitud.status === "Borrador"
                ? `
                    <div class="drawer-actions">

                        <button
                            type="button"
                            class="drawer-edit"
                            onclick="editarSolicitud()"
                        >
                            Editar borrador
                        </button>

                        <button
                            type="button"
                            class="drawer-send"
                            onclick="enviarSolicitudAOperacion()"
                        >
                            Enviar solicitud a Operación
                        </button>

                    </div>
                `
                : ""
            }
        `;
    }

    if (overlay) {
        overlay.style.display = "block";
    }

    if (detailModal) {
        detailModal.classList.add("show");
    }
}

function cerrarDetalle() {
    const detailModal = document.getElementById("detailModal");
    const overlay = document.getElementById("overlay");

    if (detailModal) {
        detailModal.classList.remove("show");
    }

    if (overlay) {
        overlay.style.display = "none";
    }

    window.solicitudSeleccionada = null;
}

function editarSolicitud() {
    const id = window.solicitudSeleccionada;

    if (!id) {
        return;
    }

    window.location.href =
        "nueva-solicitud.html?editar=" +
        encodeURIComponent(id);
}

function enviarSolicitudAOperacion() {
    const id = window.solicitudSeleccionada;

    if (!id) {
        alert("No hay ninguna solicitud seleccionada.");
        return;
    }

    const solicitudes = obtenerSolicitudes();

    const indice = solicitudes.findIndex(
        solicitud => solicitud.id === id
    );

    if (indice === -1) {
        alert("No se encontró la solicitud.");
        return;
    }

    if (solicitudes[indice].status !== "Borrador") {
        alert("Esta solicitud ya fue enviada.");
        return;
    }

    solicitudes[indice].status = "Pendiente de aprobación";
    solicitudes[indice].updatedAt = new Date().toISOString();

    guardarSolicitudes(solicitudes);

    cerrarDetalle();

    renderRequests();

    actualizarBadgeOperacion();

    alert(
        "La solicitud fue enviada a Operación y quedó pendiente de aprobación."
    );
}

function actualizarBadgeOperacion() {
    const badge = document.getElementById("operationBadge");

    if (!badge) {
        return;
    }

    const pendientes = obtenerSolicitudes().filter(
        solicitud => solicitud.status === "Pendiente de aprobación"
    );

    badge.textContent = pendientes.length;
}

const closeModal = document.getElementById("closeModal");

if (closeModal) {
    closeModal.addEventListener("click", cerrarDetalle);
}

const overlay = document.getElementById("overlay");

if (overlay) {
    overlay.addEventListener("click", cerrarDetalle);
}

const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
        const sidebar = document.getElementById("sidebar");

        if (sidebar) {
            sidebar.classList.toggle("open");
        }
    });
}

renderRequests();
actualizarBadgeOperacion();