const CorporateUI = ((SET) => {
    return{
        __renderDirectData: ({ results }, { limit }) => {
            let body = results.data
                .map(v => {
                    return `
                        <tr>
                            <td style="width: 30%;">${v.company_name}</td>
                            <td style="width: 20%;">${v.address}</td>
                            <td style="width: 15%;">${v.email}</td>
                            <td style="width: 15%;">${v.phone}</td>
                            <td style="width: 20%" class="noExl noImport">
                                <div class="btn-group">
                                    <a href="${SET.__baseURL()}editCorporate/${v.id}" type="button" class="btn btn-sm btn-primary waves-effect" id="btn_detail">Detail</a>
                                </div>
                            </td>
                        </tr>
                    `;
                }).join("");

            $("#t_Corporate tbody").html(body);
        },

        __renderDirectFooter: ({ results }, { search, sort_by, limit, sort_by_option }) => {
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
                    }?search=${search}&limit=${limit}&sort_by=${sort_by}&sort_by_option=${sort_by_option}&page=${i}">${i}</button>`;
            } else {
                footer += `<button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === i ? "disabled" : ""
                    } data-url="${results.path
                    }?limit=${limit}&sort_by_option=${sort_by_option}&page=${i}">${i}</button>`;
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

            $("#t_Corporate tfoot").html(footer);
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

            $("#t_Corporate tbody").html(html);
        },


        __renderDirectOrder: (results) => {

            let html
        },
        
    }
})(SettingController)

const CorporateController = ((SET, UI) => {

    const __fetchDirectCompany = (TOKEN, filter = {}, link = null) => {
        $.ajax({
            url: `${link === null ? SET.__apiURL() + 'master/get_companies' : link}`,
            type: 'GET',
            dataType: 'JSON',
            data: filter,
            beforeSend: SET.__tableLoader('#t_Corporate', 7),
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


    const __submitAdd = (TOKEN, filter) => {
        $("#formAdd").validate({
            errorClass: "is-invalid",
            errorElement: "div",
            errorPlacement: function (error, element) {
                error.addClass("invalid-feedback");
                error.insertAfter(element);
            },
            rules: {
                company_name: 'required',
                address: 'required',
                phone: 'required',
                email: 'required',
                fax: 'required',
                npwp: 'required',

                username: 'required',
                name: 'required',
                account_email: 'required',
                password: 'required',
                account_phone: 'required',
            },

            submitHandler: (form) => {
                $.ajax({
                    url: `${SET.__apiURL()}master/storeCompany`,
                    type: "POST",
                    dataType: "JSON",
                    data: new FormData(form),
                    contentType: false,
                    processData: false,
                    beforeSend: (xhr) => {
                        SET.__buttonLoader("#btn_submit");
                    },
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                    success: (res) => {
                        window.location.href = `${SET.__baseURL()}Corporate`;
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

    const __fetchDetailCorporate = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.__apiURL()}master/getCompany/${id}`,
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
    };

    const __submitProfile = (TOKEN, id) => {
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);

        $("#form_profile").on('submit', function(e){
            e.preventDefault()
        }).validate({
            errorElement: "div",
            errorPlacement: function (error, element) {
                    error.addClass("invalid-feedback");
                    error.insertAfter(element);
            },
            rules: {
                company_name: 'required',
                address: 'required',
                phone: 'required',
                email: 'required',
                fax: 'required',
                npwp: 'required',
                alias: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.__apiURL()}master/updateCompany/${id}`,
                    type: "POST",
                    dataType: "JSON",
                    data: new FormData(form),
                    contentType: false,
                    processData: false,
                    beforeSend: xhr => {
                        SET.__buttonLoader("#btn_submit_profile");
                    },
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    },
                    success: (res) => {
                        $('#form_profile')[0].reset()
                        window.location.reload();
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

    const __showPassword = () => {
        $(".show-password").on("click", function() {
            if ($(this).is(":checked")) {
                $("#password").attr("type", "text");
            } else {
                $("#password").attr("type", "password");
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
        $('#t_Corporate').on('click', '.btn-pagination', function () {
            let link = $(this).data('url');
            __fetchDirectCompany(TOKEN, filter, link)
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

    const __submitDirectFilter = (TOKEN, filter) => {
        $('#form_direct_filter').on('submit', function (e) {
            e.preventDefault();

            filter.name = $('#direct_filter_name').val();
                (filter.sort_by = $('#sort_by').val()),
                (filter.limit = $('#direct_filter_limit').val()),
                (filter.sort_by_option = $('#sort_by_option').val()),            
            __fetchDirectCompany(TOKEN, filter, null)
        });
    }

    const __resetDirectFilter = TOKEN => {
        $('#btn_direct_reset').on('click', function () {
            $('#form_direct_filter')[0].reset()

            __fetchDirectCompany(TOKEN, { limit: 10 })
        })
    }

    return {
        init : (TOKEN) => {
            let direct_filter = {
                sort_by: $("#sort_by").val(),
                sort_by_option: $("#sort_by_option").val(),
                limit: $("#direct_filter_limit").val(),
            };

            $("input[type=text]").autocomplete({
                disabled: true,
            });

            SET.__closeGlobalLoader()

            __openAdd();
            __submitAdd(TOKEN);

            __showPassword();

            __openDirectOption()
            __submitDirectFilter(TOKEN, direct_filter)
            __resetDirectFilter(TOKEN)
            __fetchDirectCompany(TOKEN, direct_filter, null)
            __clickDirectPagination(TOKEN, direct_filter)
            __closeDirectFilter(TOKEN)

            //edit profile corporate
            __submitProfile(TOKEN, id)
        },

        detail: (TOKEN, id) => {
            __fetchDetailCorporate(TOKEN, id, data => {
                $('#profile_email').text(data.email);
                $('#profile_phone').text(data.phone);
                $('#profile_address').text(data.address);
                $('#profile_company_name').text(data.company_name);
                $('#profile_company_phone').text(data.phone);
                $('#profile_company_fax').text(data.fax);
                $('#profile_company_npwp').text(data.npwp);
                $('#profile_company_address').text(data.address);

                //edit profile
                $('#company_name').val(data.company_name);
                $('#address').val(data.address);
                $('#phone').val(data.phone);
                $('#email').val(data.email);
                $('#fax').val(data.fax);
                $('#npwp').val(data.npwp);
                $('#alias').val(data.alias);
            })
        }
    }
})(SettingController, CorporateUI)