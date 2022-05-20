const KasUI = ((SET) => {
    return {
        __renderDirectData: (
            { results },
            { search, limit, sort_by, sort_by_option }
        ) => {
            let body = results.data
                .map((v) => {
                    return `
                    <tr>
                        <td style="width: 10%;">${v.tanggal}</td>
                        <td style="width: 15%;">${v.keterangan}</td>
                        <td style="width: 15%;">${v.perkiraan.perkiraan_name}</td>
                        <td style="width: 10%;">${SET.__threedigis(v.perkiraan.perkiraan_no)}</td>
                        <td style="width: 10%;">
                            ${v.debet !== null ? `${SET.__realCurrency(v.debet)}` : '-'}
                        </td>
                        <td style="width: 10%;">
                            ${v.kredit !== null ? `${SET.__realCurrency(v.kredit)}` : '-'}
                        </td>
                        <td style="width: 15%;">
                            ${v.jmlh !== null ? `${SET.__realCurrency(v.jmlh)}` : '-'}
                        </td>
                        <td style="width: 15%;" class="noExl noImport">
                            <div class="btn-group">
                                <a href="${SET.__baseURL()}editBukuKasCabang/${v.id}" type="button" class="btn btn-sm btn-warning waves-effect" id="btn_detail">Detail</a>
                                <button class="btn btn-sm btn-danger btn-delete" data-id="${v.id}" data-name="${v.keterangan}">Delete</button>
                            </div>
                        </td>
                    </tr>
                `;
                })
                .join("");

            $("#t_bukuKas tbody").html(body);
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
            } data-url="${results.last_page_url}">${results.last_page}</button>
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

            $("#t_bukuKas tfoot").html(footer);
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

            $("#t_bukuKas tbody").html(html);
        },

        __renderDirectOrder: (results) => {
            let html;
        },
    };
})(SettingController);

