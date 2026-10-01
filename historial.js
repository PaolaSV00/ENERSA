const historyData = [];

const historyTable = document.getElementById("historyTable");
const historyCount = document.getElementById("historyCount");

function renderHistory() {
    historyTable.innerHTML = "";
    historyCount.textContent = "0";
}

renderHistory();