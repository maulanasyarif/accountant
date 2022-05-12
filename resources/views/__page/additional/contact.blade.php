@extends('__layout.app')


@section('title', 'Contact Us' )

@section('content')

    <div class="page-breadcrumb">
        <div class="row">
            <div class="col-5 align-self-center">
                <h4 class="page-title">{{ __('Contact Us') }}</h4>
            </div>
            <div class="col-7 align-self-center">
                <div class="d-flex align-items-center justify-content-end">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" aria-current="page">
                                <a href="{{ url('dashboard') }}">{{ __('Dashboard') }}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('Contact Us') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <div class="container" style="margin-bottom: 8rem !important;">
        <div class="row mt-5">
            <div class="col-md-6">
                <div class="card bg-blue" style="border-radius:15px;">
                    <div class="card-body text-center">
                        <div class="row">
                            <div class="col-md-4">
                                <span><i class=" fas fa-user fa-2x" style="color:#ffc000;"></i></span>
                                <p class="text-white mt-2">HUBDAT</p>
                            </div>
                            <div class="col-md-4">
                                <span><i class=" far fa-envelope fa-2x" style="color:#ffc000;"></i></span>
                                <p class="text-white mt-2">-</p>
                            </div>
                            <div class="col-md-4">
                                <span><i class="fas fa-phone fa-2x" style="color:#ffc000;"></i></span>
                                <p class="text-white mt-2">(021) 3506138</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-blue " style="border-radius:15px;">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <h3 class="text-white">Direktorat Jenderal Perhubungan Darat</h3>
                                <p class="text-white mt-2">Jl. Medan Merdeka Barat No.8, RT.2/RW.3, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110</p>
                            </div>
                            <div class="col-md-4 text-center mt-3">
                                <span><i class=" fas fa-map-marker-alt fa-4x d-none d-lg-block" style="color:#ffc000;"></i></span>
                            </div>
                        </div>                  
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <img class="img-fluid d-none d-lg-block" src="{{ asset('assets/images/contact.svg')}}" alt="">
            </div>
        </div>
    </div>

@endsection

@section('js-source')
    <script src="{{ asset('src/additional.js') }}"></script>
    <script>
        AdditionalController.contact();
    </script>
@endsection