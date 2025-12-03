document.addEventListener("DOMContentLoaded", () => {

// ===============================
// INSERTAR HEADER COMPLETO
// ===============================
        const headerHTML = `
        <input type="checkbox" id="menuChk" class="alternar-menu" />

        <header>
            <div class="contenedor barra">

                <label class="icono-boton menu-movil" for="menuChk">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </label>

                <div class="marca">
                    <a href="index.html"><img class="logo" src="img/Logo/VittaLogo.png"></a>
                </div>

                <div class="buscador">
                    <input id="search" type="search" placeholder="Buscar producto...">
                    <div id="dropdownBuscador" class="dropdown-buscador"></div>
                </div>

                <div class="acciones-superior">
                    <a class="boton relleno" href="Categorias.html">Comprar ahora</a>

                    <!-- CAMBIA DINÁMICAMENTE -->
                    <a id="btnSesionHeader" class="boton.header" href="login-register.html">
                        Iniciar sesión
                    </a>

                    <a href="Carrito.html" class="icono-boton carrito">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                             stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21 6H6"></path>
                        </svg>
                        <span class="contador" id="carritoContador">0</span>
                    </a>
                </div>

            </div>
        </header>

        <!-- PANEL MÓVIL -->
        <label for="menuChk" class="cortina"></label>
        <aside class="panel-movil" id="panelMovil">
            <h3 style="margin:6px 0 0">Menú</h3>

            <div class="buscador-movil">
                <input id="searchMovil" type="search" placeholder="Buscar producto...">
                <div id="dropdownBuscadorMovil" class="dropdown-buscador"></div>
            </div>
            <div class="seccion-titulo">Acciones rápidas</div>
            <div class="lista-movil">
                <a class="boton primario" href="Categorias.html">Comprar ahora</a>

                <!-- BOTÓN QUE CAMBIA EN MÓVIL -->
                <a id="btnSesionMovil" class="boton.header" href="login-register.html">Iniciar sesión</a>
            </div>

            <div class="seccion-titulo">Mi carrito</div>
            <div class="lista-movil" style="grid-template-columns:auto 1fr;align-items:center">
                <button class="icono-boton carrito">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21 6H6"></path>
                    </svg>
                    <span class="contador" id="carritoContadorMovil">0</span>
                </button>
                <a class="boton.header" href="Carrito.html">Ver carrito</a>
            </div>
        </aside>
    `;
        document.body.insertAdjacentHTML("afterbegin", headerHTML);
        // ===========================================
        // CONTROL DE SESIÓN SEGÚN ROL
        // ===========================================
          try {

        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        const btnSesion = document.getElementById("btnSesionHeader");
        const btnSesionMovil = document.getElementById("btnSesionMovil");

        if (usuario) {

            btnSesion.textContent = `Hola, ${usuario.nombre}`;
            btnSesion.href = "#";
            btnSesion.style.position = "relative";

            const menu = document.createElement("div");
            menu.classList.add("menu-usuario");
            menu.style.cssText = `
                position:absolute;
                top:115%;
                right:0;
                background:#fff;
                border-radius:12px;
                min-width:180px;
                padding:8px 0;
                display:none;
                box-shadow:0 4px 12px rgba(0,0,0,0.15);
                z-index:999;
            `;

            function crearItem(txt, link, onClick = null) {
                const el = document.createElement("a");
                el.textContent = txt;
                el.href = link;
                el.style.cssText =
                    "display:block;padding:8px 15px;font-size:14px;color:#333;text-decoration:none;";
                el.addEventListener("mouseover", () => el.style.background = "#f5f5f5");
                el.addEventListener("mouseout", () => el.style.background = "transparent");
                if (onClick) el.addEventListener("click", onClick);
                return el;
            }

            if (usuario.rol === "admin") {
                menu.appendChild(crearItem("Panel administrador", "admin.html"));
                btnSesionMovil.textContent = "Panel Admin";
                btnSesionMovil.href = "admin.html";
                btnSesionMovil.style.background = "#000";
                btnSesionMovil.style.color = "#fff";
                btnSesionMovil.style.fontWeight = "600";
            } else {
                menu.appendChild(crearItem("Mi cuenta", "perfil.html"));
                menu.appendChild(crearItem("Mis compras", "HistorialPedidos.html"));
                btnSesionMovil.textContent = `Hola, ${usuario.nombre}`;
                btnSesionMovil.href = "perfil.html";
                btnSesionMovil.style.background = "#EE5345";
                btnSesionMovil.style.color = "#fff";
                btnSesionMovil.style.fontWeight = "600";
            }

            menu.appendChild(crearItem("Cerrar sesión", "#", () => {
                localStorage.removeItem("usuarioActivo");
                window.location.href = "index.html";
            }));

            btnSesion.appendChild(menu);

            btnSesion.addEventListener("click", e => {
                if (e.target === btnSesion) {
                    e.preventDefault();
                    menu.style.display = menu.style.display === "none" ? "block" : "none";
                }
            });

            document.addEventListener("click", e => {
                if (!btnSesion.contains(e.target)) menu.style.display = "none";
            });
        }

    } catch (err) {
        console.warn("Error leyendo usuarioActivo:", err);
    }

    // =========================
    // ACTIVAR BUSCADORES
    // =========================
    activarBuscador("search", "dropdownBuscador");
    activarBuscador("searchMovil", "dropdownBuscadorMovil");

});
    
