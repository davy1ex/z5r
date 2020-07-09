<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once ('server/functions.php');



if ( !login() ) {
    if (isset($_POST['log_in'])) { // Если нажажа кнопка авторизации
        $error = enter();

        if (count($error) != 0) {
            print($error);
        }
    }
}

// include ('client/index.html');
echo '<script>
window.location.href = "/client/index.html";
</script>';