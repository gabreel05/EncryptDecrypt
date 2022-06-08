<?php
  $message = $_POST["message"];

  $private_key_content = file_get_contents("./private_key.pem");
  $private_key = openssl_pkey_get_private($private_key_content);

  openssl_private_decrypt($message, $data, $private_key);

  echo $data;
?>
