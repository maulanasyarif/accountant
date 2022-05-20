@extends('__layout.app')

@section('title', 'Corporate')

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
            <h4 class="page-title">{{ __('Corporate') }}</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item" aria-current="page">
                            <a href="{{ url('dashboard') }}">{{ __('Dasbor') }}</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('Corporate') }}</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">

            <div class="card bg-blue round-card">
                <div class="card-body text-white">
                    <div class="d-flex flex-row">
                        <div class="p-10 align-self-center">
                            <h4 class="m-b-0">Total Corporate</h4>
                            <span>{{ __('Semua') }}</span>
                        </div>
                        <div class="ml-auto align-self-center">
                            <h2 class="font-medium m-b-0" id="count_regencies">0</h2>
                        </div>
                    </div>
                </div>
            </div>

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
                                                <!-- <button class="btn btn-info btn-md" id="btn_add"><i class="fas fa-plus"></i>
                                                    {{ __('Tambah') }}</button> -->
                                                    <a href="{{ url('addCorporate')}}" class="btn btn-info btn-md"><i class="fas fa-plus"></i>
                                                        {{ __('Tambah') }}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover data-table" id="t_Corporate">
                                        <thead class="thead-light">
                                            <tr id="option_direct_container" style="display: none;" class="noExl">
                                                <th scope="col" colspan="7">
                                                    <form id="form_direct_filter">
                                                        <div class="row">

                                                            <div class="col-lg-6 col-12">
                                                                <div class="form-group">
                                                                    <label for="">{{ __('Corporate Name') }}</label>
                                                                    <input type="text" id="direct_filter_name"
                                                                        autocomplete="off" name="name"
                                                                        class="form-control"
                                                                        placeholder="{{ __('Search Corporate Name') }}"
                                                                        aria-label="{{ __('Search Corporate Name') }}"
                                                                        aria-describedby="basic-addon1">
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6 col-12">
                                                                <label>Show</label>
                                                                <div class="input-group mb-3">
                                                                    <input type="number" name="limit" id="direct_filter_limit"
                                                                        class="form-control" value="10">
                                                                    <div class="input-group-append">
                                                                        <span class="input-group-text">/page</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6 col-12">
                                                                <label>Sort By</label>
                                                                <div class="input-group mb-3">
                                                                    <select name="sort_by" id="direct_filter_name" class="form-control">
                                                                        <option value="name" selected>
                                                                            {{ __('Corporate Name') }}</option>
                                                                        <!-- <option value="type">Type</option> -->
                                                                    </select>
                                                                    <select name="sort_by_option" id="sort_by_option"
                                                                        class="form-control">
                                                                        <option value="asc" selected>Ascending</option>
                                                                        <option value="desc">Descending</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-12 col-12">
                                                                <div class="form-group">
                                                                    <div class="row">
                                                                        <div class="col-md-6 col-6 text-left">
                                                                            <button class="btn btn-filter btn-danger"
                                                                                id="btn_direct_close"
                                                                                type="button">{{ __('Close') }}</button>
                                                                        </div>
                                                                        <div class="col-md-6 col-6 text-right">
                                                                            <button class="btn btn-filter btn-warning"
                                                                                type="button"
                                                                                id="btn_direct_reset">Reset</button>
                                                                            <button class="btn btn-filter btn-info"
                                                                                type="submit">{{ __('Search') }}</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </form>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td style="width: 30%;" id="id">
                                                    <strong>{{ __('Corporate Name') }}</strong>
                                                </td>
                                                <td style="width: 20%;" id="id">
                                                    <strong>{{ __('Address') }}</strong>
                                                </td>
                                                <td style="width: 15%;" id="id">
                                                    <strong>{{ __('Email') }}</strong>
                                                </td>
                                                <td style="width: 15%;" id="id">
                                                    <strong>{{ __('Phone') }}</strong>
                                                </td>
                                                <td style="width: 20%" class="noExl noImport">
                                                    <strong>Action</strong>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colspan="7" class="text-center">LOADING...</td>
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
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">{{ __('Tambah Corporate') }}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="">{{ __('Corporate Name') }}</label>
                        <input type="text" name="company_name" id="company_name" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="">{{ __('Address') }}</label>
                        <input type="text" name="address" id="address" class="form-control">
                    </div>
                    
                    <div class="form-group">
                        <label for="">{{ __('Phone') }}</label>
                        <input type="text" name="phone" id="phone" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="">{{ __('Email') }}</label>
                        <input type="email" name="email" id="email" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="">{{ __('Fax') }}</label>
                        <input type="text" name="fax" id="fax" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="">{{ __('NPWP') }}</label>
                        <input type="text" name="npwp" id="npwp" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="">{{ __('Alias') }}</label>
                        <input type="text" name="alias" id="alias" class="form-control">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect"
                        data-dismiss="modal">{{ __('Close') }}</button>
                    <button type="submit" class="btn btn-info waves-effect"
                        id="btn_submit">{{ __('Save') }}</button>
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
    $("#t_Corporate").table2excel({
        exclude: ".noExl",
        fileext: ".xlsx",
        filename: "Corporate",
        exclude_links: true,
        preserveColors: false,
    });

});

$("#export_pdf").click(function() {

    $(".noImport").hide();

    html2canvas($('#t_Corporate')[0], {
        onrendered: function(canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }],
            };
            pdfMake.createPdf(docDefinition).download("Corporate.pdf");
        }
    });

    setTimeout(() => {
        $(".noImport").show();
    }, 500);
})
</script>

<script src="{{ asset('src/Master/Corporate.js') }}"></script>
<script>
    CorporateController.init('{{ Session::get('admin-auth.token') }}');
</script>
@endsection