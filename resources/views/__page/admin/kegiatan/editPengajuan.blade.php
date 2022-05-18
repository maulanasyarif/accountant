@extends('__layout.app')

@section('title', 'Detail Pengajuan')

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
                <h4 class="page-title">Detail Pengajuan</h4>
            </div>
            <div class="col-7 align-self-center">
                <div class="d-flex align-items-center justify-content-end">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ route('dashboard') }}">{{ __('Dashboard') }}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <a href="{{ url('pengajuanAdmin') }}">{{ __('Pengajuan') }}</a></li>
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
                        
                        <p class="text-muted p-t-30 db">Judul</p>
                        <h4 id="judul">-</h4>

                        <p class="text-muted">No Surat </p>
                        <h4 id="no_surat">-</h4>

                        <p class="text-muted p-t-30 db">Waktu Kegiatan</p>
                        <h4 id="kegiatan_waktu">-</h4>
                        
                    </div>
                </div>
            </div>

            <div class="col-lg-8 col-xlg-9 col-md-7">
                <div class="card">

                    <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-profile-tab" data-toggle="pill" href="#profile" role="tab" aria-controls="pills-profile" aria-selected="false">Detail Kegiatan</a>
                        </li>
                        <!-- <li class="nav-item">
                            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#edit-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Edit Profile</a>
                        </li> -->
                    </ul>

                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane show active" id="profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div class="card-body">
                                <form id="edit-pengajuan" method="post" action="#">
                                <div class="row" id="multiple">
                                    <hr style="height:2px; width:100%; border-width:0; color:red; background-color:red">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="">{{ __('Tanggal') }}</label>
                                            <input type="hidden" name="id_detailKegiatan" id="id_detailKegiatan">
                                            <input type="date" name="tanggal" id="tanggal" value="" class="form-control">
                                        </div>

                                        <div class="form-group">
                                            <label for="">{{ __('Uraian') }}</label>
                                            <textarea type="text" name="uraian" id="uraian" class="form-control"> </textarea>
                                        </div>

                                        <div class="form-group">
                                            <label for="">{{ __('No Rekening') }}</label>
                                            <input type="text" name="nomor_rekening" id="nomor_rekening" class="form-control" >
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="">{{ __('Nama Bank') }}</label>
                                            <input type="text" name="nama_bank" id="nama_bank" class="form-control" >
                                        </div>

                                    </div>

                                    <div class="col-md-6">
                                    
                                        <div class="form-group">
                                            <label for="">{{ __('Satuan') }}</label>
                                            <input type="text" name="satuan" id="satuan" class="form-control">
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="">{{ __('Harga Satuan') }}</label>
                                            <input type="text" name="harga_satuan" id="harga_satuan" class="form-control">
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="">{{ __('Jumlah Harga') }}</label>
                                            <input type="text" name="jumlah_harga" id="jumlah_harga" class="form-control">
                                        </div>
                                        <button type="submit" id="updateDetailPengajuan" class="btn btn-success btn-update">Update</button>
                                    </div>
                                </div>
                            </form>
                                <a href="#" id="prev" class="btn btn-primary btn-sm">Prev</a>
                                <a href="#" id="next" class="btn btn-primary btn-sm">Next</a>
                            </div>
                            </div>
                        </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
@endsection

@section('js-source')
<script src="{{ asset('assets/libs/select2_new/dist/js/select2.full.min.js') }}"></script>
<script src="{{ asset('assets/libs/select2_new/dist/js/select2.min.js') }}"></script>
    <script src="{{ asset('assets/libs/dropify/dist/js/dropify.min.js') }}"></script>
    <script src="{{ asset('src/admin/pengajuan.js') }}"></script>
    <script>
        PengajuanController.init('{{ Session::get('admin-auth.token') }}');
    </script>
    <script>
        PengajuanController.detail('{{ Session::get('admin-auth.token') }}', {{ $id }});
    </script>
@endsection