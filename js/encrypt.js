$(document).ready(function () {
  const publicKey =
    "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHg90Bum5Dt6pehLydEulybX7fo28B6PJbEIgELfRxeeMgxES4hR6Kv0A2zDFKxzJlQEUCD4s/fc6Lkqf6Fe4Rn78tO9NyQcDNed26/ApdB2A9P7rk21Pj+IxivnfHP3BehfAriN3vFDt6IlXdczPlG/em1fB/kFjSoYzWGxfkwQIDAQAB-----END PUBLIC KEY-----";

  function encrypt(data) {
    const message = JSON.stringify(data).toString();

    const secret = CryptoJS.lib.WordArray.random(256);
    const salt = CryptoJS.lib.WordArray.random(16);

    const key = CryptoJS.PBKDF2(secret, salt, {
      keySize: 8,
      iterations: 1000
    });
    const iv = CryptoJS.lib.WordArray.random(16);

    const encryptedMessage = CryptoJS.AES.encrypt(message, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });

    const Encryptor = new JSEncrypt();
    Encryptor.setPublicKey(publicKey);
    const doubleEncryptedMessage = Encryptor.encrypt(encryptedMessage);

    const encodedMessage = btoa(doubleEncryptedMessage);

    $("#login").click(function () {
      message = encrypt($("form").serialize());

      $.ajax({
        type: "POST",
        dataType: "JSON",
        url: "php/decrypt.php",
        data: {
          message: encodedMessage,
          key: key,
          iv: iv
        },
        success: function (response) {
          console.log(response);
        }
      });
    });
  }

  $("#login").click(function () {
    message = encrypt($("form").serialize());

    $.ajax({
      type: "POST",
      dataType: "JSON",
      url: "php/decrypt.php",
      data: {
        message: message
      },
      success: function (response) {
        console.log(response);
      }
    });
  });
});
