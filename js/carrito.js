// ===============================
// LEER CARRITO DESDE LOCALSTORAGE
// ===============================
function obtenerCarritoPlano() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Agrupar por id => { id, nombre, precio, img, tag, cantidad }
function agruparCarrito() {
    const plano = obtenerCarritoPlano();
    const mapa = {};

    plano.forEach(p => {
        if (!mapa[p.id]) {
            mapa[p.id] = { ...p, cantidad: 0 };
        }
        mapa[p.id].cantidad++;
    });

    return Object.values(mapa);
}

// Guardar carrito agrupado nuevamente como plano
function guardarCarritoDesdeAgrupado(items) {
    const plano = [];

    items.forEach(item => {
        const { cantidad, ...resto } = item;
        for (let i = 0; i < cantidad; i++) {
            plano.push(resto);
        }
    });

    localStorage.setItem("carrito", JSON.stringify(plano));

    // Actualizar contador del header
    const contadorPc = document.getElementById("carritoContador");
    const contadorMovil = document.getElementById("carritoContadorMovil");
    if (contadorPc) contadorPc.textContent = plano.length;
    if (contadorMovil) contadorMovil.textContent = plano.length;
}

// ===============================
// MODAL PARA CONFIRMAR ELIMINACIÓN
// ===============================
let idAEliminar = null; // Guardamos el ID temporal

function confirmarEliminacion(id) {
    idAEliminar = id;
    document.getElementById("modalEliminar").style.display = "flex";
}

// Botón cancelar
document.getElementById("btnNoEliminar").onclick = () => {
    document.getElementById("modalEliminar").style.display = "none";
    idAEliminar = null;
};

// Botón eliminar
document.getElementById("btnSiEliminar").onclick = () => {
    if (idAEliminar !== null) {
        eliminarProducto(idAEliminar);
    }
    document.getElementById("modalEliminar").style.display = "none";
    idAEliminar = null;
};

// ===============================
// RENDER DEL CARRITO
// ===============================
function renderCarrito() {
    const lista = document.getElementById("listaCarrito");
    const resumen = document.getElementById("resumenCompra");

    const items = agruparCarrito();

    if (!lista) return;

    // === SI EL CARRITO ESTÁ VACÍO ===
    if (items.length === 0) {
        lista.innerHTML = `
            <div class="carrito-vacio">
                <p>Tu carrito está vacío.</p>
                <span>Agrega productos para verlos aquí.</span>
            </div>
        `;
        resumen.style.opacity = "0.5";
        actualizarResumen(0, 0);
        return;
    }

    // === SI HAY PRODUCTOS ===
    lista.innerHTML = items.map(item => crearTarjetaProducto(item)).join("");
    resumen.style.opacity = "1";

    // Listeners para sumar/restar
    lista.querySelectorAll(".qty-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id, 10);
            const tipo = btn.dataset.tipo;
            cambiarCantidad(id, tipo === "+");
        });
    });

    // Listener botón eliminar → ABRE MODAL
    lista.querySelectorAll(".cart-remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id, 10);
            confirmarEliminacion(id);
        });
    });

    // RESUMEN
    const subtotal = items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
    const envio = items.length > 0 ? 5.0 : 0.0;
    actualizarResumen(subtotal, envio);
}

function crearTarjetaProducto(p) {
    const total = (p.precio * p.cantidad).toFixed(2);

    return `
        <article class="cart-item">

            <div class="product">
                <img src="${p.img}" alt="${p.nombre}" class="cart-img">
                <div class="cart-info">
                    <h3>${p.nombre}</h3>
                    <p>${p.tag || "Producto Vitta"}</p>
                </div>
            </div>

            <div class="cart-qty">
                <button class="qty-btn" data-id="${p.id}" data-tipo="-">-</button>
                <span class="qty-value">${p.cantidad}</span>
                <button class="qty-btn" data-id="${p.id}" data-tipo="+">+</button>
            </div>

            <div class="cart-price">S/ ${p.precio.toFixed(2)}</div>

            <div class="total-delete">
                <span class="cart-total">S/ ${total}</span>

                <button class="cart-remove" title="Eliminar" data-id="${p.id}">
                    🗑
                </button>
            </div>

        </article>
    `;
}

// ===============================
// CAMBIAR CANTIDAD (+ / -)
// ===============================
function cambiarCantidad(id, incrementar) {
    const items = agruparCarrito();
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (incrementar) {
        item.cantidad++;
    } else {
        if (item.cantidad > 1) {
            item.cantidad--;
        } else {
            // Si la cantidad llega a 1 → pedir confirmación
            confirmarEliminacion(id);
            return;
        }
    }

    guardarCarritoDesdeAgrupado(items);
    renderCarrito();
}

// ===============================
// ELIMINAR PRODUCTO
// ===============================
function eliminarProducto(id) {
    const items = agruparCarrito().filter(i => i.id !== id);
    guardarCarritoDesdeAgrupado(items);
    renderCarrito();
}

// ===============================
// RESUMEN
// ===============================
function actualizarResumen(subtotal, envio) {
    const total = subtotal + envio;
    document.getElementById("subtotalTexto").textContent = `S/ ${subtotal.toFixed(2)}`;
    document.getElementById("envioTexto").textContent = `S/ ${envio.toFixed(2)}`;
    document.getElementById("totalTexto").textContent = `S/ ${total.toFixed(2)}`;
}

// ===============================
// BOTONES (Actualizar – Continuar)
// ===============================
function configurarBotones() {
    const btnActualizar = document.getElementById("btnActualizar");
    const btnContinuar = document.getElementById("btnContinuar");

    if (btnActualizar) {
        btnActualizar.addEventListener("click", () => {
            renderCarrito();
            alert("Carrito actualizado ✅");
        });
    }

    if (btnContinuar) {
        btnContinuar.addEventListener("click", () => {
            const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
            const carritoPlano = obtenerCarritoPlano();

            if (carritoPlano.length === 0) {
                alert("Tu carrito está vacío 🧺");
                return;
            }

            if (!usuario) {
                mostrarModalLogin();
                return;
            }

            window.location.href = "DatosYPagos.html";
        });
    }
}

// ====================== MODAL LOGIN (YA EXISTENTE) ======================
function mostrarModalLogin() {
    const modal = document.getElementById("modalLogin");
    modal.style.display = "flex";

    document.getElementById("btnCancelarModal").onclick = () => {
        modal.style.display = "none";
    };

    document.getElementById("btnIrLogin").onclick = () => {
        window.location.href = "login-register.html";
    };
}

// ===============================
// INICIALIZAR
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    renderCarrito();
    configurarBotones();
});