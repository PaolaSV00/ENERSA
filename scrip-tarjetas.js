const cardsData = [
    {
        serial: "TAR-001",
        equipment: "Motor P001",
        description: "Se va a realizar mantenimiento",
        blockId: "BLQ-2026-0008",
        installation: "Planta principal",
        executor: "Allan Medina",
        department: "Eléctrico",
        status: "Activa",
        activeTime: "56 h 13 min"
    },
    {
        serial: "TAR-002",
        equipment: "Motor P001",
        description: "Se va a realizar mantenimiento",
        blockId: "BLQ-2026-0008",
        installation: "Planta principal",
        executor: "Allan Medina",
        department: "Eléctrico",
        status: "Activa",
        activeTime: "56 h 13 min"
    },
    {
        serial: "TAR-003",
        equipment: "Motor P001",
        description: "Se va a realizar mantenimiento",
        blockId: "BLQ-2026-0008",
        installation: "Planta principal",
        executor: "Allan Medina",
        department: "Eléctrico",
        status: "Activa",
        activeTime: "56 h 13 min"
    },
    {
        serial: "TAR-004",
        equipment: "Panel ESSER",
        description: "Prueba realizada del SCI",
        blockId: "BLQ-2026-0007",
        installation: "Sistema contra incendios",
        executor: "Técnico eléctrico",
        department: "Ambiente",
        status: "Activa",
        activeTime: "62 h 17 min"
    },
    {
        serial: "TAR-005",
        equipment: "Veolia",
        description: "Visita al transformador",
        blockId: "BLQ-2026-0006",
        installation: "Transformador principal",
        executor: "Luis Ortiz",
        department: "Mecánico",
        status: "Activa",
        activeTime: "62 h 19 min"
    },
    {
        serial: "TAR-006",
        equipment: "Bomba P005",
        description: "Visita a la bomba",
        blockId: "BLQ-2026-0005",
        installation: "Área de bombeo",
        executor: "Victor Molina",
        department: "Mecánico",
        status: "Activa",
        activeTime: "62 h 18 min"
    },
    {
        serial: "TAR-007",
        equipment: "Bomba P005",
        description: "Visita a la bomba",
        blockId: "BLQ-2026-0005",
        installation: "Área de bombeo",
        executor: "Victor Molina",
        department: "Mecánico",
        status: "Activa",
        activeTime: "62 h 18 min"
    },
    {
        serial: "TAR-008",
        equipment: "Bomba P005",
        description: "Visita a la bomba",
        blockId: "BLQ-2026-0005",
        installation: "Área de bombeo",
        executor: "Victor Molina",
        department: "Mecánico",
        status: "Activa",
        activeTime: "62 h 18 min"
    },
    {
        serial: "TAR-009",
        equipment: "Compresor #1",
        description: "Mantenimiento mayor",
        blockId: "BLQ-2026-0004",
        installation: "Sala de compresores",
        executor: "Juan Perez",
        department: "Mecánico",
        status: "Activa",
        activeTime: "62 h 18 min"
    },
    {
        serial: "TAR-010",
        equipment: "Compresor #1",
        description: "Mantenimiento mayor",
        blockId: "BLQ-2026-0004",
        installation: "Sala de compresores",
        executor: "Juan Perez",
        department: "Mecánico",
        status: "Activa",
        activeTime: "62 h 18 min"
    },
    {
        serial: "TAR-011",
        equipment: "Compresor #1",
        description: "Mantenimiento mayor",
        blockId: "BLQ-2026-0004",
        installation: "Sala de compresores",
        executor: "Juan Perez",
        department: "Mecánico",
        status: "Activa",
        activeTime: "62 h 18 min"
    }
];

const cardsTable = document.getElementById("cardsTable");
const cardSearch = document.getElementById("cardSearch");
const cardCount = document.getElementById("cardCount");
const tableCardCount = document.getElementById("tableCardCount");

function renderCards(data) {

    cardsTable.innerHTML = data.map((card, index) => `

        <tr>

            <td class="id-cell">${card.serial}</td>

            <td class="equipment">
                <strong>${card.equipment}</strong>
            </td>

            <td>${card.description}</td>

            <td>${card.blockId}</td>

            <td>${card.installation}</td>

            <td>${card.executor}</td>

            <td>${card.department}</td>

            <td>
                <span class="status active">
                    ${card.status}
                </span>
            </td>

            <td class="time-cell">
                ${card.activeTime}
            </td>

            <td>
                <button class="detail-button" onclick="openCardDetail(${index})">
                    ›
                </button>
            </td>

        </tr>

    `).join("");

    cardCount.textContent = data.length;
    tableCardCount.textContent = data.length;
}

function filterCards() {

    const search = cardSearch.value.toLowerCase().trim();

    const filtered = cardsData.filter(card => {

        const text = `
            ${card.serial}
            ${card.description}
            ${card.equipment}
        `.toLowerCase();

        return !search || text.includes(search);

    });

    renderCards(filtered);
}

function openCardDetail(index) {

    const card = cardsData[index];

    document.getElementById("modalTitle").textContent = card.serial;

    document.getElementById("modalBody").innerHTML = `

        <div class="detail-item">
            <span>SERIAL</span>
            <strong>${card.serial}</strong>
        </div>

        <div class="detail-item">
            <span>EQUIPO</span>
            <strong>${card.equipment}</strong>
        </div>

        <div class="detail-item">
            <span>DESCRIPCIÓN</span>
            <strong>${card.description}</strong>
        </div>

        <div class="detail-item">
            <span>ID BLOQUEO</span>
            <strong>${card.blockId}</strong>
        </div>

        <div class="detail-item">
            <span>INSTALACIÓN</span>
            <strong>${card.installation}</strong>
        </div>

        <div class="detail-item">
            <span>EJECUTANTE</span>
            <strong>${card.executor}</strong>
        </div>

        <div class="detail-item">
            <span>DEPARTAMENTO</span>
            <strong>${card.department}</strong>
        </div>

        <div class="detail-item">
            <span>ESTADO</span>
            <strong>${card.status}</strong>
        </div>

        <div class="detail-item">
            <span>TIEMPO ACTIVO</span>
            <strong>${card.activeTime}</strong>
        </div>

    `;

    document.getElementById("overlay").style.display = "block";
    document.getElementById("detailModal").classList.add("show");
}

function closeDetail() {

    document.getElementById("detailModal").classList.remove("show");
    document.getElementById("overlay").style.display = "none";

}

cardSearch.addEventListener("input", filterCards);

document.getElementById("closeModal").addEventListener("click", closeDetail);

document.getElementById("overlay").addEventListener("click", closeDetail);

document.getElementById("mobileMenu").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
});

renderCards(cardsData);