const InventoryUI = ((SET) => {
    return {
        __renderDirectData: ({ results }, {limit}) => {
            let body = results.data
                .map((v) => {
                    return (
                        `
                        <tr>
                            <td style="width: 30%;">${v.inventory.barang_name}</td>
                            <td style="width: 20%;">${v.total}</td>
                        </tr>
                    `
                    );
                })
                .join("");  

            $("#t_inventory tbody").html(body);
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

            $("#t_inventory tfoot").html(footer);
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

            $("#t_inventory tbody").html(html);
        },

        __renderDirectOrder: (results) => {
            let html;
        },
    };
})(SettingController);

const InventoryController = ((SET, UI) => {

    const __fetchDirectInventory = (TOKEN, filter = {}, link = null) => {
        $.ajax({
            url: `${
                link === null ? SET.__apiURL() + "cabang/get_inventory" : link
            }`,
            type: "GET",
            dataType: "JSON",
            data: filter,
            beforeSend: SET.__tableLoader("#t_inventory", 7),
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

    const __clickDirectPagination = (TOKEN, filter = {}) => {
        $("#t_inventory").on("click", ".btn-pagination", function () {
            let link = $(this).data("url");
            __fetchDirectInventory(TOKEN, filter, link);
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
                __fetchDirectInventory(TOKEN, filter, null);
        });
    };

    const __resetDirectFilter = (TOKEN) => {
        $("#btn_direct_reset").on("click", function () {
            $("#form_direct_filter")[0].reset();

            __fetchDirectInventory(TOKEN, { limit: 10 });
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

            __openDirectOption();
            __submitDirectFilter(TOKEN, direct_filter);
            __resetDirectFilter(TOKEN);
            __fetchDirectInventory(TOKEN, direct_filter, null);
            __clickDirectPagination(TOKEN, direct_filter);
            __closeDirectFilter(TOKEN);
        },        
    };
})(SettingController, InventoryUI);
