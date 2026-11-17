console.log("Bienvenido al Sistema de Estacionamiento");

// Variables del estacionamiento

let totalVehiculos = 0;

let dineroRecaudado = 0;

// Lista para guardar los vehículos registrados
let listaVehiculos = [];

// Tarifas por tipo de vehículo

const tarifaAuto = 5;
const tarifaMoto = 4;
const tarifaCamioneta = 6;

// Función para calcular el pago
function calcularPago(horas, tarifa) {

    let total = horas * tarifa;

    return total;
}

// Función para aplicar descuentos
function aplicarDescuento(pago, horas) {

    if (horas >= 5) {

        pago = pago * 0.90;

    }

    return pago;

}

// Función para obtener la tarifa según el vehículo
function obtenerTarifa(tipoVehiculo) {

    if (tipoVehiculo === "auto") {
        return tarifaAuto;

    } else if (tipoVehiculo === "moto") {
        return tarifaMoto;

    } else if (tipoVehiculo === "camioneta") {
        return tarifaCamioneta;
    }

    return 0;
}

// Función para mostrar el resumen del estacionamiento
function mostrarResumen() {

    // Mostrar el resumen general
    document.getElementById("resumen").textContent =
        "Total de vehículos: " + totalVehiculos +
        " | Dinero recaudado: S/ " + dineroRecaudado.toFixed(2);

    // Preparar el listado
    let listado = "VEHÍCULOS REGISTRADOS:\n";

    // Recorrer todos los vehículos
    for (let i = 0; i < listaVehiculos.length; i++) {

        listado += (i + 1) + ". " +
            listaVehiculos[i].tipo +
            " - Horas: " + listaVehiculos[i].horas +
            " - Total: S/ " + listaVehiculos[i].pagoFinal.toFixed(2) + "\n";
    }

    // Mostrar el listado en la página
    document.getElementById("lista").textContent = listado;
}

// Obtener el formulario

const formulario = document.getElementById("formulario");

// Escuchar cuando se registre un vehículo

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Obtener los datos del formulario

    const tipoVehiculo = document.getElementById("tipoVehiculo").value;

    const horas = Number(document.getElementById("horas").value);

    // Validar las horas ingresadas
if (!Number.isFinite(horas) || horas <= 0) {
    alert("Por favor, ingresa una cantidad de horas válida.");
    return;
}

// Obtener la tarifa según el tipo de vehículo
let tarifa = obtenerTarifa(tipoVehiculo);

// Calcular el pago utilizando la función
let pago = calcularPago(horas, tarifa);

// Aplicar descuento si corresponde
let pagoFinal = aplicarDescuento(pago, horas);

// Calcular cuánto dinero se descontó
let descuento = pago - pagoFinal;

// Guardar los datos del vehículo
let vehiculo = {
    tipo: tipoVehiculo,
    horas: horas,
    pagoOriginal: pago,
    descuento: descuento,
    pagoFinal: pagoFinal
};

// Agregar el vehículo a la lista
listaVehiculos.push(vehiculo);

// Mostrar la lista en la consola
console.log(listaVehiculos);

// Actualizar el total de vehículos
 totalVehiculos++;

// Acumular el dinero recaudado
 dineroRecaudado = dineroRecaudado + pagoFinal;

// Mostrar el resultado
document.getElementById("resultado").textContent =
    "Vehículo: " + tipoVehiculo +
    " | Horas: " + horas +
    " | Precio original: S/ " + pago.toFixed(2) +
    " | Descuento: S/ " + descuento.toFixed(2) +
    " | Total a pagar: S/ " + pagoFinal.toFixed(2);

// Mostrar el resumen y el listado
mostrarResumen();  

});
