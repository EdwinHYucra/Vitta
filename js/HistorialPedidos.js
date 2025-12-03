document.addEventListener("DOMContentLoaded", () => {

    // ================================
    // VALIDAR SESIÓN
    // ================================
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
        window.location.href = "login-register.html";
        return;
    }

    const pedidos = JSON.parse(localStorage.getItem(`historial_${usuario.correo}`)) || [];
    const tbody = document.getElementById("listaPedidos");

    // ================================
    // RENDER TABLA
    // ================================
    function renderHistorial() {

        if (pedidos.length === 0) {
            tbody.innerHTML = `
                <tr class="empty-row">
                    <td colspan="5">
                        <div class="empty-box">
                            <h3>No tienes pedidos aún</h3>
                            <p>Cuando realices compras podrás ver tu historial aquí.</p>
                            <a href="index.html" class="btn-empty">Comprar ahora</a>
                        </div>
                    </td>
                </tr>`;
            return;
        }

        tbody.innerHTML = pedidos.map((p, index) => `
            <tr>
                <td>#${p.id}</td>
                <td>${p.fecha}</td>
                <td>${p.metodoPago}</td>
                <td>S/ ${p.total.toFixed(2)}</td>

                <td style="position:relative;">
                    <button class="btn-menu" onclick="toggleMenu(${index})">⋮</button>
                    <div class="menu-opciones" id="menu-${index}">
                        <button onclick="verDetalle(${index})">Ver Boleta</button>
                    </div>
                </td>
            </tr>
        `).join("");
    }

    renderHistorial();

    // ================================
    // MOSTRAR MENU ⋮
    // ================================
    window.toggleMenu = (i) => {
        document.querySelectorAll(".menu-opciones").forEach(m => m.style.display = "none");
        const menu = document.getElementById(`menu-${i}`);
        menu.style.display = "block";
    };

    // Cerrar menú si hace clic afuera
    document.addEventListener("click", (e) => {
        if (!e.target.classList.contains("btn-menu")) {
            document.querySelectorAll(".menu-opciones").forEach(m => m.style.display = "none");
        }
    });

    // ================================
    // ABRIR MODAL CON BOUCHER
    // ================================
    window.verDetalle = (i) => {
        const p = pedidos[i];

        const modal = document.getElementById("modalBoucher");
        const ticket = document.getElementById("ticketContenido");

        ticket.innerHTML = `
            <div class="ticket">
                <h2>VITTA</h2>
                <h3>Boleta de Compra</h3>
                <hr>

                <p><strong>Cliente:</strong> ${p.comprador.nombre} ${p.comprador.apellidoP} ${p.comprador.apellidoM}</p>
                <p><strong>Fecha:</strong> ${p.fecha}</p>
                <p><strong>Documento:</strong> ${p.comprador.tipoDoc} - ${p.comprador.numDoc}</p>
                <p><strong>Teléfono:</strong> ${p.comprador.telefono}</p>
                <hr>

                ${p.productos.map(prod => `
                    <div class="line">
                        <span>${prod.nombre} x${prod.cantidad}</span>
                        <span>S/ ${(prod.precio * prod.cantidad).toFixed(2)}</span>
                    </div>
                `).join("")}

                <hr>
                <div class="line"><span>Envío</span><span>S/ ${p.envio.toFixed(2)}</span></div>
                <div class="line total"><span>Total</span><span>S/ ${p.total.toFixed(2)}</span></div>
                <hr>

                <p><strong>Pago:</strong> ${p.metodoPago}</p>

                <p><strong>Dirección:</strong> ${p.direccion.direccionExacta}</p>
                <p><strong>Distrito:</strong> ${p.direccion.distrito}, ${p.direccion.provincia}</p>

                <p style="text-align:center; margin-top:10px;">¡Gracias por tu compra!</p>
            </div>
        `;

        modal.style.display = "flex";
    };

    window.cerrarModal = () => {
        document.getElementById("modalBoucher").style.display = "none";
    };

});