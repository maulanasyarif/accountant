@extends('__layout.app')

@section('title', 'Neraca')

@section('css-source')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css" integrity="sha512-mSYUmp1HYZDFaVKK//63EcZq4iFWFjxSL+Z3T/aCt4IO9Cejm03q3NKKYN6pFQzY0SBOr8h+eCIAZHPXcpZaNw==" crossorigin="anonymous" />
@endsection

@section('content')
    <div class="page-breadcrumb">
        <div class="row">
            <div class="col-5 align-self-center">
                <h4 class="page-title">{{ __('Neraca') }}</h4>
            </div>
            <div class="col-7 align-self-center">
                <div class="d-flex align-items-center justify-content-end">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" aria-current="page">
                                <a href="{{ url('dashboard') }}">{{ __('Dasbor') }}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('Neraca') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <!-- <div class="col-lg-8 col-12">
                <div class="card bg-blue" style="border-radius:10px;">
                    <div class="card-body text-white" >
                        <div class="d-flex flex-row">
                            <div class="display-6 align-self-center"><i class="mdi mdi-clock"></i></div>
                            <div class="p-10 align-self-center">
                                <h4 class="m-b-0">{{ __('Total Aktivitas') }}</h4>
                                <span>{{ __('Semua') }}</span>
                            </div>
                            <div class="ml-auto align-self-center">
                                <h2 class="font-medium m-b-0" id="count_activity">0</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 text-center d-none d-lg-block">
                <img src="{{ asset('assets/images/text-file.svg')}}" height='100' alt="">
            </div> -->

            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h4 class="card-title text-white text-center ">{{ __('Jumlah Pesanan') }}</h4>
                            </div>
                            <div class="col-md-6" style="text-align-last: center;">
                                <select class="custom-select border-1 text-muted mt-2" id="s_order_month">
                                    <option value="1" {{ strftime('%B') == 'January' ? 'selected' : '' }}>
                                        {{ __('Januari') }}</option>
                                    <option value="2" {{ strftime('%B') == 'February' ? 'selected' : '' }}>
                                        {{ __('Febuari') }}</option>
                                    <option value="3" {{ strftime('%B') == 'March' ? 'selected' : '' }}>
                                        {{ __('Maret') }}</option>
                                    <option value="4" {{ strftime('%B') == 'April' ? 'selected' : '' }}>
                                        {{ __('April') }}</option>
                                    <option value="5" {{ strftime('%B') == 'May' ? 'selected' : '' }}>
                                        {{ __('Mei') }}</option>
                                    <option value="6" {{ strftime('%B') == 'June' ? 'selected' : '' }}>
                                        {{ __('Juni') }}</option>
                                    <option value="7" {{ strftime('%B') == 'July' ? 'selected' : '' }}>
                                        {{ __('Juli') }}</option>
                                    <option value="8" {{ strftime('%B') == 'August' ? 'selected' : '' }}>
                                        {{ __('Agustus') }}</option>
                                    <option value="9" {{ strftime('%B') == 'September' ? 'selected' : '' }}>
                                        {{ __('September') }}</option>
                                    <option value="10" {{ strftime('%B') == 'October' ? 'selected' : '' }}>
                                        {{ __('Oktober') }}</option>
                                    <option value="11" {{ strftime('%B') == 'November' ? 'selected' : '' }}>
                                        {{ __('November') }}</option>
                                    <option value="12" {{ strftime('%B') == 'December' ? 'selected' : '' }}>
                                        {{ __('Desember') }}</option>
                                </select>
                            </div>
                            <div class="col-md-6" style="text-align-last: center;">
                                <select class="custom-select border-1 text-muted mt-2" id="s_order_year">
                                    <option value="">--{{ __('Tahun') }}--</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover data-table" id="t_neraca">
                            <thead class="thead-light">
                                <tr class="text-center">
                                    <td style="width:40%;">
                                        <strong>{{ __('Uraian') }}</strong>
                                    </td>
                                    <td style="width:20%;">
                                        <strong>{{ __('No Perkiraan') }}</strong>
                                    </td>
                                    <td style="width:40%;">
                                        <strong>{{ __('Jumlah') }}</strong>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                            <tfoot>
                                
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div> 
    </div>
@endsection
@section('js-source')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js" integrity="sha512-T/tUfKSV1bihCnd+MxKD0Hm1uBBroVYBOYSk1knyvQ9VyZJpc/ALb4P0r6ubwVPSGB2GvjeoMAJJImBG12TiaQ==" crossorigin="anonymous"></script>
    
    <script src="https://cdn.rawgit.com/rainabba/jquery-table2excel/1.1.0/dist/jquery.table2excel.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.22/pdfmake.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js">
</script>

<script>
$("#export_excel").click(function() {
    $("#t_neraca").table2excel({
        exclude: ".noExl",
        fileext: ".xlsx",
        filename: "Neraca",
        exclude_links: true,
        preserveColors: false,
    });
});

$("#export_pdf").click(function() {

    $(".noImport").hide();

    html2canvas($('#t_neraca')[0], {
        onrendered: function(canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }],
            };
            pdfMake.createPdf(docDefinition).download("Neraca.pdf");
        }
    });

    setTimeout(() => {
        $(".noImport").show();
    }, 500);
})
</script>
    <script src="{{ asset('src/admin/neraca.js') }}"></script>
	<script>
        NeracaController.init('{{ Session::get('admin-auth.token') }}');
    </script>
@endsection