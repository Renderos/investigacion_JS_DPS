const productos = [
    { id: 1, nombre: "Control inalámbrico", precio: 10, cantidad: 5, imagen: "img/productoA.jpg" },
    { id: 2, nombre: "Auriculares gamer", precio: 20, cantidad: 3, imagen: "img/productoB.jpg" },
    { id: 3, nombre: "Combo teclado + mouse gamer", precio: 15, cantidad: 8, imagen: "img/productoC.jpg" }
];

let carrito = [];

function mostrarProductos() {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";
    productos.forEach(p => {
        contenedor.innerHTML += `
            <div class="producto" onclick="actualizarVistaPrevia('${p.imagen}')">
                <img src="${p.imagen}" alt="${p.nombre}">
                <span>${p.nombre} - $${p.precio} (Disponible: ${p.cantidad})</span>
                <button onclick="agregarAlCarrito(${p.id}, 1)">Agregar</button>
            </div>
        `;
    });
}

function actualizarVistaPrevia(imagen) {
    document.getElementById("imagen-previa").src = imagen;
}

function agregarAlCarrito(id, cantidad) {
    const producto = productos.find(p => p.id === id);
    if (producto && producto.cantidad >= cantidad) {
        const itemEnCarrito = carrito.find(p => p.id === id);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad += cantidad;
        } else {
            carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad });
        }
        producto.cantidad -= cantidad;
    } else {
        alert("Cantidad no disponible");
    }
    actualizarCarrito();
    mostrarProductos();
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex(p => p.id === id);
    if (index !== -1) {
        const producto = carrito[index];
        productos.find(p => p.id === id).cantidad += producto.cantidad;
        carrito.splice(index, 1);
    }
    actualizarCarrito();
    mostrarProductos();
}

function actualizarCarrito() {
    const contenedor = document.getElementById("carrito");
    contenedor.innerHTML = "";
    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        contenedor.innerHTML += `
            <div class="carrito-item">
                <span>${item.nombre} - ${item.cantidad} x $${item.precio} = $${subtotal}</span>
                <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            </div>
        `;
    });
    contenedor.innerHTML += `<h3>Total: $${total}</h3>`;
}

function generarFactura() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    let factura = "Factura:n";
    factura += "----------\n";
    factura += "Productos:\n";

    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        factura += `${item.nombre} - ${item.cantidad} x $${item.precio} = $${subtotal}\n`;
        total += subtotal;
    });
    factura += `----------\n`;
    factura += `Total: $${total}`;
    alert(factura);
    carrito = [];
    actualizarCarrito();
    mostrarProductos();
}

mostrarProductos();