const currentUserRole = "Administrador";

const blocksData = [
    {
        id: "BLQ-2026-0008",
        equipment: "Motor P001",
        activity: "Se va a realizar mantenimiento",
        executor: "Allan Medina",
        department: "Eléctrico",
        supervisor: "Cristobal Silva",
        requester: "Luis Madrid",
        area: "Sala de máquinas",
        date: "25/09/2026",
        time: "14:41",
        cards: [
            {
                serial: "0001",
                description: "Válvula entrada",
                status: "Instalada"
            },
            {
                serial: "0002",
                description: "Válvula salida",
                status: "Instalada"
            },
            {
                serial: "0003",
                description: "Breaker motor",
                status: "Instalada"
            }
        ],
        status: "Bloqueo activo",
        blockedTime: "90 h 32 min",
        timeline: [
            {
                title: "Borrador creado",
                date: "25/09/2026, 14:40",
                user: "Luis Madrid",
                email: "lmadrid@enersa-energia.com",
                description: "Borrador · Supervisor: Cristobal Silva"
            },
            {
                title: "Solicitud enviada",
                date: "25/09/2026, 14:41",
                user: "Luis Madrid",
                email: "lmadrid@enersa-energia.com",
                description: "Pendiente de aprobación · Supervisor: Cristobal Silva"
            },
            {
                title: "Bloqueo activo",
                date: "25/09/2026, 15:05",
                user: "Cristobal Silva",
                email: "cristobal@enersa-energia.com",
                description: "Bloqueo realizado y tarjetas instaladas"
            }
        ]
    },
    {
        id: "BLQ-2026-0007",
        equipment: "Panel ESSER",
        activity: "Prueba realizada del SCI",
        executor: "Técnico eléctrico",
        department: "Ambiente",
        supervisor: "Cristobal Silva",
        requester: "Luis Madrid",
        area: "Sistema contra incendios",
        date: "25/09/2026",
        time: "13:20",
        cards: [
            {
                serial: "0004",
                description: "Panel principal",
                status: "Instalada"
            }
        ],
        status: "Pendiente de cierre",
        blockedTime: "91 h 12 min",
        timeline: [
            {
                title: "Borrador creado",
                date: "25/09/2026, 13:10",
                user: "Luis Madrid",
                email: "lmadrid@enersa-energia.com",
                description: "Borrador creado"
            },
            {
                title: "Solicitud enviada",
                date: "25/09/2026, 13:20",
                user: "Luis Madrid",
                email: "lmadrid@enersa-energia.com",
                description: "Solicitud enviada"
            },
            {
                title: "Bloqueo activo",
                date: "25/09/2026, 13:40",
                user: "Cristobal Silva",
                email: "cristobal@enersa-energia.com",
                description: "Bloqueo realizado"
            },
            {
                title: "Pendiente de cierre",
                date: "29/09/2026, 08:20",
                user: "Operación",
                email: "operacion@enersa-energia.com",
                description: "Se notificó el cierre del bloqueo"
            }
        ]
    },
    {
        id: "BLQ-2026-0006",
        equipment: "Veolia",
        activity: "Visita al transformador",
        executor: "Luis Ortiz",
        department: "Mecánico",
        supervisor: "Cristobal Silva",
        requester: "Luis Madrid",
        area: "Transformador principal",
        date: "25/09/2026",
        time: "12:50",
        cards: [
            {
                serial: "0005",
                description: "Transformador principal",
                status: "Instalada"
            }
        ],
        status: "Bloqueo activo",
        blockedTime: "92 h 10 min",
        timeline: [
            {
                title: "Solicitud enviada",
                date: "25/09/2026, 12:50",
                user: "Luis Madrid",
                email: "lmadrid@enersa-energia.com",
                description: "Solicitud enviada"
            },
            {
                title: "Bloqueo activo",
                date: "25/09/2026, 13:15",
                user: "Cristobal Silva",
                email: "cristobal@enersa-energia.com",
                description: "Bloqueo realizado"
            }
        ]
    },
    {
        id: "BLQ-2026-0005",
        equipment: "Bomba P005",
        activity: "Visita a la bomba",
        executor: "Victor Molina",
        department: "Mecánico",
        supervisor: "Cristobal Silva",
        requester: "Luis Madrid",
        area: "Área de bombeo",
        date: "25/09/2026",
        time: "12:30",
        cards: [
            {
                serial: "0006",
                description: "Bomba P005 entrada",
                status: "Instalada"
            },
            {
                serial: "0007",
                description: "Bomba P005 salida",
                status: "Instalada"
            }
        ],
        status: "Bloqueo activo",
        blockedTime: "92 h 30 min",
        timeline: [
            {
                title: "Solicitud enviada",
                date: "25/09/2026, 12:30",
                user: "Luis Madrid",
                email: "lmadrid@enersa-energia.com",
                description: "Solicitud enviada"
            },
            {
                title: "Bloqueo activo",
                date: "25/09/2026, 12:55",
                user: "Cristobal Silva",
                email: "cristobal@enersa-energia.com",
                description: "Bloqueo realizado"
            }
        ]
    },
    {
        id: "BLQ-2026-0004",
        equipment: "Compresor #1",
        activity: "Mantenimiento mayor",
        executor: "Juan Perez",
        department: "Mecánico",
        supervisor: "Cristobal Silva",
        requester: "Luis Madrid",
        area: "Sala de compresores",
        date: "25/09/2026",
        time: "12:10",
        cards: [
            {
                serial: "0008",
                description: "Breaker compresor",
                status: "Instalada"
            },
            {
                serial: "0009",
                description: "Válvula principal",
                status: "Instalada"
            },
            {
                serial: "0010",
                description: "Alimentación eléctrica",
                status: "Instalada"
            }
        ],
        status: "Bloqueo activo",
        blockedTime: "92 h 50 min",
        timeline: [
            {
                title: "Solicitud enviada",
                date: "25/09/2026, 12:10",
                user: "Luis Madrid",
                email: "lmadrid@enersa-energia.com",
                description: "Solicitud enviada"
            },
            {
                title: "Bloqueo activo",
                date: "25/09/2026, 12:40",
                user: "Cristobal Silva",
                email: "cristobal@enersa-energia.com",
                description: "Bloqueo realizado"
            }
        ]
    }
];

