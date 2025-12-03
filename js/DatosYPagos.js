document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       TOAST (MENSAJES FLOTANTES)
    ============================================================ */
    function mostrarToast(mensaje, tipo = "error") {
        const toast = document.getElementById("toast");
        toast.textContent = mensaje;
        toast.className = `toast ${tipo} show`;
        setTimeout(() => toast.classList.remove("show"), 2500);
    }

    /* ============================================================
       VALIDAR SESIÓN
    ============================================================ */
    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
        window.location.href = "login-register.html";
        return;
    }

    const correoClave = usuario.correo;


    /* ============================================================
       UBIGEO (Departamentos, Provincias, Distritos)
    ============================================================ */
    const UBIGEO = {
        "Arequipa": {
            "Arequipa": ["Miraflores", "Jacobo Hunter"],
            "Islay": ["Mollendo", "Islay"]
        },
        "Lima": {
            "Lima": ["Miraflores", "SJL"],
            "Canta": ["Huaros", "San Buenaventura"]
        }
    };

    const dep = document.getElementById("depInput");
    const prov = document.getElementById("provInput");
    const dist = document.getElementById("distInput");

    function cargarDepartamentos() {
        dep.innerHTML = `<option value="">Seleccione</option>`;
        Object.keys(UBIGEO).forEach(d => {
            dep.innerHTML += `<option value="${d}">${d}</option>`;
        });
    }

    function cargarProvincias() {
        prov.innerHTML = `<option value="">Seleccione</option>`;
        if (!dep.value) return;

        Object.keys(UBIGEO[dep.value]).forEach(p => {
            prov.innerHTML += `<option value="${p}">${p}</option>`;
        });
    }

    function cargarDistritos() {
        dist.innerHTML = `<option value="">Seleccione</option>`;
        if (!prov.value) return;

        UBIGEO[dep.value][prov.value].forEach(d => {
            dist.innerHTML += `<option value="${d}">${d}</option>`;
        });
    }

    dep.addEventListener("change", cargarProvincias);
    prov.addEventListener("change", cargarDistritos);
    cargarDepartamentos();


    /* ============================================================
       AUTOCARGAR DATOS DEL USUARIO
    ============================================================ */
    nombreInput.value = usuario.nombre || "";
    apellidoPInput.value = usuario.apePat || "";
    apellidoMInput.value = usuario.apeMat || "";
    correoInput.value = usuario.correo || "";
    telefonoInput.value = usuario.telefono || "";

    tipoDocInput.value = usuario.tipoDocumento;
    tipoDocInput.readOnly = true;

    numeroDocInput.value = usuario.numeroDocumento;
    numeroDocInput.readOnly = true;


    /* ============================================================
       CARGAR DIRECCIÓN PRINCIPAL
    ============================================================ */
    let direcciones = JSON.parse(localStorage.getItem(`direcciones_${correoClave}`)) || [];
    let principal = direcciones.find(d => d.principal === true);

    if (principal) {
        dep.value = principal.departamento;
        cargarProvincias();

        setTimeout(() => {
            prov.value = principal.provincia;
            cargarDistritos();

            setTimeout(() => {
                dist.value = principal.distrito;
            }, 40);
        }, 40);

        direccionExactaInput.value = principal.direccion;
    }


    /* ============================================================
       RESUMEN DE COMPRA (CARRITO)
    ============================================================ */
    const resumenHTML = document.getElementById("resumenCompraHTML");

    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem("carrito")) || [];
    }

    function agrupar() {
        const plano = obtenerCarrito();
        const mapa = {};

        plano.forEach(p => {
            if (!mapa[p.id]) mapa[p.id] = { ...p, cantidad: 0 };
            mapa[p.id].cantidad++;
        });

        return Object.values(mapa);
    }

    function renderResumen() {
        const items = agrupar();
        let subtotal = items.reduce((a, i) => a + i.precio * i.cantidad, 0);
        let envio = 5;
        let total = subtotal + envio;

        resumenHTML.innerHTML = `
            <h2 class="subtitulo" style="text-align:center;">Resumen de Compra</h2>

            <div class="lista-resumen">
                ${items.map(i => `
                    <div class="linea-item">
                        <span>${i.nombre}</span>
                        <span>x${i.cantidad}</span>
                        <span>S/ ${(i.precio * i.cantidad).toFixed(2)}</span>
                    </div>
                `).join("")}
            </div>

            <hr>

            <div class="resumen-totales">
                <p><strong>Subtotal:</strong><span>S/ ${subtotal.toFixed(2)}</span></p>
                <p><strong>Envío:</strong><span>S/ ${envio.toFixed(2)}</span></p>
                <p class="total-final"><strong>Total:</strong><span>S/ ${total.toFixed(2)}</span></p>
            </div>
        `;
    }

    renderResumen();


    /* ============================================================
       MÉTODO DE PAGO
    ============================================================ */
    const paymentContent = document.getElementById("paymentContent");

    function activar(boton) {
        document.querySelectorAll(".pay-btn").forEach(b => b.classList.remove("active"));
        boton.classList.add("active");
    }

    payTarjeta.onclick = () => {
        activar(payTarjeta);
        paymentContent.innerHTML = `
            <h3>Pago con Tarjeta</h3>

            <div class="input-box">
                <label>Número de Tarjeta</label>
                <input type="number" id="cardNumber" placeholder="#### #### #### ####">
            </div>

            <div class="row-2">
                <div class="input-box">
                    <label>Mes (MM)</label>
                    <input type="number" id="cardMes" min="1" max="12">
                </div>

                <div class="input-box">
                    <label>Año (AA)</label>
                    <input type="number" id="cardAnio" min="25" max="99">
                </div>
            </div>

            <div class="input-box">
                <label>CVV</label>
                <input type="number" id="cardCVV" placeholder="***">
            </div>
        `;
    };

    payYape.onclick = () => {
        activar(payYape);
        paymentContent.innerHTML = `
            <h3>Paga con Yape</h3>
            <img src="img/QR/PagarYAPE.png" class="qrImagen">
        `;
    };

    payPlin.onclick = () => {
        activar(payPlin);
        paymentContent.innerHTML = `
            <h3>Paga con Plin</h3>
            <img src="img/QR/Plin_QR.png" class="qrImagen">
        `;
    };

    payTarjeta.click(); // tarjeta por defecto


    /* ============================================================
       FINALIZAR PAGO
    ============================================================ */
    btnFinalizarPago.onclick = () => {

        /* VALIDAR DATOS PERSONALES */
        if (!nombreInput.value.trim() ||
            !apellidoPInput.value.trim() ||
            !apellidoMInput.value.trim() ||
            !telefonoInput.value.trim() ||
            !tipoDocInput.value.trim() ||
            !numeroDocInput.value.trim()) {

            mostrarToast("Completa todos los datos personales.");
            return;
        }

        /* VALIDAR DIRECCIÓN */
        if (!dep.value || !prov.value || !dist.value || !direccionExactaInput.value.trim()) {
            mostrarToast("Completa toda la información de tu dirección.");
            return;
        }

        /* VALIDAR MÉTODO DE PAGO */
        let metodoPago = "";

        if (payTarjeta.classList.contains("active")) {
            metodoPago = "Tarjeta";

            const num = document.getElementById("cardNumber").value.trim();
            const mes = document.getElementById("cardMes").value.trim();
            const anio = document.getElementById("cardAnio").value.trim();
            const cvv = document.getElementById("cardCVV").value.trim();

            if (!num || !mes || !anio || !cvv) {
                mostrarToast("Completa todos los campos de la tarjeta.");
                return;
            }

            if (num.length !== 16) {
                mostrarToast("El número de tarjeta debe tener 16 dígitos.");
                return;
            }

            if (cvv.length !== 3) {
                mostrarToast("El CVV debe tener 3 dígitos.");
                return;
            }

        } else if (payYape.classList.contains("active")) {
            metodoPago = "Yape";

        } else if (payPlin.classList.contains("active")) {
            metodoPago = "Plin";

        } else {
            mostrarToast("Selecciona un método de pago.");
            return;
        }


        /* ============================================================
           ARMAR PRODUCTOS DEL CARRITO
        ============================================================ */
        const plano = JSON.parse(localStorage.getItem("carrito")) || [];
        const agrupados = {};
        plano.forEach(p => {
            if (!agrupados[p.id]) agrupados[p.id] = { ...p, cantidad: 0 };
            agrupados[p.id].cantidad++;
        });

        const productos = Object.values(agrupados);

        const subtotal = productos.reduce((a, i) => a + i.precio * i.cantidad, 0);
        const envio = 5;
        const total = subtotal + envio;


        /* OBJETO COMPLETO */
        const resumenCompra = {
            comprador: {
                nombre: nombreInput.value,
                apellidoP: apellidoPInput.value,
                apellidoM: apellidoMInput.value,
                correo: usuario.correo,
                telefono: telefonoInput.value,
                tipoDoc: tipoDocInput.value,
                numDoc: numeroDocInput.value
            },
            direccion: {
                departamento: dep.value,
                provincia: prov.value,
                distrito: dist.value,
                direccionExacta: direccionExactaInput.value
            },
            metodoPago,
            productos,
            envio,
            subtotal,
            total
        };

        localStorage.setItem("resumenCompra", JSON.stringify(resumenCompra));


        /* ============================================================
           GUARDAR EN HISTORIAL
        ============================================================ */
        let historial = JSON.parse(localStorage.getItem(`historial_${usuario.correo}`)) || [];

        historial.unshift({
            id: historial.length + 1,
            fecha: new Date().toLocaleDateString("es-PE"),
            metodoPago,
            total,
            productos,
            comprador: resumenCompra.comprador,
            direccion: resumenCompra.direccion,
            envio
        });

        localStorage.setItem(`historial_${usuario.correo}`, JSON.stringify(historial));


        /* ============================================================
           MOSTRAR MODAL Y REDIRIGIR
        ============================================================ */
        modalCompra.style.display = "flex";
        localStorage.removeItem("carrito");

        setTimeout(() => {
            window.location.href = "ResumenCompra.html";
        }, 3000);
    };

});