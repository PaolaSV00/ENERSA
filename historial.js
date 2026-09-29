const historyData = [
    {
        id: "BLQ-2026-0008",
        equipment: "Motor P001",
        activity: "Se va a realizar mantenimiento",
        serial: "MTR-P001-001",
        executor: "Allan Medina",
        supervisor: "Cristobal Silva",
        operator: "Carlos Flores",
        department: "Eléctrico",
        date: "2026-09-25",
        time: "14:43",
        status: "Bloqueo activo",
        blockedTime: "56 h 13 min"
    },
    {
        id: "BLQ-2026-0007",
        equipment: "Panel ESSER",
        activity: "Prueba realizada del SCI",
        serial: "ESSER-0025",
        executor: "Técnico eléctrico",
        supervisor: "Noel Méndez",
        operator: "Carlos Flores",
        department: "Ambiente",
        date: "2026-09-25",
        time: "08:39",
        status: "Pendiente de cierre",
        blockedTime: "62 h 17 min"
    },
    {
        id: "BLQ-2026-0006",
        equipment: "Veolia",
        activity: "Visita al transformador",
        serial: "VEO-TR-006",
        executor: "Luis Ortiz",
        supervisor: "Mario Calderín",
        operator: "José Martínez",
        department: "Mecánico",
        date: "2026-09-25",
        time: "08:37",
        status: "Bloqueo activo",
        blockedTime: "62 h 19 min"
    },
    {
        id: "BLQ-2026-0005",
        equipment: "Bomba P005",
        activity: "Visita a la bomba",
        serial: "BOM-P005-005",
        executor: "Victor Molina",
        supervisor: "Julian Alvarez",
        operator: "Carlos Flores",
        department: "Mecánico",
        date: "2026-09-25",
        time: "08:38",
        status: "Terminado",
        blockedTime: "62 h 18 min"
    },
    {
        id: "BLQ-2026-0004",
        equipment: "Compresor #1",
        activity: "Mantenimiento mayor",
        serial: "CMP-001-004",
        executor: "Juan Perez",
        supervisor: "Jordan Rivera",
        operator: "José Martínez",
        department: "Mecánico",
        date: "2026-09-25",
        time: "08:38",
        status: "Bloqueo activo",
        blockedTime: "62 h 18 min"
    },
    {
        id: "BLQ-2026-0003",
        equipment: "Transformador T002",
        activity: "Inspección general",
        serial: "TRF-T002-003",
        executor: "Pedro López",
        supervisor: "Mario Calderín",
        operator: "Carlos Flores",
        department: "Eléctrico",
        date: "2026-09-24",
        time: "11:20",
        status: "Terminado",
        blockedTime: "18 h 42 min"
    },
    {
        id: "BLQ-2026-0002",
        equipment: "Bomba P002",
        activity: "Revisión preventiva",
        serial: "BOM-P002-002",
        executor: "Miguel Torres",
        supervisor: "Julian Alvarez",
        operator: "",
        department: "Mecánico",
        date: "2026-09-23",
        time: "15:10",
        status: "Pendiente de aprobación",
        blockedTime: "00 h 00 min"
    },
    {
        id: "BLQ-2026-0001",
        equipment: "Motor P003",
        activity: "Mantenimiento programado",
        serial: "MTR-P003-001",
        executor: "Andrés Rivera",
        supervisor: "Cristobal Silva",
        operator: "",
        department: "Eléctrico",
        date: "2026-09-23",
        time: "09:15",
        status: "Borrador",
        blockedTime: "00 h 00 min"
    }
];

const historyTable = document.getElementById("historyTable");
const historySearch = document.getElementById("historySearch");
const statusFilter = document.getElementById("statusFilter");
const dateFrom = document.getElementById("dateFrom");
const dateTo = document.getElementById("dateTo");
const historyCount = document.getElementById("historyCount");

function getStatusClass(status) {

    if (status === "Bloqueo activo") {
        return "active";
    }

    if (status === "Pendiente de cierre") {
        return "pending";
    }

    if (status === "Pendiente de aprobación") {
        return "approval";
    }

    if (status === "Terminado") {
        return "finished";
    }

    return "draft";
}

