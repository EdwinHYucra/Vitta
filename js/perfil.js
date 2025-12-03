document.addEventListener("DOMContentLoaded", () => {
    // ===================== VALIDAR SESIÓN =====================
    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
        window.location.href = "login-register.html";
        return;
    }

    if (usuario.rol !== "cliente") {
        window.location.href = "admin.html";
        return;
    }
    const correoClave = usuario.correo;

    // ===================== UBIGEO =====================
    const UBIGEO = {
        "Lima": {
            "Lima": ["Miraflores", "San Juan de Lurigancho"],
            "Canta": ["Huaros", "San Buenaventura"]
        },
        "Arequipa": {
            "Arequipa": ["Miraflores", "Jacobo Hunter"],
            "Islay": ["Islay", "Mollendo"]
        },
        "Moquegua": {
            "Mariscal Nieto": ["Moquegua", "San Antonio"],
            "Ilo": ["Ilo", "Pacocha"]
        }
    };

    // ===================== ELEMENTOS DOM =====================
    const secciones = {
        personales: document.getElementById("seccion-personales"),
        direcciones: document.getElementById("seccion-direcciones"),
        configuracion: document.getElementById("seccion-configuracion")
    };

    const menuItems = document.querySelectorAll(".perfil-menu-item");

    const datoNombreCompleto = document.getElementById("datoNombreCompleto");
    const datoTipoDoc = document.getElementById("datoTipoDoc");
    const datoNumeroDoc = document.getElementById("datoNumeroDoc");
    const datoCelular = document.getElementById("datoCelular");
    const datoCorreo = document.getElementById("datoCorreo");

    const btnEditarDNI = document.getElementById("btnEditarDni");
    const listaDirecciones = document.getElementById("listaDirecciones");
    const btnAgregarDireccion = document.getElementById("btnAgregarDireccion");

    const overlayEdicion = document.getElementById("overlayEdicion");
    const tituloEdicion = document.getElementById("tituloEdicion");
    const formEdicion = document.getElementById("formEdicion");
    const cerrarPanelEdicion = document.getElementById("cerrarPanelEdicion");

    // ============================================================
    // ===================== FUNCIONES AUXILIARES =================
    // ============================================================
    function guardarUsuarioActual() {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const idx = usuarios.findIndex(u => u.correo === correoClave);

        if (idx !== -1) {
            usuarios[idx] = {...usuarios[idx], ...usuario};
        } else {
            usuarios.push(usuario);
        }
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    function obtenerDirecciones() {
        return JSON.parse(localStorage.getItem(`direcciones_${correoClave}`)) || [];
    }

    function guardarDirecciones(lista) {
        localStorage.setItem(`direcciones_${correoClave}`, JSON.stringify(lista));
    }

    // ============================================================
    // ===================== DATOS PERSONALES =====================
    // ============================================================
    function renderDatosPersonales() {
        const apeP = usuario.apePat || "";   // ahora toma el valor REAL del registro
        const apeM = usuario.apeMat || "";

        const nombreCompleto = `${usuario.nombre || ""} ${apeP} ${apeM}`.trim();


        datoNombreCompleto.textContent = nombreCompleto || "Sin nombre";

        datoTipoDoc.textContent = usuario.tipoDocumento || "DNI";
        datoNumeroDoc.textContent = usuario.numeroDocumento || "Sin registrar";

        datoCelular.textContent = usuario.telefono ? `+51 ${usuario.telefono}` : "Sin registrar";
        datoCorreo.textContent = usuario.correo || "Sin correo";
    }

    // ===================== EDITAR NOMBRE =====================
    function abrirEditarNombre() {
        tituloEdicion.textContent = "Editar nombre y apellidos";

        // Cargar apellidos REALES desde el registro
        let apeP = usuario.apePat || "";
        let apeM = usuario.apeMat || "";

        formEdicion.innerHTML = `
        <p class="ayuda-edicion">
            Modifica tus datos personales. Serán usados para tus compras y facturación.
        </p>

        <div class="campo-form">
            <label>Nombre</label>
            <input id="editarNombre" type="text" value="${usuario.nombre || ""}">
        </div>

        <div class="campo-form">
            <label>Apellido paterno</label>
            <input id="editarApeP" type="text" value="${apeP}">
        </div>

        <div class="campo-form">
            <label>Apellido materno</label>
            <input id="editarApeM" type="text" value="${apeM}">
        </div>

        <div class="panel-acciones">
            <button class="btn-secundario" id="btnCancelarEdicion">Cancelar</button>
            <button class="btn-primario">Guardar</button>
        </div>
    `;

        formEdicion.onsubmit = e => {
            e.preventDefault();

            const nombre = document.getElementById("editarNombre").value.trim();
            const apeP = document.getElementById("editarApeP").value.trim();
            const apeM = document.getElementById("editarApeM").value.trim();

            // Guardar cambios en usuario activo
            usuario.nombre = nombre;
            usuario.apePat = apeP;
            usuario.apeMat = apeM;

            guardarUsuarioActual();
            renderDatosPersonales();
            cerrarPanel();
        };

        formEdicion.querySelector("#btnCancelarEdicion").onclick = cerrarPanel;
        abrirPanel();
    }


// ===================== EDITAR DOCUMENTO =====================
    function abrirEditarDocumento() {
        tituloEdicion.textContent = usuario.numeroDocumento ? "Editar documento" : "Agregar documento";

        formEdicion.innerHTML = `
      <div class="campo-form">
        <label>Tipo de documento <span style="color:red">*</span></label>
        <select id="tipoDocSelect">
            <option value="">Seleccione</option>
            <option value="DNI">DNI</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Carné de Extranjería">Carné de Extranjería</option>
        </select>
      </div>

      <div class="campo-form">
        <label>Número de documento <span style="color:red">*</span></label>
        <input id="numDocInput" type="text" value="${usuario.numeroDocumento || ""}" placeholder="Ingresa tu documento">
      </div>

      <div class="panel-acciones">
        <button class="btn-secundario" id="btnCancelarEdicion">Cancelar</button>
        <button class="btn-primario">Guardar</button>
      </div>
    `;

        const tipoSelect = document.getElementById("tipoDocSelect");
        const numInput = document.getElementById("numDocInput");

        tipoSelect.value = usuario.tipoDocumento || "";

        // Validación dinámica
        numInput.addEventListener("input", () => {
            if (tipoSelect.value === "DNI") {
                numInput.value = numInput.value.replace(/[^0-9]/g, "").slice(0, 8);
            }
        });

        formEdicion.onsubmit = e => {
            e.preventDefault();

            if (!tipoSelect.value) {
                alert("Seleccione un tipo de documento.");
                return;
            }
            if (!numInput.value.trim()) {
                alert("Ingrese el número de documento.");
                return;
            }

            if (tipoSelect.value === "DNI" && numInput.value.length !== 8) {
                alert("El DNI debe tener 8 dígitos.");
                return;
            }

            usuario.tipoDocumento = tipoSelect.value;
            usuario.numeroDocumento = numInput.value.trim();

            guardarUsuarioActual();
            renderDatosPersonales();
            cerrarPanel();
        };

        formEdicion.querySelector("#btnCancelarEdicion").onclick = cerrarPanel;
        abrirPanel();
    }

    // ===================== EDITAR CELULAR =====================
    function abrirEditarCelular() {
        tituloEdicion.textContent = "Editar celular";

        formEdicion.innerHTML = `
      <p class="ayuda-edicion">
        Usaremos este número para avisos importantes sobre tus pedidos.
      </p>

      <div class="campo-form">
        <label>Número de celular</label>
        <input id="editarCelular" type="text" maxlength="9"
               value="${usuario.telefono || ""}" inputmode="numeric">
      </div>

      <div class="panel-acciones">
        <button class="btn-secundario" id="btnCancelarEdicion">Cancelar</button>
        <button class="btn-primario">Guardar</button>
      </div>
    `;

        const input = document.getElementById("editarCelular");

        input.addEventListener("input", () => {
            input.value = input.value.replace(/[^0-9]/g, "");
        });

        formEdicion.onsubmit = e => {
            e.preventDefault();

            usuario.telefono = input.value.trim();
            guardarUsuarioActual();
            renderDatosPersonales();
            cerrarPanel();
        };

        formEdicion.querySelector("#btnCancelarEdicion").onclick = cerrarPanel;
        abrirPanel();
    }

    // ====================== PANEL EDICIÓN ========================
    function abrirPanel() {
        overlayEdicion.classList.add("visible");
    }

    function cerrarPanel() {
        overlayEdicion.classList.remove("visible");
        formEdicion.innerHTML = "";
    }

    cerrarPanelEdicion.addEventListener("click", cerrarPanel);
    overlayEdicion.addEventListener("click", e => {
        if (e.target === overlayEdicion)
            cerrarPanel();
    });

    // ============================================================
    // =============== UBIGEO PARA EL FORMULARIO ==================
    // ============================================================
    function cargarSelectUbigeo(depId, provId, distId, datosPrevios = {}) {
        const depSelect = document.getElementById(depId);
        const provSelect = document.getElementById(provId);
        const distSelect = document.getElementById(distId);

        // Departamentos
        depSelect.innerHTML = `<option value="">Selecciona</option>`;
        Object.keys(UBIGEO).forEach(dep => {
            const opt = document.createElement("option");
            opt.value = dep;
            opt.textContent = dep.toUpperCase();
            depSelect.appendChild(opt);
        });

        function llenarProvincias() {
            provSelect.innerHTML = `<option value="">Selecciona</option>`;
            distSelect.innerHTML = `<option value="">Selecciona</option>`;

            const dep = depSelect.value;
            if (!dep)
                return;

            Object.keys(UBIGEO[dep]).forEach(prov => {
                const opt = document.createElement("option");
                opt.value = prov;
                opt.textContent = prov;
                provSelect.appendChild(opt);
            });

            if (datosPrevios.provincia && UBIGEO[dep][datosPrevios.provincia]) {
                provSelect.value = datosPrevios.provincia;
                llenarDistritos();
            }
        }

        function llenarDistritos() {
            distSelect.innerHTML = `<option value="">Selecciona</option>`;

            const dep = depSelect.value;
            const prov = provSelect.value;
            if (!dep || !prov)
                return;

            UBIGEO[dep][prov].forEach(dis => {
                const opt = document.createElement("option");
                opt.value = dis;
                opt.textContent = dis;
                distSelect.appendChild(opt);
            });

            if (datosPrevios.distrito && UBIGEO[dep][prov].includes(datosPrevios.distrito)) {
                distSelect.value = datosPrevios.distrito;
            }
        }

        depSelect.addEventListener("change", () => {
            datosPrevios = {}; // si cambia dep, ya no forzamos prov/dist previos
            llenarProvincias();
        });

        provSelect.addEventListener("change", () => {
            datosPrevios = {...datosPrevios, provincia: provSelect.value};
            llenarDistritos();
        });

        // Si estamos editando, cargamos valores previos
        if (datosPrevios.departamento && UBIGEO[datosPrevios.departamento]) {
            depSelect.value = datosPrevios.departamento;
            llenarProvincias();
    }
    }

    // ============================================================
    // ======================== DIRECCIONES ========================
    // ============================================================

    function formularioDireccion(dir = null, index = null) {
        const isEdit = !!dir;
        tituloEdicion.textContent = isEdit ? "Editar dirección" : "Agregar dirección";

        const nombrePrevio = dir?.nombre || "";
        const datosUbigeoPrevios = dir
                ? {
                    departamento: dir.departamento,
                    provincia: dir.provincia,
                    distrito: dir.distrito
                }
        : {};

        const referenciaPrev = dir?.referencia || "";
        const direccionPrev = dir?.direccion || "";
        const principalPrev = !!dir?.principal;

        formEdicion.innerHTML = `
      <div class="campo-form">
        <label>Nombre de la dirección (opcional)</label>
        <input id="dirNombre" type="text" placeholder="Mi casa, Trabajo"
               value="${nombrePrevio}">
      </div>

      <div class="campo-form">
        <label>Departamento</label>
        <select id="dirDepartamento"></select>
      </div>

      <div class="campo-form">
        <label>Provincia</label>
        <select id="dirProvincia">
          <option value="">Selecciona</option>
        </select>
      </div>

      <div class="campo-form">
        <label>Distrito</label>
        <select id="dirDistrito">
          <option value="">Selecciona</option>
        </select>
      </div>

      <div class="campo-form">
        <label>Dirección</label>
        <input id="dirExacta" type="text"
               placeholder="Ej: Av. Arequipa 123"
               value="${direccionPrev}">
      </div>

      <div class="campo-form">
        <label>Referencia (opcional)</label>
        <input id="dirReferencia" type="text"
               placeholder="Frente al parque, puerta negra, etc."
               value="${referenciaPrev}">
      </div>

      <div class="campo-form">
        <label class="checkbox-linea">
          <input id="dirPrincipal" type="checkbox" ${principalPrev ? "checked" : ""}>
          Guardar como dirección predeterminada.
        </label>
      </div>

      <div class="panel-acciones">
        <button class="btn-secundario" id="btnCancelarEdicion" type="button">Cancelar</button>
        <button class="btn-primario" type="submit">Guardar</button>
      </div>
    `;

        // Cargar select de ubigeo
        cargarSelectUbigeo("dirDepartamento", "dirProvincia", "dirDistrito", datosUbigeoPrevios);

        const inputNombre = document.getElementById("dirNombre");
        const depSelect = document.getElementById("dirDepartamento");
        const provSelect = document.getElementById("dirProvincia");
        const distSelect = document.getElementById("dirDistrito");
        const dirExacta = document.getElementById("dirExacta");
        const refInput = document.getElementById("dirReferencia");
        const chkPrincipal = document.getElementById("dirPrincipal");

        formEdicion.onsubmit = e => {
            e.preventDefault();

            if (!depSelect.value || !provSelect.value || !distSelect.value || !dirExacta.value.trim()) {
                alert("Completa departamento, provincia, distrito y dirección.");
                return;
            }

            let lista = obtenerDirecciones();

            const nuevaDireccion = {
                nombre: inputNombre.value.trim() || "Sin nombre",
                departamento: depSelect.value,
                provincia: provSelect.value,
                distrito: distSelect.value,
                direccion: dirExacta.value.trim(),
                referencia: refInput.value.trim(),
                principal: chkPrincipal.checked
            };

            let idx = index;

            if (isEdit && idx !== null) {
                lista[idx] = nuevaDireccion;
            } else {
                lista.push(nuevaDireccion);
                idx = lista.length - 1;
            }

            // Solo UNA principal
            if (chkPrincipal.checked) {
                lista = lista.map((d, i) => ({
                        ...d,
                        principal: i === idx
                    }));
            } else {
                // Si al final ninguna es principal, ponemos la primera como principal
                if (!lista.some(d => d.principal)) {
                    lista[0].principal = true;
                }
            }

            guardarDirecciones(lista);
            renderDirecciones();
            cerrarPanel();
        };

        formEdicion.querySelector("#btnCancelarEdicion").onclick = cerrarPanel;
        abrirPanel();
    }

    function renderDirecciones() {
        const direcciones = obtenerDirecciones();

        if (!direcciones.length) {
            listaDirecciones.innerHTML = `
            <p class="texto-suave">Aún no tienes direcciones registradas.</p>
        `;
            return;
        }

        listaDirecciones.innerHTML = direcciones
                .map((dir, index) => `
            
        <div class="tarjeta-direccion">

            <!-- CABECERA -->
            <div class="dir-header">

                <div class="dir-nombre-fila">

                    <!-- NOMBRE -->
                    <span class="dir-nombre">
                        ${dir.nombre && dir.nombre.trim() ? dir.nombre : "Sin nombre"}
                    </span>

                    <!-- PRINCIPAL AL LADO DEL NOMBRE -->
                    ${
                            dir.principal
                            ? `<span class="badge-principal">Principal</span>`
                            : ""
                            }
                </div>

                <!-- BOTONES -->
                <div class="dir-actions">
                    <button class="btn-editar-dir" data-index="${index}">Editar</button>
                    <button class="btn-eliminar-dir" data-index="${index}">Eliminar</button>
                </div>

            </div>

            <!-- DIRECCIÓN -->
            <div class="dir-linea">${dir.direccion}</div>

            <!-- UBICACIÓN -->
            <div class="dir-linea-sec">
                ${dir.distrito}, ${dir.provincia}, ${dir.departamento}
            </div>

            <!-- REFERENCIA -->
            ${
                            dir.referencia
                            ? `<div class="dir-linea-sec">${dir.referencia}</div>`
                            : ""
                            }

        </div>

        `)
                .join("");
    }

    // EDITAR DIRECCIÓN
    listaDirecciones.addEventListener("click", e => {
        const btn = e.target.closest("button");
        if (!btn)
            return;

        const idx = parseInt(btn.dataset.index, 10);
        if (Number.isNaN(idx))
            return;

        const lista = obtenerDirecciones();

        if (btn.classList.contains("btn-editar-dir")) {
            formularioDireccion(lista[idx], idx);
        } else if (btn.classList.contains("btn-eliminar-dir")) {
            if (confirm("¿Seguro que deseas eliminar esta dirección?")) {
                lista.splice(idx, 1);

                // Si se elimina la principal, poner otra como principal
                if (!lista.some(d => d.principal) && lista.length > 0) {
                    lista[0].principal = true;
                }

                guardarDirecciones(lista);
                renderDirecciones();
            }
        }
    });

    // AGREGAR DIRECCIÓN
    btnAgregarDireccion?.addEventListener("click", () => formularioDireccion());

    // ============================================================
    // ======================== MENÚ LATERAL ======================
    // ============================================================
    menuItems.forEach(btn => {
        btn.addEventListener("click", () => {
            const seccion = btn.dataset.seccion;

            if (seccion === "salir") {
                localStorage.removeItem("usuarioActivo");
                window.location.href = "index.html";
                return;
            }

            menuItems.forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");

            Object.keys(secciones).forEach(key => {
                secciones[key].classList.remove("activa");
            });

            if (secciones[seccion]) {
                secciones[seccion].classList.add("activa");
            }
        });
    });

// ===============================
//  CAMBIAR CONTRASEÑA (FORM SUBMIT)
// ===============================
    const formContrasena = document.getElementById("formContrasena");
    const inputPassActual = document.getElementById("passActual");
    const inputPassNueva = document.getElementById("passNueva");
    const inputPassConfirmar = document.getElementById("passConfirmar");

    formContrasena.addEventListener("submit", (e) => {
        e.preventDefault(); // ⛔ Detiene el submit tradicional

        const actual = inputPassActual.value.trim();
        const nueva = inputPassNueva.value.trim();
        const confirmar = inputPassConfirmar.value.trim();

        // Validar contraseña actual
        if (actual !== usuario.contrasena) {
            alert("❌ La contraseña actual es incorrecta.");
            return;
        }

        // Validar longitud de nueva contraseña
        if (nueva.length < 6) {
            alert("❌ La nueva contraseña debe tener al menos 6 caracteres.");
            return;
        }

        // Validar coincidencia
        if (nueva !== confirmar) {
            alert("❌ Las contraseñas nuevas no coinciden.");
            return;
        }

        // Actualizar contraseña
        usuario.contrasena = nueva;
        guardarUsuarioActual();

        alert("✔ Contraseña actualizada correctamente.");

        // Limpiar campos
        inputPassActual.value = "";
        inputPassNueva.value = "";
        inputPassConfirmar.value = "";
    });


    // ============================================================
    // ===================== INICIALIZACIÓN ========================
    // ============================================================
    renderDatosPersonales();
    renderDirecciones();

    // Botones de datos personales
    document
            .querySelector('[data-edit="nombre"]')
            .addEventListener("click", abrirEditarNombre);
    btnEditarDNI.addEventListener("click", abrirEditarDocumento);

    document
            .querySelector('[data-edit="celular"]')
            .addEventListener("click", abrirEditarCelular);
});
