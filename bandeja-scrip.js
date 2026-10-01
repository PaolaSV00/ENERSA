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
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(solicitudes)
    );
}

function obtenerPendientesAprobacion() {
    return obtenerSolicitudes().filter(
        solicitud =>
            solicitud.status === "Pendiente de aprobación"
    );
}

function obtenerPendientesCierre() {
    return obtenerSolicitudes().filter(
        solicitud =>
            solicitud.status === "Pendiente de cierre"
    );
}

function actualizarDatos() {
    const aprobacion = obtenerPendientesAprobacion();
    const cierre = obtenerPendientesCierre();

    const contenedorAprobacion =
        document.getElementById("approvalList");

    const contenedorCierre =
        document.getElementById("closingList");

    const contadorAprobacion =
        document.getElementById("approvalCount");

    const contadorCierre =
        document.getElementById("closingCount");

    if (contadorAprobacion) {
        contadorAprobacion.textContent =
            aprobacion.length;
    }

    if (contadorCierre) {
        contadorCierre.textContent =
            cierre.length;
    }

    if (contenedorAprobacion) {
        if (aprobacion.length === 0) {
            contenedorAprobacion.innerHTML = `
                <div style="padding:25px;text-align:center;">
                    No hay solicitudes pendientes de aprobación.
                </div>
            `;
        } else {
            contenedorAprobacion.innerHTML =
                aprobacion.map(solicitud => `
                    <div
                        class="operation-request"
                        onclick="abrirSolicitudOperacion('${solicitud.id}')"
                    >
                        <strong>${solicitud.id}</strong>

                        <span>
                            ${solicitud.equipment || "-"}
                            ·
                            ${solicitud.activity || "-"}
                        </span>

                        <small>
                            ${solicitud.applicant || solicitud.executor || "-"}
                            ·
                            ${solicitud.dateTime || "-"}
                        </small>

                        <b>›</b>
                    </div>
                `).join("");
        }
    }

    if (contenedorCierre) {
        if (cierre.length === 0) {
            contenedorCierre.innerHTML = `
                <div style="padding:25px;text-align:center;">
                    No hay solicitudes pendientes de cierre.
                </div>
            `;
        } else {
            contenedorCierre.innerHTML =
                cierre.map(solicitud => `
                    <div
                        class="operation-request"
                        onclick="abrirSolicitudOperacion('${solicitud.id}')"
                    >
                        <strong>${solicitud.id}</strong>

                        <span>
                            ${solicitud.equipment || "-"}
                            ·
                            ${solicitud.activity || "-"}
                        </span>

                        <small>
                            ${solicitud.applicant || solicitud.executor || "-"}
                            ·
                            ${solicitud.dateTime || "-"}
                        </small>

                        <b>›</b>
                    </div>
                `).join("");
        }
    }
}

function abrirSolicitudOperacion(id) {
    const solicitud =
        obtenerSolicitudes().find(
            item => item.id === id
        );

    if (!solicitud) {
        return;
    }

    window.solicitudOperacionSeleccionada = id;

    const modal =
        document.getElementById("operationModal");

    const overlay =
        document.getElementById("operationOverlay");

    const body =
        document.getElementById("operationModalBody");

    const title =
        document.getElementById("operationModalTitle");

    if (title) {
        title.textContent =
            `${solicitud.id} — ${solicitud.status}`;
    }

    if (body) {
        body.innerHTML = `
            <div class="equipment-card">
                <h3>${solicitud.equipment || "-"}</h3>
                <p>${solicitud.activity || "-"}</p>
            </div>

            <div class="operation-detail-grid">

                <div>
                    <span>EJECUTANTE</span>
                    <strong>${solicitud.executor || "-"}</strong>
                </div>

                <div>
                    <span>DEPARTAMENTO</span>
                    <strong>${solicitud.department || "-"}</strong>
                </div>

                <div>
                    <span>SUPERVISOR</span>
                    <strong>${solicitud.supervisor || "-"}</strong>
                </div>

                <div>
                    <span>SOLICITANTE</span>
                    <strong>${solicitud.applicant || "-"}</strong>
                </div>

                <div>
                    <span>ÁREA</span>
                    <strong>${solicitud.area || "-"}</strong>
                </div>

                <div>
                    <span>FECHA / HORA</span>
                    <strong>${solicitud.dateTime || "-"}</strong>
                </div>

                <div>
                    <span>ESTADO</span>
                    <strong>${solicitud.status}</strong>
                </div>

                <div>
                    <span>DESCRIPCIÓN</span>
                    <strong>${solicitud.description || "-"}</strong>
                </div>

            </div>

            <div class="operation-actions">

                ${
                    solicitud.status === "Pendiente de aprobación"
                    ? `
                        <button
                            type="button"
                            onclick="aprobarSolicitud()"
                        >
                            Aprobar solicitud
                        </button>
                    `
                    : ""
                }

            </div>
        `;
    }

    if (overlay) {
        overlay.style.display = "block";
    }

    if (modal) {
        modal.classList.add("show");
    }
}

function cerrarSolicitudOperacion() {
    const modal =
        document.getElementById("operationModal");

    const overlay =
        document.getElementById("operationOverlay");

    if (modal) {
        modal.classList.remove("show");
    }

    if (overlay) {
        overlay.style.display = "none";
    }

    window.solicitudOperacionSeleccionada = null;
}

function aprobarSolicitud() {
    const id =
        window.solicitudOperacionSeleccionada;

    if (!id) {
        return;
    }

    const solicitudes = obtenerSolicitudes();

    const indice =
        solicitudes.findIndex(
            solicitud => solicitud.id === id
        );

    if (indice === -1) {
        return;
    }

    solicitudes[indice].status =
        "Bloqueo activo";

    solicitudes[indice].updatedAt =
        new Date().toISOString();

    guardarSolicitudes(solicitudes);

    cerrarSolicitudOperacion();

    actualizarDatos();

    alert(
        "La solicitud fue aprobada correctamente."
    );
}

const closeOperationModal =
    document.getElementById("closeOperationModal");

if (closeOperationModal) {
    closeOperationModal.addEventListener(
        "click",
        cerrarSolicitudOperacion
    );
}

const operationOverlay =
    document.getElementById("operationOverlay");

if (operationOverlay) {
    operationOverlay.addEventListener(
        "click",
        cerrarSolicitudOperacion
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

actualizarDatos();