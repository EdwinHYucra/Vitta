// PANEL DE ADMINISTRACIÓN – Vitta
document.addEventListener("DOMContentLoaded", () => {

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    // No hay usuario → login
    if (!usuario) {
        window.location.href = "login-register.html";
        return;
    }

    // Hay usuario pero NO es admin → perfil
    if (usuario.rol !== "admin") {
        window.location.href = "perfil.html";
        return;
    }
    // SELECTORES
    const botonesLaterales = document.querySelectorAll(".boton-lateral-admin");
    const tabsSuperiores = document.querySelectorAll(".tab-admin");
    const vistas = document.querySelectorAll(".vista-admin");

    // Productos
    const tablaProductosBody = document.getElementById("tablaProductosBody");
    const btnNuevoProducto = document.getElementById("btnNuevoProducto");

    // Categorías
    const tablaCategoriasBody = document.getElementById("tablaCategoriasBody");
    const btnNuevaCategoria = document.getElementById("btnNuevaCategoria");

    // Inventario
    const tablaInventarioBody = document.getElementById("tablaInventarioBody");

    // Perfil
    const perfilNombre = document.getElementById("perfilNombre");
    const perfilApellido = document.getElementById("perfilApellido");
    const perfilCorreo = document.getElementById("perfilCorreo");
    const perfilTelefono = document.getElementById("perfilTelefono");

    // Cerrar sesión
    const btnSalirLateral = document.getElementById("btnSalirLateral");


    // LOCAL STORAGE HELPERS
    const obtenerProductos = () => JSON.parse(localStorage.getItem("productos")) || [];
    const guardarProductos = lista => localStorage.setItem("productos", JSON.stringify(lista));

    const obtenerCategorias = () => JSON.parse(localStorage.getItem("categorias")) || [];
    const guardarCategorias = lista => localStorage.setItem("categorias", JSON.stringify(lista));

    const obtenerUsuario = () => JSON.parse(localStorage.getItem("usuarioActivo")) || null;


    // CATEGORÍAS POR DEFECTO
    const categoriasPorDefecto = [
        {id: 1, nombre: "Bebidas", slug: "bebidas", img: "img/Categorias/bebidas.jpg"},
        {id: 2, nombre: "Snacks", slug: "snacks", img: "img/Categorias/abarrotes.jpg"},
        {id: 3, nombre: "Frutas y Verduras", slug: "frutas-verduras", img: "img/Categorias/abarrotes.jpg"},
        {id: 4, nombre: "Lácteos", slug: "lacteos", img: "img/Categorias/lacteos.jpg"},
        {id: 5, nombre: "Aceites", slug: "aceites", img: "img/Categorias/abarrotes_2.jpg"},
        {id: 6, nombre: "Granos y Harinas", slug: "granos-harina", img: "img/Categorias/granos.jpg"},
        {id: 7, nombre: "Embutidos", slug: "embutidos", img: "img/Categorias/Embutidos.jpg"},
        {id: 8, nombre: "Ofertas", slug: "ofertas", img: "img/Categorias/promociones.jpg"}
    ];

    if (!localStorage.getItem("categorias")) {
        guardarCategorias(categoriasPorDefecto);
    }


    // CAMBIO DE VISTAS
    function cambiarVista(vista) {

        botonesLaterales.forEach(b =>
            b.classList.toggle("activo", b.dataset.vista === vista)
        );

        tabsSuperiores.forEach(t =>
            t.classList.toggle("activo", t.dataset.vista === vista)
        );

        vistas.forEach(v =>
            v.classList.toggle("vista-activa", v.id === `vista-${vista}`)
        );
    }

    botonesLaterales.forEach(btn => {
        btn.addEventListener("click", () => cambiarVista(btn.dataset.vista));
    });

    tabsSuperiores.forEach(tab => {
        tab.addEventListener("click", () => cambiarVista(tab.dataset.vista));
    });


    // CERRAR SESIÓN
    if (btnSalirLateral) {
        btnSalirLateral.addEventListener("click", () => {
            localStorage.removeItem("usuarioActivo");
            window.location.href = "index.html";
        });
    }


    // CRUD CATEGORÍAS
    if (btnNuevaCategoria) {
        btnNuevaCategoria.addEventListener("click", () => abrirModalCategoria());
    }

    function abrirModalCategoria(data = null) {
        document.getElementById("overlayCategoria").classList.add("activo");

        document.getElementById("categoriaId").value = data ? data.id : "";
        document.getElementById("categoriaNombre").value = data ? data.nombre : "";
        document.getElementById("categoriaSlug").value = data ? data.slug : "";
        document.getElementById("categoriaImagenUrl").value = data ? data.img : "";

        const inputFile = document.getElementById("categoriaImagenArchivo");
        if (inputFile)
            inputFile.value = "";
    }

    document.querySelectorAll("[data-close-modal='categoria']").forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("overlayCategoria").classList.remove("activo");
        });
    });

    const formCategoria = document.getElementById("formCategoria");
    if (formCategoria) {
        formCategoria.addEventListener("submit", e => {
            e.preventDefault();

            let categorias = obtenerCategorias();

            const id = document.getElementById("categoriaId").value;
            const nombre = document.getElementById("categoriaNombre").value.trim();
            const slug = document.getElementById("categoriaSlug").value.trim();
            const img = document.getElementById("categoriaImagenUrl").value.trim();

            if (id) {
                categorias = categorias.map(c =>
                    c.id == id ? {id: Number(id), nombre, slug, img} : c
                );
            } else {
                const nuevoID = categorias.length ? Math.max(...categorias.map(c => c.id)) + 1 : 1;
                categorias.push({id: nuevoID, nombre, slug, img});
            }

            guardarCategorias(categorias);
            document.getElementById("overlayCategoria").classList.remove("activo");

            cargarCategorias();
            cargarProductos();
            cargarInventario();
        });
    }

    function cargarCategorias() {
        const categorias = obtenerCategorias();
        if (!tablaCategoriasBody)
            return;

        tablaCategoriasBody.innerHTML = "";

        categorias.forEach(cat => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>
                    <img src="${cat.img || ''}" class="img-mini" style="width:45px;height:45px;border-radius:8px;object-fit:cover;">
                </td>
                <td>${cat.nombre}</td>
                <td>${cat.slug}</td>
                <td>
                    <button class="accion-editar" onclick="editarCategoria(${cat.id})">Editar</button>
                    <button class="accion-eliminar" onclick="eliminarCategoria(${cat.id})">Eliminar</button>
                </td>
            `;
            tablaCategoriasBody.appendChild(fila);
        });
    }

    window.editarCategoria = id => {
        const categoria = obtenerCategorias().find(c => c.id === id);
        abrirModalCategoria(categoria);
    };

    window.eliminarCategoria = id => {
        const categorias = obtenerCategorias().filter(c => c.id !== id);
        guardarCategorias(categorias);
        cargarCategorias();
        cargarProductos();
        cargarInventario();
    };


    // =========================
    // CRUD PRODUCTOS
    // =========================
    if (btnNuevoProducto) {
        btnNuevoProducto.addEventListener("click", () => abrirModalProducto());
    }

    function abrirModalProducto(prod = null) {
        document.getElementById("overlayProducto").classList.add("activo");

        document.getElementById("productoId").value = prod ? prod.id : "";
        document.getElementById("productoNombre").value = prod ? prod.nombre : "";
        document.getElementById("productoCategoria").value = prod ? prod.categoria : "";
        document.getElementById("productoPrecio").value = prod ? prod.precio : "";
        document.getElementById("productoStock").value = prod ? prod.stock : "";

        document.getElementById("productoImagenUrl").value =
                prod ? prod.imagenPrincipal : "";

        document.getElementById("productoMiniaturas").value =
                prod && prod.miniaturas ? prod.miniaturas.join(", ") : "";

        document.getElementById("productoDescripcionBreve").value =
                prod ? prod.descripcionBreve : "";

        document.getElementById("productoDescripcionDetalles").value =
                prod ? prod.descripcionDetalles : "";

        const inputFile = document.getElementById("productoImagenArchivo");
        if (inputFile)
            inputFile.value = "";
    }

    document.querySelectorAll("[data-close-modal='producto']").forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("overlayProducto").classList.remove("activo");
        });
    });

    const formProducto = document.getElementById("formProducto");

    if (formProducto) {
        formProducto.addEventListener("submit", e => {
            e.preventDefault();

            let productos = obtenerProductos();

            const id = document.getElementById("productoId").value;
            const nombre = document.getElementById("productoNombre").value.trim();
            const categoria = document.getElementById("productoCategoria").value;
            const precio = Number(document.getElementById("productoPrecio").value);
            const stock = Number(document.getElementById("productoStock").value);

            const descripcionBreve = document.getElementById("productoDescripcionBreve").value.trim();
            const descripcionDetalles = document.getElementById("productoDescripcionDetalles").value.trim();

            const urlManual = document.getElementById("productoImagenUrl").value.trim();
            const miniaturasTexto = document.getElementById("productoMiniaturas").value.trim();

            let imagenPrincipal = urlManual;

            let miniaturas = [];
            if (miniaturasTexto) {
                miniaturas = miniaturasTexto.split(",").map(x => x.trim());
            }

            if (!miniaturas.length && imagenPrincipal) {
                miniaturas = [imagenPrincipal];
            }

            const nuevoProducto = {
                id: id ? Number(id) :
                        (productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1),
                nombre,
                categoria,
                precio,
                stock,
                imagenPrincipal,
                miniaturas,
                descripcionBreve,
                descripcionDetalles
            };

            if (id) {
                productos = productos.map(p => p.id == id ? nuevoProducto : p);
            } else {
                productos.push(nuevoProducto);
            }

            guardarProductos(productos);
            document.getElementById("overlayProducto").classList.remove("activo");

            cargarProductos();
            cargarInventario();
        });
    }


    function cargarProductos() {
        const productos = obtenerProductos();
        const categorias = obtenerCategorias();

        if (!tablaProductosBody)
            return;

        tablaProductosBody.innerHTML = "";

        productos.forEach(prod => {
            const cat = categorias.find(c => c.slug === prod.categoria);

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td><img src="${prod.imagenPrincipal || ""}" class="img-mini"></td>
                <td>${prod.nombre}</td>
                <td>${cat ? cat.nombre : prod.categoria}</td>
                <td>S/ ${prod.precio.toFixed(2)}</td>
                <td>${prod.stock}</td>
                <td>
                    <button class="accion-editar" onclick="editarProducto(${prod.id})">Editar</button>
                    <button class="accion-eliminar" onclick="eliminarProducto(${prod.id})">Eliminar</button>
                </td>
            `;

            tablaProductosBody.appendChild(fila);
        });

        const selectCategoria = document.getElementById("productoCategoria");
        if (selectCategoria) {
            selectCategoria.innerHTML =
                    categorias.map(c => `<option value="${c.slug}">${c.nombre}</option>`).join("");
        }
    }

    window.editarProducto = id => {
        const producto = obtenerProductos().find(p => p.id === id);
        abrirModalProducto(producto);
    };

    window.eliminarProducto = id => {
        const productos = obtenerProductos().filter(p => p.id !== id);
        guardarProductos(productos);
        cargarProductos();
        cargarInventario();
    };


    // =========================
    // INVENTARIO
    // =========================
    function cargarInventario() {
        const productos = obtenerProductos();
        const categorias = obtenerCategorias();

        if (!tablaInventarioBody)
            return;

        tablaInventarioBody.innerHTML = "";

        productos.forEach(prod => {
            const cat = categorias.find(c => c.slug === prod.categoria);

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${prod.nombre}</td>
                <td>${cat ? cat.nombre : prod.categoria}</td>
                <td>${prod.stock}</td>
                <td>
                    <button class="accion-editar" onclick="ajustarStock(${prod.id}, 1)">+</button>
                    <button class="accion-eliminar" onclick="ajustarStock(${prod.id}, -1)">-</button>
                </td>
            `;

            tablaInventarioBody.appendChild(fila);
        });
    }

    window.ajustarStock = (id, valor) => {
        let productos = obtenerProductos();

        productos = productos.map(p =>
            p.id !== id ? p :
                    {...p, stock: Math.max(0, p.stock + valor)}
        );

        guardarProductos(productos);
        cargarProductos();
        cargarInventario();
    };


    // =========================
    // PERFIL DEL ADMINISTRADOR
    // =========================
    const formPerfil = document.getElementById("formPerfilAdmin");

    function cargarPerfil() {
        const usuario = obtenerUsuario();

        if (!usuario)
            return;

        perfilNombre.value = usuario.nombre || "";
        perfilApellido.value = usuario.apellido || "";
        perfilCorreo.value = usuario.correo || "";
        perfilTelefono.value = usuario.telefono || "";
    }

    if (formPerfil) {
        formPerfil.addEventListener("submit", e => {
            e.preventDefault();

            const usuario = obtenerUsuario();
            if (!usuario)
                return;

            usuario.nombre = perfilNombre.value.trim();
            usuario.apellido = perfilApellido.value.trim();
            usuario.telefono = perfilTelefono.value.trim();

            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

            alert("Perfil actualizado correctamente");
        });
    }


    // =========================
    // INICIALIZACIÓN
    // =========================
    cargarCategorias();
    cargarProductos();
    cargarInventario();
    cargarPerfil();
    cambiarVista("productos");
});
