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

$correo = trim(
    $datos["correo"] ?? ""
);

$password = $datos["password"] ?? "";

if (
    empty($correo) ||
    empty($password)
) {

    echo json_encode([
        "success" => false,
        "message" => "Ingrese correo y contraseña."
    ]);

    exit;
}

$consulta = $conn->prepare(
    "SELECT
        id_usuario,
        nombre_usuario,
        correo,
        `contraseña`,
        rol,
        estado
    FROM usuarios
    WHERE correo = ?"
);

if (!$consulta) {

    echo json_encode([
        "success" => false,
        "message" => "Error al preparar la consulta."
    ]);

    exit;
}

$consulta->bind_param(
    "s",
    $correo
);

$consulta->execute();

$resultado = $consulta->get_result();

if ($resultado->num_rows === 0) {

    echo json_encode([
        "success" => false,
        "message" => "El correo o la contraseña son incorrectos."
    ]);

    exit;
}

$usuario = $resultado->fetch_assoc();

if (
    !password_verify(
        $password,
        $usuario["contraseña"]
    )
) {

    echo json_encode([
        "success" => false,
        "message" => "El correo o la contraseña son incorrectos."
    ]);

    exit;
}

if ($usuario["estado"] !== "Activo") {

    if ($usuario["estado"] === "Pendiente") {

        $mensaje =
            "Su cuenta todavía está pendiente de aprobación por un administrador.";

    } else {

        $mensaje =
            "Su cuenta no tiene permitido el acceso.";
    }

    echo json_encode([
        "success" => false,
        "message" => $mensaje
    ]);

    exit;
}

if (empty($usuario["rol"])) {

    echo json_encode([
        "success" => false,
        "message" => "Su cuenta todavía no tiene un rol asignado."
    ]);

    exit;
}

unset(
    $usuario["contraseña"]
);

echo json_encode([
    "success" => true,
    "message" => "Inicio de sesión correcto.",
    "usuario" => $usuario
]);

$consulta->close();
$conn->close();

?>