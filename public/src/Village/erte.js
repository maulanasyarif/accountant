const ErteUI = ((SET) => {
    return {
        __renderDirectData: ({ results }, { limit }) => {
            let body = results.data.map(v => {
                return `
                    <tr>
                        <td style="width: 50%;">
                            ${v.name}
                            <input type="hidden" name="id" id="id" value="${v.id}"></input>
                        </td>
                    </tr>
                `;
            }).join("");
            
            $('#t_districts tbody').html(body)
        },

        __renderDirectFooter: ({ results }, { status, name, search, limit, sort_by, sort_by_option }) => {
            let max_page = 15;
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
                        <button type="button" class="btn btn-secondary btn-pagination" ${results.prev_page_url === null ? "disabled" : ""
            } data-url="${results.first_page_url}"> << </button>
                        <button type="button" class="btn btn-secondary btn-pagination" ${results.prev_page_url === null ? "disabled" : ""
            } data-url="${results.prev_page_url}"> < </button>
                    </div>
        `;

        footer += `
            <div class="btn-group mr-2" role="group" aria-label="Third group">
                <button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === 1 ? "disabled" : ""
            } data-url="${results.first_page_url}">1</button>`;

        if (results.current_page != 1) {
            footer += `<button type="button" class="btn btn-secondary btn-pagination" disabled data-url="">...</button>`;
        }

        for (let i = start; i <= end /* && ($i<=$max_pages)*/; i++) {
            if (i === results.current_page) {
                footer += `<button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === i ? "disabled" : ""
                    } data-url="${results.path
                    }?sort_by=${name}&status=${status}&sort_by_option=${sort_by_option}&page=${i}">${i}</button>`;
            } else {
                footer += `<button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === i ? "disabled" : ""
                    } data-url="${results.path
                    }?sort_by_option=${sort_by_option}&page=${i}">${i}</button>`;
            }
        }

        if (results.current_page != results.last_page) {
            footer += `<button type="button" class="btn btn-secondary btn-pagination" disabled data-url="">...</button>`;
        }

        footer += `    
                <button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === results.last_page
                ? "disabled"
                : ""
            } data-url="${results.last_page_url}">${results.last_page
            }</button>
            </div>
        `;

        footer += `
                    <div class="btn-group" role="group" aria-label="Third group">
                            <button type="button" class="btn btn-secondary btn-pagination" ${results.next_page_url === null
                ? "disabled"
                : ""
            } data-url="${results.next_page_url
            }"> > </button>
                            <button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === results.last_page
                ? "disabled"
                : ""
            } data-url="${results.last_page_url
            }"> >> </button>
                        </div>
                    </div>
                </td>
            </tr>
        `;

            $("#t_districts tfoot").html(footer);
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

            `

            $("#t_districts tbody").html(html);
        },

        __renderDirectOrder: (results) => {

            let html
        }
    }
})(SettingController)

const ErteController = ((SET, UI) => {

    const __fetchDirectOrder = (TOKEN, filter = {}, link = null, id) => {
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);

        $.ajax({
            url: `${link === null ? SET.__apiURL() + `village/erte/${id}` : link}`,
            type: 'GET',
            dataType: 'JSON',
            data: filter,
            beforeSend: SET.__tableLoader('#t_districts', 7),
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            success: (res) => {
                $("#count_districts").text(res.total_all);
                if (res.results.length !== 0) {
                    UI.__renderDirectData(res, filter);
                    UI.__renderDirectFooter(res, filter);
                } else {
                    UI.__renderDirectNoData();
                }
            },
            error: err => {

            },
            complete: () => {

            },
            statusCode: {
                404: function () {
                    toastr.error("Endpoint Not Found", "Failed 404", SET.__bottomNotif());
                },
                422: function () {
                    toastr.error("Please Check Input Name or Value", "Failed 422", SET.__bottomNotif());
                },
                401: function () {
                    window.location.href = `${SET.__baseURL()}delete_session`;
                },
                500: function () {

                }
            }
        })
    }

    const __clickDirectPagination = (TOKEN, filter = {}) => {
        $('#t_districts').on('click', '.btn-pagination', function () {
            let link = $(this).data('url');
            __fetchDirectOrder(TOKEN, filter, link)
        })
    }

    const __closeDirectFilter = () => {
        $('#btn_direct_close').on('click', function () {
            $("#option_direct_container").hide();
        })
    }

    const __openDirectOption = () => {
        $("#btn_direct_option").on("click", function () {
            $("#option_direct_container").toggle();
        });
    }

    const __pluginDirectInit = TOKEN => {

        $(".datepicker").datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayHighlight: true,
        });

        $("#filter_direct_startdate").on('changeDate', function (selected) {
            let startDate = new Date(selected.date.valueOf());

            $("#filter_direct_enddate").datepicker('setStartDate', startDate);
            if ($("#filter_direct_startdate").val() > $("#filter_direct_enddate").val()) {
                $("#filter_direct_enddate").val($("#filter_direct_startdate").val());
            }
        });
    }

    const __submitDirectFilter = (TOKEN, filter) => {
        $('#form_direct_filter').on('submit', function (e) {
            e.preventDefault();

            filter.name = $('#direct_filter_name').val();
                (filter.sort_by = $('#sort_by').val()),
                (filter.limit = $('#direct_filter_limit').val()),
                (filter.sort_by_option = $('#sort_by_option').val()),            
            __fetchDirectOrder(TOKEN, filter, null)
        });
    }

    const __resetDirectFilter = TOKEN => {
        $('#btn_direct_reset').on('click', function () {
            $('#form_direct_filter')[0].reset()
            __fetchDirectOrder(TOKEN, { limit: 15 })
        })
    }

    return {
        init: TOKEN => {
            let direct_filter = {
                limit: $("#direct_filter_limit").val(),
                sort_by: $("#sort_by").val(),
                sort_by_option: $("#sort_by_option").val(),
            };

            SET.__closeGlobalLoader()

            __openDirectOption()
            __submitDirectFilter(TOKEN, direct_filter)
            __resetDirectFilter(TOKEN)
            __pluginDirectInit(TOKEN)
            __fetchDirectOrder(TOKEN, direct_filter, null, id)
            __clickDirectPagination(TOKEN, direct_filter)
            __closeDirectFilter()
        },
    }
})(SettingController, ErteUI)