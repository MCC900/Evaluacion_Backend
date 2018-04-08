<?php

  //Devuelve true si una existencia de $valor ya se encuentra en $array
  function estaEnArray($array, $valor){
    foreach($array as $i => $valor2){
      if($valor == $valor2){
        return true;
      }
    }
    return false;
  }

  //Devuelve un array conteniendo todos los valores (no repetidos) existentes para el atributo
  //especificado en $data. Por ejemplo "Ciudad" devuelve "Casa de Campo", "Casa" y "Apartamento"
  function encontrarValoresAtributo($data, $atributo){
    $array = array();
    foreach($data as $indice => $entrada){
      if(estaEnArray($array, $entrada[$atributo]) == false){
        array_push($array, $entrada[$atributo]);
      }
    }
    sort($array);
    return $array;
  }

  //==========Manejo de la petición============
  $tipoAListar = $_GET["tipoAListar"];
  $archivo = fopen("./data-1.json", "r");
  $data_leida = fread($archivo, filesize("./data-1.json"));
  $data = json_decode($data_leida, true);

  $respuesta;

  if($tipoAListar == "ciudad"){
    //Devolvemos la lista de ciudades (sin repetidos)
    $respuesta["listaElementos"] = encontrarValoresAtributo($data, "Ciudad");
  } elseif ($tipoAListar == "tipo"){
    //Devolvemos la lista de tipos (sin repetidos)
    $respuesta["listaElementos"] = encontrarValoresAtributo($data, "Tipo");
  }

  echo json_encode($respuesta);
?>
