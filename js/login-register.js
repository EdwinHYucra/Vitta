document.addEventListener("DOMContentLoaded", () => {

    // ======== USUARIOS BASE ========
    const usuariosBase = [
        {
            nombre: "Administrador",
            apellidoMaterno: "Principal",
            apellidoPaterno: "Juarez",
            correo: "admin@correo.com",
            telefono: "900000000",
            password: "admin123",
            rol: "admin"
        },
        {
            nombre: "Cliente",
            apellidoMaterno: "Ejemplo",
            apellidoPaterno: "Martinez",
            correo: "cliente@correo.com",
            telefono: "911111111",
            password: "cliente123",
            rol: "cliente"
        }
    ];

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuariosBase.forEach(base => {
        if (!usuarios.some(u => u.correo === base.correo)) {
            usuarios.push(base);
        }
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));


    // ============================================================
    //                LOGIN PC + PHONE
    // ============================================================

    const loginFormPC = document.querySelector(".login-container form");
    const loginFormPhone = document.querySelector("#login-section .form-area");

    function procesarLogin(correo, password, errorBox) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuario = usuarios.find(u => u.correo === correo && u.password === password);

        if (usuario) {
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
            
            if (usuario.rol !== "admin") {
                window.location.href = "index.html";
            }
            else{
                window.location.href = "admin.html";
            }

        } else {
            if (errorBox) {
                errorBox.textContent = "Correo o contraseña incorrectos.";
                errorBox.style.display = "block";
            }
        }
    }

    // LOGIN PC
    if (loginFormPC) {
        const errorMsgPC = document.createElement("p");
        errorMsgPC.style.color = "#e74c3c";
        errorMsgPC.style.fontSize = "12px";
        errorMsgPC.style.display = "none";

        loginFormPC.appendChild(errorMsgPC);

        loginFormPC.addEventListener("submit", (e) => {
            e.preventDefault();

            const correo = loginFormPC.querySelector('input[type="email"]').value.trim();
            const password = loginFormPC.querySelector('input[type="password"]').value;

            procesarLogin(correo, password, errorMsgPC);
        });
    }

    // LOGIN PHONE
    if (loginFormPhone) {

        const loginBtn = loginFormPhone.querySelector(".login-btn");
        const emailInput = loginFormPhone.querySelector('input[type="email"]');
        const passInput = loginFormPhone.querySelector('input[type="password"]');

        const msg = document.createElement("p");
        msg.style.color = "#e74c3c";
        msg.style.display = "none";
        msg.style.fontSize = "13px";

        loginFormPhone.appendChild(msg);

        loginBtn.addEventListener("click", () => {

            const correo = emailInput.value.trim();
            const password = passInput.value;

            procesarLogin(correo, password, msg);
        });
    }


// ============================================================
    //                REGISTRO PC + PHONE
    // ============================================================

    const registerFormPC = document.querySelector(".register-container form");
    const registerFormPhone = document.querySelector("#register-section .form-area");


    function procesarRegistro(nombre, apePat, apeMat, correo, telefono, password, confirm, msgBox, callback) {

        msgBox.style.display = "none";

        if (password !== confirm) {
            msgBox.textContent = "Las contraseñas no coinciden.";
            msgBox.style.color = "#e74c3c";
            msgBox.style.display = "block";
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        if (usuarios.some(u => u.correo === correo)) {
            msgBox.textContent = "Este correo ya está registrado.";
            msgBox.style.color = "#e74c3c";
            msgBox.style.display = "block";
            return;
        }

        const nuevoUsuario = {nombre, apePat, apeMat, correo, telefono, password, rol: "cliente"};
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        msgBox.textContent = "Registro exitoso. Ahora puedes iniciar sesión.";
        msgBox.style.color = "#27ae60";
        msgBox.style.display = "block";

        callback();
    }


    // REGISTRO PC
    if (registerFormPC) {

        const msgPC = document.createElement("p");
        msgPC.classList.add("register-msg");
        msgPC.style.display = "none";
        msgPC.style.fontSize = "13px";
        registerFormPC.appendChild(msgPC);

        registerFormPC.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nom").value.trim();
            const apeMat = document.getElementById("apeMat").value.trim();
            const apePat = document.getElementById("apePat").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const password = document.getElementById("password").value;
            const confirm = document.getElementById("confirm_password").value;

            procesarRegistro(
                    nombre, apeMat, apePat, correo, telefono,
                    password, confirm,
                    msgPC,
                    () => registerFormPC.reset()
            );
        });
    }


    // REGISTRO PHONE
    if (registerFormPhone) {

        const registerBtn = registerFormPhone.querySelector(".login-btn");

        const msg = document.createElement("p");
        msg.style.fontSize = "13px";
        msg.style.display = "none";
        registerFormPhone.appendChild(msg);

        registerBtn.addEventListener("click", () => {

            const inputs = registerFormPhone.querySelectorAll("input");

            const nombre = inputs[0].value.trim();
            const apellido = inputs[1].value.trim();
            const correo = inputs[2].value.trim();
            const password = inputs[3].value;
            const telefono = "000000000"; // tu HTML phone NO pide teléfono
            const confirm = password;     // tu HTML phone NO pide confirmar

            procesarRegistro(
                    nombre, apellido, correo, telefono,
                    password, confirm,
                    msg,
                    () => registerFormPhone.reset()
            );
        });
    }


});


// ============================================================
//      CONTROLES DE VISTAS DEL MODO TELÉFONO REAL
// ============================================================

function showRegister() {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("register-section").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("register-section").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");
}