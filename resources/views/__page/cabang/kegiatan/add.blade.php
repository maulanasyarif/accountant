@extends('__layout.app')

@section('title', 'Tambah Kegiatan')

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
            <h4 class="page-title">{{ __('Tambah Kegiatan') }}</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item" aria-current="page">
                            <a href="{{ url('dashboard') }}">{{ __('Dasbor') }}</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            <a href="{{ url('kegiatanCabang') }}">{{ __('Kegiatan') }}</a></li>
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
                            <div class="card">
                                <div class="card-body">
                                    <form id="form_add">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="">{{ __('Judul') }}</label>
                                                    <input type="text" name="judul" id="judul" class="form-control">
                                                </div>
                                                
                                                <div class="form-group">
                                                    <label for="">Tahun</label>
                                                    <!-- <input type="text" name="kegiatan_waktu" id="date" autocomplete="off"
                                                        class="form-control" value="" /> -->
                                                        <select class="custom-select border-1 text-muted" id="kegiatan_waktu" name="kegiatan_waktu">
                                                            <option value="" name="kegiatan_waktu">--{{ __('Tahun') }}--</option>
                                                        </select>
                                                </div>
                                                
                                                <div class="form-group">
                                                    <label for="">{{ __('Nama Kegiatan') }}</label>
                                                    <input type="text" name="kegiatan_name" id="kegiatan_name" class="form-control">
                                                </div>
                                                
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="">{{ __('Pekerjaan') }}</label>
                                                    <input type="text" name="pekerjaan" id="pekerjaan" class="form-control">
                                                </div>
                            
                                                <div class="form-group">
                                                    <label for="">{{ __('Lokasi') }}</label>
                                                    <input type="text" name="lokasi" id="lokasi" class="form-control">
                                                </div>
                                            </div>
                                        </div>

                                            <div id="detailKegiatan" class="col-md-12 mt-5">
                                                <h4>{{__('Detail Kegiatan')}}</h4>

                                                <div class="row" id="multiple">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="">{{ __('Uraian') }}</label>
                                                            <textarea type="text" name="uraian[]" id="uraian" class="form-control"> </textarea>
                                                        </div>
    
                                                        <div class="form-group">
                                                            <label for="">{{ __('Satuan/Volume') }}</label>
                                                            <input type="text" name="satuan[]" id="satuan" class="form-control">
                                                        </div>
    
                                                        <div class="form-group">
                                                            <label for="">{{ __('Harga Satuan') }}</label>
                                                            <input type="text" name="harga_satuan[]" id="harga_satuan" class="form-control">
                                                        </div>
                                                    </div>
    
                                                    <div class="col-md-6">
                                                        
                                                        <div class="form-group">
                                                            <label for="">{{ __('Jumlah Harga') }}</label>
                                                            <input type="text" name="jumlah_harga[]" id="jumlah_harga" class="form-control">
                                                        </div>
    
                                                        <div class="form-group">
                                                            <label for="">{{ __('Keterangan') }}</label>
                                                            <input type="text" name="keterangan[]" id="keterangan" class="form-control">
                                                        </div>

                                                        <div class="btn-group">
                                                            <button class="btn btn-primary btn-md" type="button" name="add" id="addDetailKegiatan">Add Detail</button>
                                                        </div>
                                                    </div>

                                                    <hr style="height:2px; width:100%; border-width:0; color:red; background-color:red">
                                                </div>

                                                <div class="btn-group">
                                                    <a href="{{ url('kegiatanCabang') }}" type="button" class="btn btn-danger waves-effect"
                                                            >{{ __('Back') }}</a>
                                                    <button type="submit" class="btn btn-info waves-effect"
                                                            id="btn_submit">{{ __('Save') }}</button>
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
    $("#t_regencies").table2excel({
        exclude: ".noExl",
        fileext: ".xlsx",
        filename: "Kota",
        exclude_links: true,
        preserveColors: false,
    });

});

$("#export_pdf").click(function() {

    $(".noImport").hide();

    html2canvas($('#t_regencies')[0], {
        onrendered: function(canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }],
            };
            pdfMake.createPdf(docDefinition).download("Kota.pdf");
        }
    });

    setTimeout(() => {
        $(".noImport").show();
    }, 500);
})
</script>

<script src="{{ asset('src/cabang/kegiatan.js') }}"></script>
<script>
    KegiatanController.init('{{ Session::get('admin-auth.token')}}');
</script>
@endsection