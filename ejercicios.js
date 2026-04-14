// ============================================
// DATOS BASE (inmutables)
// ============================================
const productos = [
    { nombre: "Laptop", precio: 1200, cantidad: 5 },
    { nombre: "Mouse", precio: 25, cantidad: 20 },
    { nombre: "Teclado", precio: 45, cantidad: 15 },
    { nombre: "Monitor", precio: 300, cantidad: 7 },
    { nombre: "USB", precio: 10, cantidad: 50 }
];

// ============================================
// FUNCIÓN PARA MOSTRAR RESULTADOS (la que funcionaba)
// ============================================
function mostrarResultado(titulo, datos) {
    const output = document.getElementById('output');
    const contenidoActual = output.textContent;
    const esInicial = contenidoActual === "Presiona un botón para ver los resultados...";
    
    const nuevoContenido = esInicial 
        ? `📌 ${titulo}:\n${JSON.stringify(datos, null, 2)}`
        : `${contenidoActual}\n\n📌 ${titulo}:\n${JSON.stringify(datos, null, 2)}`;
    
    output.textContent = nuevoContenido;
}

function limpiar() {
    document.getElementById('output').textContent = "Presiona un botón para ver los resultados...";
}

// ============================================
// FUNCIONES PURAS (auxiliares)
// ============================================

// Transformadores
const aMayusculas = (texto) => texto.toUpperCase();
const extraerNombre = (producto) => producto.nombre;
const calcularValorTotal = (producto) => producto.precio * producto.cantidad;

// Creadores de objetos
const crearConValorTotal = (producto) => ({
    nombre: producto.nombre,
    valorTotal: calcularValorTotal(producto)
});

// Filtros (funciones que retornan boolean)
const esPrecioMenorQue = (limite) => (producto) => producto.precio < limite;
const esCantidadMenorQue = (limite) => (producto) => producto.cantidad < limite;
const esCantidadMayorQue = (limite) => (producto) => producto.cantidad > limite;
const esNombreIgualA = (nombre) => (producto) => producto.nombre === nombre;

// Reductores (para usar con reduce)
const acumularValorInventario = (total, producto) => total + calcularValorTotal(producto);
const encontrarMayorStock = (max, producto) => producto.cantidad > max.cantidad ? producto : max;
const clasificarPorPrecio = (clasificacion, producto) => {
    if (producto.precio > 100) {
        clasificacion.caros.push(producto);
    } else {
        clasificacion.baratos.push(producto);
    }
    return clasificacion;
};
const filtrarYAcumularNombres = (acumulador, producto) => {
    if (producto.cantidad > 10) {
        acumulador.push(producto.nombre);
    }
    return acumulador;
};

// ============================================
// EJERCICIO 1: Operaciones básicas (funcional)
// ============================================
function ejercicio1() {
    // 1. Map - Nombres en mayúscula (composición funcional)
    const nombresMayuscula = productos
        .map(extraerNombre)      // Primero extraigo nombres
        .map(aMayusculas);       // Luego convierto a mayúsculas
    
    mostrarResultado("1️⃣ Nombres en mayúscula (map funcional)", nombresMayuscula);
    
    // 2. Filter - Productos con precio menor a 50 (con currying)
    const productosBaratos = productos
        .filter(esPrecioMenorQue(50));
    
    mostrarResultado("2️⃣ Productos con precio < 50 (filter funcional)", productosBaratos);
    
    // 3. Find - Buscar producto "Monitor"
    const monitor = productos
        .find(esNombreIgualA("Monitor"));
    
    mostrarResultado("3️⃣ Producto 'Monitor' (find funcional)", monitor);
    
    // Pregunta adicional: buscar producto que no existe
    const noExiste = productos.find(esNombreIgualA("Tablet"));
    mostrarResultado("🔍 Buscando 'Tablet' (producto no existe)", noExiste || "undefined - El producto no existe");
}

