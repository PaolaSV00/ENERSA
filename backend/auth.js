const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const cabecera = req.headers.authorization || "";
  const token = cabecera.startsWith("Bearer ") ? cabecera.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "No has iniciado sesión." });
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ success: false, message: "Sesión inválida o expirada." });
  }
}


function soloRol(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ success: false, message: "No tienes permiso para hacer esto." });
    }
    next();
  };
}

module.exports = { verificarToken, soloRol };