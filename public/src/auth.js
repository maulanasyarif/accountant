const AuthController = (SET => {
    const __additionFunction = () => {
        $('[data-toggle="tooltip"]').tooltip();

        $(".preloader").fadeOut();

        $("#to-recover").on("click", function() {
            $("#loginform").slideUp();
            $("#recoverform").fadeIn();
        });

        $("#to-login").on("click", function() {
            $("#loginform").fadeIn();
            $("#recoverform").slideUp();
        });
    };

    const __showPassword = () => {
        $(".show-password").on("click", function() {
            if ($(this).is(":checked")) {
                $("#password").attr("type", "text");
            } else {
                $("#password").attr("type", "password");
            }
        });
    };

    const __submitLogin = () => {
        $("#form_login").validate({
            errorClass: "is-invalid",
            successClass: "is-valid",
            validClass: "is-valid",
            errorElement: "div",
            errorPlacement: function(error, element) {
                error.addClass("invalid-feedback");
                error.insertAfter(element);
            },
            rules: {
                email: "required",
                password: "required"
                // captcha: "required",
            },
            submitHandler: form => {
                // var captcha = grecaptcha.getResponse();
                // if (captcha.length == 0 ) {
                //     toastr.error("Failed","Captcha is Required", SET.__bottomNotif());
                // } else {
                $.ajax({
                    url: `${SET.__baseURL()}authenticate`,
                    type: "POST",
                    dataType: "JSON",
                    data: $(form).serialize(),
                    beforeSend: xhr => {
                        SET.__buttonLoader("#btn_submit");
                    },
                    success: res => {
                        window.location.href = `${SET.__baseURL()}dashboard`;
                    },
                    error: err => {
                        let error = err.responseJSON;

                        toastr.error(
                            "Failed",
                            error.message,
                            SET.__bottomNotif()
                        );
                    },
                    complete: () => {
                        SET.__closeButtonLoader("#btn_submit");
                    }
                });
                // }
            }
        });
    };

    return {
        init: () => {
            __additionFunction();
            __showPassword();
            __submitLogin();
        }
    };
})(SettingController);
