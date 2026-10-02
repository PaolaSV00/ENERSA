const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");

const loginCard =
    document.getElementById("loginCard");

const registerCard =
    document.getElementById("registerCard");


showRegister.addEventListener(
    "click",
    function () {

        loginCard.style.display = "none";

        registerCard.style.display = "block";

    }
);


showLogin.addEventListener(
    "click",
    function () {

        registerCard.style.display = "none";

        loginCard.style.display = "block";

    }
);


registerForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const correo =
            document.getElementById(
                "registerEmail"
            ).value.trim();

        const usuario =
            document.getElementById(
                "registerUsername"
            ).value.trim();

        const password =
            document.getElementById(
                "registerPassword"
            ).value;

        const confirmar =
            document.getElementById(
                "registerPasswordConfirm"
            ).value;


        if (password !== confirmar) {

            alert(
                "Las contraseñas no coinciden."
            );

            return;

        }


        if (password.length < 6) {

            alert(
                "La contraseña debe tener al menos 6 caracteres."
            );

            return;

        }


        try {

            const respuesta =
                await fetch(
                    "http://localhost:3000/api/registro",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            correo:
                                correo,

                            usuario:
                                usuario,

                            password:
                                password

                        })

                    }
                );


            const resultado =
                await respuesta.json();


            if (!resultado.success) {

                alert(
                    resultado.message
                );

                return;

            }


            alert(
                "Registro realizado correctamente. Un administrador debe aprobar su cuenta y asignarle un rol antes de poder ingresar."
            );


            registerForm.reset();

            registerCard.style.display =
                "none";

            loginCard.style.display =
                "block";


        } catch (error) {

            console.error(error);

            alert(
                "No fue posible conectar con el servidor."
            );

        }

    }
);


loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const correo =
            document.getElementById(
                "loginEmail"
            ).value.trim();

        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        try {

            const respuesta =
                await fetch(
                    "http://localhost:3000/api/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            correo:
                                correo,

                            password:
                                password

                        })

                    }
                );


            const resultado =
                await respuesta.json();


            if (!resultado.success) {

                alert(
                    resultado.message
                );

                return;

            }


            sessionStorage.setItem(
                "usuario",
                JSON.stringify(
                    resultado.usuario
                )
            );

            sessionStorage.setItem(
                "token",
                resultado.token
            );


            window.location.href =
                "index.html";


        } catch (error) {

            console.error(error);

            alert(
                "No fue posible conectar con el servidor."
            );

        }

    }
);

function configurarMostrarPassword(
    inputId,
    buttonId
) {

    const input =
        document.getElementById(inputId);

    const button =
        document.getElementById(buttonId);

    if (!input || !button) {
        return;
    }

    button.addEventListener(
        "click",
        function () {

            if (
                input.type === "password"
            ) {

                input.type = "text";

                button.textContent = "🙈";

                button.setAttribute(
                    "aria-label",
                    "Ocultar contraseña"
                );

            } else {

                input.type = "password";

                button.textContent = "👁";

                button.setAttribute(
                    "aria-label",
                    "Mostrar contraseña"
                );

            }

        }
    );

}


configurarMostrarPassword(
    "loginPassword",
    "toggleLoginPassword"
);


configurarMostrarPassword(
    "registerPassword",
    "toggleRegisterPassword"
);


configurarMostrarPassword(
    "registerPasswordConfirm",
    "toggleRegisterPasswordConfirm"
);