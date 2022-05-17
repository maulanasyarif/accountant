@extends('__layout.app')

@section('title', 'Detail Inventory')

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
                <h4 class="page-title">Detail Inventory</h4>
            </div>
            <div class="col-7 align-self-center">
                <div class="d-flex align-items-center justify-content-end">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ route('dashboard') }}">{{ __('Dashboard') }}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <a href="{{ url('inventoryAdmin') }}">{{ __('Inventory') }}</a></li>
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
                        <small class="text-muted">Nama Barang </small>
                        <h6 id="fetch_barang_name">-</h6>
                        
                        <!-- <small class="text-muted p-t-30 db">Jumlah Awal</small>
                        <h6 id="fetch_total_awal">-</h6> -->

                        <!-- <small class="text-muted p-t-30 db">Jumlah Terpakai</small>
                        <h6 id="fetch_total_terpakai">-</h6> -->

                        <small class="text-muted p-t-30 db">Sisa</small>
                        <h6 id="fetch_sisa">-</h6>
                        
                    </div>
                </div>
            </div>

            <div class="col-lg-8 col-xlg-9 col-md-7">
                <div class="card">
    
                    <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-profile-tab" data-toggle="pill" role="tab"
                                aria-controls="pills-profile" aria-selected="false">Edit Inventory
                            </a>
                        </li>
                    </ul>
    
                    <form id="form_edit_inventory">
                        <div class="card-body">
                            
                            <div class="form-group">
                                <label for="">{{ __('Nama Barang') }}</label>
                                <input type="text" name="barang_name" id="barang_name" class="form-control">
                            </div>
        
                            <div class="form-group">
                                <label for="">{{ __('Jumlah Sisa') }}</label>
                                <input type="text" name="total_awal" id="total_awal" class="form-control">
                            </div>
        
                        </div>
                        
                        <div class="modal-footer">
                            @csrf
                            <button class="btn btn-md btn-success" type="submit" id="btn_update_inventory">{{ __('Update')}}</button>
                        </div>
                    </form>
    
                </div>
            </div>

        </div>

    </div>
@endsection

@section('js-source')
    <script src="{{ asset('assets/libs/dropify/dist/js/dropify.min.js') }}"></script>
    <script src="{{ asset('src/admin/inventory.js') }}"></script>
    <script>
        InventoryController.init('{{ Session::get('admin-auth.token') }}');
    </script>
    <script>
        InventoryController.detail('{{ Session::get('admin-auth.token') }}', {{ $id }});
    </script>
@endsection