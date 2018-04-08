<?php
  $busquedaPersonalizada = $_GET["busquedaPersonalizada"];

  if($busquedaPersonalizada == "true"){

    //=====================BÚSQUEDA PERSONALIZADA=====================
    $respuesta["mensaje"] = "Busqueda personalizada realizada. Parámetros: ";

    $ciudad = $_GET["ciudad"];
    $tipo = $_GET["tipo"];
    $rangoPrecio = $_GET["rangoPrecio"];

    $respuesta["mensaje"] .= "CIUDAD: ".$ciudad.", TIPO: ".$tipo.", PRECIO ENTRE: ".$rangoPrecio;

    //Leemos todas las entradas
    $archivo = fopen("./data-1.json", "r");
    $data_leida = fread($archivo, filesize("./data-1.json"));
    $data = json_decode($data_leida, true);


    $resultadosCoincidentes = array();
    /* Recorremos todas las entradas y agregamos los resultados que coincidan con
    los filtros especificados al array $resultadosCoincidentes */
    foreach($data as $i => $entrada){

      $pasaFiltro = true;
      //Si Ciudad no coincide
      if($ciudad != "" && $entrada["Ciudad"] != $ciudad){
        $pasaFiltro = false;
      }
      //Si Tipo no coincide
      if($pasaFiltro == true && $tipo != "" && $entrada["Tipo"] != $tipo){
        $pasaFiltro = false;
      }

      //Si Precio no está en rango
      if($pasaFiltro == true && $rangoPrecio != ""){
        //Separamos el string $rangoPrecio para obtener el mínimo y el máximo en variables separadas
        $minMax = explode(";", $rangoPrecio);
        $minPrecio = $minMax[0];
        $maxPrecio = $minMax[1];

        $precio = substr($entrada["Precio"],1); //Eliminamos el símbolo $
        $precio = str_replace(",", "", $precio);//Eliminamos la coma ","

        //Verificamos que el valor se encuentre dentro del rango
        if($precio < $minPrecio || $precio > $maxPrecio){
          $pasaFiltro = false;
        }
      }

      if($pasaFiltro == true){
        //Agregamos la entrada a los resultados
        array_push($resultadosCoincidentes, $entrada);
      }

      $respuesta["resultadosBusqueda"] = $resultadosCoincidentes;
    }

  } else {

    //=====================BÚSQUEDA COMPLETA=====================
    $respuesta["mensaje"] = "Busqueda completa realizada";

    //Leemos todos los datos
    $archivo = fopen("./data-1.json", "r");
    $data_leida = fread($archivo, filesize("./data-1.json"));
    $data = json_decode($data_leida, true);

    $respuesta["resultadosBusqueda"] = $data;
  }
  echo json_encode($respuesta);

?>