const blocksTable = document.getElementById("blocksTable");
const activeCount = document.getElementById("activeCount");
const approvalCount = document.getElementById("approvalCount");
const closeCount = document.getElementById("closeCount");
const finishedCount = document.getElementById("finishedCount");
const tableCount = document.getElementById("tableCount");
const waitingApproval = document.getElementById("waitingApproval");
const waitingClose = document.getElementById("waitingClose");

function renderBlocks() {

    const activeBlocks = blocksData.filter(
        block => block.status === "Bloqueo activo"
    );

    blocksTable.innerHTML = activeBlocks.map(block => `

        <tr>

            <td class="id-cell">${block.id}</td>

            <td class="equipment">
                <strong>${block.equipment}</strong>
                <span>${block.activity}</span>
            </td>

            <td>${block.executor}</td>

            <td>${block.department}</td>

            <td>${block.supervisor}</td>

            <td>
                ${block.date}<br>
                <span class="table-time">${block.time}</span>
            </td>

            <td>
                <span class="table-count">
                    ${block.cards.length}
                </span>
            </td>

            <td>
                <span class="status active">
                    ${block.status}
                </span>
            </td>

            <td class="time-cell">
                ${block.blockedTime}
            </td>

            <td>
                <button
                    class="detail-button"
                    onclick="openBlockDetail('${block.id}')"
                >
                    ›
                </button>
            </td>

        </tr>

    `).join("");

    updateCounters();
}

