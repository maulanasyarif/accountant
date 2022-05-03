const ErweUI = ((SET) => {
    return {
        __renderDirectData: ({ results }, { limit }) => {
            let body = results.data
                .map(v => {
                    return `
                        <tr>
                            <td style="width: 50%;"><a href="${SET.__baseURL()}erte/direct/${v.id}">${v.name}</a></td>
                            
                        </tr>
                    `;
                }).join("");

            $("#t_direct_order tbody").html(body);
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

            $("#t_direct_order tfoot").html(footer);
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
            $("#detail , #form_edit_route").html(nodata);

            $("#t_direct_order tbody").html(html);
        },


        __renderDirectOrder: (results) => {

            let html
        },
        
    }
})(SettingController)

const ErweController = ((SET, UI) => {

    const __fetchDirectOrder = (TOKEN, filter = {}, link = null) => {
        $.ajax({
            url: `${link === null ? SET.__apiURL() + 'village/erwe' : link}`,
            type: 'GET',
            dataType: 'JSON',
            data: filter,
            beforeSend: SET.__tableLoader('#t_direct_order', 7),
            headers: {
                'Authorization': `Bearer ${TOKEN}`
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

    const __getDirectOrderId = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.__apiURL()}village/erte/${id}`,
            type: 'GET',
            dataType: 'JSON',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
            },
            success: (res) => {
                $("#count_districts").text(res.total_all);
                callback(res.results);
            },
            error: err => {

            },
            complete: () => {
                SET.__closeGlobalLoader();
            },
            statusCode: {
                404: function() {
                    SET.__404page()
                },
                422: function() {
                    toastr.error("Please Check Input Name or Value", "Failed 422", SET.__bottomNotif());
                },
                401: function() {
                    window.location.href = `${SET.__baseURL()}delete_session`;
                },
                500: function() {

                }
            }
        })
    }

    const __clickDirectPagination = (TOKEN, filter = {}) => {
        $('#t_direct_order').on('click', '.btn-pagination', function () {
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
            let name = $('#sort_by').val()
            let status = $('#direct_filter_status').val()
            
            filter.name = name
            filter.status = status
            
            __fetchDirectOrder(TOKEN, filter, null)
        })
    }

    const __resetDirectFilter = TOKEN => {
        $('#btn_direct_reset').on('click', function () {
            $('#form_direct_filter')[0].reset()
            __fetchDirectOrder(TOKEN, { limit: 15 })
        })
    }


    const __openAdd = () => {
        $("#btn_add").on("click", function () {
            $("#form_add")[0].reset();
            $("#form_add").validate().resetForm();
            $("#modal_add").modal("show");
        });
    };

    const __showPassword = () => {
        $(".show-password").on("click", function() {
            if ($(this).is(":checked")) {
                $("#password").attr("type", "text");
            } else {
                $("#password").attr("type", "password");
            }
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
                name: {
                    required: true,
                    maxlength: 50,
                },
                password: {
                    required: true,
                    maxlength: 8,
                },
                active: {
                    required: true
                }
            },

            // __showPassword: function () {
            //     $(".show-password").on("click", function() {
            //         if ($(this).is(":checked")) {
            //             $("#password").attr("type", "text");
            //         } else {
            //             $("#password").attr("type", "password");
            //         }
            //     });
            // },

            submitHandler: (form) => {
                $.ajax({
                    url: `${SET.__apiURL()}village/storeRW`,
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
                        __fetchDirectOrder(TOKEN, filter);
                        $("#modal_add").modal("hide");
                        toastr.success(
                            "Success",
                            res.message,
                            SET.__bottomNotif()
                        );
                    },
                    error: (err) => {
                        // let error = err.responseJSON;
                        toastr.error(
                            "Failed",
                            error.message,
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

    return {
        init: TOKEN => {
            let direct_filter = {
                limit: $("#direct_filter_limit").val(),
                sort_by: $("#sort_by").val(),
                sort_by_option: $("#sort_by_option").val(),
            };

            SET.__closeGlobalLoader()

            __openAdd();
            __submitAdd(TOKEN, direct_filter);
            __showPassword();


            __openDirectOption()
            __submitDirectFilter(TOKEN, direct_filter)
            __resetDirectFilter(TOKEN)
            __pluginDirectInit(TOKEN)
            __fetchDirectOrder(TOKEN, direct_filter, null)
            __clickDirectPagination(TOKEN, direct_filter)
            __closeDirectFilter()
            
            __getDirectOrderId(TOKEN, id, null)
        },

        detail: (TOKEN, id) => {
            __getDirectOrderId(TOKEN, id, results => {

                let body = results.data.map(v => {
                    return `
                        <tr>
                            <td style="width: 50%;">${v.name}</td>
                        </tr>
                    `;
                }).join("");
                

            //     let max_page = 15;
            //     let start = results.current_page - 5;
            //     let end = results.current_page + 5;
    
            //     if (start <= 1) {
            //         start = 2;
            //     }
            //     if (end > results.last_page) {
            //         end = results.last_page - 1;
            //     }
            //     let footer = `
            //     <tr class="noExl noImport">
            //         <td colspan="7" class="text-center">
            //             <div class="btn-group mr-2" role="group" aria-label="First group">
            //                 <button type="button" class="btn btn-secondary btn-pagination" ${results.prev_page_url === null ? "disabled" : ""
            //     } data-url="${results.first_page_url}"> << </button>
            //                 <button type="button" class="btn btn-secondary btn-pagination" ${results.prev_page_url === null ? "disabled" : ""
            //     } data-url="${results.prev_page_url}"> < </button>
            //             </div>
            // `;
    
            // footer += `
            //     <div class="btn-group mr-2" role="group" aria-label="Third group">
            //         <button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === 1 ? "disabled" : ""
            //     } data-url="${results.first_page_url}">1</button>`;
    
            // if (results.current_page != 1) {
            //     footer += `<button type="button" class="btn btn-secondary btn-pagination" disabled data-url="">...</button>`;
            // }
    
            // for (let i = start; i <= end /* && ($i<=$max_pages)*/; i++) {
            //     if (i === results.current_page) {
            //         footer += `<button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === i ? "disabled" : ""
            //             } data-url="${results.path
            //             }?sort_by=${name}&status=${status}&sort_by_option=${sort_by_option}&page=${i}">${i}</button>`;
            //     } else {
            //         footer += `<button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === i ? "disabled" : ""
            //             } data-url="${results.path
            //             }?sort_by_option=${sort_by_option}&page=${i}">${i}</button>`;
            //     }
            // }
    
            // if (results.current_page != results.last_page) {
            //     footer += `<button type="button" class="btn btn-secondary btn-pagination" disabled data-url="">...</button>`;
            // }
    
            // footer += `    
            //         <button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === results.last_page
            //         ? "disabled"
            //         : ""
            //     } data-url="${results.last_page_url}">${results.last_page
            //     }</button>
            //     </div>
            // `;
    
            // footer += `
            //             <div class="btn-group" role="group" aria-label="Third group">
            //                     <button type="button" class="btn btn-secondary btn-pagination" ${results.next_page_url === null
            //         ? "disabled"
            //         : ""
            //     } data-url="${results.next_page_url
            //     }"> > </button>
            //                     <button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === results.last_page
            //         ? "disabled"
            //         : ""
            //     } data-url="${results.last_page_url
            //     }"> >> </button>
            //                 </div>
            //             </div>
            //         </td>
            //     </tr>
            // `;
    
            //     $("#t_districts tfoot").html(footer);

            //     let html = `
            //     <tr>
            //         <td class="text-center" colspan="7">
            //             <img class="img-fluid" src="${SET.__baseURL()}assets/images/no_data_table.png" alt="" style="height: 200px; margin-bottom: 35px;"><br>
            //             <span class="font-weight-bold">No Data Available to show , Please add more data .</span><br>
                        
            //         </td>
            //     </tr>
            // `;

            // let nodata = `
            //     <div class="text-center">
            //         <img class="img-fluid" src="${SET.__baseURL()}assets/images/no_data-svg.png" alt="" style="height: 450px;">
            //     </div>

            // `

            // if(results.data.length !== 0){
                $('#t_districts tbody').html(body)
            // }else {
            //     $("#t_districts tbody").html(html); 
            // }

            });
            
        }
    }
})(SettingController, ErweUI)