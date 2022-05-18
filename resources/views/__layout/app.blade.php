<!DOCTYPE html>
<html dir="ltr" lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="master-author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('assets/images/logo-ico.ico') }}"> -->

    <title>@yield('title')</title>

    @yield('css-source')

    <link href="{{ asset('assets/libs/toastr/build/toastr.min.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/libs/loaders/loaders.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/libs/loaders/loaders-palette.css') }}" rel="stylesheet">
    <link href="{{ asset('app/dist/css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('app/dist/css/custom.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/extra-libs/jvector/jquery-jvectormap-2.0.2.css') }}" rel="stylesheet">

    <link href="{{ asset('assets/libs/chart.js/dist/Chart.min.css') }}" rel="stylesheet">
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.css" integrity="sha512-SUJFImtiT87gVCOXl3aGC00zfDl6ggYAw5+oheJvRJ8KBXZrr/TMISSdVJ5bBarbQDRC2pR5Kto3xTR0kpZInA==" crossorigin="anonymous" /> -->

    @yield('custom-style')
</head>

<body>
    <!-- <div class="preloader">
        <div class="lds-ripple">
            <img src="{{ asset('assets/images/bus.gif') }}" alt="">
        </div>
    </div> -->

    <div id="main-wrapper">

        <header class="topbar">
            <nav class="navbar top-navbar navbar-expand-md navbar-dark">
                <div class="navbar-header">
                    <a class="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
                        <i class="ti-menu ti-close"></i>
                    </a>

                    <div class="navbar-brand">
                        <a href="{{ url('dashboard') }}" class="logo">
                            <!-- <b class="logo-icon">
                                <img src="{{ asset('assets/images/logo-ico.png') }}" alt="homepage" class="dark-logo" />
                                <img src="{{ asset('assets/images/logo-ico.png') }}" alt="homepage"
                                    class="light-logo" />
                            </b> -->

                            <!-- <span class="logo-text">
                                <img src="{{ asset('assets/images/logo-dipass-white.png') }}" alt="homepage"
                                    class="dark-logo" />
                                <img src="{{ asset('assets/images/logo-dipass-dark.png') }}" class="light-logo"
                                    alt="homepage" />
                            </span> -->
                        </a>
                        <a class="sidebartoggler d-none d-md-block" href="javascript:void(0)"
                            data-sidebartype="mini-sidebar">
                            <i class="mdi mdi-toggle-switch mdi-toggle-switch-off font-20"></i>
                        </a>
                    </div>

                    <a class="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)"
                        data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="ti-more"></i>
                    </a>
                </div>

                <div class="navbar-collapse collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav float-left mr-auto">
                    </ul>

                    <ul class="navbar-nav float-right">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle waves-effect waves-dark" href="" id="2"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="flag-icon flag-icon-{{ app()->getLocale() === 'id' ? 'id' : 'us' }}"
                                    title="{{ app()->getLocale() === 'id' ? 'id' : 'us' }}"
                                    id="{{ app()->getLocale() === 'id' ? 'id' : 'us' }}"></i>
                                {{ strtoupper(app()->getLocale()) }}
                            </a>
                            <div class="dropdown-menu dropdown-menu-right mailbox animated bounceInDown"
                                aria-labelledby="2">
                                <span class="with-arrow ">
                                    <span class="bg-blue" style="background-color:#301d6e;"></span>
                                </span>
                                <ul class="list-style-none">
                                    <li>
                                        <div class="drop-title text-white bg-blue">
                                            <h4 class="m-b-0 m-t-5">{{ __('Pilih Bahasa') }}</h4>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="message-center message-body" style="height: auto">
                                            <a href="{{ url('lang/id') }}" class="message-item">
                                                <div class="mail-contnet">
                                                    <i class="flag-icon flag-icon-id" title="id" id="id"></i> Indonesia
                                                </div>
                                            </a>
                                            <a href="{{ url('lang/en') }}" class="message-item">
                                                <div class="mail-contnet">
                                                    <i class="flag-icon flag-icon-us" title="us" id="us"></i> English
                                                </div>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item dropdown border-right">
                            <a class="nav-link dropdown-toggle waves-effect waves-dark" href="" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i class="mdi mdi-bell-outline font-22"></i>
                                <span class="badge badge-pill badge-info noti">3</span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right mailbox animated bounceInDown">
                                <span class="with-arrow">
                                    <span class="bg-blue" style="background-color:#301d6e;"></span>
                                </span>
                                <ul class="list-style-none">
                                    <li>
                                        <div class="drop-title bg-blue text-white">
                                            <h4 class="m-b-0 m-t-5">4 New</h4>
                                            <span class="font-light">Notifications</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="message-center notifications">
                                            <a href="javascript:void(0)" class="message-item">
                                                <span class="btn btn-danger btn-circle">
                                                    <i class="fa fa-link"></i>
                                                </span>
                                                <div class="mail-contnet">
                                                    <h5 class="message-title">Luanch Admin</h5>
                                                    <span class="mail-desc">Just see the my new admin!</span>
                                                    <span class="time">9:30 AM</span>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="message-item">
                                                <span class="btn btn-success btn-circle">
                                                    <i class="ti-calendar"></i>
                                                </span>
                                                <div class="mail-contnet">
                                                    <h5 class="message-title">Event today</h5>
                                                    <span class="mail-desc">Just a reminder that you have
                                                        event</span>
                                                    <span class="time">9:10 AM</span>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="message-item">
                                                <span class="btn btn-info btn-circle">
                                                    <i class="ti-settings"></i>
                                                </span>
                                                <div class="mail-contnet">
                                                    <h5 class="message-title">Settings</h5>
                                                    <span class="mail-desc">You can customize this template as you
                                                        want</span>
                                                    <span class="time">9:08 AM</span>
                                                </div>
                                            </a>
                                            <a href="javascript:void(0)" class="message-item">
                                                <span class="btn btn-primary btn-circle">
                                                    <i class="ti-user"></i>
                                                </span>
                                                <div class="mail-contnet">
                                                    <h5 class="message-title">Pavan kumar</h5>
                                                    <span class="mail-desc">Just see the my admin!</span>
                                                    <span class="time">9:02 AM</span>
                                                </div>
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <a class="nav-link text-center m-b-5 text-dark" href="javascript:void(0);">
                                            <strong>{{ __('Lihat semua notifikasi') }}</strong>
                                            <i class="fa fa-angle-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle waves-effect waves-dark pro-pic" href=""
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <span
                                    class="m-l-5 font-medium d-none d-sm-inline-block text-default">{{ Session::get('admin-auth.user')->name }}
                                    <i class="mdi mdi-chevron-down"></i></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                                <span class="with-arrow">
                                    <span class="bg-blue" style="background-color:#301d6e;"></span>
                                </span>
                                <div class="d-flex no-block align-items-center p-15 bg-blue text-white m-b-10">
                                    <div class="">

                                    </div>
                                    <div class="m-l-10">
                                        <h4 class="m-b-0 text-white">{{ Session::get('admin-auth.user')->name }}
                                        </h4>
                                        <p class=" m-b-0 text-white">-- {{ Session::get('admin-auth.user')->role }}
                                            --</p>
                                    </div>
                                </div>
                                <div class="profile-dis scrollable">
                                    <!-- {{-- <a class="dropdown-item" href="javascript:void(0)">
                                        <i class="ti-email m-r-5 m-l-5"></i> Inbox</a>
                                    <div class="dropdown-divider"></div> --}}
                                    <a class="dropdown-item" href="{{ url('profile') }}">
                                        <i class="ti-settings m-r-5 m-l-5"></i> Account Setting</a>
                                    <div class="dropdown-divider"></div> -->
                                    <a class="dropdown-item" id="logout" href="javascript:void(0)">
                                        <i class="fa fa-power-off m-r-5 m-l-5"></i> Logout</a>
                                    <div class="dropdown-divider"></div>
                                </div>
                                <!-- <div class="p-l-30 p-10">
                                    <a href="javascript:void(0)" class="btn btn-sm btn-success btn-rounded">View Profile</a>
                                </div> -->
                            </div>
                        </li>

                    </ul>
                </div>
            </nav>
        </header>

        <aside class="left-sidebar">
            <div class="scroll-sidebar">
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <li class="nav-small-cap">
                            <i class="mdi mdi-dots-horizontal"></i>
                            <span class="hide-menu">Personal</span>
                        </li>
                        <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                href="{{ url('dashboard') }}" aria-expanded="false"><i
                                    class="mdi mdi-av-timer"></i><span
                                    class="hide-menu text-white">{{ __('Dasbor') }}</span></a></li>

                        <li class="nav-small-cap">
                            <i class="mdi mdi-dots-horizontal"></i>
                            <span class="hide-menu">{{ __('MASTER') }}</span>
                        </li>

                        @if(Session::get('admin-auth.user')->role == 'MASTER')
                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark"
                                href="javascript:void(0)" aria-expanded="false"><span
                                    class="hide-menu text-white">Manajemen Perkiraan</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('Corporate') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Corporate') }}</span></a></li>
                                <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('Account') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Account') }}</span></a></li>
                            </ul>
                        </li>

                        @elseif(Session::get('admin-auth.user')->role == 'ADMIN')
                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark"
                                href="javascript:void(0)" aria-expanded="false"><span
                                    class="hide-menu text-white">Manajemen Cabang</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('cabang') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Cabang') }}</span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark"
                                href="javascript:void(0)" aria-expanded="false"><span
                                    class="hide-menu text-white">Manajemen Kegiatan</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <!-- <li class="sidebar-item">
                                <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                    href="{{ url('kegiatanAdmin') }}" aria-expanded="false"><i
                                        class="mdi mdi-receipt"></i><span
                                        class="hide-menu text-white">{{ __('Kegiatan') }}</span>
                                </a>
                            </li> -->
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('pengajuanAdmin') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Pengajuan') }}</span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <!-- <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark"
                            href="javascript:void(0)" aria-expanded="false"><span
                                class="hide-menu text-white">Manajemen Keuangan</span></a>
                        <ul aria-expanded="false" class="collapse first-level">
                            <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                    href="{{ url('perkiraanCabang') }}" aria-expanded="false"><i
                                        class="mdi mdi-receipt"></i><span
                                        class="hide-menu text-white">{{ __('Perkiraan') }}</span></a></li>
                            <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                    href="{{ url('daftarPerkiraanCabang') }}" aria-expanded="false"><i
                                        class="mdi mdi-receipt"></i><span
                                        class="hide-menu text-white">{{ __('Daftar Perkiraan') }}</span></a></li>
                            <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                    href="{{ url('jurnalUmumCoorporate') }}" aria-expanded="false"><i
                                        class="mdi mdi-receipt"></i><span
                                        class="hide-menu text-white">{{ __('Jurnal Umum') }}</span></a></li>
                        </ul>
                    </li> -->

                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark"
                                href="javascript:void(0)" aria-expanded="false"><span
                                    class="hide-menu text-white">Manajemen Inventory</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('inventoryAdmin') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Data Inventory') }}</span>
                                    </a>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('transaksiInventory') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Data Transaksi') }}</span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        @elseif(Session::get('admin-auth.user')->role == 'CABANG')
                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark"
                                href="javascript:void(0)" aria-expanded="false"><span
                                    class="hide-menu text-white">Manajemen Keuangan</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('perkiraanCabang') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Perkiraan') }}</span></a></li>
                                <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('daftarPerkiraanCabang') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Daftar Perkiraan') }}</span></a></li>
                                <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('jurnalUmumCabang') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Jurnal Umum') }}</span></a></li>
                                <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('bukuKas') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Buku Kas') }}</span></a></li>
                            </ul>
                        </li>

                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark"
                                href="javascript:void(0)" aria-expanded="false"><span
                                    class="hide-menu text-white">Manajemen Kegiatan</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('kegiatanCabang') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Kegiatan') }}</span>
                                    </a>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('pengajuanCabang') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Pengajuan') }}</span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark"
                                href="javascript:void(0)" aria-expanded="false"><span
                                    class="hide-menu text-white">Data Inventory</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="{{ url('inventoryCabang') }}" aria-expanded="false"><i
                                            class="mdi mdi-receipt"></i><span
                                            class="hide-menu text-white">{{ __('Inventory') }}</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        @endif
                    </ul>
                </nav>
            </div>
        </aside>

        <div class="page-wrapper">

            @yield('content')

            <!-- <div class="navbar fixed-bottom"> -->
                <footer class="footer text-center">
                    All Rights Reserved by PT. Mida Karya Abadi.
                </footer>
            <!-- </div> -->

        </div>
    </div>

    <aside class="customizer">
        <a href="javascript:void(0)" class="service-panel-toggle"><i class="fa fa-spin fa-cog"></i></a>
        <div class="customizer-body">
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade p-15 show active" id="pills-contact" role="tabpanel"
                    aria-labelledby="pills-contact-tab">
                    <h6 class="m-t-20 m-b-20">Activity Timeline</h6>
                    <div id="sidebar_log">
                        <div class="text-center">
                            <i class="fa fa-spinner fa-spin fa-3x mb-3"></i>
                            <h6>Loading...</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>

    <script src="{{ asset('assets/libs/jquery/dist/jquery.min.js') }}"></script>
    <script src="{{ asset('assets/libs/popper.js/dist/umd/popper.min.js') }}"></script>
    <script src="{{ asset('assets/libs/bootstrap/dist/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('app/dist/js/app.js') }}"></script>
    <script src="{{ asset('app/dist/js/app.init.mini-sidebar.js') }}"></script>
    <script src="{{ asset('app/dist/js/app-style-switcher.js') }}"></script>
    <script src="{{ asset('assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js') }}"></script>
    <script src="{{ asset('assets/extra-libs/sparkline/sparkline.js') }}"></script>
    <script src="{{ asset('app/dist/js/waves.js') }}"></script>
    <script src="{{ asset('app/dist/js/sidebarmenu.js') }}"></script>
    <script src="{{ asset('app/dist/js/custom.js') }}"></script>
    <script src="{{ asset('assets/libs/jquery-ui/jquery-ui.js') }}"></script>

    <script src="{{ asset('assets/libs/jquery-qrcode/src/jquery.qrcode.js') }}"></script>
    <script src="{{ asset('assets/libs/jquery-qrcode/src/qrcode.js') }}"></script>

    <script src="{{ asset('assets/libs/block-ui/jquery.blockUI.js') }}"></script>
    <script src="{{ asset('assets/libs/toastr/build/toastr.min.js') }}"></script>
    <script src="{{ asset('assets/libs/jquery-validation/dist/jquery.validate.min.js') }}"></script>
    <script src="{{ asset('assets/libs/moment/moment.js') }}"></script>
    <script src="{{ asset('assets/extra-libs/jvector/jquery-jvectormap-2.0.2.min.js') }}"></script>
    <script src="{{ asset('assets/extra-libs/jvector/jquery-jvectormap-world-mill-en.js') }}"></script>

    <script src="{{ asset('assets/libs/chart.js/dist/Chart.min.js') }}"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.js"
        integrity="sha512-QEiC894KVkN9Tsoi6+mKf8HaCLJvyA6QIRzY5KrfINXYuP9NxdIkRQhGq3BZi0J4I7V5SidGM3XUQ5wFiMDuWg=="
        crossorigin="anonymous"></script>

    <script src="{{ asset('src/setting.js') }}"></script>
    <script src="{{ asset('src/main.js') }}"></script>
    <script>
    @if(session('message'))
        toastr.success('{{ session(' message ') }}', 'Success', SettingController.__bottomRightNotif());
    @endif

    MainController.init('{{ Session::get(' admin-auth.token ') }}')
    </script>

    @yield('js-source')
</body>

</html>