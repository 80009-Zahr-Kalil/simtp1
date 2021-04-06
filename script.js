// VARIABLES GLOBALES //////////////////////////////////////////
var constantes = [];
var x0Actual;
var registrosActuales;
var element = document.getElementsByClassName("rellenar")[0];
var listaNumeros = [];

var tablaChiCuadrado = [3.841, 5.991, 7.815, 9.488, 11.070, 12.592, 14.067, 
                        15.507, 16.919, 18.307, 19.675, 21.026, 22.362, 
                        23.685, 24.996, 26.296, 27.587, 28.869, 30.144, 
                        31.410, 32.671, 33.924, 35.172, 36.415, 37.652, 
                        38.885, 40.113, 41.337, 42.557, 43.773];

var flag = "";



// FUNCIONES //////////////////////////////////////////////////

// INCISO a)

// Desplegar input generador
function desplegarInputGenerador() {
    $(".inputGenerador").show();
    $(".inputChiCuadrado").hide();
    $(".outputChiCuadrado").hide();
    flag = "subintervalosGenerador";
}


// Obtiene la opción elegida por el usuario.
function metodo() {
    var elem = document.getElementById("selector");
    var op = elem.value;
    var nombreClase = "";
    if(op == 0) {
        $(".metodo-multiplicativo").hide();
        $(".metodo-mixto").hide();
        $(".outputGenerador").hide();
    }
    if(op == 1) {
        $(".metodo-mixto").show();
        $(".metodo-multiplicativo").hide();
        $(".outputGenerador").hide();
        nombreClase = "completar1";
    }
    if(op == 2) {
        $(".metodo-multiplicativo").show();
        $(".metodo-mixto").hide();
        $(".outputGenerador").hide();
        nombreClase = "completar2";
    }

    //$('html, body').animate({scrollTop: $('section.ok').offset().top }, 'slow');
    return nombreClase;
}


// Obtiene los valores ingresados por el usuario.
function obtenerValores() {
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
    return arr;
}


// Genera un número pseudo aleatorio a partir de los valores ingresados por el usuario.
function generarNumAleatorio(arr) {
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
    constantes = obtenerValores();
    var cantidadRegistros = constantes[0];
    for(var i=0; i<cantidadRegistros; i++) {
        var numero = generarNumAleatorio(constantes);
        if(numero == 1) {
            numero = 0.9999;
        }
        listaNumeros.push(numero);
    }
    return listaNumeros;
}


// Muestra la tabla con los números pseudo aleatorios generados.
function mostrar() {
    listaNumeros = [];
    var arr = primerosRegistros();
    var cadena = "<tr class='titulo-tabla'><th>i</th><th>número</th></tr>";
    for(var i=0; i<arr.length; i++) {
        var numeroRandom;
        if (arr[i] == 0) {
            numeroRandom = '0.0000';
        } else {
            if (arr[i] == 0.9999) {
                numeroRandom = '1.0000';
            } else {
                numeroRandom = arr[i];
            }
        }
        cadena += '<tr><td>' + (i+1)  + '</td><td>' + numeroRandom + '</td></tr>';
    }
    $("#rellenar").html(cadena);
    $(".outputGenerador").show();
    $(".chiCuadrado").hide();
    $(".scroll").show();
}


// Agrega un Registro a la tabla ya existente de números pseudo aleatorios.
function agregarRegistro() {
    registrosActuales++;
    var nuevoNumeroRandom = generarNumAleatorio(constantes);
    var numeroMostrado = nuevoNumeroRandom;
    if (nuevoNumeroRandom == 0) {
        numeroMostrado = "0.0000";
    }
    if(nuevoNumeroRandom == 1) {
        numeroMostrado = "1.0000";
        nuevoNumeroRandom = 0.9999;
    }
    listaNumeros.push(nuevoNumeroRandom);
    var cadena = '<tr><td class="nuevos-registros">' + (registrosActuales)  + '</td><td class="nuevos-registros">' + numeroMostrado + '</td></tr>';
    document.getElementById("rellenar").insertAdjacentHTML('beforeend', cadena);
    $(".outputGenerador").show();
}


