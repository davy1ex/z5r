<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once ('/server/functions.php');

// include_once ('server/methods.php');



// if ( !login() ) { // если не авторизирован
//     if (isset($_POST['log_in'])) { // Если нажажа кнопка авторизации
//         $error = enter();

//         if (count($error) != 0) {
//             print($error);
//         }
//     }
// }

echo '<script>
        window.location.href = "/client/index.html?#";
        </script>';
// echo date('l jS \of F Y h:i:s A');