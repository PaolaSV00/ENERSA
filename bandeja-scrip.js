function openApproval(button) {

    const detail = document.getElementById("approvalDetail");

    detail.classList.toggle("show");

    button.classList.toggle("rotated");
}


function closeApproval() {

    const detail = document.getElementById("approvalDetail");

    detail.classList.remove("show");

    const button = document.querySelector(
        ".request-card .expand-request"
    );

    if (button) {
        button.classList.remove("rotated");
    }
}


function approveRequest() {

    const approvalSection = document
        .getElementById("approvalDetail")
        .closest(".tray-section");

    const card = approvalSection.querySelector(".request-card");

    card.classList.add("approved");

    card.innerHTML = `
        <div class="request-main">
            <div class="request-id">
                BLQ-2026-0009
            </div>

            <h3>
                Motor P002
            </h3>

            <p>
                Bloqueo aprobado correctamente
            </p>
        </div>

        <div class="approved-status">
            ✓ Aprobado
        </div>
    `;

    document
        .getElementById("approvalDetail")
        .classList.remove("show");

    document.getElementById("approvalTotal").textContent = "0";
}


function openCloseRequest(button) {

    const detail = document.getElementById("closeDetail");

    detail.classList.toggle("show");

    button.classList.toggle("rotated");
}


function closeCloseRequest() {

    const detail = document.getElementById("closeDetail");

    detail.classList.remove("show");

    const button = document.querySelectorAll(
        ".expand-request"
    )[1];

    if (button) {
        button.classList.remove("rotated");
    }
}


function finishClosure() {

    const record = document
        .getElementById("operationRecord")
        .value
        .trim();

    if (record === "") {

        alert(
            "Debe ingresar el campo de registro antes de terminar el cierre."
        );

        return;
    }

    const closeSection = document
        .getElementById("closeDetail")
        .closest(".tray-section");

    const card = closeSection.querySelector(".request-card");

    card.classList.add("approved");

    card.innerHTML = `
        <div class="request-main">
            <div class="request-id">
                BLQ-2026-0007
            </div>

            <h3>
                Panel ESSER
            </h3>

            <p>
                Cierre de bloqueo registrado correctamente
            </p>
        </div>

        <div class="approved-status">
            ✓ Cierre terminado
        </div>
    `;

    document
        .getElementById("closeDetail")
        .classList.remove("show");

    document.getElementById("closeTotal").textContent = "0";
}


document
    .getElementById("mobileMenu")
    .addEventListener("click", function () {

        document
            .getElementById("sidebar")
            .classList.toggle("open");

    });