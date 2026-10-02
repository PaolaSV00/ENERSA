require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");
const jwt = require("jsonwebtoken");
const { verificarToken, soloRol } = require("./auth");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/registro", async (req, res) => {
  const { correo, usuario, password } = req.body;

  if (!correo || !usuario || !password) {
    return res.status(400).json({ success: false, message: "Faltan datos." });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "La contraseña debe tener al menos 6 caracteres.",
    });
  }

  try {
  
    const [existe] = await db.query("SELECT id FROM usuarios WHERE correo = ?", [correo]);
    if (existe.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Ese correo ya está registrado.",
      });
    }

 
    const hash = await bcrypt.hash(password, 10);

   
    const [resultado] = await db.query(
      "INSERT INTO usuarios (nombre, correo, password_hash) VALUES (?, ?, ?)",
      [usuario, correo, hash]
    );
    const nuevoId = resultado.insertId;

  
    const [admins] = await db.query(
      `SELECT u.id FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE r.nombre = 'administrador' AND u.estado = 'aprobado'`
    );
    for (const admin of admins) {
      await db.query(
        "INSERT INTO notificaciones (usuario_destino_id, usuario_origen_id, mensaje) VALUES (?, ?, ?)",
        [admin.id, nuevoId, `${usuario} solicitó registro y espera aprobación`]
      );
    }

    res.status(201).json({
      success: true,
      message: "Registro exitoso, pendiente de aprobación.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error del servidor." });
  }
});

app.post("/api/login", async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ success: false, message: "Faltan datos." });
  }

  try {
    const [filas] = await db.query(
      `SELECT u.id, u.nombre, u.correo, u.password_hash, u.estado, r.nombre AS rol
       FROM usuarios u
       LEFT JOIN roles r ON u.rol_id = r.id
       WHERE u.correo = ?`,
      [correo]
    );

    const mensajeGenerico = "Correo o contraseña incorrectos.";

    
    if (filas.length === 0) {
      return res.status(401).json({ success: false, message: mensajeGenerico });
    }
    const u = filas[0];

    
    const coincide = await bcrypt.compare(password, u.password_hash);
    if (!coincide) {
      return res.status(401).json({ success: false, message: mensajeGenerico });
    }

    
    if (u.estado === "pendiente") {
      return res.status(403).json({
        success: false,
        message: "Tu cuenta está pendiente de aprobación por un administrador.",
      });
    }
    if (u.estado === "rechazado") {
      return res.status(403).json({
        success: false,
        message: "Tu solicitud de registro fue rechazada.",
      });
    }

    
    const token = jwt.sign({ id: u.id, rol: u.rol }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    res.json({
      success: true,
      token,
      usuario: { id: u.id, nombre: u.nombre, correo: u.correo, rol: u.rol },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error del servidor." });
  }
});

app.get("/api/usuarios/pendientes", verificarToken, soloRol("administrador"), async (req, res) => {
  try {
    const [filas] = await db.query(
      `SELECT id, nombre, correo, fecha_registro
       FROM usuarios
       WHERE estado = 'pendiente'
       ORDER BY fecha_registro ASC`
    );
    res.json({ success: true, usuarios: filas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error del servidor." });
  }
});

app.put("/api/usuarios/:id/aprobar", verificarToken, soloRol("administrador"), async (req, res) => {
  const { rol } = req.body;
  const rolesValidos = ["operador", "solicitante", "administrador"];

  if (!rolesValidos.includes(rol)) {
    return res.status(400).json({ success: false, message: "Rol no válido." });
  }

  try {
    const [rolFila] = await db.query("SELECT id FROM roles WHERE nombre = ?", [rol]);
    if (rolFila.length === 0) {
      return res.status(400).json({ success: false, message: "Rol no válido." });
    }

    const [resultado] = await db.query(
      `UPDATE usuarios
       SET rol_id = ?, estado = 'aprobado', aprobado_por = ?, fecha_aprobacion = NOW()
       WHERE id = ? AND estado = 'pendiente'`,
      [rolFila[0].id, req.usuario.id, req.params.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "No existe un usuario pendiente con ese id.",
      });
    }

    res.json({ success: true, message: `Usuario aprobado como ${rol}.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error del servidor." });
  }
});

// Rechazar un registro
app.put("/api/usuarios/:id/rechazar", verificarToken, soloRol("administrador"), async (req, res) => {
  try {
    const [resultado] = await db.query(
      `UPDATE usuarios
       SET estado = 'rechazado', aprobado_por = ?, fecha_aprobacion = NOW()
       WHERE id = ? AND estado = 'pendiente'`,
      [req.usuario.id, req.params.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "No existe un usuario pendiente con ese id.",
      });
    }

    res.json({ success: true, message: "Registro rechazado." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error del servidor." });
  }
});
//consulta a notificaciones
app.get("/api/notificaciones", verificarToken, async (req, res) => {
  try {
    const [filas] = await db.query(
      `SELECT n.id, n.mensaje, n.leida, n.fecha, u.nombre AS origen
      FROM notificaciones n
       JOIN usuarios u ON n.usuario_origen_id = u.id
       WHERE n.usuario_destino_id = ?
       ORDER BY n.fecha DESC
       LIMIT 50`,
      [req.usuario.id]
    );
    res.json({ success: true, notificaciones: filas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error del servidor." });
  }
});

// Marcar una notificación como leída
app.put("/api/notificaciones/:id/leida", verificarToken, async (req, res) => {
  try {
    await db.query(
      "UPDATE notificaciones SET leida = TRUE WHERE id = ? AND usuario_destino_id = ?",
      [req.params.id, req.usuario.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error del servidor." });
  }
});


app.get("/api/perfil", verificarToken, (req, res) => {
  res.json({ success: true, usuario: req.usuario });
});


app.listen(process.env.PORT, () => {
  console.log(`Servidor en http://localhost:${process.env.PORT}`);
});
