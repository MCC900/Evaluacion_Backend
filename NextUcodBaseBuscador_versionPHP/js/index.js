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


$(function(){
  //============Inicialización===============
  inicializarSlider();
  playVideoOnScroll();
  //============Cargado de listas============
  cargarDropdown($("#selectCiudad"), "ciudad");
  cargarDropdown($("#selectTipo"), "tipo");
  //=========================================

  //Al realizar una búsqueda personalizada (botón Buscar)
  $('#formulario').submit(function(event){
    event.preventDefault();

    $.ajax({
      url:"./buscador.php",
      type:"GET",
      dataType:"json",
      data:{
        busquedaPersonalizada:"true"
      }
    }).done(function(data){
      alert(data.mensaje);
    });
  });

//Al realizar una búsqueda completa (botón Mostrar Todos)
  $('#mostrarTodos').on('click', function(event){
    $.ajax({
      url:"./buscador.php",
      type:"GET",
      dataType:"json",
      data:{
        busquedaPersonalizada:"false"
      }
    }).done(function(data){
      alert(data.mensaje);
    });
  });

});
