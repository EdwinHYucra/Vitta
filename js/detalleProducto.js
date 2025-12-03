document.addEventListener("DOMContentLoaded", () => {

    // Obtener ID desde "?id=3"
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        alert("Producto no encontrado");
        window.location.href = "index.html";
        return;
    }

    // ========================
    // Migas
    // ========================

    document.getElementById("migaCategoria").textContent = producto.categoria;

    // ========================
    // Información del producto
    // ========================

    document.getElementById("productoNombre").textContent = producto.nombre;
    document.getElementById("productoPrecio").textContent = producto.precio.toFixed(2);
    document.getElementById("descripcionBreve").textContent = producto.descripcionBreve;
    document.getElementById("descripcionDetalles").textContent = producto.descripcionDetalles;

    // ========================
    // Galería
    // ========================

    const vista = document.getElementById("galeriaVista");
    const miniaturas = document.getElementById("galeriaMiniaturas");

    // Imagen principal
    vista.innerHTML = `
        <img class="galeria-imagen" style="display:block" src="${producto.imagenPrincipal}">
    `;

    // Thumbnails
    miniaturas.innerHTML = "";

    producto.miniaturas.forEach((img, idx) => {

        const label = document.createElement("div");
        label.className = "miniatura";
        label.innerHTML = `<img src="${img}">`;

        label.addEventListener("click", () => {
            vista.innerHTML = `<img class="galeria-imagen" style="display:block" src="${img}">`;
        });

        miniaturas.appendChild(label);
    });

    // ========================
    // Agregar al carrito
    // ========================

    document.getElementById("btnAgregarCarrito").addEventListener("click", () => {
    
    const cant = Number(document.getElementById("cantidad").value);

    for (let i = 0; i < cant; i++) {
        agregarAlCarrito(
            producto.id,
            producto.nombre,
            producto.precio,
            producto.imagenPrincipal,
            producto.tag || "Producto Vitta"
        );
    }
});

    // ========================
    // Relacionados
    // ========================

    const relacionadosBox = document.getElementById("productosRelacionados");

    const relacionados = productos
        .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
        .slice(0, 4);

    relacionadosBox.innerHTML = relacionados.map(p => `
    <article class="relacionado">
        <div class="relacionado-foto">
            <img src="${p.imagenPrincipal}">
        </div>
        <h3 class="relacionado-titulo">${p.nombre}</h3>
        <p class="relacionado-ahora">S/ ${p.precio.toFixed(2)}</p>
        <a href="Producto.html?id=${p.id}" class="boton boton-primario">Ver producto</a>
    </article>
`).join("");


});
