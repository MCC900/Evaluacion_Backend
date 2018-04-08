/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){

  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

/*---Esta función envía una petición ajax a listas.php y carga
un dropdown (select) usando los elementos de la lista devuelta---*/

function cargarDropdown(select, tipoAListar){
  $.ajax({
    url:"./listas.php",
    type:"GET",
    dataType:"json",
    data:{
      tipoAListar:tipoAListar
    },
    error:function(data){
      console.log(data);
      alert("Se ha producido un error al enviar la petición.");
    }
  }).done(function(data){
    for(var i=0; i < data.listaElementos.length; i++){
      var elemento = data.listaElementos[i];
      var opcion = $("<option>");
      opcion.attr("value", elemento);
      opcion.html(elemento);
      select.append(opcion);
    }
    select.material_select();
  })
}

/*---Esta función muestra los registros inmuebles enviados por parámetros
en la página en la sección correspondiente---*/
function mostrarRegistros(registros){

  //Limpiamos los registros anteriores
  $("#resultados").html("");

  for(var i=0; i<registros.length; i++){
    var reg = registros[i];

    //Creamos el card que mostrará el registro (Una image card horizontal)
    var card = $('<div class="itemMostrado card horizontal">');

    var cardImage = $('<div class="card-image">');
    var imagen = $('<img src="./img/home.jpg">');
    cardImage.append(imagen);
    card.append(cardImage);

    var cardStacked = $('<div class="card-stacked">');
    card.append(cardStacked);

    //Colocamos los datos del registro en el card-content
    var cardContent = $('<div class="card-content">');
    cardContent.append(`<b>Dirección: </b>${reg.Direccion}<br>`);
    cardContent.append(`<b>Ciudad</b>: ${reg.Ciudad}<br>`);
    cardContent.append(`<b>Teléfono: </b>${reg.Telefono}<br>`);
    cardContent.append(`<b>Tipo: </b>${reg.Tipo}<br>`);
    cardContent.append(`<b>Precio: </b><span class="precioTexto">${reg.Precio}</span><br>`)
    cardStacked.append(cardContent);

    var cardAction = $('<div class="card-action">');
    cardAction.html("<a href=''>Ver más</a>");
    cardStacked.append(cardAction);

    //Agregamos el card a la lista de resultados
    $("#resultados").append(card);
  }
}

$(function(){
  //============Inicialización===============
  inicializarSlider();
  playVideoOnScroll(); //??? El video no venía con el descargable ???
  //============Cargado de listas============
  cargarDropdown($("#selectCiudad"), "ciudad");
  cargarDropdown($("#selectTipo"), "tipo");
  //=========================================

  //Al realizar una búsqueda personalizada (botón Buscar)
  $('#formulario').submit(function(event){
    event.preventDefault();

    //Capturamos los datos de los distintos filtros
    var ciudad = $("#selectCiudad option:selected").val();
    var tipo = $("#selectTipo option:selected").val();
    var rangoPrecio = $("#rangoPrecio").val();

    //Hacemos la petición
    $.ajax({
      url:"./buscador.php",
      type:"GET",
      dataType:"json",
      data:{
        busquedaPersonalizada:"true",
        rangoPrecio:rangoPrecio,
        tipo:tipo,
        ciudad:ciudad
      },
      error:function(data){
        console.log(data);
        alert("Se ha producido un error al enviar la petición.");
      }
    }).done(function(data){
      console.log(data.mensaje);
      mostrarRegistros(data.resultadosBusqueda);
    });
  });

//Al realizar una búsqueda completa (botón Mostrar Todos)
  $('#mostrarTodos').on('click', function(event){
    //Hacemos la petición
    $.ajax({
      url:"./buscador.php",
      type:"GET",
      dataType:"json",
      data:{
        busquedaPersonalizada:"false"
      },
      error:function(data){
        console.log(data);
        alert("Se ha producido un error al enviar la petición.");
      }
    }).done(function(data){
      console.log(data.mensaje);
      mostrarRegistros(data.resultadosBusqueda);
    });
  });

});
