const PengajuanUI = ((SET) => {
    return {
        __renderDirectData: ({ results },  { search, limit, sort_by, sort_by_option }) => {
            let body = results.data
                .map((v) => {
                    return `
                        <tr>
                            <td style="width: 25%;">${v.company_name}</td>
                            <td style="width: 25%;">${v.kegiatan.no_surat}</td>
                            <td style="width: 30%;">${v.kegiatan.judul}</td>
                            <td style="width: 10%;" class="noExl noImport">
                                ${v.status === 'pending' ? 
                                    `<button type="button" class="btn btn-sm btn-warning">${v.status}</button>` :
                                    v.status === 'review' ? 
                                        `<button type="button" class="btn btn-sm btn-primary">${v.status}</button>` :
                                    v.status === 'approve' ? 
                                        `<button type="button" class="btn btn-sm btn-success">${v.status}</button>` :
                                `<button type="button" class="btn btn-sm btn-danger">${v.status}</button>`}
                            </td>
                            <td>
                                <a href="${SET.__baseURL()}detailPengajuan/${v.kegiatan.id}" type="button"
                                    class="btn btn-sm btn-primary waves-effect" id="btn_print">Detail</a>
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
                    <td colspan="5" class="text-center">
                        <div class="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" class="btn btn-secondary btn-pagination" ${
                                results.prev_page_url === null
                                    ? "disabled"
                                    : ""
                                } data-url="${results.first_page_url}"> << </button>
                            <button type="button" class="btn btn-secondary btn-pagination" ${
                                results.prev_page_url === null
                                    ? "disabled"
                                    : ""
                            } data-url="${results.prev_page_url}"> < </button>
                        </div>
            `;

            footer += `
                <div class="btn-group mr-2" role="group" aria-label="Third group">
                    <button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === 1 ? 'disabled' : ''} data-url="${results.first_page_url}">1</button>`
            
            if (results.current_page != 1) {
                footer +=  `<button type="button" class="btn btn-secondary btn-pagination" disabled data-url="">...</button>`;
            }

            for(let i = start; (i <= end)/* && ($i<=$max_pages)*/; i++)
            {
                if(i === results.current_page){
                    footer += `<button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === i ? 'disabled' : ''} data-url="${results.path}?search=${search}&limit=${limit}&sort_by=${sort_by}&sort_by_option=${sort_by_option}&page=${i}">${i}</button>`;
                } else {
                    footer += `<button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === i ? 'disabled' : ''} data-url="${results.path}?search=${search}&limit=${limit}&sort_by=${sort_by}&sort_by_option=${sort_by_option}&page=${i}">${i}</button>`;
                }
            }

            if ((results.current_page != results.last_page))
            {
                footer +=  `<button type="button" class="btn btn-secondary btn-pagination" disabled data-url="">...</button>`;
            }

            footer += `    
                    <button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === results.last_page ? 'disabled' : ''} data-url="${results.last_page_url}">${results.last_page}</button>
                </div>
            `;

            footer += `
                        <div class="btn-group" role="group" aria-label="Third group">
                                <button type="button" class="btn btn-secondary btn-pagination" ${
                                    results.next_page_url === null
                                    ? "disabled"
                                    : ""
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
                    <td class="text-center" colspan="5">
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
                link === null ? SET.__apiURL() + 'master/getPengajuan' : link
            }`,
            type: "GET",
            dataType: "JSON",
            data: filter,
            beforeSend: SET.__tableLoader("#t_pengajuan", 5),
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

    const __fetchDetailPengajuan = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.__apiURL()}master/detailPengajuan/${id}`,
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

    const __pluginInit = TOKEN => {
        $(".datepicker").datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayHighlight: true,
        });

        $("#start_date").on('changeDate', function (selected) {
            let startDate = new Date(selected.date.valueOf());

            $("#end_date").datepicker('setStartDate', startDate);
            if ($("#start_date").val() > $("#end_date").val()) {
                $("#end_date").val($("#start_date").val());
            }
        });
    }

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

                filter.judul = $('#search_judul').val()
                filter.surat = $('#search_surat').val()
                filter.start_date = $('#start_date').val()
                filter.end_date = $('#end_date').val()

                filter.sort_by = $("#sort_by").val()
                filter.sort_by_option = $("#sort_by_option").val()
                filter.limit = $("#limit").val()

                __fetchDirectPengajuan(TOKEN, filter, null);
        });
    };

    const __resetDirectFilter = (TOKEN) => {
        $("#btn_direct_reset").on("click", function () {
            $("#form_direct_filter")[0].reset();

            __fetchDirectPengajuan(TOKEN, { limit: 10 });
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

            __pluginInit(TOKEN)

            __openDirectOption()
            __submitDirectFilter(TOKEN, direct_filter)
            __resetDirectFilter(TOKEN)
            __fetchDirectPengajuan(TOKEN, direct_filter, null)
            __clickDirectPagination(TOKEN, direct_filter)
            __closeDirectFilter(TOKEN)
        },

        detail: (TOKEN, id) => {
            __fetchDetailPengajuan(TOKEN, id, data => {
                $('#judul').text(data[0].judul)

                let parent = data.map(v => {
                    return `
                    <tr>
                        <td style="width: 35%;" class="d-flex">
                            <b>Waktu Kegiatan :</b>
                            ${v.kegiatan_waktu}
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 35%;" class="d-flex">
                            <b>No. Surat :</b>
                            ${v.no_surat}
                        </td>
                    </tr>
                    `;
                }).join("")
                $("#t_parent tbody").html(parent);
                
                let body = data[0].detail_kegiatan
                .map(v => {
                    return `
                    <tr>
                        <td style="width: 10%;">${v.tanggal}</td>
                        <td style="width: 15%;">${v.nomor_rekening !== null ? v.nomor_rekening : '-'}</td>
                        <td style="width: 15%;">${v.nama_bank !== null ? v.nama_bank : '-'}</td>
                        <td style="width: 20%;">${v.uraian !== null ? v.uraian : '-'}</td>
                        <td style="width: 5%;">${v.satuan !== null ? v.satuan : '-'}</td>
                        <td style="width: 15%;">${v.harga_satuan !== null ? `IDR ${SET.__realCurrency(v.harga_satuan)}` : '-'}</td>
                        <td style="width: 20%;">${v.jumlah_harga !== null ? `IDR ${SET.__realCurrency(v.jumlah_harga)}` : '-'}</td>
                    </tr>
                    `;
                }).join("");
                
                $("#t_printKegiatan tbody").html(body);

                let total_sum = data.map(v => {
                    return `
                    <tr>
                        <td style="width: 15%;">
                            <b>Jumlah Total</b>
                        </td>
                        <td style="width: 10%;">
                            
                        </td>
                        <td style="width: 15%;">
                            
                        </td>
                        <td style="width: 20%;">
                            
                        </td>
                        <td style="width: 5%;">
                            
                        </td>
                        <td style="width: 15%;">
                            
                        </td>
                        <td style="width: 20%;">
                            <b>${v.total !== null ? `IDR ${SET.__realCurrency(v.total)}` : '-'}</b>
                        </td>
                    </tr>
                    `;
                }).join("")
                $("#t_printKegiatan tfoot").html(total_sum);
            })
        }
    }
})(SettingController, PengajuanUI);