const KasController = ((SET, UI) => {
    const __fetchDirectKas = (TOKEN, filter = {}, link = null) => {
        $.ajax({
            url: `${
                link === null ? SET.__apiURL() + "cabang/get_bukukas" : link
            }`,
            type: "GET",
            dataType: "JSON",
            data: filter,
            beforeSend: SET.__tableLoader("#t_bukuKas", 7),
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

    const __pluginDirectInitPerkiraan = (TOKEN) => {
        $("#direct_perkiraan").select2({
            placeholder: "-- Select Perkiraan --",
            ajax: {
                url: `${SET.__apiURL()}cabang/get_perkiraan`,
                dataType: "JSON",
                type: "GET",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
                data: function (params) {
                    let query = {
                        search: params.term,
                    };

                    return query;
                },
                processResults: function (res) {
                    let filtered = [];

                    if (res.results.data.length !== 0) {
                        let group = {
                            text: "Perkiraan",
                            children: [],
                        };

                        res.results.data.map((v) => {
                            let perkiraan = {
                                id: v.id,
                                text: `${SET.__threedigis(v.perkiraan_no)} | ${
                                    v.perkiraan_name
                                }`,
                            };

                            group.children.push(perkiraan);
                        });

                        filtered.push(group);
                    }
                    return {
                        results: filtered,
                    };
                },
                cache: true,
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
                kegiatan_id: {
                    required: true,
                },
            },

            submitHandler: (form) => {
                $.ajax({
                    url: `${SET.__apiURL()}cabang/storeBukukas`,
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
                        __fetchDirectKas(TOKEN, filter);
                        $("#modal_add").modal("hide");
                        toastr.success(
                            "Success",
                            res.message,
                            SET.__bottomNotif()
                        );
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

    const __submitDelete = (TOKEN, filter) => {
        $("#form_delete").validate({
            errorClass: "is-invalid",
            errorElement: "div",
            errorPlacement: function (error, element) {
                error.addClass("invalid-feedback");
                error.insertAfter(element);
            },
            rules: {
                id: "required",
            },
            submitHandler: (form) => {
                let id = $("#delete_id").val();

                $.ajax({
                    url: `${SET.__apiURL()}cabang/deleteBukukas/${id}`,
                    type: "DELETE",
                    dataType: "JSON",
                    data: $(form).serialize(),
                    beforeSend: (xhr) => {
                        SET.__buttonLoader("#btn_submit_delete");
                    },
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                    success: (res) => {
                        __fetchDirectKas(TOKEN, filter);
                        $("#modal_delete").modal("hide");
                        toastr.success(
                            "Success",
                            res.message,
                            SET.__bottomNotif()
                        );
                    },
                    error: (err) => {},
                    complete: () => {
                        SET.__closeButtonLoader("#btn_submit_delete");
                    },

                    statusCode: {
                        404: function () {
                            toastr.error(
                                "Cannot find ID Or Endpoint Not Found",
                                "Failed",
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
            },
        });
    };

    const __fetchDetailBukuKas = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.__apiURL()}cabang/detailbukuKas/${id}`,
            type: 'GET',
            dataType: 'JSON',
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            success: (res) => {
                callback(res.results);
            },
            error: err => {

            },
            complete: () => {

            },
            statusCode: {
                404: function () {
                    toastr.error("Endpoint Not Found", "Failed 404", SET.__bottomNotif());
                },
                401: function () {
                    window.location.href = `${SET.__baseURL()}delete_session`;
                },
                500: function () {

                }
            }
        })
    }

    const __submitUpdateBukuKas = (TOKEN, id) => {
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);

        $("#form_edit_kas").on('submit', function(e){
            e.preventDefault()
        }).validate({
            errorElement: "div",
            errorPlacement: function (error, element) {
                error.addClass("invalid-feedback");
                error.insertAfter(element);
            },
            rules: {
                tanggal: 'required',
                keterangan: 'required',
                debet_id: 'required',
                kredit_id: 'required',
                jumlah: 'required'
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.__apiURL()}cabang/updatebukuKas/${id}`,
                    type: "POST",
                    dataType: "JSON",
                    data: new FormData(form),
                    contentType: false,
                    processData: false,
                    beforeSend: xhr => {
                        SET.__buttonLoader("#btn_update_kas");
                    },
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    },
                    success: (res) => {
                        window.location.href = `${SET.__baseURL()}bukuKas`;
                        toastr.success(
                            "Success",
                            res.message,
                            SET.__bottomNotif()
                        );
                    },
                    error: err => {
                        let error = err.responseJSON;

                        toastr.error(
                            "Failed",
                            error.message,
                            SET.__bottomNotif()
                        );
                    },
                });
            }
        });
    }

    const __openDelete = () => {
        $("#t_bukuKas, #options").on("click", ".btn-delete", function () {
            let delete_id = $(this).data("id");
            let delete_name = $(this).data("name");

            $("#delete_id").val(delete_id);
            $("#delete_name").text(delete_name);
            $("#modal_delete").modal("show");
        });
    };

    // const __openEdit = () => {
    //     $("#t_bukuKas, #options").on("click", ".btn-edit", function () {
    //         let edit_id = $(this).data("id");

    //         $("#edit_id").val(edit_id);
    //         $("#modal_edit").modal("show");
    //     });
    // };

    const __openAdd = () => {
        $("#btn_add").on("click", function () {
            $("#form_add")[0].reset();
            $("#form_add").validate().resetForm();
            $("#modal_add").modal("show");
        });
    };

    const __clickDirectPagination = (TOKEN, filter = {}) => {
        $("#t_bukuKas").on("click", ".btn-pagination", function () {
            let link = $(this).data("url");
            __fetchDirectKas(TOKEN, filter, link);
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
                __fetchDirectKas(TOKEN, filter, null);
        });
    };

    const __resetDirectFilter = (TOKEN) => {
        $("#btn_direct_reset").on("click", function () {
            $("#form_direct_filter")[0].reset();

            __fetchDirectPengajuan(TOKEN, { limit: 10 });
        });
    };

    $("#date").datepicker({
        autoclose: true,
        todayHighlight: true,
        // startDate: new Date(),
        format: "dd-mm-yyyy",
        orientation: "bottom",
        maxViewMode: 0,
    });

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

            SET.__openOption();
            SET.__closeGlobalLoader();

            __openAdd();
            __submitAdd(TOKEN);

            // __openEdit();

            __openDelete();
            __submitDelete(TOKEN, direct_filter);

            __openDirectOption();
            __submitDirectFilter(TOKEN, direct_filter);
            __resetDirectFilter(TOKEN);
            __fetchDirectKas(TOKEN, direct_filter, null);
            __clickDirectPagination(TOKEN, direct_filter);
            __closeDirectFilter(TOKEN);
            __pluginDirectInitPerkiraan(TOKEN);

            __submitUpdateBukuKas(TOKEN, id);
        },

        detail: (TOKEN, id) => {
            __fetchDetailBukuKas(TOKEN, id, data => {
                $('#fetch_tanggal').text(data.tanggal);
                $('#fetch_keterangan').text(data.keterangan);
                $('#fetch_noPerkiraan').text(data.perkiraan.perkiraan_no);
                $('#fetch_namaPerkiraan').text(data.perkiraan.perkiraan_name);
                $('#fetch_debet').text(data.debet !== null ? `${SET.__threedigis(data.debet)}` : '-');
                $('#fetch_kredit').text(data.kredit !== null ? `${SET.__threedigis(data.kredit)}` : '-');

                //edit kas
                $('#tanggal').val(data.tanggal);
                $('#keterangan').val(data.keterangan);
                $('#debet').val(data.debet);
                $('#kredit').val(data.kredit);
            })
        }
    };
})(SettingController, KasUI);
