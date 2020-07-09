<?php
// z5r/server/api?method=sample_method&params=some_params1
include_once ('functions.php');

// echo $_GET['method'];
if ($_GET['method'] == 'log_out') {
    setcookie('login', null, -1, '/'); 
    
    echo '<script>
        window.location.href = "/client/index.html?#";
        </script>';
} 