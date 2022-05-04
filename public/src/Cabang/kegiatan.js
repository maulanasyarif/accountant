const KegiatanUI = ((SET) => {
    return {
        __renderDirectData: ({ results }, { limit }) => {
            let body = results.data
                .map((v) => {
                    return `
                        <tr>
                            <td style="width: 20%;">${v.judul}</td>
                            <td style="width: 20%;">${v.kegiatan_name}</td>
                            <td style="width: 20%;">${v.lokasi}</td>
                            <td style="width: 10%;">${v.kegiatan_waktu}</td>
                            <td style="width: 30%;">
                                <a href="" type="button" class="btn btn-sm btn-warning waves-effect" id="btn_edit">Edit</a>
                                <a href="${SET.__baseURL()}printKegiatanCabang/${
                        v.id
                    }" type="button" class="btn btn-sm btn-danger waves-effect" id="btn_print">Print</a>
                            </td>
                        </tr>
                    `;
                })
                .join("");

            $("#t_kegiatan tbody").html(body);
        },

        __renderDirectFooter: (
            { results },
            { search, sort_by, limit, sort_by_option }
        ) => {
            let max_page = 10;
            let start = results.current_page - 5;
            let end = results.current_page + 5;

            if (start <= 1) {
                start = 2;
            }
            if (end > results.last_page) {
                end = results.last_page - 1;
            }
            let footer = `
            <tr class="noExl noImport">
                <td colspan="7" class="text-center">
                    <div class="btn-group mr-2" role="group" aria-label="First group">
                        <button type="button" class="btn btn-secondary btn-pagination" ${
                            results.prev_page_url === null ? "disabled" : ""
                        } data-url="${results.first_page_url}"> << </button>
                        <button type="button" class="btn btn-secondary btn-pagination" ${
                            results.prev_page_url === null ? "disabled" : ""
                        } data-url="${results.prev_page_url}"> < </button>
                    </div>
        `;

            footer += `
            <div class="btn-group mr-2" role="group" aria-label="Third group">
                <button type="button" class="btn btn-secondary btn-pagination" ${
                    results.current_page === 1 ? "disabled" : ""
                } data-url="${results.first_page_url}">1</button>`;

            if (results.current_page != 1) {
                footer += `<button type="button" class="btn btn-secondary btn-pagination" disabled data-url="">...</button>`;
            }

            for (let i = start; i <= end /* && ($i<=$max_pages)*/; i++) {
                if (i === results.current_page) {
                    footer += `<button type="button" class="btn btn-secondary btn-pagination" ${
                        results.current_page === i ? "disabled" : ""
                    } data-url="${
                        results.path
                    }?search=${search}&limit=${limit}&sort_by=${sort_by}&sort_by_option=${sort_by_option}&page=${i}">${i}</button>`;
                } else {
                    footer += `<button type="button" class="btn btn-secondary btn-pagination" ${
                        results.current_page === i ? "disabled" : ""
                    } data-url="${
                        results.path
                    }?limit=${limit}&sort_by_option=${sort_by_option}&page=${i}">${i}</button>`;
                }
            }

            if (results.current_page != results.last_page) {
                footer += `<button type="button" class="btn btn-secondary btn-pagination" disabled data-url="">...</button>`;
            }

            footer += `    
                <button type="button" class="btn btn-secondary btn-pagination" ${
                    results.current_page === results.last_page ? "disabled" : ""
                } data-url="${results.last_page_url}">${
                results.last_page
            }</button>
            </div>
        `;

            footer += `
                    <div class="btn-group" role="group" aria-label="Third group">
                            <button type="button" class="btn btn-secondary btn-pagination" ${
                                results.next_page_url === null ? "disabled" : ""
                            } data-url="${results.next_page_url}"> > </button>
                            <button type="button" class="btn btn-secondary btn-pagination" ${
                                results.current_page === results.last_page
                                    ? "disabled"
                                    : ""
                            } data-url="${results.last_page_url}"> >> </button>
                        </div>
                    </div>
                </td>
            </tr>
        `;

            $("#t_kegiatan tfoot").html(footer);
        },

        __renderDirectNoData: () => {
            let html = `
                <tr>
                    <td class="text-center" colspan="7">
                        <img class="img-fluid" src="${SET.__baseURL()}assets/images/no_data_table.png" alt="" style="height: 200px; margin-bottom: 35px;"><br>
                        <span class="font-weight-bold">No Data Available to show , Please add more data .</span><br>
                        
                    </td>
                </tr>
            `;

            let nodata = `
                <div class="text-center">
                    <img class="img-fluid" src="${SET.__baseURL()}assets/images/no_data-svg.png" alt="" style="height: 450px;">
                </div>

            `;
            $("#detail , #form_edit_route").html(nodata);

            $("#t_kegiatan tbody").html(html);
        },

        __renderDirectOrder: (results) => {
            let html;
        },
    };
})(SettingController);

