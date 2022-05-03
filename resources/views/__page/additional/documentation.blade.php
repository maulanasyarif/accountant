@extends('__layout.app')


@section('title', 'Documentation' )

@section('content')
<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">{{ __('Documentation') }}</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item" aria-current="page">
                            <a href="{{ url('dashboard') }}">{{ __('Dashboard') }}</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('Documentation') }}</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid text-center">
  <iframe class="responsive-iframe" src="{{ asset('assets/images/manual-book-dipass-master.pdf') }}#toolbar=1" scrolling="no" style="margin-top: 50px; width: 100%; height:500px; border: none; max-height:410px;"></iframe>
</div>


@endsection


@section('js-source')
    <script src="{{ asset('src/additional.js') }}"></script>
    <script>
        AdditionalController.documentation();
    </script>
@endsection

