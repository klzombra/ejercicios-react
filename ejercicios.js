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
// FUNCIONES PURAS (utilidades)
// ============================================

// Función para formatear resultados
const formatearResultado = (titulo, datos) => ({
    titulo,
    datos,
    timestamp: new Date().toISOString()
});

// Función para mostrar en pantalla (efecto secundario controlado)
const mostrar = (resultado) => {
    const output = document.getElementById('output');
    const contenidoActual = output.textContent;
    const esInicial = contenidoActual === "Presiona un botón para ver los resultados...";
    
    const nuevoContenido = esInicial 
        ? `📌 ${resultado.titulo}:\n${JSON.stringify(resultado.datos, null, 2)}`
        : `${contenidoActual}\n\n📌 ${resultado.titulo}:\n${JSON.stringify(resultado.datos, null, 2)}`;
    
    output.textContent = nuevoContenido;
};

const limpiar = () => {
    document.getElementById('output').textContent = "Presiona un botón para ver los resultados...";
};

// ============================================
// FUNCIONES AUXILIARES (reutilizables)
// ============================================

// Transformadores
const aMayusculas = (str) => str.toUpperCase();
const extraerNombre = (producto) => producto.nombre;
const extraerPrecio = (producto) => producto.precio;
const extraerCantidad = (producto) => producto.cantidad;
const calcularValorTotal = (producto) => producto.precio * producto.cantidad;

// Filtros
const esPrecioMenorQue = (limite) => (producto) => producto.precio < limite;
const esCantidadMenorQue = (limite) => (producto) => producto.cantidad < limite;
const esCantidadMayorQue = (limite) => (producto) => producto.cantidad > limite;
const esPrecioMayorQue = (limite) => (producto) => producto.precio > limite;
const esNombreIgualA = (nombre) => (producto) => producto.nombre === nombre;

// Composición de funciones
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

// ============================================
// EJERCICIO 1: Operaciones básicas (funcional)
// ============================================

const ejercicio1Funcional = () => {
    // 1. Map funcional - Nombres en mayúscula
    const nombresMayuscula = productos
        .map(extraerNombre)
        .map(aMayusculas);
    
    mostrar(formatearResultado("1️⃣ Nombres en mayúscula (map funcional)", nombresMayuscula));
    
    // 2. Filter funcional - Precio menor a 50
    const productosBaratos = productos
        .filter(esPrecioMenorQue(50));
    
    mostrar(formatearResultado("2️⃣ Productos precio < 50 (filter funcional)", productosBaratos));
    
    // 3. Find funcional - Buscar Monitor
    const monitor = productos
        .find(esNombreIgualA("Monitor"));
    
    mostrar(formatearResultado("3️⃣ Producto Monitor (find funcional)", monitor));
    
    // Pregunta adicional con manejo funcional
    const buscarProducto = (nombre) => 
        productos.find(esNombreIgualA(nombre)) || { error: `Producto "${nombre}" no encontrado` };
    
    mostrar(formatearResultado("🔍 Buscando 'Tablet'", buscarProducto("Tablet")));
};

// ============================================
// EJERCICIO 2: Análisis inventario (funcional)
// ============================================

// Función para crear objeto con valor total
const crearConValorTotal = (producto) => ({
    nombre: producto.nombre,
    valorTotal: calcularValorTotal(producto)
});

// Función para sumar valores (para reduce)
const sumarValores = (acumulador, producto) => acumulador + producto.valorTotal;

const ejercicio2Funcional = () => {
    // Pipeline funcional: filtrar -> transformar
    const productosBajoStock = productos
        .filter(esCantidadMenorQue(10))
        .map(crearConValorTotal);
    
    mostrar(formatearResultado("📦 Productos con bajo stock (filter + map funcional)", productosBajoStock));
    
    // Reducir para calcular total
    const valorTotalBajoStock = productosBajoStock
        .reduce(sumarValores, 0);
    
    mostrar(formatearResultado("💰 Valor total bajo stock (reduce funcional)", valorTotalBajoStock));
};

// ============================================
// EJERCICIO 3: Reduce avanzado (funcional)
// ============================================

// Reducers específicos
const acumularValorInventario = (total, producto) => total + calcularValorTotal(producto);

const encontrarMayorStock = (max, producto) => 
    producto.cantidad > max.cantidad ? producto : max;

const clasificarPorPrecio = (clasificacion, producto) => {
    const categoria = esPrecioMayorQue(100)(producto) ? 'caros' : 'baratos';
    return {
        ...clasificacion,
        [categoria]: [...clasificacion[categoria], producto]
    };
};

const ejercicio3Funcional = () => {
    // 1. Valor total del inventario
    const valorTotal = productos
        .reduce(acumularValorInventario, 0);
    
    mostrar(formatearResultado("💵 Valor total del inventario", valorTotal));
    
    // 2. Producto con mayor stock (sin valor inicial)
    const mayorStock = productos
        .reduce(encontrarMayorStock);
    
    mostrar(formatearResultado("📈 Producto con mayor stock", mayorStock));
    
    // 3. Clasificación por precio
    const clasificacion = productos
        .reduce(clasificarPorPrecio, { caros: [], baratos: [] });
    
    mostrar(formatearResultado("🏷️ Clasificación por precio", clasificacion));
};

