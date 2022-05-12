
<!DOCTYPE html>
<html dir="ltr" lang="id">

<head>
    <title>@yield('title') | Dipass Provider</title>

    @yield('css-source')
    
    <link href="{{ asset('app/dist/css/style.css') }}" media="all" rel="stylesheet">
    <link href="{{ asset('app/dist/css/custom.css') }}" media="all" rel="stylesheet">

    @yield('custom-style')
</head>

<body>
    <div id="main-wrapper">
        @yield('content')
    </div>

    <script src="{{ asset('assets/libs/jquery/dist/jquery.min.js') }}"></script>
    <script src="{{ asset('assets/libs/popper.js/dist/umd/popper.min.js') }}"></script>
    <script src="{{ asset('assets/libs/bootstrap/dist/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('app/dist/js/app.js') }}"></script>
    <script src="{{ asset('app/dist/js/app.init.mini-sidebar.js') }}"></script>
    <script src="{{ asset('app/dist/js/app-style-switcher.js') }}"></script>
    <script src="{{ asset('assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js') }}"></script>
    <script src="{{ asset('assets/extra-libs/sparkline/sparkline.js') }}"></script>
    <script src="{{ asset('app/dist/js/waves.js') }}"></script>
    <script src="{{ asset('app/dist/js/custom.js') }}"></script>

    <script src="{{ asset('src/setting.js') }}"></script>
    
    @yield('js-source')
    
</body>

</html>