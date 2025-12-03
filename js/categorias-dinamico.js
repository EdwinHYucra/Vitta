/*
 CATEGORÍAS + PRODUCTOS + FILTROS + ORDENAMIENTO — TODO UNIFICADO
 */

// ---------------------------
// 1. CARGAR CATEGORÍAS
document.addEventListener("DOMContentLoaded", () => {

    const contenedorCategorias = document.getElementById("sliderCategorias");
    if (!contenedorCategorias)
        return;

    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    if (!categorias.length) {
        contenedorCategorias.innerHTML = "<p>No hay categorías.</p>";
        return;
    }

    categorias.forEach(cat => {
        const btn = document.createElement("button");
        btn.classList.add("tarjeta-categoria");

        btn.innerHTML = `
            <div class="figura-categoria">
                <img src="${cat.img}" alt="${cat.nombre}">
            </div>
            <span class="nombre-categoria">${cat.nombre}</span>
        `;

        btn.addEventListener("click", () => {
            localStorage.setItem("categoriaActual", cat.slug);
            cargarProductos(cat.slug);
        });

        contenedorCategorias.appendChild(btn);
        
        
    });
});


// 2. CARGA DE PRODUCTOS (USADO POR FILTROS, ORDEN Y CATEGORÍAS)
const contenedorProductos = document.getElementById("contenedorProductos");
const sinProductos = document.getElementById("sinProductos");

function cargarProductos(slugCategoria = null, listaPersonalizada = null) {

    let productos = listaPersonalizada ||
            JSON.parse(localStorage.getItem("productos")) || [];

    if (slugCategoria) {
        productos = productos.filter(p => p.categoria === slugCategoria);
    }

    if (!productos.length) {
        contenedorProductos.innerHTML = "";
        sinProductos.style.display = "block";
        return;
    }

    sinProductos.style.display = "none";
    contenedorProductos.innerHTML = "";

    productos.forEach(prod => {

        const card = document.createElement("article");
        card.classList.add("tarjeta-producto");

        card.innerHTML = `
            <div class="imagen-producto">
                <img src="${prod.imagenPrincipal}" alt="${prod.nombre}">
                <div class="banderas">
                    ${prod.stock > 0 ? `<span class="bandera">En stock</span>` : `<span class="bandera agotado">Agotado</span>`}
                    ${prod.oferta ? `<span class="bandera">-${prod.descuento}%</span>` : ""}
                </div>
            </div>

            <div class="cuerpo-producto">
                <h2 class="titulo-producto">${prod.nombre}</h2>
                <p class="precio-producto"><strong>S/ ${prod.precio.toFixed(2)}</strong></p>
                <p class="descripcion-producto">${prod.descripcionBreve || "Producto disponible"}</p>

                <div class="acciones-producto">
                    <button class="boton boton-relleno"
                        onclick="agregarAlCarrito(${prod.id}, '${prod.nombre}', ${prod.precio}, '${prod.imagenPrincipal}', '${prod.tag || ''}')">
                        Agregar
                    </button>

                    <a class="boton" href="producto.html?id=${prod.id}">Ver detalle</a>
                </div>
            </div>
        `;

        contenedorProductos.appendChild(card);
    });
}



// 3. CARGAR AUTOMÁTICAMENTE LA ÚLTIMA CATEGORÍA SELECCIONADA
document.addEventListener("DOMContentLoaded", () => {
    const ultima = localStorage.getItem("categoriaActual");
    cargarProductos(ultima);
});


// 4. ORDENAMIENTO Y FILTROS UNIDOS
document.addEventListener("DOMContentLoaded", () => {

    const selectOrden = document.getElementById("orden");
    const chips = document.querySelectorAll(".chip-filtro");

    if (!selectOrden)
        return;

    // ORDENAMIENTO
    selectOrden.addEventListener("change", () => {

        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        const categoria = localStorage.getItem("categoriaActual");

        productos = productos.filter(p => p.categoria === categoria);

        switch (selectOrden.value) {
            case "Precio: menor a mayor":
                productos.sort((a, b) => a.precio - b.precio);
                break;

            case "Precio: mayor a menor":
                productos.sort((a, b) => b.precio - a.precio);
                break;

            case "Nombre A–Z":
                productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;

            case "Nombre Z–A":
                productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
        }

        cargarProductos(null, productos);
    });

    // FILTROS
    chips.forEach(chip => {
        chip.addEventListener("click", () => {

            let productos = JSON.parse(localStorage.getItem("productos")) || [];
            const categoria = localStorage.getItem("categoriaActual");

            productos = productos.filter(p => p.categoria === categoria);

            const filtro = chip.dataset.filtro;

            switch (filtro) {

                case "stock":
                    productos = productos.filter(p => p.stock > 0);
                    break;

                case "ofertas":
                    productos = productos.filter(p => p.oferta === true);
                    break;

                case "menos50":
                    productos = productos.filter(p => p.precio < 50);
                    break;

                case "50a100":
                    productos = productos.filter(p => p.precio >= 50 && p.precio <= 100);
                    break;

                case "mas100":
                    productos = productos.filter(p => p.precio > 100);
                    break;
            }

            cargarProductos(null, productos);
        });
    });

});

// =====================================================
// CARRUSEL DE CATEGORÍAS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const carrusel = document.getElementById("sliderCategorias");
    const btnPrev = document.querySelector(".carrusel-prev");
    const btnNext = document.querySelector(".carrusel-next");

    if (!carrusel) return;

    const SCROLL_AMOUNT = 350;

    btnNext.addEventListener("click", () => {
        carrusel.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    });

    btnPrev.addEventListener("click", () => {
        carrusel.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    });

    // Ocultar flechas cuando no hay overflow
    function actualizarBotones() {
        const maxScroll = carrusel.scrollWidth - carrusel.clientWidth;

        btnPrev.style.display = carrusel.scrollLeft <= 20 ? "none" : "flex";
        btnNext.style.display = carrusel.scrollLeft >= maxScroll - 20 ? "none" : "flex";
    }

    carrusel.addEventListener("scroll", actualizarBotones);

    // Primera verificación
    setTimeout(actualizarBotones, 400);
});