function updateCounters() {

    const active = blocksData.filter(
        block => block.status === "Bloqueo activo"
    ).length;

    const approval = blocksData.filter(
        block => block.status === "Pendiente de aprobación"
    ).length;

    const pendingClose = blocksData.filter(
        block => block.status === "Pendiente de cierre"
    ).length;

    const finished = blocksData.filter(
        block => block.status === "Terminado"
    ).length;

    activeCount.textContent = String(active).padStart(2, "0");
    approvalCount.textContent = String(approval).padStart(2, "0");
    closeCount.textContent = String(pendingClose).padStart(2, "0");
    finishedCount.textContent = String(finished).padStart(2, "0");

    tableCount.textContent = active;
    waitingApproval.textContent = approval;
    waitingClose.textContent = pendingClose;
}

function renderCards(cards) {

    return cards.map(card => `

        <div class="detail-card-row">

            <span class="detail-card-serial">
                ${card.serial}
            </span>

            <strong>
                ${card.description}
            </strong>

            <span class="detail-card-status">
                ${card.status}
            </span>

        </div>

    `).join("");
}

function renderTimeline(timeline) {

    return timeline.map(item => `

        <div class="audit-item">

            <div class="audit-point"></div>

            <div class="audit-content">

                <strong>${item.title}</strong>

                <span>
                    ${item.date} · ${item.user}
                    (${item.email})
                </span>

                <p>${item.description}</p>

                <details>
                    <summary>Campos registrados</summary>

                    <div class="registered-fields">

                        <div>
                            <span>Equipo</span>
                            <strong>${blocksData.find(block => block.id === item.blockId)?.equipment || ""}</strong>
                        </div>

                        <div>
                            <span>Estado</span>
                            <strong>${item.title}</strong>
                        </div>

                    </div>

                </details>

            </div>

        </div>

    `).join("");
}

function renderClosureValidation(block) {

    if (block.status !== "Pendiente de cierre") {
        return "";
    }

    if (
        currentUserRole !== "Administrador" &&
        currentUserRole !== "Operador"
    ) {
        return `

            <section class="closure-readonly">

                <div class="closure-readonly-icon">🔒</div>

                <div>

                    <strong>
                        Validación final de Operación
                    </strong>

                    <p>
                        Esta sección está disponible únicamente
                        para los usuarios autorizados de Operación.
                    </p>

                </div>

            </section>

        `;
    }

    return `

        <section class="closure-validation">

            <div class="closure-title">

                <span>VALIDACIÓN FINAL DE OPERACIÓN</span>

                <h3>
                    Validación final de Operación
                </h3>

                <p>
                    Compare todos los seriales de la lista anterior
                    con las tarjetas físicas antes de continuar.
                </p>

            </div>

            <div class="closure-form">

                <label>
                    Operador de turno notificado del cierre

                    <input
                        type="text"
                        id="closureOperator"
                        placeholder="Ingrese el nombre del operador"
                    >

                </label>

                <label>
                    Supervisor de turno

                    <input
                        type="text"
                        id="closureSupervisor"
                        placeholder="Ingrese el nombre del supervisor"
                    >

                </label>

                <div class="closure-date">
                    Fecha y hora se registrarán automáticamente al confirmar.
                </div>

                <label class="closure-check">

                    <input
                        type="checkbox"
                        id="closureConfirmation"
                    >

                    <span>
                        Confirmo que se verificaron las tarjetas asociadas
                        al bloqueo y que sus números seriales coinciden
                        con los registrados en la solicitud.
                    </span>

                </label>

                <label>
                    Observaciones (opcional)

                    <textarea
                        id="closureObservations"
                        placeholder="Escriba alguna observación..."
                    ></textarea>

                </label>

                <button
                    type="button"
                    class="finish-closure"
                    onclick="finishClosure('${block.id}')"
                >
                    TERMINAR / CERRAR BLOQUEO
                </button>

            </div>

            <div class="closure-warning">
                🔒 El equipo continúa bloqueado hasta que Operación complete el cierre.
            </div>

        </section>

    `;
}

