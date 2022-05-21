const NeracaUI = ( (SET) => {

    return {
        __renderData: ({ results }, { search, limit, sort_by, sort_by_option }) => {

            let body = results.data.map(v => {
                return `
                    <tr>
                        <td style="width:30%;" class="text-left">
                            ${v.perkiraan_name}
                        </td>
                        <td style="width:30%;" class="text-center">
                            ${SET.__threedigis(v.perkiraan_no)}
                        </td>
                        <td style="width:40%;"></td>
                    </tr>
                `
            }).join('')

            $('#t_neraca tbody').html(body)
        },
        __renderFooter: ({ results }, { search, limit, sort_by, sort_by_option }) => {

            let max_page = 15;
            let start = results.current_page - 5
            let end = results.current_page + 5

            if(start <= 1) { start = 2 }
            if(end > results.last_page) { end = results.last_page - 1 }

            let footer = `
                <tr>
                    <td colspan="3" class="text-center">
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

            $('#t_neraca tfoot').html(footer)
        },
        __renderNoData: () => {
            let html = `
                <tr>
                    <td class="text-center" colspan="3">
                        <img class="img-fluid" src="${SET.__baseURL()}assets/images/no_data_table.png" alt="" style="height: 200px; margin-bottom: 35px;"><br>
                        <span class="font-weight-bold">No Data Available to show.</span><br>
                    </td>
                </tr>
            `

            $("#t_neraca tbody").html(html);
        }
    }

})(SettingController)

const NeracaController = ( (SET , UI ) => {  

    const __fetchNeraca = (TOKEN , filter = {} , link = null) => {

        $.ajax({
            url: `${link === null ? SET.__apiURL() + 'admin/neraca' : link}`,
            type: 'GET',
            dataType:'JSON',
            data:filter,
            beforeSend: SET.__tableLoader('#t_neraca', 3),
            headers:{
                'Authorization':`Bearer ${TOKEN}`
            },
            success:(res) => {
                $('#count_activity').text(res.total_all_count)

                if (res.results.data.length !== 0){
                    UI.__renderData(res,filter)
                    UI.__renderFooter(res,filter);
                }else{
                    UI.__renderNoData()
                }
            },
            error: err =>{

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

    const __clickPagination = (TOKEN, filter = {}) => {
        $('#t_neraca').on('click', '.btn-pagination', function(){
            let link = $(this).data('url');

            __fetchNeraca(TOKEN, filter, link);
        });
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

    const __submitFilter = (TOKEN, filter) => {
        $('#form_filter').on('submit', function (e) {
            e.preventDefault();

            filter.name = $('#search_name').val()
            filter.description = $('#search_description').val()
            filter.start_date = $('#start_date').val()
            filter.end_date = $('#end_date').val()

            filter.sort_by = $("#sort_by").val()
            filter.sort_by_option = $("#sort_by_option").val()
            filter.limit = $("#limit").val()

            __fetchNeraca(TOKEN, filter, null)
        })
    }

    const __resetFilter = (TOKEN, filter) => {
        $('#btn_reset').on('click', function () {
            $('#form_filter')[0].reset()

            delete filter.name
            delete filter.description
            delete filter.start_date
            delete filter.end_date

            filter.sort_by = $("#sort_by").val()
            filter.sort_by_option = $("#sort_by_option").val()
            filter.limit = $("#limit").val()

            __fetchNeraca(TOKEN, filter, null)
        })
    }

    const __closeFilter = () => {
        $('#btn_close').on('click', function () {
            $("#option_container").hide();
        })
    }

    return {

        init: TOKEN => {

            SET.__openOption();

            let filter = {
                sort_by: $('#sort_by').val(),
                sort_by_option: $("#sort_by_option").val(),
                limit: $("#limit").val()
            }

            SET.__closeGlobalLoader();
            
            __fetchNeraca(TOKEN, filter);
            
            __pluginInit(TOKEN)
            __submitFilter(TOKEN, filter)
            __resetFilter(TOKEN, filter)
            __closeFilter();
            __clickPagination(TOKEN, filter);
        }

    }

})(SettingController , NeracaUI)