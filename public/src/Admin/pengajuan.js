const PengajuanUI = ((SET) => {
    return {
        __renderDirectData: (
            { results },
            { search, limit, sort_by, sort_by_option }
        ) => {
            let body = results.data
                .map((v) => {
                    return `
                        <tr>
                            <td style="width: 25%;">${v.company_name}</td>
                            <td style="width: 20%;">${v.kegiatan.no_surat}</td>
                            <td style="width: 25%;">${v.kegiatan.judul}</td>
                            <td id="action" style="width: 30%;" class="noExl noImport text-white">
                                    ${
                                        v.status === "pending"
                                            ? `<form method="post" id="vpengajuan${v.kegiatan.id}">
                                    <input type="hidden" id="data_json${v.kegiatan.id}" value='` +
                                              JSON.stringify(v.kegiatan) +
                                              `'>
                                    <div class="btn-group">
                                        <button type="button" value="review" name="${v.kegiatan.id}" id="review${v.kegiatan.id}" class="btn btn-sm btn-warning">Review</button>
                                        <button type="button" value="approve" id="approve${v.kegiatan.id}" class="btn btn-sm btn-success">Approve</button>
                                        <button type="button" value="decline" id="decline${v.kegiatan.id}" class="btn btn-sm btn-danger">Decline</button>
                                        </form>
                                    </div>`
                                            : v.status === "review"
                                            ? `<form method="post" id="vpengajuan${v.kegiatan.id}">
                                    <input type="hidden" id="data_json${v.kegiatan.id}" value='` +
                                              JSON.stringify(v.kegiatan) +
                                              `'>
                                    <div class="btn-group">
                                        <button type="button" value="approve" id="approve${v.kegiatan.id}" class="btn btn-sm btn-success">Approve</button>
                                        <button type="button" value="decline" id="decline${v.kegiatan.id}" class="btn btn-sm btn-danger">Decline</button>
                                        </form>
                                    </div>`
                                            : v.status === "approve"
                                            ? `<a type="button" class="btn btn-success">${v.status}</a>`
                                            : `<a type="button" class="btn btn-danger">${v.status}</a>`
                                    }
                            </td>
                        </tr>
                    `;
                })
                .join("");

            $("#t_pengajuan tbody").html(body);
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
                <td colspan="4" class="text-center">
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

            $("#t_pengajuan tfoot").html(footer);
        },

        __renderDirectNoData: () => {
            let html = `
                <tr>
                    <td class="text-center" colspan="4">
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

            $("#t_pengajuan tbody").html(html);
        },

        __renderDirectOrder: (results) => {
            let html;
        },
    };
})(SettingController);

const PengajuanController = ((SET, UI) => {
    const __fetchDirectPengajuan = (TOKEN, filter = {}, link = null) => {
        $.ajax({
            url: `${
                link === null ? SET.__apiURL() + "admin/get_pengajuan" : link
            }`,
            type: "GET",
            dataType: "JSON",
            data: filter,
            beforeSend: SET.__tableLoader("#t_pengajuan", 4),
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

    const __verifikasiPengajuan = (TOKEN, filter) => {
        $(document).ready(function () {
            $("#t_pengajuan tbody").on("click", "button", function (e) {
                e.preventDefault();
                var formData = {
                    data: $("#data_json" + this.id.slice(-1)).val(),
                    status: this.id,
                    id: this.name,
                    value: this.value,
                };
                console.log(formData);
                $.ajax({
                    url: `${SET.__apiURL()}admin/verifikasipengajuan`,
                    type: "POST",
                    dataType: "JSON",
                    data: formData,
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                    success: (res) => {
                        if (formData.value === "review") {
                            location.href = `${SET.__baseURL()}editPengajuanAdmin/${
                                formData.id
                            }`;
                        } else {
                            __fetchDirectPengajuan(TOKEN, filter);
                        }
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
            });
        });
    };

    const __pluginDirectInit = (TOKEN) => {
        $("#direct_filter_kegiatan").select2({
            placeholder: "-- Select Kegiatan --",
            ajax: {
                url: `${SET.__apiURL()}cabang/get_kegiatan`,
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
                            text: "Kegiatan",
                            children: [],
                        };

                        res.results.data.map((v) => {
                            let kegiatan = {
                                id: v.id,
                                text: `${v.no_surat} || ${v.judul}`,
                            };

                            group.children.push(kegiatan);
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
                    url: `${SET.__apiURL()}admin/storePengajuan`,
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
                        __fetchDirectPengajuan(TOKEN, filter);
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

    const __fetchDetailPengajuan = (TOKEN, id, callback) => {
        const searchParam = new URLSearchParams(window.location.search);
        const getParam = searchParam.get("page");
        $.ajax({
            url: `${SET.__apiURL()}admin/get_detailPengajuan/${id}?page=${getParam}`,
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

    const __openAdd = () => {
        $("#btn_add").on("click", function () {
            $("#form_add")[0].reset();
            $("#form_add").validate().resetForm();
            $("#modal_add").modal("show");
        });
    };

    const __clickDirectPagination = (TOKEN, filter = {}) => {
        $("#t_pengajuan").on("click", ".btn-pagination", function () {
            let link = $(this).data("url");
            __fetchDirectPengajuan(TOKEN, filter, link);
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

            filter.judul = $("#search_judul").val();
            filter.surat = $("#search_surat").val();
            filter.start_date = $("#start_date").val();
            filter.end_date = $("#end_date").val();

            filter.sort_by = $("#sort_by").val();
            filter.sort_by_option = $("#sort_by_option").val();
            filter.limit = $("#limit").val();

            __fetchDirectPengajuan(TOKEN, filter, null);
        });
    };

    const __resetDirectFilter = (TOKEN) => {
        $("#btn_direct_reset").on("click", function () {
            $("#form_direct_filter")[0].reset();

            __fetchDirectPengajuan(TOKEN, { limit: 10 });
        });
    };

    const __updateDetailKegiatan = (TOKEN) => {
        $("#updateDetailPengajuan").click(function (e) {
            e.preventDefault();
            const idDetail = $("#id_detailKegiatan").val();
            $.ajax({
                url: `${SET.__apiURL()}admin/updateDetailKegiatan/${idDetail}/edit`,
                type: "PATCH",
                dataType: "json",
                data: $("#edit-pengajuan").serialize(),
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
                success: (res) => {
                    toastr.success("Success", res.message, SET.__bottomNotif());
                    window.setTimeout(() => {
                        window.location.reload(window.location.href);
                    }, 2000);
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

            __pluginInit(TOKEN);

            __openAdd();
            __submitAdd(TOKEN);

            __verifikasiPengajuan(TOKEN);
            __updateDetailKegiatan(TOKEN);

            __openDirectOption();

            __submitDirectFilter(TOKEN, direct_filter);
            __resetDirectFilter(TOKEN);
            __fetchDirectPengajuan(TOKEN, direct_filter, null);
            __clickDirectPagination(TOKEN, direct_filter);
            __closeDirectFilter(TOKEN);
            __pluginDirectInit(TOKEN);
        },

        detail: (TOKEN, id) => {
            $(document).ready(function () {
                __fetchDetailPengajuan(TOKEN, id, (data) => {
                    $("#judul").text(data.data[0].judul);
                    $("#no_surat").text(data.data[0].no_surat);
                    $("#kegiatan_waktu").text(data.data[0].kegiatan_waktu);
                    data.data.map((v) => {
                        $("#id_detailKegiatan").val(v.id);
                        $("#tanggal").val(v.tanggal);
                        $("#uraian").val(v.uraian);
                        $("#nomor_rekening").val(v.nomor_rekening);
                        $("#nama_bank").val(v.nama_bank);
                        $("#satuan").val(v.satuan);
                        $("#harga_satuan").val(v.harga_satuan);
                        $("#jumlah_harga").val(v.jumlah_harga);
                    });
                    const urlParams = new URLSearchParams(
                        window.location.search
                    );
                    const getParam = urlParams.get("page");
                    $("#prev").attr(
                        "href",
                        `${SET.__baseURL()}editPengajuanAdmin/${id}?page=${
                            data.prev_page_url
                                ? data.prev_page_url.substr(
                                      data.prev_page_url.length - 1
                                  )
                                : getParam
                        }`
                    );
                    $("#next").attr(
                        "href",
                        `${SET.__baseURL()}editPengajuanAdmin/${id}?page=${
                            data.next_page_url
                                ? data.next_page_url.substr(
                                      data.next_page_url.length - 1
                                  )
                                : getParam
                        }`
                    );
                });
            });
        },
    };
})(SettingController, PengajuanUI);
