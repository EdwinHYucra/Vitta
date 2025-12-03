// ==============================================================
//  UTILIDADES DEL CARRITO (MISMA LÓGICA DEL CARRITO OFICIAL)
// ==============================================================
//localStorage.clear();
// Obtener carrito plano
function obtenerCarritoPlano() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar carrito y actualizar contador
function guardarCarrito(plano) {
    localStorage.setItem("carrito", JSON.stringify(plano));

    const pc = document.getElementById("carritoContador");
    const movil = document.getElementById("carritoContadorMovil");

    if (pc) pc.textContent = plano.length;
    if (movil) movil.textContent = plano.length;
}

// Agregar producto con datos completos (tu formato oficial)
function agregarAlCarrito(id, nombre, precio, img, tag) {
    const carrito = obtenerCarritoPlano();

    carrito.push({
        id,
        nombre,
        precio,
        img,
        tag
    });

    guardarCarrito(carrito);

    alert("Producto añadido al carrito 🛒");
}

// ==============================================================
//            CARGA DE PRODUCTOS EN EL INDEX
// ==============================================================

document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById("contenedorProductos");
    const sinResultados = document.getElementById("sinResultados");

    // Obtener productos reales desde localStorage
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (!productos.length) {
        sinResultados.style.display = "block";
        return;
    }

    // Mostrar solo los primeros 6 (estilo destacados)
    const productosMostrados = productos.slice(0, 6);

    productosMostrados.forEach(prod => {

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta");

        tarjeta.innerHTML = `
            <div class="imagen" 
                style="background-image:url('${prod.imagenPrincipal}');
                       background-size: contain;
                       background-repeat:no-repeat;">
            </div>

            <div class="cuerpo">

                <h3>
                    <a href="producto.html?id=${prod.id}">
                        ${prod.nombre}
                    </a>
                </h3>

                <p class="precio">
                    <strong>S/ ${prod.precio.toFixed(2)}</strong>
                    ${prod.stock > 0
                        ? `<span class="etiqueta">En stock</span>`
                        : `<span class="etiqueta" style="background:#ffe0e0;color:#d12;">Agotado</span>`}
                </p>

                <p class="suave">${prod.descripcionBreve || "Producto disponible"}</p>

                <!-- Botón que pasa todo el producto usando dataset -->
                <button class="boton agregar"
                    data-id="${prod.id}"
                    data-nombre="${prod.nombre}"
                    data-precio="${prod.precio}"
                    data-img="${prod.imagenPrincipal}"
                    data-tag="${prod.tag || "Producto Vitta"}">
                    Agregar al carrito
                </button>

                <a href="producto.html?id=${prod.id}" 
                class="boton ver-detalle" 
                style="margin-top:8px; display:inline-block;">
                    Ver detalle
                </a>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });

    // Evento global para "Agregar al carrito"
    document.addEventListener("click", e => {

        if (e.target.classList.contains("agregar")) {

            const id = Number(e.target.dataset.id);
            const nombre = e.target.dataset.nombre;
            const precio = Number(e.target.dataset.precio);
            const img = e.target.dataset.img;
            const tag = e.target.dataset.tag;

            agregarAlCarrito(id, nombre, precio, img, tag);
        }

    });

    // Actualizar contador al cargar
    guardarCarrito(obtenerCarritoPlano());
});
