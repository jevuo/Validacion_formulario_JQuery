"use strict"
//Variable para mostrar el texto cuando haya un campo vacío
let campoVacio = "El campo no puede estar vacío";
//Función para que se cargue cuando se inicie el documento
$(() => {
//Cuando pulsemos el botón de enviar el formulario...
$("form").submit(function (e) {
  let evento = e || window.event 
  
  //Si todo está comprobado...
  if (comprobar()) {
    //Con esto evitamos que se envíe el formulario antes del mensaje
    evento.preventDefault();
    swal({
      //Título del mensaje
      title: 'Atención!',
      //Texto para el mensaje
      text: 'El formulario va a ser enviado',
      //Del tipo success, tras pulsar ok realizará la siguiente función
      type: 'success'
    })
    .then((result) => {
      //Esto lo pongo en javascript porque le preguntamos a la profesora de Javascript
      //Y nos dijo que es la única forma en la que funcionaba
      //Con jquery daba fallo
       document.getElementById("formulario").submit();
    })
  } else {
    //Con esto evitamos que se envíe el formulario antes de comprobar
    evento.preventDefault();
  }

});
//Quitamos el checked menor y mayor si están pulsados 
if ($('#menor').is(':checked')) {
  $('#menor').prop('checked', false);
}

if ($('#mayor').is(':checked')) {
  $('#mayor').prop('checked', false);
}

});
  //Asignamos el método al pulsar click sobre el botón
  $('#botonRestablecer').click(mostrarFormulario);
  //Asignamos el método cuando se levanta una tecla en el input dni
  $('#dni').keyup(comprobDni);
  //Asignamos los métodos de comprobar edad cuando cambie el check
  $('#mayor').change(comprobMayor);
  $('#menor').change(comprobMenor);
  //Ponemos la primera mayúscula cuando se pierda el foco del campo
  $('#nombre').blur(PrimeraMayuscula);
  $('#apellidos').blur(PrimeraMayusculaA);
  //Hacemos uso del plugin para el gráfico de la pass
  $('#pass').strength({
    strengthClass: 'strength',
    strengthMeterClass: 'strength_meter',
    strengthButtonClass: 'button_strength',
    strengthButtonText: 'Ver Password',
    strengthButtonTextToggle: 'Ocultar Password'


    
  });

  


//Función con la cual comprobaremos antes de enviar si los datos están bien introducidos
function comprobar() {
  //Creamos el array para guardar los returns de todas las funciones
  let arrayFun = [];

  //Ponemos en el array los resultados de los returns que serán true en caso de ser correctos
  //y false en caso contrario
  arrayFun.push(comprobNombre($('#nombre'), $('#errorNombre')));
  arrayFun.push(comprobApellidos($('#apellidos'), $('#errorApellidos')));
  arrayFun.push(comprobEmail($('#email'), $('#errorEmail')));
  arrayFun.push(comprobDni());
  arrayFun.push(comprobPass());
  arrayFun.push(comprobEdad());
  arrayFun.push(comprobMayor());


  //Recorremos el array, si algun elemento devuelve false, devolvemos false
  for (let ele of arrayFun) {
    if (!ele) {

      return false;
    }
  }
  //Si todos son true, devolvemos true
  return true;

}



//Función para comprobar nombre
function comprobNombre(objeto, error) {
  let check = false;
  //Patrón con expresion regular para el nombre, que permite todas las letras de la a-z
  //Mayúsculas o minúsculas, además de tildes
  let patronNombre = /^[A-Za-záéíóúÁÉÍÓÚ ]+$/;
  //Si el valor del objeto no coincide con el patrón y no está vacío
  if (!objeto.val().match(patronNombre) && !objeto.val() == "") {
    //Mostramos el texto en el span error y le añadimos la clase con el borde rojo
    error.text("El nombre sólo debe llevar letras");
    objeto.addClass("incorrecto");
    //Si el campo está vacio
  } else if (objeto.val() == "") {
    //Ponemos el texto del campo vacío en el span error y le añadimos la clase con el borde rojo
    error.text(campoVacio);
    objeto.addClass("incorrecto");
  } else {
    //Si está correcto, quitamos el texto del span error, añadimos la clase para el borde verde
    //Y quitamos la clase para el borde rojo
    error.text("");
    objeto.addClass("correcto");
    objeto.removeClass("incorrecto");
    check = true;
  }
  //Devolvemos el valor de check a true si está correcto, y de lo contrario false
  return check;
}


