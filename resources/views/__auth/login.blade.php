<!DOCTYPE html>
<html dir="ltr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('assets/images/logo-ico.ico') }}"> -->

    <title>Login | Admin</title>

    <link href="{{ asset('app/dist/css/style.min.css') }}" rel="stylesheet">
    <link href="{{ asset('app/dist/css/custom.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/libs/toastr/build/toastr.min.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/libs/loaders/loaders.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/libs/loaders/loaders-palette.css') }}" rel="stylesheet">

</head>

<body>
    <div class="main-wrapper">

        <div class="auth-wrapper d-flex no-block justify-content-center align-items-center"
            style="background:url('{{ asset('assets/images/background_vending.jpg')}}') no-repeat center ; background-size:cover; background-attachment: fixed;">
            <div class="auth-box">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6 bg-info text-white"
                                style="background:url('{{ asset('assets/images/bg.png')}}')">
                                <div id="logininfo">
                                    <h2 class="text-center mt-5 font-weight-bold">PT. Mida Karya Abadi</h2>
                                    <!-- <p class="text-justify mt-4">Digital Passenger adalah sarana bagi para pengusaha
                                        otobus untuk memperluas jangkuan dan mempermudah akses antar penumpang maupun
                                        pihak internal ciptakan sinergi bersama Dipass yang di kelola oleh Kemenhub</p> -->
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div id="loginform">
                                    <div class="logo">
                                        <!-- <span class="db"><img class="img-responsive"
                                                src="{{ asset('assets/images/logo-dipass-navbar2.png') }}"
                                                style="width:180px;" alt="logo" /></span> -->
                                        <!-- <h5 class="font-medium m-b-20">-- DIPASS PROVIDER --</h5> -->
                                    </div>
                                    <!-- Form -->
                                    <div class="row">
                                        <div class="col-12">
                                            <form class="form-horizontal m-t-20" id="form_login">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon1"><i
                                                                class="ti-user"></i></span>
                                                    </div>
                                                    <input type="text" name="email" id="email"
                                                        class="form-control form-control-lg"
                                                        placeholder="{{ __('Email') }}" aria-label="Username"
                                                        aria-describedby="basic-addon1" autocomplete="off">
                                                </div>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon2"><i
                                                                class="ti-pencil"></i></span>
                                                    </div>
                                                    <input type="password" name="password" id="password"
                                                        class="form-control form-control-lg"
                                                        placeholder="{{ __('Password') }}" aria-label="Password"
                                                        aria-describedby="basic-addon1">
                                                </div>

                                                <!-- <div class="input-group mb-3 ml-3">
                                                    <div class="g-recaptcha" name="captcha" data-sitekey="6LcIpVwbAAAAAMDvWRM4RFRaGwFh4T5-bws6z-ND"></div>
                                                </div> -->

                                                <div class="form-group row">
                                                    <div class="col-md-6 col-sm-12 text-center">
                                                        <div class="custom-control custom-checkbox">
                                                            <input type="checkbox"
                                                                class="custom-control-input show-password"
                                                                id="customCheck1">
                                                            <label class="custom-control-label"
                                                                for="customCheck1">{{ __('Show Password')}}</label>

                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12 text-center">
                                                        <a href="javascript:void(0)" id="to-recover"
                                                            class="text-dark"><i class="fa fa-lock m-r-5"></i>
                                                            {{ __('Forgot Password') }}?</a>
                                                    </div>
                                                </div>
                                                <div class="form-group text-center">
                                                    <div class="col-xs-12 p-b-20">
                                                        @csrf
                                                        <button class="btn btn-block btn-lg btn-info" type="submit"
                                                            id="btn_submit">{{ __('Log In')}}</button>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 m-t-10 text-center">
                                                        <div class="social">
                                                            <a href="{{ url('lang/id') }}" class="btn"
                                                                data-toggle="tooltip" title=""
                                                                data-original-title="Indonesia"> <i
                                                                    class="flag-icon flag-icon-id" title="id"
                                                                    id="id"></i> ID </a>
                                                            <a href="{{ url('lang/en') }}" class="btn"
                                                                data-toggle="tooltip" title=""
                                                                data-original-title="English"> <i
                                                                    class="flag-icon flag-icon-us" title="us"
                                                                    id="us"></i> EN </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div id="recoverform">
                                    <div class="logo m-t-20">
                                        <span class="db"><img src="{{ asset('assets/images/logo-dipass-navbar2.png') }}"
                                                style="width:180px;" alt="logo" /></span>
                                        <h5 class="font-medium m-b-20">{{ __('Recover Password') }}</h5>
                                        <!-- <span>{{ __('Reset Word') }}</span> -->
                                    </div>
                                    <div class="row m-t-20">

                                        <form class="col-12" action="index.html">

                                            <div class="form-group row">
                                                <div class="col-12">
                                                    <input class="form-control form-control-lg" type="email" required=""
                                                        placeholder="{{ __('Email') }}">
                                                </div>
                                            </div>

                                            <div class="row m-t-20">
                                                <div class="col-12">
                                                    <button class="btn btn-block btn-lg btn-danger" type="submit"
                                                        name="action">Reset</button>
                                                    <button class="btn btn-block btn-lg btn-warning" id="to-login"
                                                        type="button" name="action">{{ __('Back') }}</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <script src="{{ asset('assets/libs/jquery/dist/jquery.min.js') }}"></script>
    <script src="{{ asset('assets/libs/popper.js/dist/umd/popper.min.js') }}"></script>
    <script src="{{ asset('assets/libs/bootstrap/dist/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('assets/libs/jquery-validation/dist/jquery.validate.min.js') }}"></script>
    <script src="{{ asset('assets/libs/block-ui/jquery.blockUI.js') }}"></script>
    <script src="{{ asset('assets/libs/toastr/build/toastr.min.js') }}"></script>

    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>

    <script src="{{ asset('src/setting.js') }}"></script>
    <script src="{{ asset('src/auth.js') }}"></script>
    <script>
    AuthController.init()
    </script>
</body>

</html>