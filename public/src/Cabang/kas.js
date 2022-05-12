const KasUI = ((SET) => {
    return {
    __renderDirectData: ({ results }, { limit }) => {
        let body = results.data
            .map(v => {
                return `
                    <tr>
                        <td style="width: 25%;">${SET.__threedigis(v.perkiraan.perkiraan_no)}</td>
                        <td style="width: 25%;">${v.perkiraan.perkiraan_name}</td>
                        <td style="width: 25%;">${SET.__realCurrency(v.debit)}</td>
                        <td style="width: 25%;">${SET.__realCurrency(v.kredit)}</td>
                    </tr>
                `;
            }).join("");

        $("#t_jurnalUmum tbody").html(body);
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

        $("#t_daftarPerkiraan tfoot").html(footer);
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

        $("#t_jurnalUmum tbody").html(html);
    },


    __renderDirectOrder: (results) => {

        let html
    },
    
}
})(SettingController)

const KasController = ((SET, UI) => {

    const __openAdd = () => {
        $("#btn_add").on("click", function () {
            $("#form_add")[0].reset();
            $("#form_add").validate().resetForm();
            $("#modal_add").modal("show");
        });
    };

    $("#tanggal").datepicker({
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

            SET.__closeGlobalLoader()

            __openAdd();
        }
    }

})(SettingController, KasUI)