// ============================================
// RETO EXTRA: Solo reduce (funcional)
// ============================================

const retoExtraFuncional = () => {
    const nombresMasDe10 = productos
        .reduce((acumulador, producto) => {
            return esCantidadMayorQue(10)(producto)
                ? [...acumulador, producto.nombre]
                : acumulador;
        }, []);
    
    mostrar(formatearResultado("⭐ Productos con más de 10 unidades (solo reduce)", nombresMasDe10));
};

// ============================================
// VERSIÓN EXTREMA: Todo con compose/pipe
// ============================================

// Ejemplo de composición de funciones
const obtenerNombresCarosConBajoStock = pipe(
    (productos) => productos.filter(esPrecioMayorQue(100)),
    (caros) => caros.filter(esCantidadMenorQue(10)),
    (filtrados) => filtrados.map(extraerNombre)
);

// Pipeline para análisis completo
const analizarInventario = pipe(
    (productos) => ({
        total: productos.reduce(acumularValorInventario, 0),
        promedio: productos.reduce((acc, p, i, arr) => 
            i === arr.length - 1 
                ? (acc + p.precio) / arr.length 
                : acc + p.precio, 0),
        masCaro: productos.reduce((max, p) => p.precio > max.precio ? p : max),
        masStock: productos.reduce(encontrarMayorStock)
    })
);

// Función para demostrar pipelines
const demostrarPipelines = () => {
    const nombresCarosBajoStock = obtenerNombresCarosConBajoStock(productos);
    mostrar(formatearResultado("🎯 Pipeline: Nombres de productos caros con bajo stock", nombresCarosBajoStock));
    
    const analisis = analizarInventario(productos);
    mostrar(formatearResultado("📊 Análisis completo (pipeline)", analisis));
};

// ============================================
// FUNCIONES DE ALTO ORDEN (currying)
// ============================================

// Currying para crear filtros dinámicos
const crearFiltroPorRango = (min, max) => (producto) => 
    producto.precio >= min && producto.precio <= max;

// Función para ordenar de forma funcional
const ordenarPor = (propiedad, ascendente = true) => (array) => 
    [...array].sort((a, b) => {
        if (ascendente) {
            return a[propiedad] > b[propiedad] ? 1 : -1;
        }
        return a[propiedad] < b[propiedad] ? 1 : -1;
    });

const ejercicioAvanzado = () => {
    // Filtrar por rango de precio
    const precioEntre100y500 = crearFiltroPorRango(100, 500);
    const productosRango = productos.filter(precioEntre100y500);
    mostrar(formatearResultado("🎯 Productos entre $100 y $500", productosRango));
    
    // Ordenar funcionalmente
    const productosOrdenados = ordenarPor('precio', true)(productos);
    mostrar(formatearResultado("📊 Productos ordenados por precio (ascendente)", productosOrdenados));
    
    const productosOrdenadosDesc = ordenarPor('precio', false)(productos);
    mostrar(formatearResultado("📊 Productos ordenados por precio (descendente)", productosOrdenadosDesc));
};

// ============================================
// MONADAS (concepto funcional avanzado)
// ============================================

// Maybe Monad para manejar valores nulos de forma segura
class Maybe {
    constructor(value) {
        this.value = value;
    }
    
    static of(value) {
        return new Maybe(value);
    }
    
    map(fn) {
        return this.value === null || this.value === undefined
            ? Maybe.of(null)
            : Maybe.of(fn(this.value));
    }
    
    getOrElse(defaultValue) {
        return this.value === null || this.value === undefined
            ? defaultValue
            : this.value;
    }
}

// Ejemplo de uso de Maybe
const buscarProductoSeguro = (nombre) => {
    return Maybe.of(productos.find(esNombreIgualA(nombre)))
        .map(extraerNombre)
        .map(aMayusculas)
        .getOrElse(`❌ Producto "${nombre}" no existe`);
};

const demostrarMonadas = () => {
    const productoExistente = buscarProductoSeguro("Monitor");
    const productoNoExistente = buscarProductoSeguro("Tablet");
    
    mostrar(formatearResultator("🔒 Búsqueda segura con Maybe (existe)", productoExistente));
    mostrar(formatearResultado("🔒 Búsqueda segura con Maybe (no existe)", productoNoExistente));
};

// ============================================
// EXPORTAR FUNCIONES PARA LOS BOTONES
// ============================================

// Versiones funcionales para los botones
const ejercicio1 = ejercicio1Funcional;
const ejercicio2 = ejercicio2Funcional;
const ejercicio3 = ejercicio3Funcional;
const retoExtra = retoExtraFuncional;

// Funciones adicionales para demostrar conceptos avanzados
const demostrarPipelinesBtn = demostrarPipelines;
const demostrarAvanzadoBtn = ejercicioAvanzado;
const demostrarMonadasBtn = demostrarMonadas;
