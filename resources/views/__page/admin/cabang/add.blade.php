@extends('__layout.app')

@section('title', 'Add Cabang')

@section('custom-style')
    <style>
        .bg-grey {
            background-color: grey;
        }
    </style>
@endsection

@section('css-source')
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/libs/dropify/dist/css/dropify.min.css') }}">
@endsection

@section('content')
    <div class="page-breadcrumb">
        <div class="row">
            <div class="col-5 align-self-center">
                <h4 class="page-title">Add Cabang</h4>
            </div>
            <div class="col-7 align-self-center">
                <div class="d-flex align-items-center justify-content-end">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ route('dashboard') }}">{{ __('Dashboard') }}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <a href="{{ url('cabang') }}">{{ __('Cabang') }}</a></li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">

            <div class="col-lg-12 col-xlg-9 col-md-7">
                <div class="card">

                    <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-profile-tab" data-toggle="pill" href="#profile"
                                role="tab" aria-controls="pills-profile" aria-selected="false">Cabang
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#edit-profile"
                                role="tab" aria-controls="pills-profile" aria-selected="false">Account Cabang
                            </a>
                        </li>
                    </ul>

                    <form id="formAdd">
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane show active" id="profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <div class="card-body">
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="">Nama Cabang</label>
                                                    <input type="text" name="company_name" id="company_name" class="form-control">
                                                </div>
                            
                                                <div class="form-group">
                                                    <label for="">Address</label>
                                                    <input type="text" name="address" id="address" class="form-control">
                                                </div>
                                            </div>
    
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="">Phone</label>
                                                    <input type="text" name="phone" id="phone" class="form-control">
                                                </div>
                            
                                                <div class="form-group">
                                                    <label for="">Email</label>
                                                    <input type="email" name="email" id="email" class="form-control">
                                                </div>
                                            </div>
    
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="">Fax</label>
                                                    <input type="text" name="fax" id="fax" class="form-control">
                                                </div>
                            
                                                <div class="form-group">
                                                    <label for="">NPWP</label>
                                                    <input type="text" name="npwp" id="npwp" class="form-control">
                                                </div>
                                            </div>
    
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="">Alias</label>
                                                    <input type="text" name="alias" id="alias" class="form-control">
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>

                        <div class="tab-pane fade" id="edit-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="">Username</label>
                                        <input type="text" name="username" id="username" class="form-control">
                                    </div>
                
                                    <div class="form-group">
                                        <label for="">Name</label>
                                        <input type="text" name="name" id="name" class="form-control">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="">Email</label>
                                        <input type="email" name="email" id="email" class="form-control">
                                    </div>
                
                                    <div class="form-group">
                                        <label for="">Password</label>
                                        <input type="password" name="password" id="password" class="form-control">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input show-password" id="customCheck1">
                                            <label class="custom-control-label" for="customCheck1">{{ __('Show Password')}}</label>
                                        </div>
                                    </div>
                
                                    <div class="form-group">
                                        <label for="">Phone</label>
                                        <input type="text" name="phone" id="phone" class="form-control">
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-6 text-left">

                            </div>
                            <div class="col-md-6 text-right">
                                @csrf
                                <button class="btn btn-md btn-primary" type="submit" id="btn_submit_cabang">{{ __('Save')}}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    </div>
@endsection

@section('js-source')
    <script src="{{ asset('assets/libs/dropify/dist/js/dropify.min.js') }}"></script>
    <script src="{{ asset('src/admin/cabang.js') }}"></script>
    <script>
        CabangController.init('{{ Session::get('admin-auth.token') }}');
    </script>
@endsection