@extends('__layout.app')


@section('title', 'Support' )

@section('content')
    <style>
        .round-20{
            border-radius:20px;
        }
    </style>
    <div class="page-breadcrumb">
        <div class="row">
            <div class="col-5 align-self-center">
                <h4 class="page-title">{{ __('Support') }}</h4>
            </div>
            <div class="col-7 align-self-center">
                <div class="d-flex align-items-center justify-content-end">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" aria-current="page">
                                <a href="{{ url('dashboard') }}">{{ __('Dashboard') }}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('Support') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row el-element-overlay" style="margin-top:4%; margin-bottom:12%;">
            <div class="col-lg-4 col-md-12">
                <div class="card round-20">
                    <div class="el-card-item">
                        <div class="el-card-avatar el-overlay-1" style="text-align: -webkit-center;"> <img src="{{ asset('assets/images/logo-ditjenhubdar.png')}}" alt="user" style="width: 35%;padding-top: 55px;" />
                            
                        </div>
                        <div class="el-card-content">
                            <h4 class="m-b-0">DITJEN PERHUBUNGAN DARAT</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-12">
                <div class="card round-20">
                    <div class="el-card-item">
                        <div class="el-card-avatar el-overlay-1" style="text-align: -webkit-center;"> <img src="{{ asset('assets/images/logo-dipass-navbar2.png')}}" alt="user" style="width: 77%;padding-top: 55px;"/>
                            
                        </div>
                        <div class="el-card-content">
                            <h4 style="margin-top: 2.5rem !important;">DIGITAL PASSANGER</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-12">
                <div class="card round-20">
                    <div class="el-card-item">
                        <div class="el-card-avatar el-overlay-1" style="text-align: -webkit-center;"> <img src="{{ asset('assets/images/logo-kemenhub.png')}}" alt="user" style="width: 55%;padding-top: 55px;" />
                            
                        </div>
                        <div class="el-card-content">
                            <h4 class="m-b-0">KEMENTRIAN PERHUBUNGAN</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
@endsection


@section('js-source')
    <script src="{{ asset('src/additional.js') }}"></script>
    <script>
        AdditionalController.support();
    </script>
@endsection