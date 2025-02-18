const productos = [
    { id: 1, nombre: "Producto A", precio: 10, cantidad: 5 },
    { id: 2, nombre: "Producto B", precio: 20, cantidad: 3 },
    { id: 3, nombre: "Producto C", precio: 15, cantidad: 8 }
];

let carrito = [];

function mostrarProductos() {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";
    productos.forEach(p => {
        contenedor.innerHTML += `
            <div class="producto">
                <span>${p.nombre} - $${p.precio} (Disponible: ${p.cantidad})</span>
                <button onclick="agregarAlCarrito(${p.id}, 1)">Agregar</button>
            </div>
        `;
    });
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
    let factura = "Factura:\n";
    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        factura += `${item.nombre} - ${item.cantidad} x $${item.precio} = $${subtotal}\n`;
        total += subtotal;
    });
    factura += `Total: $${total}`;
    alert(factura);
    carrito = [];
    actualizarCarrito();
    mostrarProductos();
}

mostrarProductos();
