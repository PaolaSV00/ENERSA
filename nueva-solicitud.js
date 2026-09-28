const cardsContainer = document.getElementById("cardsContainer");
const addCardButton = document.getElementById("addCard");
const requestForm = document.getElementById("requestForm");

let cardNumber = 1;

addCardButton.addEventListener("click", () => {

    cardNumber++;

    const card = document.createElement("div");

    card.className = "isolation-card";

    card.innerHTML = `
        <div class="isolation-header">
            <strong>Tarjeta ${cardNumber}</strong>
            <button type="button" class="remove-card">×</button>
        </div>

        <div class="form-grid">

            <div class="form-group">
                <label>Serial</label>
                <input type="text" name="serial[]" placeholder="Ingrese el serial">
            </div>

            <div class="form-group">
                <label>Descripción</label>
                <input type="text" name="cardDescription[]" placeholder="Descripción del punto de aislamiento">
            </div>

        </div>
    `;

    cardsContainer.appendChild(card);

    card.querySelector(".remove-card").addEventListener("click", () => {
        card.remove();
        updateCardNumbers();
    });

});

function updateCardNumbers() {

    const cards = document.querySelectorAll(".isolation-card");

    cards.forEach((card, index) => {
        card.querySelector(".isolation-header strong").textContent = `Tarjeta ${index + 1}`;
    });

    cardNumber = cards.length;

}

requestForm.addEventListener("submit", (event) => {

    event.preventDefault();

    alert("El borrador se ha creado correctamente. Los datos aún no se guardarán en una base de datos.");

    window.location.href = "index.html";

});

const mobileMenu = document.getElementById("mobileMenu");
const sidebar = document.getElementById("sidebar");

mobileMenu.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});