function openBlockDetail(id) {

    const block = blocksData.find(
        item => item.id === id
    );

    if (!block) {
        return;
    }

    document.getElementById("modalTitle").textContent =
        `${block.id} — ${block.status}`;

    document.getElementById("modalBody").innerHTML = `

        <div class="detail-main-card">

            <div class="detail-status">
                ${block.status}
            </div>

            <h3>${block.equipment}</h3>

            <p>
                ${block.activity}
            </p>

            <span>
                Tiempo bloqueado: ${block.blockedTime}
            </span>

        </div>

        <div class="detail-info-grid">

            <div class="detail-item">
                <span>Ejecutante</span>
                <strong>${block.executor}</strong>
            </div>

            <div class="detail-item">
                <span>Departamento</span>
                <strong>${block.department}</strong>
            </div>

            <div class="detail-item">
                <span>Supervisor</span>
                <strong>${block.supervisor}</strong>
            </div>

            <div class="detail-item">
                <span>Solicitante</span>
                <strong>${block.requester}</strong>
            </div>

            <div class="detail-item">
                <span>Área</span>
                <strong>${block.area}</strong>
            </div>

            <div class="detail-item">
                <span>Fecha / hora de bloqueo</span>
                <strong>
                    ${block.date} ${block.time}
                </strong>
            </div>

        </div>

        <section class="detail-cards-section">

            <div class="detail-section-header">

                <div>
                    <span>TARJETAS / PUNTOS DE AISLAMIENTO</span>
                    <h3>
                        Tarjetas / puntos de aislamiento
                    </h3>
                </div>

                <strong>
                    ${block.cards.length}
                </strong>

            </div>

            <div class="detail-cards-list">

                ${renderCards(block.cards)}

            </div>

        </section>

        <section class="audit-section">

            <div class="detail-section-header">

                <div>
                    <span>SEGUIMIENTO</span>
                    <h3>
                        Línea de tiempo y auditoría
                    </h3>
                </div>

            </div>

            <div class="audit-timeline">

                ${renderTimeline(
                    block.timeline.map(item => ({
                        ...item,
                        blockId: block.id
                    }))
                )}

            </div>

        </section>

        ${renderClosureValidation(block)}

    `;

    document.getElementById("overlay").style.display = "block";

    document.getElementById("detailModal").classList.add("show");
}

function closeDetail() {

    document.getElementById("detailModal").classList.remove("show");

    document.getElementById("overlay").style.display = "none";
}

function finishClosure(id) {

    const operator = document.getElementById("closureOperator");
    const supervisor = document.getElementById("closureSupervisor");
    const confirmation = document.getElementById("closureConfirmation");

    if (!operator || !operator.value.trim()) {
        alert("Ingrese el operador de turno notificado del cierre.");
        return;
    }

    if (!supervisor || !supervisor.value.trim()) {
        alert("Ingrese el supervisor de turno.");
        return;
    }

    if (!confirmation || !confirmation.checked) {
        alert("Debe confirmar la verificación de las tarjetas antes de continuar.");
        return;
    }

    const block = blocksData.find(
        item => item.id === id
    );

    if (!block) {
        return;
    }

    block.status = "Terminado";

    block.closedAt = new Date().toLocaleString("es-HN");

    block.timeline.push({
        title: "Bloqueo terminado",
        date: block.closedAt,
        user: "Usuario actual",
        email: "usuario@enersa-energia.com",
        description: "Operación completó la validación y cierre del bloqueo"
    });

    closeDetail();

    renderBlocks();

    alert("El bloqueo ha sido cerrado correctamente.");
}

document.getElementById("closeModal").addEventListener(
    "click",
    closeDetail
);

document.getElementById("overlay").addEventListener(
    "click",
    closeDetail
);

document.getElementById("mobileMenu").addEventListener(
    "click",
    () => {
        document.getElementById("sidebar").classList.toggle("open");
    }
);

document.getElementById("newRequest").addEventListener(
    "click",
    () => {
        window.location.href = "nueva-solicitud.html";
    }
);

document.getElementById("openTray").addEventListener(
    "click",
    () => {
        window.location.href = "bandeja de operación.html";
    }
);

renderBlocks();