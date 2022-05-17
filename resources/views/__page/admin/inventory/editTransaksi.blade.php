@extends('__layout.app')

@section('title', 'Detail Transaksi')

@section('css-source')
<link rel="stylesheet" type="text/css" href="{{ asset('assets/libs/select2_new/dist/css/select2.min.css') }}">
<link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css"
    integrity="sha512-mSYUmp1HYZDFaVKK//63EcZq4iFWFjxSL+Z3T/aCt4IO9Cejm03q3NKKYN6pFQzY0SBOr8h+eCIAZHPXcpZaNw=="
    crossorigin="anonymous" />
@endsection

@section('content')
<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">{{ __('Detail Transaksi') }}</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item" aria-current="page">
                            <a href="{{ url('dashboard') }}">{{ __('Dasbor') }}</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            <a href="{{ url('transaksiInventory') }}">{{ __('Transaksi') }}</a></li>
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
                    <h6 class="text-muted">Nama Cabang </h6>
                    <h6 id="fetch_namaCabang">-</h6>
                    
                    <h6 class="text-muted p-t-30 db">Nama Barang</h6>
                    <h6 id="fetch_namaBarang">-</h6>

                    <h6 class="text-muted p-t-30 db">Jumlah</h6>
                    <h6 id="fetch_total">-</h6>
                    
                </div>
            </div>
        </div>

        <div class="col-lg-8 col-xlg-9 col-md-7">
            <div class="card">

                <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="pills-profile-tab" data-toggle="pill"
                            role="tab" aria-controls="pills-profile" aria-selected="false">Edit Transaksi
                        </a>
                    </li>
                </ul>

                <form id="form_edit_transaksi">
                    <div class="card-body">
                        
                        <div class="form-group">
                            <label for="">{{ __('Nama Cabang') }}</label>
                            <input type="text" name="company_id" id="company_id" class="form-control" disabled>
                        </div>
    
                        <div class="form-group">
                            <label for="">{{ __('Nama Barang') }}</label>
                            <input type="text" name="inventory_id" id="inventory_id" class="form-control" disabled>
                        </div>

                        <div class="form-group">
                            <label for="">{{ __('Jumlah') }}</label>
                            <input type="text" name="total" id="total" class="form-control">
                        </div>
    
                    </div>
                    
                    <div class="modal-footer">
                        @csrf
                        <button class="btn btn-md btn-success" type="submit" id="btn_update_transaksi">{{ __('Update')}}</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>
</div>

@endsection


@section('js-source')
<script src="{{ asset('assets/libs/select2_new/dist/js/select2.full.min.js') }}"></script>
<script src="{{ asset('assets/libs/select2_new/dist/js/select2.min.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"
    integrity="sha512-T/tUfKSV1bihCnd+MxKD0Hm1uBBroVYBOYSk1knyvQ9VyZJpc/ALb4P0r6ubwVPSGB2GvjeoMAJJImBG12TiaQ=="
    crossorigin="anonymous"></script>

<script src="{{ asset('src/admin/transaksi.js') }}"></script>
<script>
    TransaksiController.detail('{{ Session::get('admin-auth.token')}}', {{ $id }});
</script> 
<script>
    TransaksiController.init('{{ Session::get('admin-auth.token')}}');
</script> 
@endsection