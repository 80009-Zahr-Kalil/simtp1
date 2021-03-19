// seleccion de metodo
function metodo() {
    var elem = document.getElementById("selector");
    var op = elem.value;

    if(op == 0) {
        $(".metodo-multiplicativo").hide();
        $(".metodo-mixto").hide();
    }
    if(op == 1) {
        $(".metodo-mixto").show();
        $(".metodo-multiplicativo").hide();
    }
    if(op == 2) {
        $(".metodo-multiplicativo").show();
        $(".metodo-mixto").hide();
    }
}


// calcular los numeros aleatorios
function calcular(className) {
    var arr = document.getElementsByClassName(className);
    var datos = [];
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
    
        console.log((i+1).toString(), ": ", Number(rnd.toFixed(4)));
        x0 = n2;
    }
}