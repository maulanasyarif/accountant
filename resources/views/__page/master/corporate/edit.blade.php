@extends('__layout.app')

@section('title', 'Detail Corporate')

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
                <h4 class="page-title">Detail Corporate</h4>
            </div>
            <div class="col-7 align-self-center">
                <div class="d-flex align-items-center justify-content-end">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ route('dashboard') }}">{{ __('Dashboard') }}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <a href="{{ url('Corporate') }}">{{ __('Corporate') }}</a></li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4 col-xlg-3 col-md-5">
                <div class="card">
                    <div class="card-body">
                        <center class="m-t-30">
                            <img src="" class="rounded-circle" id="profile_photo" width="150" />
                            <h4 class="card-title m-t-10" id="profile_name">-</h4>
                            <h6 class="card-subtitle" id="profile_role">-</h6>
                        </center>
                    </div>
                    <div>
                        <hr> 
                    </div>
                    <div class="card-body">
                        <small class="text-muted">Email address </small>
                        <h6 id="profile_email">-</h6>
                        
                        <small class="text-muted p-t-30 db">Phone</small>
                        <h6 id="profile_phone">-</h6>
                        
                        <small class="text-muted p-t-30 db">Address</small>
                        <h6 id="profile_address">-</h6>
                        
                    </div>
                </div>
            </div>

            <div class="col-lg-8 col-xlg-9 col-md-7">
                <div class="card">

                    <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-profile-tab" data-toggle="pill" href="#profile" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#edit-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Edit Profile</a>
                        </li>
                        <!-- <li class="nav-item">
                            <a class="nav-link" id="pills-setting-tab" data-toggle="pill" href="#change-password" role="tab" aria-controls="pills-setting" aria-selected="false">Change Password</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-setting-tab" data-toggle="pill" href="#edit-company" role="tab" aria-controls="pills-setting" aria-selected="false">Edit Company</a>
                        </li> -->
                    </ul>

                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane show active" id="profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div class="card-body">
                                <h4 class="font-medium m-t-30">Informasi Cabang</h4>
                                <hr>
                                <div class="row">
                                    <div class="col-md-4 col-xs-6 b-r"> <strong>Nama Cabang</strong>
                                        <br>
                                        <p class="text-muted" id="profile_company_name">-</p>
                                    </div>
                                    <div class="col-md-4 col-xs-6 b-r"> <strong>Phone</strong>
                                        <br>
                                        <p class="text-muted" id="profile_company_phone">-</p>
                                    </div>
                                    <div class="col-md-4 col-xs-6 b-r"> <strong>Fax</strong>
                                        <br>
                                        <p class="text-muted" id="profile_company_fax">-</p>
                                    </div>
                                    <!-- <div class="col-md-4 col-xs-6"> <strong>Owner</strong>
                                        <br>
                                        <p class="text-muted" id="profile_company_owner">-</p>
                                    </div> -->
                                    <div class="col-md-4 col-xs-6"> <strong>NPWP</strong>
                                        <br>
                                        <p class="text-muted" id="profile_company_npwp">-</p>
                                    </div>
                                    <div class="col-md-4 col-xs-6"> <strong>Address</strong>
                                        <br>
                                        <p class="text-muted" id="profile_company_address">-</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="edit-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div class="card-body">
                                <form id="form_profile">
                                    <div class="form-group">
                                        <label for="">Nama Cabang</label>
                                        <input type="text" name="company_name" id="company_name" class="form-control">
                                    </div>
                
                                    <div class="form-group">
                                        <label for="">Address</label>
                                        <input type="text" name="address" id="address" class="form-control">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="">Phone</label>
                                        <input type="text" name="phone" id="phone" class="form-control">
                                    </div>
                
                                    <div class="form-group">
                                        <label for="">Email</label>
                                        <input type="email" name="email" id="email" class="form-control">
                                    </div>
                
                                    <div class="form-group">
                                        <label for="">Fax</label>
                                        <input type="text" name="fax" id="fax" class="form-control">
                                    </div>
                
                                    <div class="form-group">
                                        <label for="">NPWP</label>
                                        <input type="text" name="npwp" id="npwp" class="form-control">
                                    </div>
                
                                    <div class="form-group">
                                        <label for="">Alias</label>
                                        <input type="text" name="alias" id="alias" class="form-control">
                                    </div>
                                    
                                    <div class="form-group row">
                                        <div class="col-md-6 text-left">

                                        </div>
                                        <div class="col-md-6 text-right">
                                            @csrf
                                            <button class="btn btn-md btn-success" type="submit" id="btn_submit_profile">{{ __('Update')}}</button>
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
@endsection

@section('js-source')
    <script src="{{ asset('assets/libs/dropify/dist/js/dropify.min.js') }}"></script>
    <script src="{{ asset('src/master/Corporate.js') }}"></script>
    <script>
        CorporateController.init('{{ Session::get('admin-auth.token') }}');
    </script>
    <script>
        CorporateController.detail('{{ Session::get('admin-auth.token') }}', {{ $id }});
    </script>
@endsection