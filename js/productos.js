const productos = [
    {
        id: 1,
        nombre: "GANANCIA MUSCULAR",
        descripcion:"" ,
        
        tipoPlan: "Personalizado",
        imagen: "imagenes/hanna.jpeg",
        multimedia: '<img src="imagenes/ganan.jpeg" style="width:100%; margin-top:10px; border-radius: 6px;">'
    },
    {
        id: 2,
        nombre: "DESCENSO DE PESO",
        descripcion: "",
        tipoPlan: "Personalizado",
        imagen: "imagenes/tyson.jpeg",
        multimedia: '<img src="imagenes/des.jpeg" style="width:100%; margin-top:10px; border-radius: 6px;">'
    },
    {
        id: 3,
        nombre: "DEPORTES",
        descripcion: "",
        tipoPlan: "Personalizado",
        imagen: "imagenes/perla.jpeg",
        multimedia: '<img src="imagenes/dep.jpeg" style="width:100%; margin-top:10px; border-radius: 6px;">'
    },

    {
        id: 4,
        nombre: "LESIONES",
        descripcion: "",
        tipoPlan: "Personalizado",
        imagen: "imagenes/panchita.jpeg",
        multimedia: '<img src="imagenes/les.jpeg" style="width:100%; margin-top:10px; border-radius: 6px;">'
    },
    {
        id: 5,
        nombre: "NIÑOS",
        descripcion: "",
        tipoPlan: "Personalizado",
        imagen: "imagenes/malakqh.jpeg",
        multimedia: '<img src="imagenes/niñ.jpeg" style="width:100%; margin-top:10px; border-radius: 6px;">'
    },
    {
        id: 6,
        nombre: "NO PERSONALIZADO",
        descripcion: "Los entrenamientos libres te permiten entrenar a tu ritmo con acceso total al espacio.",
        tipoPlan: "noPersonalizado",
        imagen: "imagenes/juana.png",
    }
];


let carrito = [];
let productoSeleccionado = null;

// Renderizar tarjetas al cargar
window.onload = function () {
    const contenedor = document.getElementById("productosContainer");

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.className = `producto-card ${producto.tipoPlan === "Personalizado" ? "personalizado" : "no-personalizado"}`;
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100%; border-radius:8px; margin-bottom: 10px;">
            <h4>${producto.nombre}</h4>
            <div class="botones-producto">
                <button class="ver-detalles" onclick="abrirModalDetalle(${producto.id})">Ver detalles</button>
                <button class="agregar-carrito" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;

        contenedor.appendChild(card);
    });
};


// Mostrar modal con detalle del producto
function abrirModalDetalle(id) {
    const producto = productos.find(p => p.id === id);
    productoSeleccionado = producto;

    document.getElementById("modalNombre").innerText = producto.nombre;
    document.getElementById("modalDescripcion").innerHTML = `
        <p>${producto.descripcion}</p>
        ${producto.multimedia || ""}
    `;
    document.getElementById("modalDetalle").style.display = "flex";
}


// Cerrar modal
function cerrarModal() {
    document.getElementById("modalDetalle").style.display = "none";
}

// Agregar producto desde modal
function agregarAlCarritoDesdeModal() {
    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        alert(`${productoSeleccionado.nombre} agregado al carrito`);
        cerrarModal();
    }
}


// Agregar producto desde botón directo
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);

        // Si el panel ya está abierto, actualiza el contenido
        const panel = document.getElementById("panelCarrito");
        if (panel.classList.contains("abierto")) {
            verCarrito();
        } else {
            alert(`${producto.nombre} agregado al carrito`);
        }
    }
}


