/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.addEventListener("DOMContentLoaded", () => {
    const footerHTML = `
        <footer class="pie pie--suave">
            <div class="contenedor">

                <div class="bloques">

                    <section class="bloque">
                        <h4>Comunícate con nosotros</h4>
                        <ul class="lista puntos">
                            <li>
                                <a href="Contactanos.html"><strong>Contáctanos</strong></a><br>
                                <a href="mailto:Vitta@vittasac.com">Vitta@vittasac.com</a>
                            </li>
                            <li><strong>Llámanos</strong>: (054) 811 7795</li>
                        </ul>
                    </section>

                    <section class="bloque">
                        <h4>Síguenos</h4>
                        <ul class="lista puntos">
                            <li><a href="https://www.facebook.com/vitta.478367/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://www.instagram.com/vitta6117/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://x.com/Vitta5568" target="_blank" rel="noopener noreferrer">X</a></li>
                        </ul>
                    </section>

                    <section class="bloque">
                        <h4>Nosotros</h4>
                        <ul class="lista puntos">
                            <li><a href="Blog.html">Nuestro Blog</a></li>
                            <li><a href="Ayuda.html">Nuestras tiendas</a></li>
                            <li><a href="Libro-de-reclamos.html">Libro de Reclamaciones</a></li>
                        </ul>
                    </section>

                    <section class="bloque">
                        <h4>Atención al cliente</h4>
                        <ul class="lista puntos">
                            <li><a href="Ayuda.html">Preguntas frecuentes</a></li>
                            <li><a href="terminos-y-condiciones.html">Términos y condiciones</a></li>
                            <li><a href="politica-de-privacidad.html">Privacidad y datos</a></li>
                        </ul>
                    </section>

                </div>

                <div class="pie-legal">
                    <div>© 2025 Vitta — Todos los derechos reservados</div>
                    <div class="pagos">
                        <span class="pago">Tarjetas</span>
                        <span class="pago">Yape</span>
                        <span class="pago">Plin</span>
                        <span class="pago">Transferencia</span>
                    </div>
                </div>

            </div>
        </footer>
    `;

    document.body.insertAdjacentHTML("beforeend", footerHTML);
});


