@extends('__layout.app')

@section('title', 'About' )

@section('content')

    <div class="page-breadcrumb">
        <div class="row">
            <div class="col-5 align-self-center">
                <h4 class="page-title">{{ __('About') }}</h4>
            </div>
            <div class="col-7 align-self-center">
                <div class="d-flex align-items-center justify-content-end">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" aria-current="page">
                                <a href="{{ url('dashboard') }}">{{ __('Dashboard') }}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('About') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="card" style="border-radius:20px;">
            <div class="card-body mb-lg-5">
                <div class="row">
                    <div class="col-md-7 offset-md-5">
                        <h3>About Dipass</h3>
                    </div>
                    <div class="col-md-5">
                        <img class="img-fluid mt-5" src="{{ asset('assets/images/logo-dipass-navbar2.png')}}" alt="">
                    </div>
                    <div class="col-md-7 text-justify">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur debitis repellat fugiat necessitatibus facere non ullam unde officiis vitae deleniti a recusandae excepturi corrupti tenetur illum ducimus, accusantium laboriosam quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur debitis repellat fugiat necessitatibus facere non ullam unde officiis vitae deleniti a recusandae excepturi corrupti tenetur illum ducimus, accusantium laboriosam quaerat. </p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur debitis repellat fugiat necessitatibus facere non ullam unde officiis vitae deleniti a recusandae excepturi corrupti tenetur illum ducimus, accusantium laboriosam quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur debitis repellat fugiat necessitatibus facere non ullam unde officiis vitae deleniti a recusandae excepturi corrupti tenetur illum ducimus, accusantium laboriosam quaerat. </p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur debitis repellat fugiat necessitatibus facere non ullam unde officiis vitae deleniti a recusandae excepturi corrupti tenetur illum ducimus, accusantium laboriosam quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur debitis repellat fugiat necessitatibus facere non ullam unde officiis </p>

                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection


@section('js-source')
    <script src="{{ asset('src/additional.js') }}"></script>
    <script>
        AdditionalController.about();
    </script>
@endsection