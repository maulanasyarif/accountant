const CategoryUI = ((SET) => {
    return {
        __renderData: ({ results }, { search, limit, sort_by, sort_by_option }) => {
            let body = results.data.map(v => {
                return `
                    <tr>
                        <td style="width: 80%;">${v.category_name}</td>
                        <td style="width: 20%;">
                            <div class="btn-group">
                                <button class="btn btn-sm btn-success btn-edit" data-id="${v.id}">Edit</button>
                                <button class="btn btn-sm btn-danger btn-delete" data-id="${v.id}" data-name="${v.category_name}">Delete</button>
                                <button class="btn btn-sm btn-log" data-id="${v.id}" data-name="${v.category_name}" data-ca="${v.created_at !== null ? v.created_at : '-'}" data-created="${v.created_by_user !== null ? v.created_by_user.name : '-'}" data-ua="${v.updated_at !== null ? v.updated_at : '-'}" data-updated="${v.updated_by_user !== null ? v.updated_by_user.name : '-'}"><i class="mdi mdi-magnify-plus-outline"></i></button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('')

            $("#t_category tbody").html(body);
        },

        __renderFooter: ({ results }, { search, limit, sort_by, sort_by_option }) => {

            let max_page = 15;
            let start = results.current_page - 5
            let end = results.current_page + 5

            if (start <= 1) { start = 2 }
            if (end > results.last_page) { end = results.last_page - 1 }

            let footer = `
                <tr>
                    <td colspan="2" class="text-center">
                        <div class="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" class="btn btn-secondary btn-pagination" ${results.prev_page_url === null
                    ? "disabled"
                    : ""
                } data-url="${results.first_page_url}"> << </button>
                            <button type="button" class="btn btn-secondary btn-pagination" ${results.prev_page_url === null
                    ? "disabled"
                    : ""
                } data-url="${results.prev_page_url}"> < </button>
                        </div>
            `;

            footer += `
                <div class="btn-group mr-2" role="group" aria-label="Third group">
                    <button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === 1 ? 'disabled' : ''} data-url="${results.first_page_url}">1</button>`

            if (results.current_page != 1) {
                footer += `<button type="button" class="btn btn-secondary btn-pagination" disabled data-url="">...</button>`;
            }

            for (let i = start; (i <= end)/* && ($i<=$max_pages)*/; i++) {
                if (i === results.current_page) {
                    footer += `<button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === i ? 'disabled' : ''} data-url="${results.path}?search=${search}&limit=${limit}&sort_by=${sort_by}&sort_by_option=${sort_by_option}&page=${i}">${i}</button>`;
                } else {
                    footer += `<button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === i ? 'disabled' : ''} data-url="${results.path}?search=${search}&limit=${limit}&sort_by=${sort_by}&sort_by_option=${sort_by_option}&page=${i}">${i}</button>`;
                }
            }

            if ((results.current_page != results.last_page)) {
                footer += `<button type="button" class="btn btn-secondary btn-pagination" disabled data-url="">...</button>`;

            }

            footer += `    
                    <button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === results.last_page ? 'disabled' : ''} data-url="${results.last_page_url}">${results.last_page}</button>
                </div>
            `;

            footer += `
                        <div class="btn-group" role="group" aria-label="Third group">
                                <button type="button" class="btn btn-secondary btn-pagination" ${results.next_page_url === null
                    ? "disabled"
                    : ""
                } data-url="${results.next_page_url}"> > </button>
                                <button type="button" class="btn btn-secondary btn-pagination" ${results.current_page === results.last_page
                    ? "disabled"
                    : ""
                } data-url="${results.last_page_url}"> >> </button>
                            </div>
                        </div>
                    </td>
                </tr>
            `;

            $("#t_category tfoot").html(footer);
        },

        __renderNoData: () => {
            let html = `
                <tr>
                    <td class="text-center" colspan="2">
                        <img class="img-fluid" src="${SET.__baseURL()}assets/images/no_data_table.png" alt="" style="height: 200px; margin-bottom: 35px;"><br>
                        <span class="font-weight-bold">No Data Available to show , Please add more data .</span><br>
                        <span>
                            <div class="btn-group mt-2">
                                <button class="btn btn-info btn-md" id="btn_add_data" style="width: 125px;"><i class="fas fa-plus"></i> Add</button>
                            </div>
                        </span>
                    </td>
                </tr>
            `

            $("#t_category tbody").html(html);
        }
    }
})(SettingController)

const CetakPDFController = ((SET) => {

    return {
        init: () => {
            SET.__closeGlobalLoader()
        }
    }

})(SettingController)