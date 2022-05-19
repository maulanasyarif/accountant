const SettingController = (() => {
    const ENV = "DEVELOPMENT";

    const __selfBaseURL = () => {
        const PROTOCOL = window.location.protocol;
        const HOST = window.location.host;

        if (ENV === "DEVELOPMENT") {
            return `${PROTOCOL}//${HOST}/`;
        } else {
            return `${PROTOCOL}//${HOST}/user-mika/public/`;
        }
    };

    const __selfPublicURL = () => {
        if (ENV === "DEVELOPMENT") {
            return "http://user-mika.test/";
        } else {
            return "http://user-mika/public/";
        }
    };

    return {
        __publicURL: () => {
            if (ENV === "DEVELOPMENT") {
                return "http://user-mika.test/";
            } else {
                return "http://user-mika/public/";
            }
        },

        __baseURL: () => {
            const PROTOCOL = window.location.protocol;
            const HOST = window.location.host;

            if (ENV === "DEVELOPMENT") {
                return `${PROTOCOL}//${HOST}/`;
            } else {
                return `${PROTOCOL}//${HOST}/user-mika/public/`;
            }
        },

        __apiURL: () => {
            if (ENV === "DEVELOPMENT") {
                return "http://api-mika.test/api/";
            } else {
                return "http://api-mika/public/";
            }
        },

        __fileURL: () => {
            if (ENV === "DEVELOPMENT") {
                return "http://api-mika.test/api/file/";
            } else {
                return "http://api-mika/public/file/";
            }
        },

        __closeGlobalLoader: () => {
            $(".preloader").fadeOut();
        },

        __contentLoader: (container) => {
            $(container).block({
                message: `
                    <div class="loader-wrapper" style="height: 300px">
                      <div class="loader-container">
                        <div class="ball-pulse loader-primary">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                `,
                overlayCSS: {
                    backgroundColor: "#fff",
                    opacity: 0.8,
                    cursor: "wait",
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: "transparent",
                },
            });
        },

        __buttonLoader: (button) => {
            $(button).block({
                message: `
                    <div class="loader-wrapper">
                      <div class="loader-container">
                        <div class="ball-clip-rotate loader-primary">
                          <div></div>
                        </div>
                      </div>
                    </div>
                `,
                overlayCSS: {
                    backgroundColor: "#fff",
                    opacity: 0.8,
                    cursor: "wait",
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: "transparent",
                },
            });
        },

        __tableLoader: (table_id, colspan) => {
            let html = `
                    <tr>
                        <td class="text-center" colspan="${colspan}">
                            <div class="loader-wrapper" style="height: 300px">
                                <div class="loader-container">
                                    <div class="ball-grid-pulse loader-primary">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                `;

            $(table_id + " tbody").html(html);
        },

        __pageLoader: () => {
            $.blockUI({
                message: `
                    <div class="loader-wrapper">
                      <div class="loader-container">
                        <div class="ball-grid-pulse loader-primary">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                `,
                overlayCSS: {
                    backgroundColor: "#fff",
                    opacity: 0.8,
                    cursor: "wait",
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: "transparent",
                },
            });
        },

        __bottomNotif: () => {
            return {
                progressBar: true,
                closeButton: true,
                positionClass: "toast-bottom-full-width",
                preventDuplicates: true,
                timeOut: "2000",
            };
        },

        __bottomRightNotif: () => {
            return {
                progressBar: true,
                closeButton: true,
                positionClass: "toast-bottom-right",
                preventDuplicates: true,
                timeOut: "2000",
            };
        },

        __bottomLeftNotif: () => {
            return {
                progressBar: true,
                closeButton: true,
                positionClass: "toast-bottom-left",
                preventDuplicates: true,
                timeOut: "2000",
            };
        },

        __closeContentLoader: (container) => {
            $(container).unblock();
        },

        __closeButtonLoader: (button) => {
            $(button).unblock();
        },

        __closePageLoader: () => {
            $.unblockUI();
        },

        __threedigis: (num) => {
            return parseFloat(num).toLocaleString();
            // return parseFloat(num.replace(".", "").replace("", "."));
        },

        __positiveNumber: (num) => {
            return Math.abs(num);
        },

        __negativeNumber: (num) => {
            return Math.abs(num) * -1;
        },

        __realCurrency: (num) => {
            return parseFloat(num).toLocaleString(["ban", "id"]);
        },

        __positiveCurrency: (num) => {
            return Math.abs(num).toLocaleString(["ban", "id"]);
        },

        __negativeCurrency: (num) => {
            let new_num = Math.abs(num) * -1;

            new_num.toLocaleString(["ban", "id"]);
        },

        __replaceEnter: (text) => {
            return text.replace(/(\r\n|\n|\r)/gm, "<br>");
        },

        __filterNull: (text) => {
            if (text === null) {
                return "";
            } else {
                return text;
            }
        },

        __replaceNull: (text) => {
            if (text === null) {
                return "-";
            } else {
                return text;
            }
        },

        __replaceNullToZero: (text) => {
            if (text === null) {
                return 0;
            } else {
                return text;
            }
        },

        __openOption: () => {
            $("#btn_option").on("click", function () {
                $("#option_container").toggle();
            });
        },

        __dateFormat: (date) => {
            let d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            return [year, month, day].join("-");
        },

        __timeFormat: (time) => {
            let new_time = time.split(":");
            let hours = new_time[0];
            let minuets = new_time[1];

            return [hours, minuets].join(":");
        },

        __dateTimeFormat: (datetime) => {
            let d = new Date(datetime),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear(),
                hours = "" + d.getHours(),
                minutes = "" + d.getMinutes(),
                seconds = "" + d.getSeconds();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;
            if (hours.length < 2) hours = "0" + hours;
            if (minutes.length < 2) minutes = "0" + minutes;
            if (seconds.length < 2) seconds = "0" + seconds;

            return `${[year, month, day].join("-")} ${[
                hours,
                minutes,
                seconds,
            ].join(":")}`;
        },

        __safeObject: (obj) => {
            try {
                return obj();
            } catch (e) {
                return "-";
            }
        },

        __404page: () => {
            let html = `
            <div class="main-wrapper">
            
                <div class="error-box">
                    <div class="error-body text-center">
                        <img src="${__selfBaseURL()}assets/images/404page.png">
                        <p class="text-muted m-t-30 m-b-30">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
                        <a href="${__selfPublicURL()}dashboard" class="btn btn-info btn-rounded waves-effect waves-light m-b-40">Back to home</a> 
                    </div>
                </div>
            </div>
                
            <script src="${__selfBaseURL()}assets/libs/jquery/dist/jquery.min.js"></script>
            <script src="${__selfBaseURL()}assets/libs/popper.js/dist/umd/popper.min.js"></script>
            <script src="${__selfBaseURL()}assets/libs/bootstrap/dist/js/bootstrap.min.js"></script>
                
            
            `;
            $("body").html(html);
        },

        __cardLoader: (container) => {
            $(container).block({
                message: `
                    <div>
                      <div class="loader-container">
                        <div class="ball-pulse-sync loader-purple">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                `,
                overlayCSS: {
                    backgroundColor: "#fff",
                    opacity: 0.8,
                    cursor: "wait",
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: "transparent",
                    height: "100%",
                    width: "100%",
                },
            });
        },

        __closeCardLoader: (container) => {
            $(container).unblock();
        },
    };
})();
