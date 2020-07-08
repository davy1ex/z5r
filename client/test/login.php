<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test_login</title>
</head>
<body>
    <form action="/server/modules/login.php" method="post">
        <div class="login-field">
            login
            <input type="text" name="login">
        </div>
        <div class="pass-field">
            password
            <input type="password" name="pass">
        </div>
        <div class="btn-login">
            <input type="submit" value="login" name="log_in">
        </div>
    </form>
    
</body>
</html>