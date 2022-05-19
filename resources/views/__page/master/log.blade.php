@extends('__layout.app')

@section('title', 'User Log')

@section('css-source')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css" integrity="sha512-mSYUmp1HYZDFaVKK//63EcZq4iFWFjxSL+Z3T/aCt4IO9Cejm03q3NKKYN6pFQzY0SBOr8h+eCIAZHPXcpZaNw==" crossorigin="anonymous" />
@endsection

@section('content')
    <div class="page-breadcrumb">
        <div class="row">
            <div class="col-5 align-self-center">
                <h4 class="page-title">{{ __('Aktivitas Pengguna') }}</h4>
            </div>
            <div class="col-7 align-self-center">
                <div class="d-flex align-items-center justify-content-end">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" aria-current="page">
                                <a href="{{ url('dashboard') }}">{{ __('Dasbor') }}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('Aktivitas Pengguna') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-8 col-12">
                <div class="card bg-blue" style="border-radius:10px;">
                    <div class="card-body text-white" >
                        <div class="d-flex flex-row">
                            <div class="display-6 align-self-center"><i class="mdi mdi-clock"></i></div>
                            <div class="p-10 align-self-center">
                                <h4 class="m-b-0">{{ __('Total Aktivitas') }}</h4>
                                <span>{{ __('Semua') }}</span>
                            </div>
                            <div class="ml-auto align-self-center">
                                <h2 class="font-medium m-b-0" id="count_activity">0</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 text-center d-none d-lg-block">
                <img src="{{ asset('assets/images/text-file.svg')}}" height='100' alt="">
            </div>

            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <button class="btn btn-warning btn-md" id="btn_option">{{ __('Pencarian') }}</button>
                            </div>
                            <div class="col-lg-6 text-right">
                                <div class="btn-group">
                                    <button class="btn btn-success btn-md">Excel</button>
                                    <button class="btn btn-danger btn-md">PDF</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover data-table" id="t_activity">
                            <thead class="thead-light">
                                
                                <tr id="option_container" style="display: none;">
                                    <th scope="col" colspan="3">
                                        <form id="form_filter">
                                            <div class="row">
                                                <div class="col-lg-6 col-12">
                                                    <div class="form-group">
                                                        <label>{{ __('Akun') }}</label>
                                                        <input type="text" id="search_name" autocomplete="off" name="name" class="form-control" placeholder="{{ __('Search User') }}" aria-label="{{ __('Search User') }}" aria-describedby="basic-addon1">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-12">
                                                    <div class="form-group">
                                                        <label>{{ __('Aktifitas') }}</label>
                                                        <input type="text" id="search_description" autocomplete="off" name="description" class="form-control" placeholder="{{ __('Search Activity') }}" aria-label="{{ __('Search Activity') }}" aria-describedby="basic-addon1">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-12">
                                                    <label>{{ __('Sortir Berdasarkan') }}</label>
                                                    <div class="input-group mb-3">
                                                        <select name="sort_by" id="sort_by" class="form-control">
                                                            <option value="datetime" selected>{{ __('Tanggal') }}</option>
                                                            <option value="description">{{ __('Aktivitas') }}</option>
                                                            <option value="user.name">{{ __('Akun') }}</option>
                                                        </select>
                                                        <select name="sort_by_option" id="sort_by_option" class="form-control">
                                                            <option value="asc" selected>Ascending</option>
                                                            <option value="desc">Descending</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-12">
                                                    <label>{{ __('Tampilkan') }}</label>
                                                    <div class="input-group mb-3">
                                                        <input type="number" name="limit" id="limit" class="form-control" value="15">
                                                        <div class="input-group-append">
                                                            <span class="input-group-text">/{{ __('Halaman') }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 col-12">
                                                    <div class="form-group">
                                                        <label for="">{{ __('Rentang Waktu') }}</label>
                                                        <div class="input-daterange input-group" id="date-range">
                                                            <input type="text" autocomplete="off" class="form-control datepicker" name="start_date" id="start_date" placeholder="{{ __('Start Date') }}" />
                                                            <div class="input-group-append">
                                                                <span class="input-group-text bg-info b-0 text-white">TO</span>
                                                            </div>
                                                            <input type="text" autocomplete="off" class="form-control datepicker" name="end_date" id="end_date" placeholder="{{ __('End Date') }}" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-12 col-12">
                                                    <div class="form-group">
                                                        <div class="row">
                                                            <div class="col-md-6 col-6 text-left">
                                                                <button class="btn btn-filter btn-danger" id="btn_close" type="button">{{ __('Tutup') }}</button>
                                                            </div>
                                                            <div class="col-md-6 col-6 text-right">
                                                                <button class="btn btn-filter btn-warning" type="button" id="btn_reset">Reset</button>
                                                                <button class="btn btn-filter btn-info" type="submit">{{ __('Cari') }}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </form>
                                    </th>
                                </tr>
                                <tr>
                                    <td style="width:30%;"><strong>{{ __('Akun') }}</strong></td>
                                    <td style="width:30%;"><strong>{{ __('Tanggal') }}</strong></td>
                                    <td style="width:40%;"><strong>{{ __('Aktivitas') }}</strong></td>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                            <tfoot>
                                
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div> 
    </div>
@endsection
@section('js-source')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js" integrity="sha512-T/tUfKSV1bihCnd+MxKD0Hm1uBBroVYBOYSk1knyvQ9VyZJpc/ALb4P0r6ubwVPSGB2GvjeoMAJJImBG12TiaQ==" crossorigin="anonymous"></script>
    <script src="{{ asset('src/master/activity.js') }}"></script>
	<script>
        ActivityController.init('{{ Session::get('admin-auth.token') }}');
    </script>
@endsection