// Mostrar carrito
function verCarrito() {
    const lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = "<li>El carrito está vacío.</li>";
    } else {
        carrito.forEach((prod, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${prod.nombre}
                <button onclick="eliminarDelCarrito(${index})" class="btn-eliminar">❌</button>
            `;
            lista.appendChild(li);
        });
    }

    const contienePersonalizado = carrito.some(p => p.tipoPlan === "Personalizado");

    if (contienePersonalizado) {
        document.getElementById("formularioPersonalizado").style.display = "block";
        document.getElementById("formularioFrecuencia").style.display = "none";
    } else {
        document.getElementById("formularioPersonalizado").style.display = "none";
        document.getElementById("formularioFrecuencia").style.display = "block";
    }

    document.getElementById("panelCarrito").classList.add("abierto");
    document.getElementById("overlayCarrito").classList.add("mostrar");
}




function cerrarPanel() {
    document.getElementById("panelCarrito").classList.remove("abierto");
}

// Vaciar carrito / cancelar compra
function cancelarCompra() {
    carrito = [];
    cerrarPanel();
    alert("El carrito ha sido vaciado.");
}

// Mostrar campo extra según opción
function toggleDetalle(selectElement, inputId) {
    const input = document.getElementById(inputId);
    input.style.display = selectElement.value === "Sí" ? "block" : "none";
}

function actualizarPrecio() {
    let frecuencia = "";
    let precioDiv = null;

    const formularioPersonalizadoVisible = document.getElementById("formularioPersonalizado").style.display === "block";
    const formularioFrecuenciaVisible = document.getElementById("formularioFrecuencia").style.display === "block";

    if (formularioPersonalizadoVisible) {
        frecuencia = document.querySelector("#formularioPersonalizado select[name='frecuencia']").value;
        precioDiv = document.getElementById("precioPlanPersonalizado");
    } else if (formularioFrecuenciaVisible) {
        frecuencia = document.querySelector("#formularioFrecuencia select[name='frecuenciaSimple']").value;
        precioDiv = document.getElementById("precioPlanSimple");
    }

    let precioTexto = "";
    const contienePersonalizado = carrito.some(p => p.tipoPlan === "Personalizado");

    if (contienePersonalizado) {
        switch (frecuencia) {
            case "2 veces":
                precioTexto = "💰 Costo: $15.000 (personalizado)";
                break;
            case "3 veces":
                precioTexto = "💰 Costo: $17.000 (personalizado)";
                break;
            case "Pase libre":
                precioTexto = "💰 Costo: $20.000 (personalizado)";
                break;
            default:
                precioTexto = "";
        }
    } else {
        switch (frecuencia) {
            case "2 veces":
                precioTexto = "💰 Costo: $13.000 (no personalizado)";
                break;
            case "3 veces":
                precioTexto = "💰 Costo: $15.000 (no personalizado)";
                break;
            case "Pase libre":
                precioTexto = "💰 Costo: $17.000 (no personalizado)";
                break;
            default:
                precioTexto = "";
        }
    }

    if (precioDiv) {
        precioDiv.textContent = precioTexto;
    }
}


// Enviar datos por WhatsApp
function finalizarCompra() {
    const form = document.forms["formEncuesta"];
    const datos = {
        nombre: form["nombre"].value,
        edad: form["edad"].value,
        lesiones: form["lesiones"].value,
        detalleLesiones: form["detalleLesiones"].value,
        enfermedades: form["enfermedades"].value,
        detalleEnfermedades: form["detalleEnfermedades"].value,
        deporte: form["deporte"].value,
        detalleDeporte: form["detalleDeporte"].value,
        datosExtra: form["datosExtra"].value,
        frecuencia: form["frecuencia"].value,
        objetivo: form["objetivo"].value
    };

    const productosTexto = carrito.map(p => `- ${p.nombre}`).join("\n");

    const mensaje = `Hola! Estoy interesado en estos productos:
${productosTexto}

Aquí está mi información:
- Nombre: ${datos.nombre}
- Edad: ${datos.edad}
- Lesiones: ${datos.lesiones}${datos.lesiones === "Sí" ? " - " + datos.detalleLesiones : ""}
- Enfermedades: ${datos.enfermedades}${datos.enfermedades === "Sí" ? " - " + datos.detalleEnfermedades : ""}
- Deporte: ${datos.deporte}${datos.deporte === "Sí" ? " - " + datos.detalleDeporte : ""}
- Datos adicionales: ${datos.datosExtra}
- Frecuencia de entrenamiento: ${datos.frecuencia}
- Objetivo: ${datos.objetivo}`;

    const whatsappLink = `https://wa.me/5493874654202?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappLink, "_blank");
}


// Eliminar un producto por índice
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    verCarrito(); // volver a renderizar la lista
}

