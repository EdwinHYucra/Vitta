document.addEventListener("DOMContentLoaded", () => {

    // VALIDAR SESIÓN
    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
        window.location.href = "login-register.html";
        return;
    }

    // OBTENER RESUMEN
    const resumen = JSON.parse(localStorage.getItem("resumenCompra"));

    if (!resumen) {
        alert("No hay datos de compra para mostrar.");
        return;
    }

    // ==========================================
    // RENDER PRODUCTOS
    // ==========================================
    const tabla = document.getElementById("tablaProductos");
    const costoEnvio = document.getElementById("costoEnvio");
    const totalFinal = document.getElementById("totalFinal");

    function renderProductos() {
        tabla.innerHTML = resumen.productos.map(item => `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>S/ ${(item.precio * item.cantidad).toFixed(2)}</td>
            </tr>
        `).join("");

        costoEnvio.textContent = `S/ ${resumen.envio.toFixed(2)}`;
        totalFinal.textContent = `S/ ${resumen.total.toFixed(2)}`;
    }

    renderProductos();

    // ==========================================
    // RENDER CLIENTE + DIRECCIÓN + PAGO
    // ==========================================
    function renderCliente() {

        document.getElementById("infoCliente").innerHTML = `
            <p><strong>Cliente:</strong> ${resumen.comprador.nombre} 
            ${resumen.comprador.apellidoP} ${resumen.comprador.apellidoM}</p>

            <p><strong>Correo:</strong> ${resumen.comprador.correo}</p>
            <p><strong>Teléfono:</strong> ${resumen.comprador.telefono}</p>

            <p><strong>Documento:</strong> 
                ${resumen.comprador.tipoDoc} - ${resumen.comprador.numDoc}</p>

            <p><strong>Dirección:</strong> ${resumen.direccion.direccionExacta}</p>
            <p><strong>Distrito:</strong> 
                ${resumen.direccion.distrito}, ${resumen.direccion.provincia}</p>
        `;

        document.getElementById("infoPago").innerHTML = `
            <p><strong>Método de Pago:</strong> ${resumen.metodoPago}</p>
        `;
    }

    renderCliente();

});