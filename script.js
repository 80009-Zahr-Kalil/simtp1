// seleccion de metodo

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

var constantes = [];
var x0Actual;

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
    //console.log(arr);
    registrosActuales = n;
    x0Actual = x0;
    console.log("OBTENER VALORES -> " + (Date.now()-start));
    return arr;
}

function calcular(arr) {
    var nombreClase = metodo();
    if(nombreClase == "completar2") {
        arr[6] = 0;
    }
    var n1 = arr[5] * x0Actual + arr[6];
    
    // calculo Xi+1
    var n2 = n1 % arr[4];

    // calculo el valor aleatorio
    var rnd = n2 / (arr[4]-1);
    var redondeado = Number(rnd.toFixed(4));
    //console.log(redondeado);
    //arr[1] = n2;
    //$('.' + nombreClase)[1].value = n2;
    x0Actual = n2;
    return redondeado;
}


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
var registrosActuales;
var element = document.getElementsByClassName("rellenar")[0];

function rellenarCadena(i, numero) {
    var cadena = '<p>' + i  + ' ' + numero + '</p>';
    element.insertAdjacentHTML('beforeend', cadena);
}


//var cadena;


function mostrar() {
    var arr = primerosRegistros();
    var cadena = "";
    const start = Date.now();
    for(var i=0; i<arr.length; i++) {
        //rellenarCadena(i, arr[i]);
        cadena += '<p>' + i  + ' ' + arr[i] + '</p>';
    }
    //element.insertAdjacentHTML('beforeend', cadena);
    document.getElementsByClassName("output")[0].style.display = "block";
    $(".rellenar").html(cadena);
    $(".output").show();
    console.log("MOSTRAR -> " + (Date.now()-start));
}

function agregarRegistro() {
    registrosActuales++;
    var nuevoNumeroRandom = calcular(constantes);
    var cadena = '<p>' + (registrosActuales-1)  + ' ' + nuevoNumeroRandom + '</p>';
    document.getElementsByClassName("rellenar")[0].insertAdjacentHTML('beforeend', cadena);
    $(".output").show();
}

/*
function agregarRegistro(cadena) {
    registrosActuales++;
    console.log("RA---->" + registrosActuales);
    //var nuevosValores = obtenerValores();
    var nuevoNumeroRandom = calcular(constantes);
    cadena += '<p>' + nuevoNumeroRandom + '</p>';
    //$(".rellenar").html() += '<p>' + nuevoNumeroRandom + '</p>';
    //cadena += '<p>' + nuevoNumeroRandom + '</p>'
    $(".rellenar").html(cadena);
    $(".output").show();
    //mostrar();
    //var cadenaPrimerosRegistros = mostrar();
    //cadenaPrimerosRegistros += '<p>' + ' ' + calcular(nuevosValores) + '</p>'
    //$(".rellenar").html(cadenaPrimerosRegistros);
}
*/
//CODIGO INEFICIENTE -> 1M registros = 17 segundos

/*

// calcular los numeros aleatorios
function calcular(className) {
    var arr = document.getElementsByClassName(className);
    var datos = [];
    var numeros = [];
    for(var i=0; i<arr.length; i++) {
        datos.push(Number(arr[i].value));
    }
    datos.push(0);

    var n = datos[0];
    var x0 = datos[1];
    var k = datos[2];
    var g = datos[3];
    var m = datos[4];
    var a = datos[5];
    var c = datos[6];
    for(var i=0; i<n; i++) {
        var n1 = a * x0 + c;
    
        // calculo Xi+1
        var n2 = n1 % m;
    
        // calculo el valor aleatorio
        var rnd = n2 / (m-1);
        var redondeado = Number(rnd.toFixed(4));
    
        //console.log((i+1).toString(), ": ", redondeado);
        numeros.push([i+1, redondeado]);
        x0 = n2;
    }
    //console.log(datos);
    return [numeros, datos];
}

// mostrar los datos en la pagina   CORREGIR! Mostrar() debe calcular una sola vez, no todo de nuevo.
function mostrar() {
    var nombreClase = metodo();

    var numeros = calcular(nombreClase)[0];
    var cadena = "";
    for(var i=0; i<numeros.length; i++) {
        cadena += '<p>' + numeros[i][0] + ' ' + numeros[i][1] + '</p>';
    }
    
    $(".rellenar").html(cadena);
    $(".output").show();
}

function agregarRegistro() {
    var nombreClase = metodo();
    var datos = calcular(nombreClase)[1];
    var registrosActuales = datos[0];
    registrosActuales++;    
    $("." + nombreClase)[0].value = registrosActuales;
    calcular(nombreClase);
    mostrar();
}
*/





/*
function calcular(x0, k, g, m, a, c) { 
    var n1 = a * x0 + c;
    
    // calculo Xi+1
    var n2 = n1 % m;

    // calculo el valor aleatorio
    var rnd = n2 / (m-1);
    var redondeado = Number(rnd.toFixed(4));
    console.log(redondeado);
    x0 = n2;
}

//calcular(6,3,3,8,13,7);
*/