//Función para comprobar apellidos igual que la de nombre pero con su patrón de dos palabras
function comprobApellidos(objeto, error) {
  let check = false;
  let patronApellidos = /^([A-Za-záéíóúÁÉÍÓÚ]+)\s([A-Za-záéíóúÁÉÍÓÚ]+)$/;
  if (!objeto.val().match(patronApellidos) && !objeto.val() == "") {
    error.text("Los apellidos deben ser dos palabras");
    objeto.addClass("incorrecto");

  } else if (objeto.val() == "") {
    error.text(campoVacio);
    objeto.addClass("incorrecto");
  } else {
    error.text("");
    objeto.addClass("correcto");
    objeto.removeClass("incorrecto");
    check = true;
  }
  return check;
}

//Función para comprobar email igual que las anteriores pero con su patrón de email
function comprobEmail(objeto, error) {
  let check = false;
  let patronEmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
  if (!objeto.val().match(patronEmail) && !objeto.val() == "") {
    error.text("El formato del email debe ser válido");
    objeto.addClass("incorrecto");

  } else if (objeto.val() == "") {
    error.text(campoVacio);
    objeto.addClass("incorrecto");
  } else {
    error.text("");
    objeto.addClass("correcto");
    objeto.removeClass("incorrecto");
    check = true;
  }
  return check;
}




//Función para comprobar el check de mayor de edad
function comprobMayor() {
  let check = false;
  //Si está checkeado
  if ($('#mayor').is(':checked')) {
    //Ocultamos el div que contiene el check de menor y ponemos check a true
    $('#cajaMenor').hide();
    $('#errorMenor').text("");
    check = true;

  } else {
    //Si no está marcado, mostramos el de es menor y mostramos el span error ya que ninguno está marcado
    $('#cajaMenor').show();
    $('#errorMenor').text(campoVacio);
  }
  //Devolvemos el valor de check
  return check;
}

//Función para comprobar el check de es menor
function comprobMenor() {
  //Si está marcado
  if ($('#menor').is(':checked')) {
    //Mostramos el mensaje emergente con la librería sweetAlert
    muestraAlert();
    //Ocultamos el formulario 
    $('.container').hide();
    //Mediante una petición Ajax cargamos en la capa alertaMenorEdad el html externo
    $('#alertaMenorEdad').load('advertencia.html');

  }
}

//Función para saber si están desmarcados los dos check de edad
function comprobEdad() {
  let check = false;
  //Si están desmarcados
  if (!$('#mayor').is(':checked') && !$('#menor').is(':checked')) {
    //Mostramos el texto en el span de error
    $('#errorMenor').text(campoVacio);
  } else {
    //Si no, ponemos el check a true
    check = true;
  }
  //Y lo devolvemos
  return check;
}

//Función que recarga nuestro formulario
function mostrarFormulario() {
  location.reload();
}


