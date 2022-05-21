@extends('__layout.app')

@section('title', 'Buku Kas')

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
            <h4 class="page-title">{{ __('Buku Kas') }}</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item" aria-current="page">
                            <a href="{{ url('dashboard') }}">{{ __('Dasbor') }}</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('Buku Kas') }}</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">

            <!-- <div class="card bg-blue round-card">
                <div class="card-body text-white">
                    <div class="d-flex flex-row">
                        <div class="p-10 align-self-center">
                            <h4 class="m-b-0">Total Daftar Perkiraan</h4>
                            <span>{{ __('Semua') }}</span>
                        </div>
                        <div class="ml-auto align-self-center">
                            <h2 class="font-medium m-b-0" id="count_regencies">0</h2>
                        </div>
                    </div>
                </div>
            </div> -->

            <div class="tab-content tabcontent-border">

                <div class="tab-pane active" id="direct" role="tabpanel">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-6 col-6">
                                            <button class="btn btn-warning btn-md"
                                                id="btn_direct_option">{{ __('Pencarian') }}</button>
                                        </div>
                                        <div class="col-lg-6 col-6 text-right">
                                            <div class="btn-group">
                                                <button class="btn btn-success btn-md" id="export_excel">Excel</button>
                                                <button class="btn btn-danger btn-md" id="export_pdf">PDF</button>
                                            </div>
                                            <div class="btn-group">
                                                <button class="btn btn-info btn-md" id="btn_add"><i
                                                        class="fas fa-plus"></i>
                                                    {{ __('Tambah') }}</button> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="table-responsive">
                                    <table class="table table-hover data-table" id="t_bukuKas">
                                        <thead class="thead-light">
                                            <tr id="option_direct_container" style="display: none;" class="noExl">
                                                <th scope="col" colspan="8">
                                                    <form id="form_direct_filter">
                                                        <div class="row">

                                                            <div class="col-lg-6 col-12">
                                                                <div class="form-group">
                                                                    <label for="">{{ __('Keterangan') }}</label>
                                                                    <input type="text" id="search_keterangan"
                                                                        autocomplete="off" name="keterangan"
                                                                        class="form-control"
                                                                        placeholder="{{ __('Search Keterangan') }}"
                                                                        aria-label="{{ __('Search Keterangan') }}"
                                                                        aria-describedby="basic-addon1">
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6 col-12">
                                                                <div class="form-group">
                                                                    <label for="">{{ __('Nama Perkiraan') }}</label>
                                                                    <input type="text" id="search_name"
                                                                        autocomplete="off" name="perkiraan_name"
                                                                        class="form-control"
                                                                        placeholder="{{ __('Search Nama Perkiraan') }}"
                                                                        aria-label="{{ __('Search Nama Perkiraan') }}"
                                                                        aria-describedby="basic-addon1">
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6 col-12">
                                                                <label>{{ __('Sortir Berdasarkan') }}</label>
                                                                <div class="input-group mb-3">
                                                                    <select name="sort_by" id="sort_by"
                                                                        class="form-control">
                                                                        <option value="tanggal" selected>
                                                                            {{ __('Tanggal') }}</option>
                                                                        <option value="keterangan">
                                                                            {{ __('Keterangan') }}</option>
                                                                    </select>
                                                                    <select name="sort_by_option" id="sort_by_option"
                                                                        class="form-control">
                                                                        <option value="asc" selected>Ascending</option>
                                                                        <option value="desc">Descending</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6 col-12">
                                                                <label>Tampilkan</label>
                                                                <div class="input-group mb-3">
                                                                    <input type="number" name="limit" id="limit"
                                                                        class="form-control" value="10">
                                                                    <div class="input-group-append">
                                                                        <span class="input-group-text">/page</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="">{{ __('Rentang Waktu') }}</label>
                                                                    <div class="input-daterange input-group"
                                                                        id="date-range">
                                                                        <input type="text" autocomplete="off"
                                                                            class="form-control datepicker"
                                                                            name="start_date" id="start_date"
                                                                            placeholder="{{ __('Start Date') }}" />
                                                                        <div class="input-group-append">
                                                                            <span
                                                                                class="input-group-text bg-info b-0 text-white">TO</span>
                                                                        </div>
                                                                        <input type="text" autocomplete="off"
                                                                            class="form-control datepicker"
                                                                            name="end_date" id="end_date"
                                                                            placeholder="{{ __('End Date') }}" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-12 col-12">
                                                                <div class="form-group">
                                                                    <div class="row">
                                                                        <div class="col-md-6 col-6 text-left">
                                                                            <button class="btn btn-filter btn-danger"
                                                                                id="btn_direct_close"
                                                                                type="button">{{ __('Tutup') }}</button>
                                                                        </div>
                                                                        <div class="col-md-6 col-6 text-right">
                                                                            <button class="btn btn-filter btn-warning"
                                                                                type="button"
                                                                                id="btn_direct_reset">Reset</button>
                                                                            <button class="btn btn-filter btn-info"
                                                                                type="submit">{{ __('Cari') }}</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </form>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td style="width:10%;" id="id">
                                                    <strong>{{ __('Tanggal') }}</strong>
                                                </td>
                                                <td style="width: 15;" id="id">
                                                    <strong>{{ __('Keterangan') }}</strong>
                                                </td>
                                                <td style="width: 15;" id="id">
                                                    <strong>{{ __('Nama Perkiraan') }}</strong>
                                                </td>
                                                <td style="width: 10;" id="id">
                                                    <strong>{{ __('No Perkiraan') }}</strong>
                                                </td>
                                                <td style="width: 10%;" id="id">
                                                    <strong>{{ __('Debet') }}</strong>
                                                    <p>(IDR)</p>
                                                </td>
                                                <td style="width: 10%;" id="id">
                                                    <strong>{{ __('Kredit') }}</strong>
                                                    <p>(IDR)</p>
                                                </td>
                                                <td style="width: 15%;" id="id">
                                                    <strong>{{ __('Saldo') }}</strong>
                                                    <p>(IDR)</p>
                                                </td>
                                                <td style="width: 15%;" id="id" class="noExl noImport">
                                                    <strong>{{ __('Action') }}</strong>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colspan="8" class="text-center">LOADING...</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>

                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</div>