function renderHistory(data) {

    historyTable.innerHTML = data.map(block => `

        <tr>

            <td class="id-cell">${block.id}</td>

            <td class="equipment">
                <strong>${block.equipment}</strong>
                <span>${block.activity}</span>
            </td>

            <td>${block.serial}</td>

            <td>${block.executor}</td>

            <td>${block.supervisor}</td>

            <td>${block.operator || "—"}</td>

            <td class="time-cell">
                ${formatDate(block.date)}, ${block.time}
            </td>

            <td>
                <span class="status ${getStatusClass(block.status)}">
                    ${block.status}
                </span>
            </td>

            <td class="time-cell">
                ${block.blockedTime}
            </td>

            <td>
                <button class="detail-button" onclick="openHistoryDetail('${block.id}')">
                    ›
                </button>
            </td>

        </tr>

    `).join("");

    historyCount.textContent = data.length;
}

function formatDate(date) {

    const parts = date.split("-");

    return `${parts[2]}/${parts[1]}/${parts[0].slice(2)}`;
}

function filterHistory() {

    const search = historySearch.value.toLowerCase().trim();
    const status = statusFilter.value;
    const from = dateFrom.value;
    const to = dateTo.value;

    const filtered = historyData.filter(block => {

        const searchableText = `
            ${block.id}
            ${block.equipment}
            ${block.activity}
            ${block.serial}
            ${block.executor}
            ${block.supervisor}
            ${block.operator}
        `.toLowerCase();

        const matchesSearch =
            !search || searchableText.includes(search);

        const matchesStatus =
            !status || block.status === status;

        const matchesFrom =
            !from || block.date >= from;

        const matchesTo =
            !to || block.date <= to;

        return matchesSearch &&
               matchesStatus &&
               matchesFrom &&
               matchesTo;
    });

    renderHistory(filtered);
}

function openHistoryDetail(id) {

    const block = historyData.find(item => item.id === id);

    if (!block) return;

    document.getElementById("modalTitle").textContent = block.id;

    document.getElementById("modalBody").innerHTML = `

        <div class="detail-item">
            <span>EQUIPO</span>
            <strong>${block.equipment}</strong>
        </div>

        <div class="detail-item">
            <span>ACTIVIDAD</span>
            <strong>${block.activity}</strong>
        </div>

        <div class="detail-item">
            <span>SERIAL</span>
            <strong>${block.serial}</strong>
        </div>

        <div class="detail-item">
            <span>EJECUTANTE</span>
            <strong>${block.executor}</strong>
        </div>

        <div class="detail-item">
            <span>DEPARTAMENTO</span>
            <strong>${block.department}</strong>
        </div>

        <div class="detail-item">
            <span>SUPERVISOR</span>
            <strong>${block.supervisor}</strong>
        </div>

        <div class="detail-item">
            <span>OPERADOR</span>
            <strong>${block.operator || "No asignado"}</strong>
        </div>

        <div class="detail-item">
            <span>FECHA / HORA</span>
            <strong>${formatDate(block.date)}, ${block.time}</strong>
        </div>

        <div class="detail-item">
            <span>ESTADO</span>
            <strong>${block.status}</strong>
        </div>

        <div class="detail-item">
            <span>TIEMPO BLOQUEADO</span>
            <strong>${block.blockedTime}</strong>
        </div>

    `;

    document.getElementById("overlay").style.display = "block";
    document.getElementById("detailModal").classList.add("show");
}

function closeDetail() {

    document.getElementById("detailModal").classList.remove("show");
    document.getElementById("overlay").style.display = "none";
}

historySearch.addEventListener("input", filterHistory);

statusFilter.addEventListener("change", filterHistory);

dateFrom.addEventListener("change", filterHistory);

dateTo.addEventListener("change", filterHistory);

document.getElementById("clearFilters").addEventListener("click", () => {

    historySearch.value = "";
    statusFilter.value = "";
    dateFrom.value = "";
    dateTo.value = "";

    renderHistory(historyData);
});

document.getElementById("closeModal").addEventListener("click", closeDetail);

document.getElementById("overlay").addEventListener("click", closeDetail);

document.getElementById("mobileMenu").addEventListener("click", () => {

    document.getElementById("sidebar").classList.toggle("open");
});

renderHistory(historyData);
