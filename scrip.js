const blocks = [
    {
        id: "BLQ-2026-0008",
        equipment: "Motor P001",
        activity: "Se va a realizar mantenimiento",
        executor: "Allan Medina",
        department: "Eléctrico",
        supervisor: "Cristobal Silva",
        date: "25/09/26",
        time: "14:43",
        cards: 3,
        status: "Bloqueo activo",
        statusClass: "active",
        blockedTime: "56 h 13 min"
    },
    {
        id: "BLQ-2026-0007",
        equipment: "Panel ESSER",
        activity: "Prueba realizada del SCI",
        executor: "Técnico eléctrico",
        department: "Ambiente",
        supervisor: "Noel Méndez",
        date: "25/09/26",
        time: "08:39",
        cards: 1,
        status: "Pendiente de cierre",
        statusClass: "pending",
        blockedTime: "62 h 17 min"
    },
    {
        id: "BLQ-2026-0006",
        equipment: "Veolia",
        activity: "Visita al transformador",
        executor: "Luis Ortiz",
        department: "Mecánico",
        supervisor: "Mario Calderín",
        date: "25/09/26",
        time: "08:37",
        cards: 3,
        status: "Bloqueo activo",
        statusClass: "active",
        blockedTime: "62 h 19 min"
    },
    {
        id: "BLQ-2026-0005",
        equipment: "Bomba P005",
        activity: "Visita a la bomba",
        executor: "Victor Molina",
        department: "Mecánico",
        supervisor: "Julian Alvarez",
        date: "25/09/26",
        time: "08:38",
        cards: 3,
        status: "Bloqueo activo",
        statusClass: "active",
        blockedTime: "62 h 18 min"
    },
    {
        id: "BLQ-2026-0004",
        equipment: "Compresor #1",
        activity: "Mantenimiento mayor",
        executor: "Juan Perez",
        department: "Mecánico",
        supervisor: "Jordan Rivera",
        date: "25/09/26",
        time: "08:38",
        cards: 3,
        status: "Bloqueo activo",
        statusClass: "active",
        blockedTime: "62 h 18 min"
    }
];

const table = document.getElementById("blocksTable");

function renderTable() {

    table.innerHTML = blocks.map((block, index) => {

        return `
            <tr>

                <td class="id-cell">
                    ${block.id}
                </td>

                <td class="equipment">
                    <strong>
                        ${block.equipment}
                    </strong>

                    <span>
                        ${block.activity}
                    </span>
                </td>

                <td>
                    ${block.executor}
                </td>

                <td>
                    ${block.department}
                </td>

                <td>
                    ${block.supervisor}
                </td>

                <td class="time-cell">
                    ${block.date}, ${block.time}
                </td>

                <td>
                    ${block.cards}
                </td>

                <td>

                    <span class="status ${block.statusClass}">
                        ${block.status}
                    </span>

                </td>

                <td class="time-cell">
                    ${block.blockedTime}
                </td>

                <td>

                    <button
                        class="detail-button"
                        onclick="openDetail(${index})">
                        ›
                    </button>

                </td>

            </tr>
        `;

    }).join("");

}

function openDetail(index) {

    const block = blocks[index];

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
            <span>FECHA / HORA</span>
            <strong>${block.date}, ${block.time}</strong>
        </div>

        <div class="detail-item">
            <span>TARJETAS</span>
            <strong>${block.cards}</strong>
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

const modal = document.getElementById("detailModal");

const overlay = document.getElementById("overlay");

document.getElementById("closeModal").addEventListener(
    "click",
    closeDetail
);

overlay.addEventListener(
    "click",
    closeDetail
);

function closeDetail() {

    modal.classList.remove("show");

    overlay.style.display = "none";
}


document.getElementById("mobileMenu").addEventListener(
    "click",
    function () {

        document
            .getElementById("sidebar")
            .classList.toggle("open");

    }
);


document.getElementById("newRequest").addEventListener(
    "click",
    function () {

        alert(
            "El formulario de nueva solicitud se conectará en la siguiente fase."
        );

    }
);


renderTable();