// =========================
    // SISTEMA DE BUSQUEDA
    // =========================
function activarBuscador(inputId, dropdownId) {

    const productos = productosBase; 

    const input = document.getElementById(inputId);
    if (!input) return;

    let dropdown = document.getElementById(dropdownId);
    if (!dropdown) {
        dropdown = document.createElement("div");
        dropdown.id = dropdownId;
        dropdown.className = "dropdown-buscador";
        input.insertAdjacentElement("afterend", dropdown);
    }
input.addEventListener("input", () => {
    const texto = input.value.toLowerCase().trim();

    if (!texto) {
        dropdown.innerHTML = "";
        dropdown.classList.remove("visible");
        return;
    }

    const coincidencias = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    if (coincidencias.length === 0) {
        dropdown.innerHTML = `<div class="item-sugerencia">No se encontraron resultados</div>`;
        dropdown.classList.add("visible");
        return;
    }

    const limite = 8;
    const listaMostrada = coincidencias.slice(0, limite);

    // Mostrar primeras 8 sugerencias
    dropdown.innerHTML = listaMostrada.map(p => `
        <div class="item-sugerencia" data-id="${p.id}">
            ${p.nombre}
        </div>
    `).join("");

    dropdown.classList.add("visible");

    // Eventos de clic → ir al producto
    dropdown.querySelectorAll(".item-sugerencia").forEach(item => {
        item.addEventListener("click", () => {
            const id = item.dataset.id;
            window.location.href = `Producto.html?id=${id}`;
        });
    });

    // Si NO hay más resultados, NO mostramos "ver más"
    if (coincidencias.length <= limite) return;

    // ====== MOSTRAR "VER MÁS" AL BAJAR AL FONDO ======

    // Eliminar cualquier listener previo
    dropdown.onscroll = null;

    dropdown.onscroll = () => {
        const alFondo =
            dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight - 5;

        // Si llega al fondo agregar "Ver más" (solo una vez)
        if (alFondo && !dropdown.querySelector(".ver-mas")) {
            dropdown.insertAdjacentHTML("beforeend", `
                <div class="ver-mas">
                                      Ver más resultados
                </div>
            `);
        }
    };
    
    
})
;document.addEventListener("click", e => {

    const clickEnInput = (e.target === input);
    const clickEnDropdown = dropdown.contains(e.target);

    // Si clic afuera del input y del dropdown → cerrar siempre
    if (!clickEnInput && !clickEnDropdown) {
        dropdown.classList.remove("visible");

        // ❗IMPORTANTE: limpiar después de ocultar
        setTimeout(() => {
            dropdown.innerHTML = "";
        }, 50);
    }
});
}
