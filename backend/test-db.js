const db = require("./db");

async function probar() {
  try {
    const [filas] = await db.query("SELECT * FROM roles");
    console.log("Conexión exitosa. Roles encontrados:", filas);
    process.exit(0);
  } catch (err) {
    console.error("No se pudo conectar:", err.message);
    process.exit(1);
  }
}

probar();