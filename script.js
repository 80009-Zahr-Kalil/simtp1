// VARIABLES GLOBALES //////////////////////////////////////////
var constantes = [];
var x0Actual;
var registrosActuales;
var element = document.getElementsByClassName("rellenar")[0];



// FUNCIONES //////////////////////////////////////////////////


// Obtiene la opción elegida por el usuario.
function metodo() {
    var elem = document.getElementById("selector");
    var op = elem.value;
    var nombreClase = "";
    if(op == 0) {
        $(".metodo-multiplicativo").hide();
        $(".metodo-mixto").hide();
        $(".output").hide();
    }
    if(op == 1) {
        $(".metodo-mixto").show();
        $(".metodo-multiplicativo").hide();
        $(".output").hide();
        nombreClase = "completar1";
    }
    if(op == 2) {
        $(".metodo-multiplicativo").show();
        $(".metodo-mixto").hide();
        $(".output").hide();
        nombreClase = "completar2";
    }
    return nombreClase;
}


// Obtiene los valores ingresados por el usuario.
function obtenerValores() {
    const start = Date.now();
    var arr;
    var nombreClase = metodo();
    var datos = document.getElementsByClassName(nombreClase);
    var n = Number(datos[0].value);
    var x0 = Number(datos[1].value);
    var k = Number(datos[2].value);
    var g = Number(datos[3].value);
    var m = Number(datos[4].value);
    var a = Number(datos[5].value);
    var c;
    if(datos[6] != null) {
        c = Number(datos[6].value);
    } else {
        c = 0;
    }
    arr = [n, x0, k, g, m, a, c];
    registrosActuales = n;
    x0Actual = x0;
    console.log("OBTENER VALORES -> " + (Date.now()-start));
    return arr;
}


// Calcula un número pseudo aleatorio a partir de los valores ingresados por el usuario.
function calcular(arr) {
    var nombreClase = metodo();
    if(nombreClase == "completar2") {
        arr[6] = 0;
    }
    var n1 = arr[5] * x0Actual + arr[6];
    
    var n2 = n1 % arr[4];

    var rnd = n2 / (arr[4]-1);
    var redondeado = Number(rnd.toFixed(4));
    x0Actual = n2;
    return redondeado;
}


// Devuelve una lista con los números pseudo aleatorios generados.
function primerosRegistros() {
    const start = Date.now()
    constantes = obtenerValores();
    var cantidadRegistros = constantes[0];
    var listaNumeros = [];
    for(var i=0; i<cantidadRegistros; i++) {
        var numero = calcular(constantes);
        listaNumeros.push(numero);
    }
    console.log("PRIMEROS REGISTROS -> " + (Date.now()-start));
    return listaNumeros;
}


// Muestra la tabla con los números pseudo aleatorios generados.
function mostrar() {
    var arr = primerosRegistros();
    var cadena = "";
    const start = Date.now();
    for(var i=0; i<arr.length; i++) {
        var numeroRandom;
        if (arr[i] == 0) {
            numeroRandom = '0.0000';
        } else {
            if (arr[i] == 1) {
                numeroRandom = '1.0000';
            } else {
                numeroRandom = arr[i];
            }
        }
        cadena += '<div>' + (i+1)  + ' ' + numeroRandom + '</div>';
    }
    $(".rellenar").html(cadena);
    $(".output").show();
    console.log("MOSTRAR -> " + (Date.now()-start));
}


// Agrega un Registro a la tabla ya existente de números pseudo aleatorios.
function agregarRegistro() {
    registrosActuales++;
    var nuevoNumeroRandom = calcular(constantes);
    if (nuevoNumeroRandom == 0) {
        nuevoNumeroRandom = "0.0000";
    }
    if(nuevoNumeroRandom == 1) {
        nuevoNumeroRandom = "1.0000";
    }
    var cadena = '<div class="nuevos-registros">' + (registrosActuales)  + ' ' + nuevoNumeroRandom + '</div>';
    document.getElementsByClassName("rellenar")[0].insertAdjacentHTML('beforeend', cadena);
    $(".output").show();
}