//////////////////////////////////////////////////////////////////////////////////////////////////////


// INCISOS b) Y c)

// Desplegar input Chi cuadrado
function desplegarInputChiCuadrado() {
    $(".inputChiCuadrado").show();
    $(".inputGenerador").hide();
    $(".outputGenerador").hide();
    var limpiarOutput = '<table id="rellenarChiCuadrado" class="number-display animate__animated animate__zoomIn"></table><div class="chiCuadrado"><div class="estadistico animate__animated animate__flipInX">EST</div><div class="hipotesisNula animate__animated animate__fadeIn">HIP</div></div>';
    $(".outputChiCuadrado").html(limpiarOutput);
    flag = "subintervalosChiCuadrado";
}


// Generar los numeros pseudo aleatorios con el metodo de JS.
function generarNumerosJS(){
    var cantNum = document.getElementById("numerosChiCuadrado").value;
    var listaNumerosJS = [];
    for(var i = 0; i<cantNum ; i++){
        var aleatorioJS = Math.random().toFixed(4);
        listaNumerosJS.push(Number(aleatorioJS));
    }
    return listaNumerosJS;
}

// Obtener Intervalos.
function obtenerIntervalos(subintervalos) {
    var amplitud = 100 / subintervalos;
    var listaIntervalos = [];
    var cierre = -0.01;
    for(var i=1; i<=subintervalos; i++) {
        var inicio = cierre + 0.01 ;
        cierre = (amplitud * i - 1) + 0.99;
        listaIntervalos.push([inicio, cierre]);
    }
    return listaIntervalos;
}


// Calcula cuantas apariciones hubo en un determinado intervalo.
function frecuencia(listaNumeros, listaIntervalos) {
    var frecuencias = [];
    for(var i=0; i<listaIntervalos.length; i++) {
        frecuencias.push(0);
    }
    for(var i=0; i<listaNumeros.length; i++) {
        for(var j=0; j<listaIntervalos.length; j++) {
            if(listaNumeros[i]*100 >= listaIntervalos[j][0] && listaNumeros[i]*100 <= listaIntervalos[j][1]) {
                frecuencias[j]++;
                break;
            }
        }
    }
    return frecuencias;
    
}


// Obtenemos el valor del estadistico a partir de la prueba de Chi Cuadrado.
function obtenerEstadistico(frecuenciasObservadas,frecuenciaEsperada) {
    var estadistico = 0;
    for(var i=0; i<frecuenciasObservadas.length; i++) {
        var n1 = (frecuenciasObservadas[i] - frecuenciaEsperada)**2;
        var n2 = n1 / frecuenciaEsperada;
        estadistico += n2;
    }
    return estadistico;
}


// Valida que la cantidad de registros sea mayor o igual a 30.
function validarChiCuadrado(arr, subintervalos) {
    if(arr.length < 30 || subintervalos < 5) {
        alert("Para efectuar la prueba de Chi Cuadrado se necesitan un mínimo de 30 números pseudo aleatorios y 5 subintervalos.");
        return false;
    } else {
        return true;
    }
}

// debe calcular los intervalos, las frecuencias y el estadistico.
function calcularChiCuadrado(subintervalos) { 
    var listaIntervalos = obtenerIntervalos(subintervalos);
    var frecuenciasObservadas;
    if(flag == "subintervalosGenerador") {
        frecuenciasObservadas = frecuencia(listaNumeros, listaIntervalos);
    }
    if(flag == "subintervalosChiCuadrado") {
        var listaNumerosJS = generarNumerosJS();
        frecuenciasObservadas = frecuencia(listaNumerosJS, listaIntervalos);
    }
    var sumatoriaFrecuenciasObservadas = frecuenciasObservadas.reduce(function(a, b) {return a+b});
    var frecuenciaEsperada = sumatoriaFrecuenciasObservadas / subintervalos;
    var estadistico = obtenerEstadistico(frecuenciasObservadas, frecuenciaEsperada);
    return [listaIntervalos, frecuenciasObservadas, frecuenciaEsperada, estadistico];
}

