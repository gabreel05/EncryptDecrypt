<?php
  $message = $_POST["message"];
  
  $decoded_message = base64_decode($message);

  $private_key_content = file_get_contents("./private_key.pem");
  $private_key = openssl_pkey_get_private($private_key_content);

  $decrypted = "";

  openssl_private_decrypt($decoded_message, $decrypted, $private_key);

  echo $decrypted;
?>
