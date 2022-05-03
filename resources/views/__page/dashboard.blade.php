@extends('__layout.app')

@section('title', 'Dashboard')

@section('custom-style')
    <style>
        body {
            --table-width: 100%;
            /* Or any value, this will change dinamically */
        }

        .table {
            display: block;
            max-height: 265px;
            min-height: 265px;
            overflow-y: auto;
        }

        thead,
        tbody tr {
            display: table;
            width: var(--table-width);
            table-layout: fixed;
        }

    </style>
@endsection

@section('content')
    <div class="page-breadcrumb">
        <div class="row">
            <div class="col-5 align-self-center">
                <h4 class="page-title">{{ __('Dasbor') }}</h4>
            </div>
            <div class="col-7 align-self-center">
                <div class="d-flex align-items-center justify-content-end">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item active" aria-current="page">{{ __('Dasbor') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="container-fluid">
        <div class="row">

            <div class="col-md-4">
                <div class="card bg-blue round-card">
                    <div class="card-body text-white">
                        <div class="d-flex flex-row">
                            <div class="p-10 align-self-center">
                                <h4 class="m-b-0">{{ __('Jumlah Awal') }}</h4>
                            </div>
                            <div class="ml-auto align-self-center">
                                <h2 class="font-medium m-b-0" id="count_total">0</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card bg-success round-card">
                    <div class="card-body text-white">
                        <div class="d-flex flex-row">
                            <div class="p-10 align-self-center">
                                <h4 class="m-b-0">{{ __('Jumlah Terdistribusi') }}</h4>
                            </div>
                            <div class="ml-auto align-self-center">
                                <h2 class="font-medium m-b-0" id="count_distribution">0</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card bg-danger round-card">
                    <div class="card-body text-white">
                        <div class="d-flex flex-row">
                            <div class="p-10 align-self-center">
                                <h4 class="m-b-0">{{ __('Belum Terdistribusi') }}</h4>
                            </div>
                            <div class="ml-auto align-self-center">
                                <h2 class="font-medium m-b-0" id="count_notDistribution">0</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12">
                <div class="card" id="income_chart">
                    <div class="card-header bg-blue">
                        <div class="row">
                            <div class="col-md-8">
                                <h4 class="card-title mt-2 text-white ">{{ __('Distribusi per Daerah') }}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <canvas id="c_income" height='100'></canvas>
                    </div>
                </div>
            </div>            
        </div>
    </div> -->
@endsection

@section('js-source')
    <script src="{{ asset('src/dashboard.js') }}"></script>
    <script>
        DashboardController.init('{{ Session::get('admin-auth.token') }}');

    </script>

    <script>
        $(document).ready(function() {
            $('#visitfromworld').vectorMap({
                // map:'asia_merc'
                backgroundColor: '#301d6e'
            });
        })
    </script>
@endsection
