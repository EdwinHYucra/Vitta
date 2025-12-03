//        VERSIONADO VITTA (Productos y Categorías)
const PRODUCTOS_VERSION = "1.9.1";      // cambia esto cuando actualices productosBase
const CATEGORIAS_VERSION = "1.9.1";     // cambia esto cuando actualices categoriasBase

//   INICIALIZAR CATALOGO SOLO SI ES NUEVO
//  O SI LA VERSIÓN ES DIFERENTE A LA ACTUAL
(function inicializarCatalogoVitta() {


    // CATEGORÍAS
    const versionCatGuardada = localStorage.getItem("categorias_version");
    

    if (!versionCatGuardada) {
        // No existen categorías → crearlas
        
        localStorage.setItem("categorias", JSON.stringify(categoriasBase));
        localStorage.setItem("categorias_version", CATEGORIAS_VERSION);
        console.log("Categorías base cargadas.");
    } else if (versionCatGuardada !== CATEGORIAS_VERSION) {
        
          // Limpia categorías
        localStorage.removeItem("categorias");

        // Limpia usuario activo SOLO AQUÍ
        localStorage.removeItem("usuarioActivo");
        // Versión antigua → reemplazar
        console.log("Categorías antiguas detectadas. Actualizando...");
        localStorage.setItem("categorias", JSON.stringify(categoriasBase));
        localStorage.setItem("categorias_version", CATEGORIAS_VERSION);
    } else {
        console.log("Categorías actuales ya están cargadas.");
    }

    // PRODUCTOS
    const versionProdGuardada = localStorage.getItem("productos_version");

    if (!versionProdGuardada) {
        // No existen productos → crearlos
        localStorage.setItem("productos", JSON.stringify(productosBase));
        localStorage.setItem("productos_version", PRODUCTOS_VERSION);
        console.log("Productos base cargados.");
    } 
    else if (versionProdGuardada !== PRODUCTOS_VERSION) {
        
        //Limpia productos
        localStorage.removeItem("productos");

        // Limpia usuario activo también aquí
        localStorage.removeItem("usuarioActivo");
        // Versión antigua → reemplazar
        console.log("Productos antiguos detectados. Actualizando...");
        localStorage.setItem("productos", JSON.stringify(productosBase));
        localStorage.setItem("productos_version", PRODUCTOS_VERSION);
    } 
    else {
        console.log("Productos actuales ya están cargados.");
    }

})();