const KegiatanController = ((SET, UI) => {
    const __fetchDirectKegiatan = (TOKEN, filter = {}, link = null) => {
        $.ajax({
            url: `${
                link === null ? SET.__apiURL() + "cabang/get_kegiatan" : link
            }`,
            type: "GET",
            dataType: "JSON",
            data: filter,
            beforeSend: SET.__tableLoader("#t_kegiatan", 7),
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            success: (res) => {
                $("#count_regencies").text(res.total_all);
                if (res.results.data.length !== 0) {
                    UI.__renderDirectData(res, filter);
                    UI.__renderDirectFooter(res, filter);
                } else {
                    UI.__renderDirectNoData();
                }
            },
            error: (err) => {},
            complete: () => {},
            statusCode: {
                404: function () {
                    toastr.error(
                        "Endpoint Not Found",
                        "Failed 404",
                        SET.__bottomNotif()
                    );
                },
                422: function () {
                    toastr.error(
                        "Please Check Input Name or Value",
                        "Failed 422",
                        SET.__bottomNotif()
                    );
                },
                401: function () {
                    window.location.href = `${SET.__baseURL()}delete_session`;
                },
                500: function () {},
            },
        });
    };

    const __submitAdd = (TOKEN, filter) => {
        $("#form_add").validate({
            errorClass: "is-invalid",
            errorElement: "div",
            errorPlacement: function (error, element) {
                error.addClass("invalid-feedback");
                error.insertAfter(element);
            },
            rules: {
                user_id: {
                    required: true,
                },
                judul: {
                    required: true,
                },
                kegiatan_name: {
                    required: true,
                },
                pekerjaan: {
                    required: true,
                },
                kegiatan_waktu: {
                    required: true,
                },
                lokasi: {
                    required: true,
                },
            },

            submitHandler: (form) => {
                $.ajax({
                    url: `${SET.__apiURL()}cabang/storeKegiatan`,
                    type: "POST",
                    dataType: "JSON",
                    data: $(form).serialize(),
                    beforeSend: (xhr) => {
                        SET.__buttonLoader("#btn_submit");
                    },
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                    success: (res) => {
                        // $("#modal_add").modal("hide");
                        toastr.success(
                            "Success",
                            res.message,
                            SET.__bottomNotif()
                        );

                        location.href = `${SET.__baseURL()}kegiatanCabang`;
                        __fetchDirectKegiatan(TOKEN, filter);
                    },
                    error: (err) => {
                        let error = err.responseJSON;
                        toastr.error(
                            "Failed",
                            error.error,
                            SET.__bottomNotif()
                        );
                    },
                    complete: () => {
                        SET.__closeButtonLoader("#btn_submit");
                        location.href = `${SET.__baseURL()}kegiatanCabang`;
                        __fetchDirectKegiatan(TOKEN, filter);
                    },
                    statusCode: {
                        422: function () {
                            toastr.error(
                                "Please Check Input Name or Value",
                                "Failed",
                                SET.__bottomNotif()
                            );
                        },
                        401: function () {
                            window.location.href = `${SET.__baseURL()}delete_session`;
                        },
                        500: function () {},
                    },
                });
            },
        });
    };

    const __fetchPrintKegiatan = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.__apiURL()}cabang/printKegiatan${id}`,
            type: "GET",
            dataType: "JSON",
            // beforeSend: SET.__tableLoader('#t_printKegiatan', 7),
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            success: (res) => {
                // console.log(res.results);
                callback(res.results);
            },
            error: (err) => {},
            complete: () => {},
            statusCode: {
                404: function () {
                    toastr.error(
                        "Endpoint Not Found",
                        "Failed 404",
                        SET.__bottomNotif()
                    );
                },
                422: function () {
                    toastr.error(
                        "Please Check Input Name or Value",
                        "Failed 422",
                        SET.__bottomNotif()
                    );
                },
                401: function () {
                    window.location.href = `${SET.__baseURL()}delete_session`;
                },
                500: function () {},
            },
        });
    };

    const __openAdd = () => {
        $("#btn_add").on("click", function () {
            $("#form_add")[0].reset();
            $("#form_add").validate().resetForm();
            $("#modal_add").modal("show");
        });
    };

    // $("#date").datepicker({
    //     autoclose: true,
    //     todayHighlight: true,
    //     startDate: new Date(),
    //     format: "dd-mm-yyyy",
    //     orientation: "bottom",
    //     maxViewMode: 0,
    // });

    var start_year = new Date().getFullYear();

    for (var i = start_year; i > start_year - 5; i--) {
        $("#kegiatan_waktu").append(
            `<option value="${i}" name="kegiatan_waktu" ${
                i == start_year ? "selected" : ""
            }>${i}</option> `
        );
    }

    var i = 1;
    $("#addDetailKegiatan").on("click", function () {
        i++;
        $("#multiple").append(
            `
            <div id="apanih" class="col-md-12">
            <div class="row">

            <div class="col-md-6">
                <div class="form-group">
                    <label for="">Uraian</label>
                    <textarea type="text" name="uraian[]" id="uraian" class="form-control"> </textarea>
                </div>

                <div class="form-group">
                    <label for="">Satuan/Volume</label>
                    <input type="text" name="satuan[]" id="satuan` +
                i +
                `" class="form-control">
                </div>

                <div class="form-group">
                    <label for="">Harga Satuan</label>
                    <input type="text" name="harga_satuan[]" id="harga_satuan` +
                i +
                `" class="form-control">
                </div>
            </div>

            <div class="col-md-6">
                
                <div class="form-group">
                    <label for="">Jumlah Harga</label>
                    <input type="text" name="jumlah_harga[]" disabled id="jumlah_harga` +
                i +
                `" class="form-control">
                </div>

                <div class="form-group">
                    <label for="">Keterangan</label>
                    <input type="text" name="keterangan[]" id="keterangan" class="form-control">
                </div>

                </div>

                <button type="button" id="remove" class="btn btn-outline-danger remove-input-field">Delete</button>
                

            </div>
            </div>
        `
        );

        $("#multiple").on("click", ".remove-input-field", function () {
            $(this).parent("#apanih div").remove();
            i--;
        });
        $("#satuan" + i).on("keyup", function () {
            let satuan = parseInt($("#satuan" + i).val());
            let harga_satuan = parseInt($("#harga_satuan" + i).val());
            let total = satuan * harga_satuan;
            $("#jumlah_harga" + i).val(isNaN(total) ? "-" : total);
        });
        $("#harga_satuan" + i).on("keyup", function () {
            let satuan = parseInt($("#satuan" + i).val());
            let harga_satuan = parseInt($("#harga_satuan" + i).val());
            let total = satuan * harga_satuan;
            $("#jumlah_harga" + i).val(isNaN(total) ? "-" : total);
        });
    });

    const __clickDirectPagination = (TOKEN, filter = {}) => {
        $("#t_kegiatan").on("click", ".btn-pagination", function () {
            let link = $(this).data("url");
            __fetchDirectKegiatan(TOKEN, filter, link);
        });
    };

    const __closeDirectFilter = () => {
        $("#btn_direct_close").on("click", function () {
            $("#option_direct_container").hide();
        });
    };

    const __openDirectOption = () => {
        $("#btn_direct_option").on("click", function () {
            $("#option_direct_container").toggle();
        });
    };

    const __submitDirectFilter = (TOKEN, filter) => {
        $("#form_direct_filter").on("submit", function (e) {
            e.preventDefault();

            filter.name = $("#direct_filter_name").val();
            (filter.sort_by = $("#sort_by").val()),
                (filter.limit = $("#direct_filter_limit").val()),
                (filter.sort_by_option = $("#sort_by_option").val()),
                __fetchDirectKegiatan(TOKEN, filter, null);
        });
    };

    const __resetDirectFilter = (TOKEN) => {
        $("#btn_direct_reset").on("click", function () {
            $("#form_direct_filter")[0].reset();

            __fetchDirectKegiatan(TOKEN, { limit: 10 });
        });
    };

    return {
        init: (TOKEN) => {
            let direct_filter = {
                sort_by: $("#sort_by").val(),
                sort_by_option: $("#sort_by_option").val(),
                limit: $("#direct_filter_limit").val(),
            };

            $("input[type=text]").autocomplete({
                disabled: true,
            });

            SET.__closeGlobalLoader();

            __openAdd();
            __submitAdd(TOKEN);

            __openDirectOption();
            __submitDirectFilter(TOKEN, direct_filter);
            __resetDirectFilter(TOKEN);
            __fetchDirectKegiatan(TOKEN, direct_filter, null);
            __fetchPrintKegiatan(TOKEN);
            __clickDirectPagination(TOKEN, direct_filter);
            __closeDirectFilter(TOKEN);
        },

        detail: (TOKEN, id) => {
            __fetchPrintKegiatan(TOKEN, id, (data) => {
                let body = data[0].detail_kegiatan
                    .map((v) => {
                        return `
                    <tr>
                    <td style="width: 25%;">${v.uraian}</td>
                    <td style="width: 25%;">${v.satuan}</td>
                    <td style="width: 25%;">${v.harga_satuan}</td>
                    <td style="width: 25%;">${v.jumlah_harga}</td>
                    </tr>
                    
                    `;

                        `<tr id="total">
                    <td  colspan="3">
                    
                    </td>
                </tr>`;
                    })
                    .join("");
                $("#total").text(data.judul);

                $("#t_printKegiatan tbody").html(body);
            });
        },
    };
})(SettingController, KegiatanUI);
