function obtenerSolicitudesBandeja() {
    const datos = localStorage.getItem(
        "enersa_solicitudes"
    );

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

function guardarSolicitudesBandeja(solicitudes) {
    localStorage.setItem(
        "enersa_solicitudes",
        JSON.stringify(solicitudes)
    );
}

function obtenerSolicitudBandeja(id) {
    const solicitudes =
        obtenerSolicitudesBandeja();

    return solicitudes.find(
        solicitud => solicitud.id === id
    );
}

function actualizarEstadoBandeja(
    id,
    nuevoEstado
) {
    const solicitudes =
        obtenerSolicitudesBandeja();

    const indice =
        solicitudes.findIndex(
            solicitud => solicitud.id === id
        );

    if (indice === -1) {
        return false;
    }

    solicitudes[indice].status =
        nuevoEstado;

    solicitudes[indice].updatedAt =
        new Date().toISOString();

    guardarSolicitudesBandeja(
        solicitudes
    );

    return true;
}

function obtenerPendientesAprobacion() {
    return obtenerSolicitudesBandeja().filter(
        solicitud =>
            solicitud.status ===
            "Pendiente de aprobación"
    );
}

function obtenerPendientesCierre() {
    return obtenerSolicitudesBandeja().filter(
        solicitud =>
            solicitud.status ===
            "Pendiente de cierre"
    );
}

function actualizarContadores() {
    const pendientes =
        obtenerPendientesAprobacion();

    const cierres =
        obtenerPendientesCierre();

    const approvalTotal =
        document.getElementById(
            "approvalTotal"
        );

    const closeTotal =
        document.getElementById(
            "closeTotal"
        );

    if (approvalTotal) {
        approvalTotal.textContent =
            pendientes.length;
    }

    if (closeTotal) {
        closeTotal.textContent =
            cierres.length;
    }
}

function mostrarSolicitudOperacion(
    solicitud
) {
    const detail =
        document.getElementById(
            "approvalDetail"
        );

    if (!detail || !solicitud) {
        return;
    }

    const equipo =
        detail.querySelector(
            ".detail-value"
        );

    if (equipo) {
        equipo.textContent =
            solicitud.equipment || "-";
    }

    const valores =
        detail.querySelectorAll(
            ".detail-value"
        );

    if (valores.length > 1) {
        valores[1].textContent =
            solicitud.activity || "-";
    }

    if (valores.length > 2) {
        valores[2].textContent =
            solicitud.executor || "-";
    }

    if (valores.length > 3) {
        valores[3].textContent =
            solicitud.department || "-";
    }

    if (valores.length > 4) {
        valores[4].textContent =
            solicitud.supervisor || "-";
    }

    window.solicitudOperacion =
        solicitud.id;
}

function openApproval(button) {
    const detail =
        document.getElementById(
            "approvalDetail"
        );

    if (!detail) {
        return;
    }

    const solicitudes =
        obtenerPendientesAprobacion();

    if (solicitudes.length === 0) {
        alert(
            "No hay solicitudes pendientes de aprobación."
        );
        return;
    }

    const solicitud =
        solicitudes[0];

    mostrarSolicitudOperacion(
        solicitud
    );

    detail.classList.toggle(
        "show"
    );

    if (button) {
        button.classList.toggle(
            "rotated"
        );
    }
}

function closeApproval() {
    const detail =
        document.getElementById(
            "approvalDetail"
        );

    if (detail) {
        detail.classList.remove(
            "show"
        );
    }

    const button =
        document.querySelector(
            ".request-card .expand-request"
        );

    if (button) {
        button.classList.remove(
            "rotated"
        );
    }
}

function approveRequest() {
    let id =
        window.solicitudOperacion;

    if (!id) {
        const solicitudes =
            obtenerPendientesAprobacion();

        if (solicitudes.length > 0) {
            id =
                solicitudes[0].id;
        }
    }

    if (!id) {
        alert(
            "No hay solicitudes pendientes de aprobación."
        );
        return;
    }

    const solicitud =
        obtenerSolicitudBandeja(id);

    if (!solicitud) {
        alert(
            "No se encontró la solicitud."
        );
        return;
    }

    actualizarEstadoBandeja(
        id,
        "Bloqueo activo"
    );

    closeApproval();
    actualizarContadores();

    alert(
        "La solicitud " +
        id +
        " fue aprobada correctamente."
    );

    location.reload();
}

function openCloseRequest(button) {
    const detail =
        document.getElementById(
            "closeDetail"
        );

    if (!detail) {
        return;
    }

    const solicitudes =
        obtenerPendientesCierre();

    if (solicitudes.length === 0) {
        alert(
            "No hay solicitudes pendientes de cierre."
        );
        return;
    }

    window.solicitudCierre =
        solicitudes[0].id;

    detail.classList.toggle(
        "show"
    );

    if (button) {
        button.classList.toggle(
            "rotated"
        );
    }
}

function closeCloseRequest() {
    const detail =
        document.getElementById(
            "closeDetail"
        );

    if (detail) {
        detail.classList.remove(
            "show"
        );
    }
}

function finishClosure() {
    const record =
        document.getElementById(
            "operationRecord"
        );

    if (!record) {
        return;
    }

    const valor =
        record.value.trim();

    if (!valor) {
        alert(
            "Debe ingresar el registro de operación."
        );
        return;
    }

    let id =
        window.solicitudCierre;

    if (!id) {
        const solicitudes =
            obtenerPendientesCierre();

        if (solicitudes.length > 0) {
            id =
                solicitudes[0].id;
        }
    }

    if (!id) {
        alert(
            "No hay solicitudes pendientes de cierre."
        );
        return;
    }

    actualizarEstadoBandeja(
        id,
        "Terminado"
    );

    closeCloseRequest();
    actualizarContadores();

    alert(
        "El cierre de " +
        id +
        " fue registrado correctamente."
    );

    location.reload();
}

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );

if (mobileMenu) {
    mobileMenu.addEventListener(
        "click",
        () => {
            const sidebar =
                document.getElementById(
                    "sidebar"
                );

            if (sidebar) {
                sidebar.classList.toggle(
                    "open"
                );
            }
        }
    );
}

actualizarContadores();