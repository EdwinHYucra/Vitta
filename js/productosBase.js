// JS/productosBase.js

const categoriasBase = [
    { id: 1, nombre: "Bebidas", slug: "bebidas", img: "img/Categorias/bebidas.jpg" },
    { id: 2, nombre: "Snacks", slug: "snacks", img: "img/Categorias/Snacks.png" },
    { id: 3, nombre: "Frutas y Verduras", slug: "frutas-verduras", img: "img/Categorias/frutas_verduras.jpg" },
    { id: 4, nombre: "Lácteos", slug: "lacteos", img: "img/Categorias/lacteos.jpg" },
    { id: 5, nombre: "Aceites", slug: "aceites", img: "img/Categorias/aceites.png" },
    { id: 6, nombre: "Granos y Harinas", slug: "granos-harina", img: "img/Categorias/granos.png" },
    { id: 7, nombre: "Embutidos", slug: "embutidos", img: "img/Categorias/Embutidos.jpg" },
    { id: 8, nombre: "Ofertas", slug: "ofertas", img: "img/Categorias/Ofertas.jpg" }
];

// Productos iniciales (ejemplos, puedes ir agregando más)
const productosBase = [
    {
        id: 1,
        nombre: "Leche Sbelt 0% grasa",
        categoria: "lacteos",
        precio: 9.90,
        stock: 20,
        imagenPrincipal: "img/Productos/lacteos/LecheSbelt.svg", 
        miniaturas: [
            "img/Productos/lacteos/LecheSbelt2.svg",
            "img/Productos/lacteos/LecheSbelt2.svg",
            "img/Productos/lacteos/LecheSbelt3.svg"
        ],
        descripcionBreve: "Combo ideal para tu despensa: fresco, saludable y nutritivo.",
        descripcionDetalles: "Leche descremada UHT. 946 ml. Rica en calcio, sin grasa, ideal para dietas bajas en calorías."
    },
    {
        id: 2,
        nombre: "Agua Loa 1L",
        categoria: "bebidas",
        precio: 2.50,
        stock: 40,
        imagenPrincipal: "img/Productos/bebidas/AguaLoa.png",
        miniaturas: [
       
        ],
        descripcionBreve: "Agua de mesa ideal para tu día a día.",
        descripcionDetalles: "Botella de 1 litro. Agua de mesa tratada, perfecta para consumo diario y preparación de bebidas."
    },
    {
        id: 3,
        nombre: "Aceite Vegetal",
        categoria: "aceites",
        precio: 12.90,
        stock: 25,
        imagenPrincipal: "img/Productos/aceites/aceiteVegetal.png",
        miniaturas: [
            
        ],
        descripcionBreve: "Aceite vegetal ideal para freír y cocinar.",
        descripcionDetalles: "Aceite vegetal comestible. Ideal para frituras y preparaciones de cocina diaria."
    },
    {
        id: 4,
        nombre: "Arroz Costeño 5 kg",
        categoria: "granos-harina",
        precio: 19.90,
        stock: 15,
        imagenPrincipal: "img/Productos/granos_y_harina/ArrozCosteño.svg",
        miniaturas: [
            
        ],
        descripcionBreve: "Arroz blanco de grano largo para toda la familia.",
        descripcionDetalles: "Saco de 5 kg de arroz blanco de grano largo. Ideal para el consumo diario."
    },
    {
        id: 5,
        nombre: "Galletas Artesanales",
        categoria: "snacks",
        precio: 8.50,
        stock: 30,
        imagenPrincipal: "img/Productos/granos_y_harina/GalletasArtesanales.png",
        miniaturas: [
            
        ],
        descripcionBreve: "Galletas crocantes, ideales para compartir.",
        descripcionDetalles: "Galletas artesanales con ingredientes seleccionados. Perfectas para loncheras y snacks."
    },
    {
        id: 6,
        nombre: "Mermeladas Naturales",
        categoria: "ofertas",
        precio: 5.90,
        stock: 18,
        imagenPrincipal: "img/Productos/ofertas/MermeladasNaturales.png",
        miniaturas: [
            
        ],
        descripcionBreve: "Mermelada natural para tus desayunos.",
        descripcionDetalles: "Mermelada de frutas naturales, ideal para panes, tostadas y postres."
    },
    {
        id: 7,
        nombre: "Jamón Inglés",
        categoria: "embutidos",
        precio: 14.50,
        stock: 10,
        imagenPrincipal: "img/Productos/embutidos/jamonIngles.png",
        miniaturas: [
           
        ],
        descripcionBreve: "Jamón inglés listo para tus sánguches.",
        descripcionDetalles: "Jamón tipo inglés, listo para consumir. Ideal para sánguches y tablas."
    },
    {
        id: 8,
        nombre: "Leche Gloria Entera 1L",
        categoria: "lacteos",
        precio: 5.20,
        stock: 30,
        imagenPrincipal: "img/Productos/lacteos/leche-entera.png",
        miniaturas: [
            
        ],
        descripcionBreve: "Leche entera de alta calidad.",
        descripcionDetalles: "1 litro. Rica en nutrientes para toda la familia."
    },
    {
        id: 9,
        nombre: "Leche Light Gloria",
        categoria: "lacteos",
        precio: 4.90,
        stock: 20,
        imagenPrincipal: "img/Productos/lacteos/lechelight.png",
        miniaturas: [
            
        ],
        descripcionBreve: "Leche baja en grasa.",
        descripcionDetalles: "1 litro. Ideal para una dieta equilibrada."
    },
    {
        id: 10,
        nombre: "Yogurt Natural",
        categoria: "lacteos",
        precio: 8.40,
        stock: 18,
        imagenPrincipal: "img/Productos/lacteos/YougurtNatural.png",
        miniaturas: [
            
        ],
        descripcionBreve: "Yogurt natural saludable.",
        descripcionDetalles: "1 litro. Excelente fuente de probióticos."
    },
    { 
        id: 11, 
        nombre: "Refresco Coca-Cola 500ml", 
        categoria: "bebidas", 
        precio: 3.50, 
        stock: 50, 
        imagenPrincipal: "img/Productos/bebidas/cocacola500.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Refresco clásico para cualquier momento.", 
        descripcionDetalles: "Botella de 500ml. Ideal para acompañar comidas o disfrutar frío." 
    },
    { 
        id: 12, 
        nombre: "Jugo de Naranja 1L", 
        categoria: "bebidas", 
        precio: 6.20, stock: 35, 
        imagenPrincipal: "img/Productos/bebidas/jugoNaranja.webp", 
        miniaturas: [
                
        ], 
        descripcionBreve: "Jugo natural de naranja.", 
        descripcionDetalles: "1 litro de jugo natural, sin conservantes, perfecto para desayunos." 
    },
    { 
        id: 13, 
        nombre: "Gaseosa Inca Kola 1.5L", 
        categoria: "bebidas", 
        precio: 5.50, 
        stock: 40, 
        imagenPrincipal: "img/Productos/bebidas/incakola.webp", 
        miniaturas:[ 
               
        ], 
        descripcionBreve: "Sabor peruano clásico.", 
        descripcionDetalles: "Botella de 1.5 litros. Perfecta para compartir en reuniones familiares." 
    },
    { 
        id: 14, 
        nombre: "Papitas Lay's 140g", 
        categoria: "snacks", 
        precio: 5.00, 
        stock: 60, 
        imagenPrincipal: "img/Productos/granos_y_harina/papitasLays.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Papitas crujientes y deliciosas.", 
        descripcionDetalles: "Bolsa de 140g. Ideales para meriendas y reuniones." 
    },
    { 
        id: 15, 
        nombre: "Chocolates Hershey's 102g", 
        categoria: "snacks", 
        precio: 14.20, 
        stock: 45, 
        imagenPrincipal: "img/Productos/granos_y_harina/hersheys.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Chocolate clásico Hershey's.", 
        descripcionDetalles: "Caja de 102g. Dulce ideal para el antojo rápido." 
    },
    { 
        id: 16, 
        nombre: "Galletas Oreo 108g", 
        categoria: "snacks", 
        precio: 3.80, 
        stock: 70, 
        imagenPrincipal: "img/Productos/granos_y_harina/oreo.jpeg", 
        miniaturas: [
            "img/Productos/granos_y_harina/oreo2.webp"
        ], 
        descripcionBreve: "Galletas rellenas clásicas.",
        descripcionDetalles: "Paquete de 108g. Perfectas para compartir o acompañar leche." 
    },
    { 
        id: 17, 
        nombre: "Manzana Red Delicious 1kg", 
        categoria: "frutas-verduras", 
        precio: 6.50, 
        stock: 25, 
        imagenPrincipal: "img/Productos/frutas_y_verduras/manzana.webp", 
        miniaturas: [
           
        ], 
        descripcionBreve: "Manzanas dulces y jugosas.", 
        descripcionDetalles: "1 kg de manzanas Red Delicious. Ideal para snacks y ensaladas." 
    },
    { 
        id: 18, 
        nombre: "Banana 1kg", 
        categoria: "frutas-verduras", 
        precio: 4.20, 
        stock: 30, 
        imagenPrincipal: "img/Productos/frutas_y_verduras/banana.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Bananas frescas y nutritivas.", 
        descripcionDetalles: "1 kg de bananas maduras, ricas en potasio." 
    },
    { 
        id: 19, 
        nombre: "Tomate 1kg", 
        categoria: "frutas-verduras", 
        precio: 5.00, 
        stock: 28, 
        imagenPrincipal: "img/Productos/frutas_y_verduras/tomate.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Tomates frescos para ensaladas.", 
        descripcionDetalles: "1 kg de tomates frescos y jugosos. Perfectos para salsas y ensaladas." 
    },
    { 
        id: 20, 
        nombre: "Lechuga Crespa BELL'S", 
        categoria: "frutas-verduras", 
        precio: 3.50, 
        stock: 20, 
        imagenPrincipal: "img/Productos/frutas_y_verduras/lechuga.webp", 
        miniaturas: [
           
        ], 
        descripcionBreve: "Lechuga fresca para ensaladas.", 
        descripcionDetalles: "Una unidad de lechuga fresca, crujiente y saludable."
    },
    { 
        id: 21, 
        nombre: "Queso Mozzarella en bola GLORIA 250g", 
        categoria: "lacteos", 
        precio: 12.00, 
        stock: 22, 
        imagenPrincipal: "img/Productos/lacteos/quesoMozzarella.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Queso fresco y suave.", 
        descripcionDetalles: "250g de queso mozzarella, ideal para pizzas y gratinados." 
    },
    { 
        id: 22, 
        nombre: "Queso Parmesano PIAMONTE 200g", 
        categoria: "lacteos", 
        precio: 28.50, 
        stock: 18, 
        imagenPrincipal: "img/Productos/lacteos/quesoParmesano.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Queso parmesano rallado.", 
        descripcionDetalles: "200g de queso parmesano rallado, ideal para pasta y ensaladas." 
    },
    { 
        id: 23, 
        nombre: "Yogurt Fresa DANLAC 900g", 
        categoria: "lacteos", 
        precio: 9.00, 
        stock: 15, 
        imagenPrincipal: "img/Productos/lacteos/yogurtFresa.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Yogurt sabor fresa natural.", 
        descripcionDetalles: "900 g de yogurt con sabor a fresa, saludable y delicioso." 
    },
    {
        id: 24, 
        nombre: "Margarina SELLO DE ORO 200g", 
        categoria: "lacteos", 
        precio: 4.20, 
        stock: 20, 
        imagenPrincipal: "img/Productos/lacteos/mantequilla.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Mantequilla con sal para cocinar.", 
        descripcionDetalles: "200g de margarina, ideal para repostería y panadería." 
    },
    { 
        id: 25, 
        nombre: "Aceite de Oliva Extra Virgen BELL'S 500ml", 
        categoria: "aceites", 
        precio: 25.50, 
        stock: 15, 
        imagenPrincipal: "img/Productos/aceites/aceiteOliva.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Aceite de oliva extra virgen.", 
        descripcionDetalles: "Botella de 500ml. Ideal para ensaladas, aderezos y cocina gourmet." 
    },
    { 
        id: 26, 
        nombre: "Aceite de Girasol BELL'S 900ml", 
        categoria: "aceites", 
        precio: 7.00, 
        stock: 20, 
        imagenPrincipal: "img/Productos/aceites/aceiteGirasol.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Aceite vegetal para freír.", 
        descripcionDetalles: "Botella de 900ml, ideal para frituras y cocina diaria." 
    },
    { 
        id: 27, 
        nombre: "Harina de Trigo Preparada BLANCA FLOR 1kg", 
        categoria: "granos-harina", 
        precio: 8.80, 
        stock: 25, 
        imagenPrincipal: "img/Productos/granos_y_harina/harinaTrigo.webp", 
        miniaturas: [
            "img/Productos/granos_y_harina/harinaTrigo2.webp",
            "img/Productos/granos_y_harina/harinaTrigo3.webp",
            "img/Productos/granos_y_harina/harinaTrigo4.webp"
        ], 
        descripcionBreve: "Harina de trigo preparada.", 
        descripcionDetalles: "1 kg de harina de trigo, ideal para repostería y panadería." 
    },
    { 
        id: 28, 
        nombre: "Harina Integral GRANO DE ORO 1kg", 
        categoria: "granos-harina", 
        precio: 5.20, 
        stock: 20, 
        imagenPrincipal: "img/Productos/granos_y_harina/harinaIntegral.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Harina integral saludable.", 
        descripcionDetalles: "1 kg de harina integral, ideal para recetas saludables." 
    },
    { 
        id: 29, 
        nombre: "Arroz Integral BELL'S 5kg", 
        categoria: "granos-harina", 
        precio: 22.50, 
        stock: 18, 
        imagenPrincipal: "img/Productos/granos_y_harina/arrozIntegral.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Arroz integral nutritivo.", 
        descripcionDetalles: "Saco de 5 kg. Rico en fibra y vitaminas." 
    },
    { 
        id: 30, 
        nombre: "Lentejas COSTEÑO 500g", 
        categoria: "granos-harina", 
        precio: 6.00, 
        stock: 25, 
        imagenPrincipal: "img/Productos/granos_y_harina/lentejas.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Lentejas secas de alta calidad.", 
        descripcionDetalles: "500 g de lentejas, ideal para sopas y guisos nutritivos." 
    },
    { 
        id: 31, 
        nombre: "Jamón de Pavo BRAEDT 200g", 
        categoria: "embutidos", 
        precio: 10.50, 
        stock: 12, 
        imagenPrincipal: "img/Productos/embutidos/jamonPavo.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Jamón de pavo bajo en grasa.", 
        descripcionDetalles: "200g de jamón de pavo, listo para consumir en sándwiches." 
    },
    { 
        id: 32, 
        nombre: "Salchicha San Fernando 500g", 
        categoria: "embutidos", 
        precio: 8.00, 
        stock: 20, 
        imagenPrincipal: "img/Productos/embutidos/salchichaSanFernando.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Salchichas listas para cocinar.", 
        descripcionDetalles: "Paquete de 500g, ideal para comidas rápidas." 
    },
    { 
        id: 33, 
        nombre: "Chorizo Español OTTO KUNZ 100g", 
        categoria: "embutidos", 
        precio: 21.80, 
        stock: 10, 
        imagenPrincipal: "img/Productos/embutidos/chorizo.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Chorizo español.", 
        descripcionDetalles: "100g de chorizo curado, perfecto para tapas y sándwiches." 
    },
    { 
        id: 34, 
        nombre: "Sal con Pimienta 1k", 
        categoria: "ofertas", 
        precio: 2.50, 
        stock: 50, 
        imagenPrincipal: "img/Productos/ofertas/salPimienta.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Condimento esencial para tus comidas.", 
        descripcionDetalles: "Botella 1 kilo, ideal para sazonar carnes y verduras." 
    },
    { 
        id: 35, 
        nombre: "Azúcar Blanca DULFINA 1kg", 
        categoria: "ofertas", 
        precio: 5.00, 
        stock: 40, 
        imagenPrincipal: "img/Productos/ofertas/azucar.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Azúcar refinada para todo uso.", 
        descripcionDetalles: "1 kg de azúcar blanca, ideal para repostería y bebidas." 
    },
    { 
        id: 36, 
        nombre: "Café Tostado Molido ALTOMAYO 450g", 
        categoria: "ofertas", 
        precio: 35.00, 
        stock: 25, 
        imagenPrincipal: "img/Productos/ofertas/cafeMolido.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Café molido de aroma intenso.", 
        descripcionDetalles: "450g de café tostado molido, ideal para preparar espresso o café filtrado." 
    },
    { 
        id: 37, 
        nombre: "Té Verde WAWASANA  50g", 
        categoria: "ofertas", 
        precio: 15.50, 
        stock: 30, 
        imagenPrincipal: "img/Productos/ofertas/teVerde.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Té verde natural y saludable.", 
        descripcionDetalles: "Caja 50g de té verde en hojas sueltas, ideal para infusiones diarias." 
    },
    { 
        id: 38,
        nombre: "Galletas María sin Gluten NOGLUT 210g", 
        categoria: "snacks", 
        precio: 18.50, 
        stock: 35, 
        imagenPrincipal: "img/Productos/granos_y_harina/galletasMaria.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Galletas clásicas para acompañar bebidas.", 
        descripcionDetalles: "Paquete de 210g sin gluten, ideal para desayunos y meriendas." 
    },
    { 
        id: 39, 
        nombre: "Barritas de Cereal COSTA 12un",
        categoria: "snacks", 
        precio: 10.00, 
        stock: 40, 
        imagenPrincipal: "img/Productos/granos_y_harina/barritasCereal.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Barritas de cereal energéticas.", 
        descripcionDetalles: "Paquete de 12 unidades, perfecto para snacks saludables y rápidos." 
    },
    { 
        id: 40, 
        nombre: "Papaya 1kg", 
        categoria: "frutas-verduras", 
        precio: 7.20, 
        stock: 20, 
        imagenPrincipal: "img/Productos/frutas_y_verduras/papaya.webp",
        miniaturas: [
            
        ], 
        descripcionBreve: "Papaya dulce y jugosa.", 
        descripcionDetalles: "1 kg de papaya fresca, ideal para desayunos y licuados." 
    },
    { 
        id: 41, 
        nombre: "Piña 1kg", 
        categoria: "frutas-verduras", 
        precio: 6.80, 
        stock: 22, 
        imagenPrincipal: "img/Productos/frutas_y_verduras/pina.webp", 
        miniaturas: [
           
        ], 
        descripcionBreve: "Piña tropical fresca.", 
        descripcionDetalles: "1 kg de piña, perfecta para jugos y postres." 
    },
    { 
        id: 42, 
        nombre: "Pepinillo 1kg", 
        categoria: "frutas-verduras", 
        precio: 4.00, 
        stock: 25, 
        imagenPrincipal: "img/Productos/frutas_y_verduras/pepinillo.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Pepino fresco para ensaladas.", 
        descripcionDetalles: "1 kg de pepinillo, ideal para ensaladas y snacks saludables." 
    },
    { 
        id: 43, 
        nombre: "Zanahoria 1kg", 
        categoria: "frutas-verduras", 
        precio: 5.50, 
        stock: 30, 
        imagenPrincipal: "img/Productos/frutas_y_verduras/zanahoria.jpeg", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Zanahorias frescas y nutritivas.", 
        descripcionDetalles: "1 kg de zanahorias, perfectas para ensaladas, jugos y guisos." 
    },
    { 
        id: 44, 
        nombre: "Queso Fresco GLORIA 1k", 
        categoria: "lacteos", 
        precio: 6.50, 
        stock: 18, 
        imagenPrincipal: "img/Productos/lacteos/quesoFresco.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Queso fresco tradicional.", 
        descripcionDetalles: "200g de queso fresco, ideal para sándwiches y ensaladas." 
    },
    { 
        id: 45, 
        nombre: "Crema de Leche NESTLË 300g", 
        categoria: "lacteos", 
        precio: 5.00, 
        stock: 20, 
        imagenPrincipal: "img/Productos/lacteos/cremaLeche.webp", 
        miniaturas: [
            "img/Productos/lacteos/cremaLeche2.webp",
            "img/Productos/lacteos/cremaLeche3.webp"
        ], 
        descripcionBreve: "Crema de leche para repostería.", 
        descripcionDetalles: "300g de crema de leche, perfecta para postres y preparaciones culinarias." 
    },
    { 
        id: 46, 
        nombre: "Manteca de Cerdo PALMA TROPICAL 200g", 
        categoria: "lacteos", 
        precio: 6.80, 
        stock: 15, 
        imagenPrincipal: "img/Productos/lacteos/mantecaCerdo.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Manteca ideal para cocinar.", 
        descripcionDetalles: "200g de manteca de cerdo, perfecta para freír y repostería." 
    },
    { 
        id: 47, 
        nombre: "Aceitunas Negras 240g", 
        categoria: "ofertas", 
        precio: 7.50, 
        stock: 25, 
        imagenPrincipal: "img/Productos/ofertas/aceitunas.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Aceitunas negras de alta calidad.", 
        descripcionDetalles: "240g de aceitunas negras, ideal para ensaladas y pizzas." 
    },
    { 
        id: 48, 
        nombre: "Vinagre de Manzana ACAVILLE 500ml", 
        categoria: "ofertas", 
        precio: 16.00, 
        stock: 20, 
        imagenPrincipal: "img/Productos/ofertas/vinagreManzana.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Vinagre natural de manzana.", 
        descripcionDetalles: "Botella de 500ml, ideal para aderezos y salud digestiva." 
    },
    { 
        id: 49, 
        nombre: "Salsa de Tomate POMAROLA 290g", 
        categoria: "ofertas", 
        precio: 4.50, 
        stock: 30, 
        imagenPrincipal: "img/Productos/ofertas/salsaTomate.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Salsa de tomate lista para usar.", 
        descripcionDetalles: "290g de salsa de tomate, ideal para pastas, pizzas y guisos." 
    },
    { 
        id: 50, 
        nombre: "Mostaza LIBBY'S 200g", 
        categoria: "ofertas", 
        precio: 3.80, 
        stock: 25, 
        imagenPrincipal: "img/Productos/ofertas/mostaza.webp", 
        miniaturas: [
            
        ], 
        descripcionBreve: "Mostaza clásica para tus comidas.", 
        descripcionDetalles: "200g de mostaza amarilla, ideal para aderezos y sándwiches." 
    }
];
