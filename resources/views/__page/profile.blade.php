@extends('__layout.app')

@section('title', 'Profile')

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
                <h4 class="page-title">Profile</h4>
            </div>
            <div class="col-7 align-self-center">
                <div class="d-flex align-items-center justify-content-end">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ route('dashboard') }}">{{ __('Dashboard') }}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Profile</li>
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

                        <small class="text-muted p-t-30 db">Gender</small>
                        <h6 id="profile_gender">-</h6>
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
                        <li class="nav-item">
                            <a class="nav-link" id="pills-setting-tab" data-toggle="pill" href="#change-password" role="tab" aria-controls="pills-setting" aria-selected="false">Change Password</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-setting-tab" data-toggle="pill" href="#edit-company" role="tab" aria-controls="pills-setting" aria-selected="false">Edit Company</a>
                        </li>
                    </ul>

                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane show active" id="profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div class="card-body">
                                <h4 class="font-medium m-t-30">Company Information</h4>
                                <hr>
                                <div class="row">
                                    <div class="col-md-4 col-xs-6 b-r"> <strong>Company Name</strong>
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
                                    <div class="col-md-4 col-xs-6"> <strong>Owner</strong>
                                        <br>
                                        <p class="text-muted" id="profile_company_owner">-</p>
                                    </div>
                                    <div class="col-md-4 col-xs-6"> <strong>NPWP</strong>
                                        <br>
                                        <p class="text-muted" id="profile_company_npwp">-</p>
                                    </div>
                                    <div class="col-md-4 col-xs-6"> <strong>Address</strong>
                                        <br>
                                        <p class="text-muted" id="profile_company_address">-</p>
                                    </div>
                                </div>

                                <h4 class="font-medium m-t-30">Company Logo</h4>
                                <hr>
                                <div class="text-center" id="logo_container">
                                    <h4>Loading...</h4>
                                </div>
                                
                                <h4 class="font-medium m-t-30">API KEY</h4>
                                <hr>
                                <h5 class="m-t-30">KEY APP</h5>
                                <div class="bg-grey text-center text-white p-2">
                                    <div id="profile_company_key_app">-</div>
                                </div>
                                <h5 class="m-t-30 m-b-20">KEY DIPASS</h5>
                                <div class="bg-grey text-center text-white p-2">
                                    <div id="profile_company_key_dipass">-</div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="edit-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div class="card-body">
                                <form id="form_profile">
                                    <div class="form-group">
                                        <label for="">Name</label>
                                        <input type="text" id="name" name="name" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="">Phone</label>
                                        <input type="number" id="phone" min="0" name="phone" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="">Address</label>
                                        <textarea id="address" name="address" class="form-control"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Gender</label>
                                        <select name="gender" id="gender" class="form-control">
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Photo</label>
                                        <input type="file" name="photo" id="photo" class="dropify">
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

                        <div class="tab-pane fade" id="change-password" role="tabpanel" aria-labelledby="pills-setting-tab">
                            <div class="card-body">
                                <form id="form_password">
                                    <div class="form-group">
                                        <label for="">Old Password</label>
                                        <input type="password" id="old_password" name="old_password" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="">New Password</label>
                                        <input type="password" id="new_password" name="new_password" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="">Retype Password</label>
                                        <input type="password" id="retype_password" name="retype_password" class="form-control">
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-md-6 text-left">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input show-password" id="customCheck1">
                                                <label class="custom-control-label" for="customCheck1">{{ __('Show Password')}}</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6 text-right">
                                            <button class="btn btn-md btn-success" type="submit" id="btn_submit_password">{{ __('Update')}}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="edit-company" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div class="card-body">
                                <form id="form_company">
                                    <div class="form-group">
                                        <label for="">Phone</label>
                                        <input type="number" id="company_phone" min="0" name="phone" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="">Fax</label>
                                        <input type="number" id="company_fax" min="0" name="fax" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="">Logo</label>
                                        <input type="file" name="logo" id="logo" class="dropify">
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-md-6 text-left">

                                        </div>
                                        <div class="col-md-6 text-right">
                                            @csrf
                                            <button class="btn btn-md btn-success" type="submit" id="btn_submit_company">{{ __('Update')}}</button>
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
    <script src="{{ asset('src/profile.js') }}"></script>
    <script>
        ProfileController.init('{{ Session::get('admin-auth.token') }}');
    </script>
@endsection