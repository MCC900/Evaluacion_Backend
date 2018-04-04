<?php
  $busquedaPersonalizada = $_GET["busquedaPersonalizada"];

  if($busquedaPersonalizada == "true"){
    $respuesta["mensaje"] = "Busqueda personalizada realizada";
  } else {
    $respuesta["mensaje"] = "Busqueda completa realizada";
  }
  echo json_encode($respuesta);

?>
