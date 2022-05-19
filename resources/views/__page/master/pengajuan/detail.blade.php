@extends('__layout.app')

@section('title', 'Detail Pengajuan')

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
            <h4 class="page-title">{{ __('Detail Pengajuan') }}</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item" aria-current="page">
                            <a href="{{ url('dashboard') }}">{{ __('Dasbor') }}</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            <a href="{{ url('pengajuan') }}">{{ __('Pengajuan') }}</a></li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">

            <div class="tab-content tabcontent-border">

                <div class="tab-pane active" id="direct" role="tabpanel">

                    <div class="row">
                        <div class="col-md-12">
                            <div id="printRAB" class="card">
                                <div class="card-body">
                                    <div class="col-lg-12 col-12 text-right">
                                        <div class="btn-group noExl noImport">
                                            <button class="btn btn-success btn-md" id="export_excel">Excel</button>
                                            <button class="btn btn-danger btn-md " id="export_pdf">PDF</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="table-responsive">
                                    <table class="table table-hover data-table" id="t_parent">
                                        <thead class="thead-light">
                                            <tr id="option_direct_container" style="display: none;" class="noExl">

                                            </tr>
                                            <tr>
                                                <td style="width: 100%;" id="judul" class="text-center">
                                                    <strong>{{ __('Judul') }}</strong>
                                                </td>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                        <tfoot>
                                            
                                        </tfoot>
                                    </table>
                                </div>

                                <div class="table-responsive">
                                    <table class="table table-hover data-table" id="t_printKegiatan">
                                        <thead class="thead-light">
                                            <tr id="option_direct_container" style="display: none;" class="noExl">
                                                <th scope="col" colspan="7">
                                                </th>
                                            </tr>
                                            <tr>
                                                <td style="width: 10%;" id="id">
                                                    <strong>{{ __('Tanggal') }}</strong>
                                                </td>
                                                <td style="width: 15%;" id="id">
                                                    <strong>{{ __('No Rekening') }}</strong>
                                                </td>
                                                <td style="width: 15%;" id="id">
                                                    <strong>{{ __('Nama Bank') }}</strong>
                                                </td>
                                                <td style="width: 20%;" id="id">
                                                    <strong>{{ __('Uraian') }}</strong>
                                                </td>
                                                <td style="width: 5%;" id="id">
                                                    <strong>{{ __('Satuan') }}</strong>
                                                </td>
                                                <td style="width: 15%;" id="id">
                                                    <strong>{{ __('Harga Satuan') }}</strong>
                                                </td>
                                                <td style="width: 20%;" id="id">
                                                    <strong>{{ __('Jumlah Harga') }}</strong>
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
                                    </table><br><br>
                                </div>

                                <div class="table-responsive">
                                    <table class="table table-hover data-table" id="t_ttd">
                                        <thead class="thead-light">
                                            <tr id="option_direct_container" style="display: none;" class="noExl">
                                                
                                            </tr>
                                            <tr>
                                                <td style="width: 40%;">
                                                    
                                                </td>
                                                <td style="width: 30%;" class="text-center">
                                                    <p>{{ __('Di ketahui Oleh') }}</p>
                                                </td>
                                                <td style="width: 30%;" class="text-center">
                                                    <p>{{ __('Disetujui Oleh') }}</p>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-center">
                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td style="width: 40%;" class="text-center">
                                                    
                                                </td>
                                                <td style="width: 30%;" class="text-center">
                                                    <p>(............................)</p>
                                                </td>
                                                <td style="width: 30%;" class="text-center">
                                                    <p>(............................)</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 40%;" class="text-center">
                                                    
                                                </td>
                                                <td style="width: 30%;" class="text-center">
                                                    <p>Pimpinan Cabang</p>
                                                </td>
                                                <td style="width: 30%;" class="text-center">
                                                    <p>DIREKTUR UTAMA</p>
                                                </td>
                                            </tr>
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
    $("#printRAB").table2excel({
        exclude: ".noExl",
        fileext: ".xlsx",
        filename: "Detail Pengajuan",
        exclude_links: true,
        preserveColors: false,
    });

});

$("#export_pdf").click(function() {

    $(".noImport").hide();

    html2canvas($('#printRAB')[0], {
        onrendered: function(canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500,
                }],
            };
            pdfMake.createPdf(docDefinition).download("Detail Pengajuan.pdf");
        }
    });

    setTimeout(() => {
        $(".noImport").show();
    }, 500);
})
</script>

<script src="{{ asset('src/master/pengajuan.js') }}"></script>
<script>
    PengajuanController.detail('{{ Session::get('admin-auth.token') }}', {{ $id }});
</script>
@endsection