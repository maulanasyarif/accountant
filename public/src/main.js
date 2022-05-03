const MainUI = ((SET) => {

    return {
        __renderDataLog : data => {

            
            let html = `
                <div class="steamline">
                    ${data.map(v => {
                        var date = moment(`${v.datetime}`).startOf('minute').fromNow(); 

                        return `
                            <div class="sl-item">
                                <div class="sl-left bg-success"> <i class="ti-user"></i></div>
                                <div class="sl-right">
                                    <div class="font-medium">${v.description}</div>
                                    <div class="desc">${date}</div>
                                </div>
                            </div>
                        `
                    }).join('')}
                    
                </div>
            `
            $('#sidebar_log').html(html)
        }
    }

})(SettingController)

const MainController = ((SET , UI) => {

    const __logoutSystem = () => {
        $('#logout').on('click', function(){

            $.ajax({
                url: `${SET.__baseURL()}logout`,
                type: 'GET',
                dataType: 'JSON',
                beforeSend: xhr => {
                    SET.__pageLoader()
                },
                success: res => {
                    window.location.href = `${SET.__baseURL()}login`
                },
                error: err => {
                    let error = err.responseJSON;
                    toastr.error("Failed", error.message, SET.__bottomNotif());
                },
                complete: () => {
                    SET.__closePageLoader()
                }
            })
        })
    }

    const __fetchDataLog = TOKEN => {

        $('.service-panel-toggle').on('click' , function() {
            $.ajax({
                url: `${SET.__apiURL()}log`,
                type: 'GET',
                dataType: 'JSON',
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                },
                success: (res) => {
                    UI.__renderDataLog(res.results);
                },
                error: err => {

                },
                complete: () => {

                }
            })
        })

    }

    return {
        init: TOKEN => {
            __logoutSystem();
            __fetchDataLog(TOKEN);
        }
    }
})(SettingController , MainUI)