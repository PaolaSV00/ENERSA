const requestsData = [
    {
        id: "BLQ-2026-0008",
        equipment: "Motor P001",
        executor: "Allan Medina",
        department: "Eléctrico",
        supervisor: "Carlos Hernández",
        dateTime: "08/09/2026 08:30",
        cards: "3",
        status: "Bloqueo activo",
        blockedTime: "56 h 13 min"
    },
    {
        id: "BLQ-2026-0007",
        equipment: "Panel ESSER",
        executor: "Técnico eléctrico",
        department: "Ambiente",
        supervisor: "María López",
        dateTime: "08/09/2026 07:45",
        cards: "1",
        status: "Pendiente de cierre",
        blockedTime: "62 h 17 min"
    },
    {
        id: "BLQ-2026-0006",
        equipment: "Veolia",
        executor: "Luis Ortiz",
        department: "Mecánico",
        supervisor: "Carlos Hernández",
        dateTime: "08/09/2026 07:20",
        cards: "1",
        status: "Bloqueo activo",
        blockedTime: "62 h 19 min"
    },
    {
        id: "BLQ-2026-0005",
        equipment: "Bomba P005",
        executor: "Victor Molina",
        department: "Mecánico",
        supervisor: "Ana Martínez",
        dateTime: "08/09/2026 07:10",
        cards: "3",
        status: "Pendiente de aprobación",
        blockedTime: "62 h 18 min"
    },
    {
        id: "BLQ-2026-0004",
        equipment: "Compresor #1",
        executor: "Juan Perez",
        department: "Mecánico",
        supervisor: "Carlos Hernández",
        dateTime: "08/09/2026 06:50",
        cards: "3",
        status: "Terminado",
        blockedTime: "62 h 18 min"
    }
];

const requestsTable = document.getElementById("requestsTable");
const requestCount = document.getElementById("requestCount");

function getStatusClass(status) {

    if (status === "Bloqueo activo") {
        return "active";
    }

    if (status === "Pendiente de aprobación") {
        return "pending";
    }

    if (status === "Pendiente de cierre") {
        return "closing";
    }

    if (status === "Terminado") {
        return "finished";
    }

    return "";
}

function renderRequests() {

    requestsTable.innerHTML = requestsData.map((request, index) => `

        <tr>

            <td class="id-cell">
                ${request.id}
            </td>

            <td class="equipment">
                <strong>${request.equipment}</strong>
            </td>

            <td>
                ${request.executor}
            </td>

            <td>
                ${request.department}
            </td>

            <td>
                ${request.supervisor}
            </td>

            <td>
                ${request.dateTime}
            </td>

            <td>
                ${request.cards}
            </td>

            <td>
                <span class="status ${getStatusClass(request.status)}">
                    ${request.status}
                </span>
            </td>

            <td class="time-cell">
                ${request.blockedTime}
            </td>

            <td>
                <button class="detail-button" onclick="openRequestDetail(${index})">
                    ›
                </button>
            </td>

        </tr>

    `).join("");

    requestCount.textContent = requestsData.length;
}

function openRequestDetail(index) {

    const request = requestsData[index];

    document.getElementById("modalTitle").textContent = request.id;

    document.getElementById("modalBody").innerHTML = `

        <div class="detail-item">
            <span>ID</span>
            <strong>${request.id}</strong>
        </div>

        <div class="detail-item">
            <span>EQUIPO / ACTIVIDAD</span>
            <strong>${request.equipment}</strong>
        </div>

        <div class="detail-item">
            <span>EJECUTANTE</span>
            <strong>${request.executor}</strong>
        </div>

        <div class="detail-item">
            <span>DEPARTAMENTO</span>
            <strong>${request.department}</strong>
        </div>

        <div class="detail-item">
            <span>SUPERVISOR</span>
            <strong>${request.supervisor}</strong>
        </div>

        <div class="detail-item">
            <span>FECHA / HORA DE BLOQUEO</span>
            <strong>${request.dateTime}</strong>
        </div>

        <div class="detail-item">
            <span>TARJETAS</span>
            <strong>${request.cards}</strong>
        </div>

        <div class="detail-item">
            <span>ESTADO</span>
            <strong>${request.status}</strong>
        </div>

        <div class="detail-item">
            <span>TIEMPO BLOQUEADO</span>
            <strong>${request.blockedTime}</strong>
        </div>

    `;

    document.getElementById("overlay").style.display = "block";
    document.getElementById("detailModal").classList.add("show");
}

function closeDetail() {

    document.getElementById("detailModal").classList.remove("show");
    document.getElementById("overlay").style.display = "none";

}

document.getElementById("closeModal").addEventListener("click", closeDetail);

document.getElementById("overlay").addEventListener("click", closeDetail);

document.getElementById("mobileMenu").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
});

renderRequests();