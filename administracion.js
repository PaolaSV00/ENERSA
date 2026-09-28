const usersData = [
    {
        id: 1,
        name: "Ingrid Serrano",
        email: "ingrid@enersa.com",
        role: "Administrador",
        status: "Activo",
        lastAccess: "28/09/2026 08:15"
    },
    {
        id: 2,
        name: "Allan Medina",
        email: "allan@enersa.com",
        role: "Ejecutante",
        status: "Activo",
        lastAccess: "28/09/2026 07:52"
    },
    {
        id: 3,
        name: "Carlos Hernández",
        email: "carlos@enersa.com",
        role: "Supervisor",
        status: "Activo",
        lastAccess: "27/09/2026 16:30"
    },
    {
        id: 4,
        name: "Victor Molina",
        email: "victor@enersa.com",
        role: "Operador",
        status: "Activo",
        lastAccess: "28/09/2026 07:40"
    },
    {
        id: 5,
        name: "Luis Ortiz",
        email: "luis@enersa.com",
        role: "Ejecutante",
        status: "Inactivo",
        lastAccess: "25/09/2026 14:20"
    }
];

const usersTable = document.getElementById("usersTable");
const totalUsers = document.getElementById("totalUsers");
const activeUsers = document.getElementById("activeUsers");
const adminUsers = document.getElementById("adminUsers");
const userTableCount = document.getElementById("userTableCount");

function getStatusClass(status) {

    if (status === "Activo") {
        return "active";
    }

    return "inactive";
}

function renderUsers() {

    usersTable.innerHTML = usersData.map((user, index) => `

        <tr>

            <td class="equipment">
                <strong>${user.name}</strong>
            </td>

            <td>
                ${user.email}
            </td>

            <td>
                <span class="role-badge">
                    ${user.role}
                </span>
            </td>

            <td>
                <span class="status ${getStatusClass(user.status)}">
                    ${user.status}
                </span>
            </td>

            <td>
                ${user.lastAccess}
            </td>

            <td>
                <button class="detail-button" onclick="editUser(${index})">
                    ›
                </button>
            </td>

        </tr>

    `).join("");

    totalUsers.textContent = usersData.length;

    activeUsers.textContent = usersData.filter(
        user => user.status === "Activo"
    ).length;

    adminUsers.textContent = usersData.filter(
        user => user.role === "Administrador"
    ).length;

    userTableCount.textContent = usersData.length;
}

function editUser(index) {

    const user = usersData[index];

    document.getElementById("userModalTitle").textContent = user.name;

    document.getElementById("userName").value = user.name;
    document.getElementById("userEmail").value = user.email;
    document.getElementById("userRole").value = user.role;
    document.getElementById("userStatus").value = user.status;

    document.getElementById("saveUser").dataset.index = index;

    document.getElementById("overlay").style.display = "block";
    document.getElementById("userModal").classList.add("show");
}

function closeUserModal() {

    document.getElementById("userModal").classList.remove("show");
    document.getElementById("overlay").style.display = "none";

}

document.getElementById("saveUser").addEventListener("click", () => {

    const index = document.getElementById("saveUser").dataset.index;

    usersData[index].name = document.getElementById("userName").value;
    usersData[index].email = document.getElementById("userEmail").value;
    usersData[index].role = document.getElementById("userRole").value;
    usersData[index].status = document.getElementById("userStatus").value;

    renderUsers();
    closeUserModal();

});

document.getElementById("closeUserModal").addEventListener(
    "click",
    closeUserModal
);

document.getElementById("overlay").addEventListener(
    "click",
    closeUserModal
);

document.getElementById("mobileMenu").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
});

document.getElementById("newUser").addEventListener("click", () => {

    document.getElementById("userModalTitle").textContent = "Nuevo usuario";

    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("userRole").value = "Ejecutante";
    document.getElementById("userStatus").value = "Activo";

    document.getElementById("saveUser").dataset.index = "";

    document.getElementById("overlay").style.display = "block";
    document.getElementById("userModal").classList.add("show");

});

renderUsers();