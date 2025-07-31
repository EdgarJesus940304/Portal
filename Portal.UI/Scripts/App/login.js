$(function () {

    //#region Clases
    function UserModel() {
        this.UserName = null;
        this.Password = null;
    }
    //#endregion

    var model = new UserModel();

    //#region Acciones

    $("#login").on("click", function () {
        Login();
    });
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        Login();
    });
    $("#logOut").on("click", function () {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se cerrará tu sesión.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        }).then((result) => {
            if (result.isConfirmed) {
                LogOut();
            }
        });
    });
    //#endregion

    //#region Validaciones
    function Validate() {
        if (IsNullOrUndefined(model.UserName)) {
            Swal.fire({
                title: '¡Error!',
                text: "Favor de capturar usuario",
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return false;
        }
        if (IsNullOrUndefined(model.Password)) {
            Swal.fire({
                title: '¡Error!',
                text: "Favor de capturar contraseña",
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return false;
        }

        return true;
    }

    function Login() {
        model.UserName = $("#userkey").val();
        model.Password = $("#userPassword").val();
        if (!Validate())
            return;
        $.ajax('/Login/Login',
            {
                type: 'POST',
                data: { userModel: model },
                beforeSend: function () {
                    Swal.fire({
                        title: 'Validando creedenciales...',
                        html: 'Espere un momento',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                },
                success: function (response) {
                    if (response.Number != 200) {
                        Swal.close();
                        Swal.fire({
                            title: '¡Error!',
                            text: response.Message,
                            icon: 'warning',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        window.location.href = "/Users";
                    }
                },
                error: function (error) {
                    Swal.close();
                    var errorMessage = error.responseJSON.Message || 'Ocurrió un error inesperado.';
                    Swal.fire({
                        title: '¡Error!',
                        text: errorMessage,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });
    }

    function LogOut() {
        $.ajax('/Login/LogOut',
            {
                type: 'GET',
                data: { userModel: model },
                success: function (response) {
                    if (response.Number == 200) {
                        window.location.href = "/Login";
                    } else {
                        var errorMessage = response.responseJSON.Message || 'Ocurrió un error inesperado.';
                        Swal.fire({
                            title: '¡Error!',
                            text: errorMessage,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                },
                error: function (error) {                   
                    var errorMessage = error.responseJSON.Message || 'Ocurrió un error inesperado.';
                    Swal.fire({
                        title: '¡Error!',
                        text: errorMessage,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });
    }
    //#endregion

});