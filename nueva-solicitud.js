const STORAGE_KEY = "enersa_solicitudes";

const requestForm =
    document.getElementById("requestForm");

const cardsContainer =
    document.getElementById("cardsContainer");

const addCard =
    document.getElementById("addCard");

let cardNumber = 1;

function obtenerSolicitudes() {
    const datos =
        localStorage.getItem(STORAGE_KEY);

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

function generarIdSolicitud() {
    const solicitudes =
        obtenerSolicitudes();

    let mayor = 0;

    solicitudes.forEach(solicitud => {

        if (!solicitud.id) {
            return;
        }

        const partes =
            solicitud.id.split("-");

        const numero =
            parseInt(partes[2]);

        if (
            !isNaN(numero) &&
            numero > mayor
        ) {
            mayor = numero;
        }

    });

    mayor++;

    return "BLQ-2026-" +
        String(mayor).padStart(4, "0");
}

function agregarTarjeta() {

    cardNumber++;

    const tarjeta =
        document.createElement("div");

    tarjeta.className =
        "isolation-card";

    tarjeta.innerHTML = `

        <div class="isolation-header">

            <strong>
                Tarjeta ${cardNumber}
            </strong>

            <button
                type="button"
                class="remove-card"
            >
                ×
            </button>

        </div>

        <div class="form-grid">

            <div class="form-group">

                <label>
                    Serial
                </label>

                <input
                    type="text"
                    name="serial[]"
                    placeholder="Ingrese el serial"
                >

            </div>

            <div class="form-group">

                <label>
                    Descripción
                </label>

                <input
                    type="text"
                    name="cardDescription[]"
                    placeholder="Descripción del punto de aislamiento"
                >

            </div>

        </div>
    `;

    cardsContainer.appendChild(
        tarjeta
    );

    const removeButton =
        tarjeta.querySelector(
            ".remove-card"
        );

    removeButton.addEventListener(
        "click",
        function () {

            tarjeta.remove();

            actualizarNumerosTarjetas();

        }
    );
}

function actualizarNumerosTarjetas() {

    const tarjetas =
        cardsContainer.querySelectorAll(
            ".isolation-card"
        );

    tarjetas.forEach(
        (tarjeta, index) => {

            const titulo =
                tarjeta.querySelector(
                    ".isolation-header strong"
                );

            if (titulo) {

                titulo.textContent =
                    `Tarjeta ${index + 1}`;

            }

        }
    );

    cardNumber =
        tarjetas.length;

}

if (addCard) {

    addCard.addEventListener(
        "click",
        agregarTarjeta
    );

}

if (requestForm) {

    requestForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const equipment =
                document.getElementById(
                    "equipment"
                ).value.trim();

            const location =
                document.getElementById(
                    "location"
                ).value;

            const executor =
                document.getElementById(
                    "executor"
                ).value.trim();

            const supervisor =
                document.getElementById(
                    "supervisor"
                ).value.trim();

            const department =
                document.getElementById(
                    "department"
                ).value;

            const description =
                document.getElementById(
                    "description"
                ).value.trim();

            const observations =
                document.getElementById(
                    "observations"
                ).value.trim();

            if (!equipment) {

                alert(
                    "Ingrese el equipo a bloquear."
                );

                return;

            }

            if (!location) {

                alert(
                    "Seleccione el área o ubicación."
                );

                return;

            }

            if (!executor) {

                alert(
                    "Ingrese el ejecutante."
                );

                return;

            }

            if (!supervisor) {

                alert(
                    "Ingrese el supervisor."
                );

                return;

            }

            if (!department) {

                alert(
                    "Seleccione el departamento."
                );

                return;

            }

            if (!description) {

                alert(
                    "Ingrese la descripción de la actividad."
                );

                return;

            }

            const seriales =
                document.querySelectorAll(
                    'input[name="serial[]"]'
                );

            const descripciones =
                document.querySelectorAll(
                    'input[name="cardDescription[]"]'
                );

            const cards = [];

            for (
                let i = 0;
                i < seriales.length;
                i++
            ) {

                const serial =
                    seriales[i].value.trim();

                const descripcionTarjeta =
                    descripciones[i]
                        ? descripciones[i].value.trim()
                        : "";

                if (
                    serial ||
                    descripcionTarjeta
                ) {

                    cards.push({

                        serial:
                            serial,

                        description:
                            descripcionTarjeta

                    });

                }

            }

            const solicitudes =
                obtenerSolicitudes();

            const nuevaSolicitud = {

                id:
                    generarIdSolicitud(),

                equipment:
                    equipment,

                activity:
                    description,

                executor:
                    executor,

                department:
                    department,

                supervisor:
                    supervisor,

                applicant:
                    "Ingrid Serrano",

                area:
                    location,

                description:
                    description,

                observations:
                    observations,

                cards:
                    cards,

                dateTime:
                    new Date().toLocaleString(
                        "es-HN"
                    ),

                status:
                    "Borrador",

                blockedTime:
                    "0 h 00 min",

                createdAt:
                    new Date().toISOString(),

                updatedAt:
                    new Date().toISOString()

            };

            solicitudes.push(
                nuevaSolicitud
            );

            guardarSolicitudes(
                solicitudes
            );

            alert(
                "Borrador " +
                nuevaSolicitud.id +
                " creado correctamente."
            );

            window.location.href =
                "solicitudes.html";

        }
    );

}