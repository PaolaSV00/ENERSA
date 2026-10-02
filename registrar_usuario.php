<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";

$datos = json_decode(
    file_get_contents("php://input"),
    true
);

if (!$datos) {

    echo json_encode([
        "success" => false,
        "message" => "No se recibieron datos."
    ]);

    exit;
}

$correo = trim($datos["correo"] ?? "");
$nombre_usuario = trim($datos["usuario"] ?? "");
$password = $datos["password"] ?? "";

if (
    empty($correo) ||
    empty($nombre_usuario) ||
    empty($password)
) {

    echo json_encode([
        "success" => false,
        "message" => "Todos los campos son obligatorios."
    ]);

    exit;
}

$consulta = $conn->prepare(
    "SELECT id_usuario
     FROM usuarios
     WHERE correo = ?
     OR nombre_usuario = ?"
);

if (!$consulta) {

    echo json_encode([
        "success" => false,
        "message" => "Error al preparar la consulta."
    ]);

    exit;
}

$consulta->bind_param(
    "ss",
    $correo,
    $nombre_usuario
);

$consulta->execute();

$resultado = $consulta->get_result();

if ($resultado->num_rows > 0) {

    echo json_encode([
        "success" => false,
        "message" => "El correo o nombre de usuario ya está registrado."
    ]);

    exit;
}

$password_hash = password_hash(
    $password,
    PASSWORD_DEFAULT
);

$rol = null;
$estado = "Pendiente";

$insertar = $conn->prepare(
    "INSERT INTO usuarios
    (
        nombre_usuario,
        correo,
        `contraseña`,
        rol,
        estado,
        fecha_registro
    )
    VALUES (?, ?, ?, ?, ?, NOW())"
);

if (!$insertar) {

    echo json_encode([
        "success" => false,
        "message" => "Error al preparar el registro."
    ]);

    exit;
}

$insertar->bind_param(
    "sssss",
    $nombre_usuario,
    $correo,
    $password_hash,
    $rol,
    $estado
);

if ($insertar->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Registro realizado correctamente."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "No se pudo registrar el usuario."
    ]);
}

$insertar->close();
$consulta->close();
$conn->close();

?>