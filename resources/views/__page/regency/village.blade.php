@extends('__layout.app')

@section('title', 'Kelurahan' )

@section('content')

<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">{{ __('Kelurahan') }}</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item" aria-current="page">
                            <a href="{{ route('dashboard') }}">{{ __('Dashboard') }}</a>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">
                            <a href="{{ route('district') }}">{{ __('District') }}</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('Villages') }}</li>
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
                        <!-- <div class="display-6 align-self-center"><i class="mdi mdi-bus"></i></div> -->
                        <div class="p-10 align-self-center">
                            <h4 class="m-b-0">Total Kelurahan</h4>
                            <span>{{ __('Semua') }}</span>
                        </div>
                        <div class="ml-auto align-self-center">
                            <h2 class="font-medium m-b-0" id="count_villages">0</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-content tabcontent-border">

                <div class="tab-pane active" id="districts" role="tabpanel">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-6 col-6">
                                            <button class="btn btn-warning btn-md"
                                                id="btn_direct_option">{{ __('Pencarian') }}</button>
                                        </div>
                                        <div class="col-lg-12 col-6 text-right">
                                            <div class="btn-group">
                                                <button class="btn btn-success btn-md" id="export_excel">Excel</button>
                                                <button class="btn btn-danger btn-md" id="export_pdf">PDF</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover data-table" id="t_village">
                                        <thead class="thead-light">
                                            <tr id="option_direct_container" style="display: none;" class="noExl">
                                                <th scope="col" colspan="7">
                                                    <form id="form_direct_filter">
                                                        <div class="row">

                                                            <div class="col-lg-6 col-12">
                                                                <div class="form-group">
                                                                    <label for="">{{ __('Nama Kelurahan') }}</label>
                                                                    <input type="text" id="direct_filter_name" autocomplete="off"
                                                                        name="name" class="form-control"
                                                                        placeholder="{{ __('Search Nama Kelurahan') }}"
                                                                        aria-label="{{ __('Search Nama Kelurahan') }}"
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
                                                                <div class="form-group">
                                                                    <label>{{ __('Sortir Berdasarkan') }}</label>
                                                                    <div class="input-group mb-3">
                                                                        <select name="sort_by" id="direct_filter_name" class="form-control">
                                                                            <option value="name" selected>
                                                                                {{ __('Nama Kelurahan') }}</option>
                                                                            <!-- <option value="type">Type</option> -->
                                                                        </select>
                                                                        <select name="sort_by_option"
                                                                            id="sort_by_option" class="form-control">
                                                                            <option value="asc" selected>Ascending
                                                                            </option>
                                                                            <option value="desc">Descending</option>
                                                                        </select>
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
                                                <td style="width: 50%;" id="id"><strong>{{ __('Kelurahan') }}</strong>
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

@endsection

@section('js-source')
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"
    integrity="sha512-T/tUfKSV1bihCnd+MxKD0Hm1uBBroVYBOYSk1knyvQ9VyZJpc/ALb4P0r6ubwVPSGB2GvjeoMAJJImBG12TiaQ=="
    crossorigin="anonymous"></script>

<script src="https://cdn.rawgit.com/rainabba/jquery-table2excel/1.1.0/dist/jquery.table2excel.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.22/pdfmake.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js">
</script>

<script>
$("#export_excel").click(function() {
    $("#t_districts").table2excel({
        exclude: ".noExl",
        fileext: ".xlsx",
        filename: "Kelurahan",
        exclude_links: true,
        preserveColors: false,
    });

});

$("#export_pdf").click(function() {

    $(".noImport").hide();

    html2canvas($('#t_districts')[0], {
        onrendered: function(canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }],
            };
            pdfMake.createPdf(docDefinition).download("Kelurahan.pdf");
        }
    });

    setTimeout(() => {
        $(".noImport").show();
    }, 500);
})
</script>

<script src="{{ asset('src/Regency/village.js') }}"></script>
<script>
    RegentController.init('{{ Session::get('admin-auth.token') }}');
</script>
<script src="{{ asset('src/Regency/district.js') }}"></script>
<script>
    RegencyController.detail('{{ Session::get('admin-auth.token') }}', {{ $id }});
</script>
@endsection()