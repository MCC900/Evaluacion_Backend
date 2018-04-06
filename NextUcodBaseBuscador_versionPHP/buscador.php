<?php
  $busquedaPersonalizada = $_GET["busquedaPersonalizada"];

  if($busquedaPersonalizada == "true"){
    $respuesta["mensaje"] = "Busqueda personalizada realizada";
  } else {
    $respuesta["mensaje"] = "Busqueda completa realizada";

    $archivo = fopen("./data-1.json", "r");
    $data_leida = fread($archivo, filesize("./data-1.json"));
    $data = json_decode($data_leida, true);
    $respuesta["resultadosBusqueda"] = $data;
  }
  echo json_encode($respuesta);

?>
