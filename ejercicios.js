// ============================================
// DATOS BASE
// ============================================
const productos = [
    { nombre: "Laptop", precio: 1200, cantidad: 5 },
    { nombre: "Mouse", precio: 25, cantidad: 20 },
    { nombre: "Teclado", precio: 45, cantidad: 15 },
    { nombre: "Monitor", precio: 300, cantidad: 7 },
    { nombre: "USB", precio: 10, cantidad: 50 }
];

// ============================================
// FUNCIÓN PARA MOSTRAR RESULTADOS
// ============================================
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

// ============================================
// FUNCIONES PURAS (versión simple)
// ============================================

// Función para convertir a mayúsculas
const aMayusculas = (texto) => texto.toUpperCase();

// Función para extraer nombre
const extraerNombre = (producto) => producto.nombre;

// Función para calcular valor total
const calcularValorTotal = (producto) => producto.precio * producto.cantidad;

// Funciones de filtro
const precioMenor50 = (producto) => producto.precio < 50;
const cantidadMenor10 = (producto) => producto.cantidad < 10;
const cantidadMayor10 = (producto) => producto.cantidad > 10;
const esMonitor = (producto) => producto.nombre === "Monitor";

// ============================================
// EJERCICIO 1: Funcional
// ============================================
function ejercicio1() {
    // 1. Nombres en mayúscula
    const nombresMayuscula = productos
        .map(extraerNombre)
        .map(aMayusculas);
    
    mostrarResultado("Nombres en mayúscula", nombresMayuscula);
    
    // 2. Productos con precio menor a 50
    const productosBaratos = productos.filter(precioMenor50);
    mostrarResultado("Productos precio < 50", productosBaratos);
    
    // 3. Buscar Monitor
    const monitor = productos.find(esMonitor);
    mostrarResultado("Producto Monitor", monitor);
    
    // Producto que no existe
    const noExiste = productos.find(p => p.nombre === "Tablet");
    mostrarResultado("Buscando 'Tablet'", noExiste || "No existe");
}

// ============================================
// EJERCICIO 2: Funcional
// ============================================
function ejercicio2() {
    // Productos con bajo stock (cantidad < 10)
    const productosBajoStock = productos
        .filter(cantidadMenor10)
        .map(producto => ({
            nombre: producto.nombre,
            valorTotal: calcularValorTotal(producto)
        }));
    
    mostrarResultado("Productos con bajo stock", productosBajoStock);
    
    // Calcular total
    const totalBajoStock = productosBajoStock.reduce((total, producto) => {
        return total + producto.valorTotal;
    }, 0);
    
    mostrarResultado("Total valor bajo stock", totalBajoStock);
}

// ============================================
// EJERCICIO 3: Funcional
// ============================================
function ejercicio3() {
    // 1. Valor total del inventario
    const valorTotal = productos.reduce((total, producto) => {
        return total + calcularValorTotal(producto);
    }, 0);
    
    mostrarResultado("Valor total inventario", valorTotal);
    
    // 2. Producto con mayor cantidad
    const mayorStock = productos.reduce((max, producto) => {
        return producto.cantidad > max.cantidad ? producto : max;
    });
    
    mostrarResultado("Producto con mayor stock", mayorStock);
    
    // 3. Clasificar productos
    const clasificacion = productos.reduce((resultado, producto) => {
        if (producto.precio > 100) {
            resultado.caros.push(producto);
        } else {
            resultado.baratos.push(producto);
        }
        return resultado;
    }, { caros: [], baratos: [] });
    
    mostrarResultado("Clasificación por precio", clasificacion);
}

// ============================================
// RETO EXTRA: Solo reduce
// ============================================
function retoExtra() {
    const nombresMasDe10 = productos.reduce((lista, producto) => {
        if (producto.cantidad > 10) {
            lista.push(producto.nombre);
        }
        return lista;
    }, []);
    
    mostrarResultado("Productos con más de 10 unidades", nombresMasDe10);
}

// ============================================
// FUNCIONES ADICIONALES
// ============================================
function probarPipelines() {
    // Pipeline manual: filtrar productos caros con bajo stock
    const carosYBajoStock = productos
        .filter(p => p.precio > 100)
        .filter(p => p.cantidad < 10)
        .map(p => p.nombre);
    
    mostrarResultado("Productos caros con bajo stock", carosYBajoStock);
}

function probarOrdenamiento() {
    const ordenadosPorPrecio = [...productos].sort((a, b) => a.precio - b.precio);
    mostrarResultado("Productos ordenados por precio", ordenadosPorPrecio);
}