//Función para comprobar el DNI
function comprobDni() {
  let check = false;
  //Patrón para el dni, 8 numeros 1 letra
  let patronDni = /^[0-9]{8}[a-zA-Z]$/;
  //Variable donde guardaremos el número solo
  let numero;
  //Variable donde guardaremos la letra sola
  let letra;
  //Variable de la cual extraeremos la letra correspondiente
  let letras = 'TRWAGMYFPDXBNJZSQVHLCKET';
  //Primero comprobamos que el patrón sea correcto, si lo es
  if ($('#dni').val().match(patronDni)) {
    //Guardamos en la variable número el número solo del dni
    numero = $('#dni').val().substr(0, $('#dni').val().length - 1);
    //Guardamos la letra en esta variable y la ponemos en mayúscula
    letra = $('#dni').val().substr($('#dni').val().length - 1, 1).toUpperCase();
    //Hacemos la operación con el número para que nos de la posición de la letra correcta
    //De nuestra variable letras
    numero = numero % 23;
    //Extraemos la letra correspondiente al número introducido de nuestra variable letras
    letras = letras.substring(numero, numero + 1);

    //Comparamos si la letra introducida es igual a la letra que hemos extraído de nuestra variable letras
    //Que sería la correcta, si no es así...
    if (letras != letra) {
      //Ponemos el texto en el span de error, de que la letra no es correcta
      //Esto lo hará conforme escribamos gracias a la función keyup
      $('#errorDni').text("Dni erroneo, la letra de su DNI no es correcta");
      //Añadimos la clase para poner el borde rojo y quitamos la de borde verde
      $('#dni').addClass("incorrecto");
      $('#dni').removeClass("correcto");
    } else {
      //Si es correcta la letra pasamos aquí, quitamos el texto error
      $('#errorDni').text("");
      //Ponemos la clase para el borde verde y quitamos la del borde rojo
      $('#dni').addClass("correcto");
      $('#dni').removeClass("incorrecto");
      //Automaticamente ponemos la letra a mayúscula
      $('#dni').val($('#dni').val().substr(0, $('#dni').val().length - 1) + letra);
      //Ponemos el check a true
      check = true;
    }
    //Si el campo está vacío mostramos nuestro error de vacío
  } else if ($('#dni').val() == "") {
    $('#errorDni').text(campoVacio);
    $('#dni').addClass("incorrecto");
    $('#dni').removeClass("correcto");

  } else {
    //Aqui pasará en caso de no estar vacío pero no es correcto el formato
    $('#errorDni').text("Debe ser un dni válido");
    $('#dni').addClass("incorrecto");
    $('#dni').removeClass("correcto");


  }
  //Devolvemos check
  return check;
}

//Función para comprobar la contraseña que es igual que la de nombre, apellidos, email
//Solo que le añadimos una condición mas en el else
function comprobPass() {
  let check = false;
  let patronPass = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  //Si es correcta
  if ($('#pass').val().match(patronPass)) {
    $('#errorPass').text("");
    $('#pass').addClass("correcto");
    $('#pass').removeClass("incorrecto");
    check = true;
    //Si está vacía
  } else if ($('#pass').val() == "") {
    $('#errorPass').text(campoVacio);
    $('#pass').addClass("incorrecto");
    $('#pass').removeClass("correcto");
    //Si contiene o no, los caracteres necesarios
  } else {
    $('#errorPass').text("La pass debe ser de 8 o más caracteres, tener números, letras mayúsculas y minúsculas, y algún caracter especial");
    $('#pass').addClass("incorrecto");
    $('#pass').removeClass("correcto");


  }
  //Devolvemos check
  return check;
}



//Función para poner la primera letra del nombre en mayúscula(No se pide pero me apeteció ponerla)
function PrimeraMayuscula() {
  //Cogemos el valor y lo reemplazamos cada vez que haya un espacio o nada detrás pondremos la primera letra en mayúscula
  $('#nombre').val($('#nombre').val().replace(/\b\w/g, m => m.toUpperCase()));
}
//Función para poner la primera letra de cada apellido en mayúscula
function PrimeraMayusculaA() {
  //Cogemos el valor y lo reemplazamos cada vez que haya un espacio o nada detrás pondremos la primera letra en mayúscula
  $('#apellidos').val($('#apellidos').val().replace(/\b\w/g, m => m.toUpperCase()));
}

//Función para mostrar el mensaje de error cuando se intente registrar un menos
//Gracias a la librería sweetAlert nos muestra un mensaje muy bueno
function muestraAlert() {
  swal(
    //Titulo para el sweetalert
    {
      title: 'Alerta!',
      //Texto para el mensaje
      text: 'No puede enviar el formulario por ser menor',
      //Del tipo warning, tras pulsar ok realizará la siguiente función
      type: 'warning'
    }).then(function () {
    //Mostramos el botón de volver al formulario con una animación
    $('#botonRestablecer').show();
    $('#botonRestablecer').animate({
      top: "100px",
      left: "100px",
      height: "30%",
      width: "50%"
    }, 5000);
  })

}