<!-- modal add perkiraan -->
<form id="form_add">
    <div id="modal_add" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">{{ __('Tambah Kas') }}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">

                    <div class="form-group">
                        <label for="">{{ __('Nomor Perkiraan') }}</label>
                        <select name="perkiraan_id" id="direct_perkiraan" class="form-control" style="width: 100%;">
                            <option value="">-- {{ __('Select Perkiraan') }} --</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="">{{ __('Keterangan') }}</label>
                        <input type="text" name="keterangan" id="keterangan" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="">{{ __('Debit') }}</label>
                        <input type="text" name="debit" id="debit" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="">{{ __('kredit') }}</label>
                        <input type="text" name="kredit" id="kredit" class="form-control">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect"
                        data-dismiss="modal">{{ __('Tutup') }}</button>
                    <button type="submit" class="btn btn-info waves-effect" id="btn_submit">{{ __('Simpan') }}</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</form>

<!-- modal edit -->
<form id="form_edit">
    <div id="modal_edit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">{{ __('Edit Kas') }}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">

                    <div class="form-group">
                        <label for="">Tanggal</label>
                        <input type="date" name="tanggal" id="tanggal" class="form-control"/>
                    </div>
                    
                    <div class="form-group">
                        <label for="">{{ __('Keterangan') }}</label>
                        <input type="text" name="keterangan" id="keterangan" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="">{{ __('Debit') }}</label>
                        <select name="debet_id" id="direct_debit" class="form-control" style="width: 100%;">
                            <option value="">-- {{ __('Select Perkiraan') }} --</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="">{{ __('Kredit') }}</label>
                        <select name="kredit_id" id="direct_kredit" class="form-control" style="width: 100%;">
                            <option value="">-- {{ __('Select Perkiraan') }} --</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="">{{ __('Jumlah') }}</label>
                        <input type="text" name="jumlah" id="jumlah" class="form-control">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect"
                        data-dismiss="modal">{{ __('Tutup') }}</button>
                    <button type="submit" class="btn btn-info waves-effect" id="btn_edit">{{ __('Update') }}</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</form>

<!-- modal delete -->
<form id="form_delete">
    <div id="modal_delete" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">{{ __('Hapus Kas') }}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <h4>{{ __('Are you sure delete ') }}<b><span id="delete_name"></span> ?</b></h4>
                    <h5>{{ __('Data will removed permanently.') }}</h5>
                </div>
                <div class="modal-footer">
                    <input type="hidden" name="id" id="delete_id">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">{{ __('Tutup') }}</button>
                    <button type="submit" class="btn btn-info waves-effect" id="btn_submit_delete">Ya</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</form>

@endsection


@section('js-source')
<script src="{{ asset('assets/libs/select2_new/dist/js/select2.full.min.js') }}"></script>
<script src="{{ asset('assets/libs/select2_new/dist/js/select2.min.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"
    integrity="sha512-T/tUfKSV1bihCnd+MxKD0Hm1uBBroVYBOYSk1knyvQ9VyZJpc/ALb4P0r6ubwVPSGB2GvjeoMAJJImBG12TiaQ=="
    crossorigin="anonymous"></script>

<script src="https://cdn.rawgit.com/rainabba/jquery-table2excel/1.1.0/dist/jquery.table2excel.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.22/pdfmake.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js">
</script>

<script>
$("#export_excel").click(function() {
    $("#t_bukuKas").table2excel({
        exclude: ".noExl",
        fileext: ".xlsx",
        filename: "Buku Kas",
        exclude_links: true,
        preserveColors: false,
    });

});

$("#export_pdf").click(function() {

    $(".noImport").hide();

    html2canvas($('#t_bukuKas')[0], {
        onrendered: function(canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }],
            };
            pdfMake.createPdf(docDefinition).download("Buku Kas.pdf");
        }
    });

    setTimeout(() => {
        $(".noImport").show();
    }, 500);
})
</script>
<script src="{{ asset('src/cabang/bukukas.js') }}"></script>
<script>
    KasController.init('{{ Session::get('admin-auth.token')}}');
</script> 
@endsection