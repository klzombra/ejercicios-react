// Datos base
const productos = [
    { nombre: "Laptop", precio: 1200, cantidad: 5 },
    { nombre: "Mouse", precio: 25, cantidad: 20 },
    { nombre: "Teclado", precio: 45, cantidad: 15 },
    { nombre: "Monitor", precio: 300, cantidad: 7 },
    { nombre: "USB", precio: 10, cantidad: 50 }
];

// Función para mostrar resultados
function mostrarResultado(titulo, datos) {
    const output = document.getElementById('output');
    let contenidoActual = output.textContent;
    
    if (contenidoActual === "Presiona un botón para ver los resultados...") {
        contenidoActual = "";
    }
    
    const nuevoContenido = contenidoActual + `\n📌 ${titulo}:\n${JSON.stringify(datos, null, 2)}\n${"═".repeat(50)}\n`;
    output.textContent = nuevoContenido;
}

function limpiar() {
    document.getElementById('output').textContent = "Presiona un botón para ver los resultados...";
}

// Ejercicio 1: Operaciones básicas
function ejercicio1() {
    // 1. Map - Nombres en mayúscula
    const nombresMayuscula = productos.map(p => p.nombre.toUpperCase());
    mostrarResultado("Nombres en mayúscula (map)", nombresMayuscula);
    
    // 2. Filter - Productos con precio menor a 50
    const productosBaratos = productos.filter(p => p.precio < 50);
    mostrarResultado("Productos con precio < 50 (filter)", productosBaratos);
    
    // 3. Find - Buscar producto "Monitor"
    const monitor = productos.find(p => p.nombre === "Monitor");
    mostrarResultado("Producto 'Monitor' (find)", monitor);
    
    // Pregunta adicional
    const noExiste = productos.find(p => p.nombre === "Tablet");
    mostrarResultado("Buscando 'Tablet' (producto no existe)", noExiste || "undefined - El producto no existe");
}

// Ejercicio 2: Análisis del inventario
function ejercicio2() {
    // Filtrar productos con cantidad < 10 y calcular valor total
    const productosBajoStock = productos
        .filter(p => p.cantidad < 10)
        .map(p => ({
            nombre: p.nombre,
            valorTotal: p.precio * p.cantidad
        }));
    mostrarResultado("Productos con bajo stock (filter + map)", productosBajoStock);
    
    // Calcular valor total usando reduce
    const valorTotalBajoStock = productosBajoStock.reduce((acc, p) => acc + p.valorTotal, 0);
    mostrarResultado("Valor total de productos con bajo stock (reduce)", valorTotalBajoStock);
}

// Ejercicio 3: Uso avanzado de reduce
function ejercicio3() {
    // 1. Valor total del inventario
    const valorTotalInventario = productos.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    mostrarResultado("Valor total del inventario", valorTotalInventario);
    
    // 2. Producto con mayor cantidad en stock
    const productoMayorStock = productos.reduce((max, p) => (p.cantidad > max.cantidad) ? p : max);
    mostrarResultado("Producto con mayor stock", productoMayorStock);
    
    // 3. Clasificar productos en caros (>100) y baratos (≤100)
    const clasificacionPrecios = productos.reduce((acc, p) => {
        if (p.precio > 100) {
            acc.caros.push(p);
        } else {
            acc.baratos.push(p);
        }
        return acc;
    }, { caros: [], baratos: [] });
    mostrarResultado("Clasificación por precio", clasificacionPrecios);
}

// Reto extra: Usando solo reduce
function retoExtra() {
    const nombresMasDe10 = productos.reduce((acc, p) => {
        if (p.cantidad > 10) {
            acc.push(p.nombre);
        }
        return acc;
    }, []);
    mostrarResultado("Productos con más de 10 unidades (solo reduce)", nombresMasDe10);
}