// debe mostrar la tabla de frecuencias, el estadistico y el histograma
function mostrarChiCuadrado() {
    var arrayNumeros;
    if(flag == "subintervalosGenerador") {
        arrayNumeros = listaNumeros;
    }
    if(flag == "subintervalosChiCuadrado") {
        arrayNumeros = generarNumerosJS();
    }

    var elem = document.getElementById(flag);
    var subintervalos = elem.value;
    if(validarChiCuadrado(arrayNumeros, subintervalos)) {
        var datos = calcularChiCuadrado(subintervalos);
        var listaIntervalos = datos[0];
        var frecuenciasObservadas = datos[1];
        var frecuenciaEsperada = datos[2];
        var estadistico = datos[3];

        var cadenaJS = "<tr class='titulo-tabla'><th>Desde</th><th>Hasta</th><th>Frecuencia observada</th><th>Frecuencia Esperada</th></tr>";
        
        for(var i = 0; i<listaIntervalos.length; i++){
            cadenaJS += '<tr><td>' + listaIntervalos[i][0].toFixed(2) + '</td><td>' + listaIntervalos[i][1].toFixed(2) + '</td> <td>' + frecuenciasObservadas[i] + '</td><td>' + frecuenciaEsperada.toFixed(2) + '</td></tr>'; 
        }
        $("#rellenarChiCuadrado").html(cadenaJS);
        $(".outputChiCuadrado").show();

        $(".estadistico").html("ESTADÍSTICO: " + Number(estadistico.toFixed(4)));
        var conclusion = "Valor en la Tabla: ";
        var valorAComparar = tablaChiCuadrado[subintervalos-2]
        if(estadistico < valorAComparar) {
            conclusion += valorAComparar + "<br> No se rechaza la hipótesis nula ";
        } else {
            conclusion += valorAComparar + "<br> Se rechaza la hipótesis nula ";
        }
        conclusion += "de que el generador genera números pseudo aleatorios con distribución uniforme 0 1."
        $(".hipotesisNula").html(conclusion);
        $(".chiCuadrado").show();
    }
}



// FUNCION SCROLL DOWN

 $(function() {
    $('.scroll-down').click (function() {
      $('html, body').animate({scrollTop: $('section.ok').offset().top }, 'slow');
      return false;
    });
  });

  $(function() {
    $('.btnChi').click (function() {
      $('html, body').animate({scrollTop: $('section.ok').offset().top }, 'slow');
      return false;
    });
  });

  $(function() {
    $('.btn2').click (function() {
      $('html, body').animate({scrollTop: $('section.ok').offset().top }, 'slow');
      return false;
    });
  });

  $(function() {
    $('.btnAgregar').click (function() {
      $('html, body').animate({scrollTop: $('section.ok').offset().top }, 'fast');
      return false;
    });
  });

  $(function() {
    $('.btnGenerador').click (function() {
      $('html, body').animate({scrollTop: $('section.ok').offset().top }, 'slow');
      return false;
    });
  });



  // VANILLA TILT EFFECT
VanillaTilt.init(document.querySelectorAll(".box"), {
    max: 25,
    speed: 400
});


document.getElementById("btnGenerador").addEventListener('click', desplegarInputGenerador)

document.getElementById("btnGeneradorMixto").addEventListener("click", mostrar);
document.getElementById("btnGeneradorMultiplicativo").addEventListener("click", mostrar);

document.getElementById("btnAgregar").addEventListener("click", agregarRegistro);

document.getElementById("btnValidarChiCuadrado").addEventListener("click", function(){
    $(".chiCuadrado").show();
});

document.getElementById("btnCalcularChiCuadrado").addEventListener("click", mostrarChiCuadrado);

document.getElementById("btnChiCuadrado").addEventListener("click", function(){
    desplegarInputChiCuadrado();
    $(".scroll").hide();
});

document.getElementById("btnGenerarChiCuadrado").addEventListener("click", mostrarChiCuadrado);


