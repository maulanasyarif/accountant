const BukuKasUI = ((SET) => {
    return {
        __renderDirectData: ({ results }) => {
            let i = 1;
            let body = results
                .map((v) => {
                    return `
                    <tr>
                        <td style="width: 10%;">${i++}</td>
                        <td style="width: 15%;">${v.perkiraan_name}</td>
                        <td style="width: 15%;" class="noExl noImport">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-warning waves-effect" id="btn_detail${
                                    v.id
                                }">Detail</button>
                    </tr>
                `;
                })
                .join("");

            $("#t_bukuKas tbody").html(body);
        },
        __renderDirectDataHidden: (results) => {
            let i = 1;
            let body = results.daftar_buku
                .map((v) => {
                    return `
                    <tr>
                        <td style="width: 10%;">${i++}</td>
                        <td style="width: 15%;">${SET.__getMonth(v.waktu)}</td>
                        <td style="width: 15%;" class="noExl noImport">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-warning waves-effect" id="btn_detail${
                                    v.waktu
                                }">Detail</button>
                    </tr>
                `;
                })
                .join("");
            $("#t_bukuKas_hidden tbody").html(body);
        },
        __renderDirectDataDetail: (results) => {
            $(".d-none").toggleClass("d-flex");
            $("#nama_akun").html(results.perkiraan.perkiraan_name);
            $("#periode").html(results.periode);
            $("#kode_akun").html(results.perkiraan.perkiraan_no);

            let i = 1;
            $("#jumlahDebit").html(
                `Rp. ${SET.__threedigis(results.total_debit)},-`
            );
            $("#jumlahKredit").html(
                `Rp. ${SET.__threedigis(results.total_kredit)},-`
            );
            $("#totalSaldo").html(
                `Rp. ${SET.__threedigis(
                    results.total_debit - results.total_kredit
                )},-`
            );
            let body = results.daftar_buku
                .map((v) => {
                    return `
                    <tr>
                        <td style="width: 10%;" class="text-center">${i++}</td>
                        <td style="width: 15%;" class="text-center">${
                            v.tanggal
                        }</td>
                        <td style="width: 15%;" class="text-center">${
                            v.keterangan
                        }</td>
                        <td style="width: 15%;" class="text-center">${
                            v.tipe === "d"
                                ? `Rp. ${SET.__threedigis(v.jumlah)},-`
                                : "-"
                        }</td>
                        <td style="width: 15%;" class="text-center">${
                            v.tipe === "k"
                                ? `Rp. ${SET.__threedigis(v.jumlah)},-`
                                : "-"
                        }</td>
                    </tr>
                `;
                })
                .join("");
            $("#t_bukuKas_detail tbody").html(body);
        },

        __renderDirectFooter: (
            { results },
            { search, limit, sort_by, sort_by_option }
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
            <td colspan="8" class="text-center">
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
                <td class="text-center" colspan="8">
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

const BukuKasController = ((SET, UI) => {
    const __fetchDirectBukuKas = (TOKEN, filter = {}, link = null) => {
        $.ajax({
            url: `${
                link === null ? SET.__apiURL() + "admin/get_bukuBesar" : link
            }`,
            type: "GET",
            dataType: "JSON",
            data: filter,
            beforeSend: SET.__tableLoader("#t_bukuKas", 8),
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            success: (res) => {
                $("#count_regencies").text(res.total_all);
                if (res.results.length !== 0) {
                    UI.__renderDirectData(res, filter);
                    // UI.__renderDirectFooter(res, filter);
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

    const __HiddenTipe = (TOKEN) => {
        var ID = 0;
        let table = $("#t_bukuKas");
        let table_hidden = $("#t_bukuKas_hidden");
        $("#t_bukuKas").on("click", "button", function (e) {
            ID = this.id.slice(-1);
            table.hide();
            table_hidden.show();
            $.ajax({
                url: `${SET.__apiURL() + "admin/get_showBukuBesar/" + ID}`,
                type: "POST",
                dataType: "JSON",
                beforeSend: SET.__tableLoader("#t_bukuKasHidden", 8),
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
                success: (res) => {
                    $("#count_regencies").text(res.total_all);
                    if (res.length !== 0) {
                        UI.__renderDirectDataHidden(res);
                        // UI.__renderDirectFooter(res, filter);
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
        }),
            $("#t_bukuKas_hidden").on("click", "button", function (e) {
                table_hidden.hide();
                $("#t_bukuKas_detail").show();
                const waktu = this.id.slice(-6);
                $.ajax({
                    url: `${
                        SET.__apiURL() + "admin/get_detailBukuBesar/" + ID
                    }/${waktu}`,
                    type: "POST",
                    dataType: "JSON",
                    beforeSend: SET.__tableLoader("#t_bukuKas_detail", 8),
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                    success: (res) => {
                        $("#count_regencies").text(res.total_all);
                        if (res.length !== 0) {
                            UI.__renderDirectDataDetail(res);
                            // UI.__renderDirectFooter(res, filter);
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
            });
    };

    const __pluginDirectInitPerkiraan = (TOKEN) => {
        $("#direct_perkiraan").select2({
            placeholder: "-- Select Perkiraan --",
            ajax: {
                url: `${SET.__apiURL()}admin/get_perkiraan`,
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
                    url: `${SET.__apiURL()}admin/storebukuKas`,
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
                        __fetchDirectBukuKas(TOKEN, filter);
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
                    url: `${SET.__apiURL()}admin/deletebukuKas/${id}`,
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
                        __fetchDirectBukuKas(TOKEN, filter);
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
            url: `${SET.__apiURL()}admin/get_showBukuBesar/${id}`,
            type: "GET",
            dataType: "JSON",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            success: (res) => {
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
                401: function () {
                    window.location.href = `${SET.__baseURL()}delete_session`;
                },
                500: function () {},
            },
        });
    };

    const __submitUpdateBukuKas = (TOKEN, id) => {
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf("/") + 1);

        $("#form_edit_kas")
            .on("submit", function (e) {
                e.preventDefault();
            })
            .validate({
                errorElement: "div",
                errorPlacement: function (error, element) {
                    error.addClass("invalid-feedback");
                    error.insertAfter(element);
                },
                rules: {
                    tanggal: "required",
                    keterangan: "required",
                    debet_id: "required",
                    kredit_id: "required",
                    jumlah: "required",
                },
                submitHandler: (form) => {
                    $.ajax({
                        url: `${SET.__apiURL()}admin/updatebukuKas/${id}`,
                        type: "POST",
                        dataType: "JSON",
                        data: new FormData(form),
                        contentType: false,
                        processData: false,
                        beforeSend: (xhr) => {
                            SET.__buttonLoader("#btn_update_kas");
                        },
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                        success: (res) => {
                            window.location.href = `${SET.__baseURL()}bukuKasAdmin`;
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
                                error.message,
                                SET.__bottomNotif()
                            );
                        },
                    });
                },
            });
    };

    const __pluginInit = (TOKEN) => {
        $(".datepicker").datepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayHighlight: true,
        });

        $("#start_date").on("changeDate", function (selected) {
            let startDate = new Date(selected.date.valueOf());

            $("#end_date").datepicker("setStartDate", startDate);
            if ($("#start_date").val() > $("#end_date").val()) {
                $("#end_date").val($("#start_date").val());
            }
        });
    };

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
    //         let edit_id = $(this).data('id');

    //         $("#edit_id").val(edit_id);
    //         $('#modal_edit').modal('show');
    //     });
    // }

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
            __fetchDirectBukuKas(TOKEN, filter, link);
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

            filter.keterangan = $("#search_keterangan").val();
            filter.name = $("#search_name").val();
            filter.start_date = $("#start_date").val();
            filter.end_date = $("#end_date").val();

            filter.sort_by = $("#sort_by").val();
            filter.sort_by_option = $("#sort_by_option").val();
            filter.limit = $("#limit").val();

            __fetchDirectBukuKas(TOKEN, filter, null);
        });
    };

    const __resetDirectFilter = (TOKEN) => {
        $("#btn_direct_reset").on("click", function () {
            $("#form_direct_filter")[0].reset();

            __fetchDirectBukuKas(TOKEN, { limit: 10 });
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

            __pluginInit(TOKEN);

            __openAdd();
            __submitAdd(TOKEN);

            // __openEdit(TOKEN);
            // __getDetail(TOKEN, id);

            __openDelete();
            __submitDelete(TOKEN, direct_filter);

            __openDirectOption();
            __submitDirectFilter(TOKEN, direct_filter);
            __resetDirectFilter(TOKEN);
            __fetchDirectBukuKas(TOKEN, direct_filter, null);
            __clickDirectPagination(TOKEN, direct_filter);
            __closeDirectFilter(TOKEN);
            __pluginDirectInitPerkiraan(TOKEN);

            __submitUpdateBukuKas(TOKEN, id);

            __HiddenTipe(TOKEN);
        },
    };
})(SettingController, BukuKasUI);