// ============================================
// EJERCICIO 2: Análisis del inventario (funcional)
// ============================================
function ejercicio2() {
    // Pipeline funcional: filter -> map
    const productosBajoStock = productos
        .filter(esCantidadMenorQue(10))     // Filtro los de bajo stock
        .map(crearConValorTotal);           // Transformo a objeto con valorTotal
    
    mostrarResultado("📦 Productos con bajo stock (filter + map funcional)", productosBajoStock);
    
    // Reduce para calcular el total
    const valorTotalBajoStock = productosBajoStock
        .reduce((total, producto) => total + producto.valorTotal, 0);
    
    mostrarResultado("💰 Valor total de productos con bajo stock", valorTotalBajoStock);
}

// ============================================
// EJERCICIO 3: Uso avanzado de reduce (funcional)
// ============================================
function ejercicio3() {
    // 1. Valor total de todo el inventario
    const valorTotalInventario = productos
        .reduce(acumularValorInventario, 0);
    
    mostrarResultado("💵 Valor total del inventario", valorTotalInventario);
    
    // 2. Producto con mayor cantidad en stock
    const productoMayorStock = productos
        .reduce(encontrarMayorStock);
    
    mostrarResultado("📈 Producto con mayor cantidad en stock", productoMayorStock);
    
    // 3. Clasificar productos en caros (>100) y baratos (≤100)
    const clasificacionPrecios = productos
        .reduce(clasificarPorPrecio, { caros: [], baratos: [] });
    
    mostrarResultado("🏷️ Clasificación por precio (caros > $100)", clasificacionPrecios);
}

// ============================================
// RETO EXTRA: Solo usar reduce (funcional)
// ============================================
function retoExtra() {
    const nombresMasDe10 = productos
        .reduce(filtrarYAcumularNombres, []);
    
    mostrarResultado("⭐ Productos con más de 10 unidades (solo reduce)", nombresMasDe10);
}

// ============================================
// FUNCIONES ADICIONALES (demostración funcional)
// ============================================

// Función para demostrar composición de funciones (pipe)
const pipe = (...fns) => (valor) => fns.reduce((acc, fn) => fn(acc), valor);

function demostrarPipeline() {
    // Creamos un pipeline reutilizable
    const obtenerNombresCaros = pipe(
        (productos) => productos.filter(p => p.precio > 100),
        (productos) => productos.map(p => p.nombre),
        (nombres) => nombres.map(n => n.toUpperCase())
    );
    
    const resultado = obtenerNombresCaros(productos);
    mostrarResultado("🚀 Pipeline: Nombres de productos caros en mayúscula", resultado);
}

// Función para demostrar ordenamiento funcional
function demostrarOrdenamiento() {
    // Ordenar sin mutar el original (usando spread operator)
    const ordenadosPorPrecio = [...productos].sort((a, b) => a.precio - b.precio);
    const ordenadosPorCantidad = [...productos].sort((a, b) => b.cantidad - a.cantidad);
    
    mostrarResultado("📊 Productos ordenados por precio (menor a mayor)", ordenadosPorPrecio);
    mostrarResultado("📊 Productos ordenados por cantidad (mayor a menor)", ordenadosPorCantidad);
}

// Función para demostrar inmutabilidad
function demostrarInmutabilidad() {
    // Versión inmutable: crear nuevo array sin modificar el original
    const productosConDescuento = productos.map(producto => ({
        ...producto,  // Spread operator para copiar
        precio: producto.precio * 0.9  // Aplicar 10% descuento
    }));
    
    mostrarResultado("🔄 Productos con 10% descuento (inmutable)", productosConDescuento);
    mostrarResultado("📋 Productos originales (no se modificaron)", productos);
}

// ============================================
// NOTA: Para usar las funciones adicionales,
// descomenta los botones en el HTML o llámalas desde la consola
// ============================================

console.log("✅ Script funcional cargado correctamente");
console.log("📦 Productos disponibles:", productos.length);
console.log("🎯 Funciones disponibles: ejercicio1(), ejercicio2(), ejercicio3(), retoExtra()");
