const DashboardUI = ((SET) => {
    return {
        __renderRowDestination: (res) => {
            // console.log(res);
            let row = res.results
                .map((v) => {
                    return `
                    <tr>
                        <td class="text-center"><h3>${v.city_name}</h3></td>
                        <td class="text-center"><h3>${v.total}</h3></td>
                    </tr>
                `;
                })
                .join("");

            $("#t_destination tbody").html(row);
        },

        __renderNoData: () => {
            let html = `
                <tr>
                    <td class="text-center" colspan="2">
                        <img class="img-fluid" src="${SET.__baseURL()}assets/images/no_data_table.png" alt="" style="height: 135px; margin-bottom: 35px;"><br>
                        <span class="font-weight-bold">No Data Available to show.</span><br>
                    </td>
                </tr>

            `;

            $("#t_destination tbody").html(html);
        },
    };
})(SettingController);

const DashboardController = ((SET, UI) => {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            const __fetchProfile = (TOKEN, callback) => {
                $.ajax({
                    url: `${SET.__apiURL()}setting/profile`,
                    type: "GET",
                    dataType: "JSON",
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                    success: (res) => {
                        // console.log(TOKEN);
                        callback(res.results);
                    },
                    error: (err) => {},
                    complete: () => {
                        SET.__closeGlobalLoader();
                    },
                });
            };

            // const __fetchTotalOrder = (TOKEN, loaderContainer, callback) => {
            //     $.ajax({
            //         url: `${SET.__apiURL()}analytic/order_amount`,
            //         type: "GET",
            //         dataType: "JSON",
            //         beforeSend: () => {
            //             SET.__cardLoader(loaderContainer);
            //         },
            //         headers: {
            //             Authorization: `Bearer ${TOKEN}`,
            //         },
            //         success: (res) => {
            //             callback(res.results);
            //         },
            //         error: (err) => {},
            //         complete: () => {
            //             SET.__closeCardLoader(loaderContainer);
            //         },
            //     });
            // };

            // setTimeout(() => {
            //     __fetchDestination();
            //     __fetchManifest();
            //     __fetchReschedule();
            //     __fetchRefund();
            //     __fetchOrder();
            //     __fetchIncomes();
            // }, 6000);

            $("#s_income_year").on("change", () => {
                __fetchIncomes();
            });
            $("#s_manifest").on("change", function() {
                __fetchManifest();
            });
            $("#s_reschedule_month").on("change", function() {
                __fetchReschedule();
            });
            $("#s_reschedule_year").on("change", function() {
                __fetchReschedule();
            });
            $("#s_refund_month").on("change", function() {
                __fetchRefund();
            });
            $("#s_refund_year").on("change", function() {
                __fetchRefund();
            });
            $("#s_order_month").on("change", function() {
                __fetchOrder();
            });
            $("#s_order_year").on("change", function() {
                __fetchOrder();
            });
            $("#s_favorit_year").on("change", function() {
                __fetchDestination();
            });
            $("#s_favorit_month").on("change", function() {
                __fetchDestination();
            });

            var start_year = new Date().getFullYear();
            var nowMonth = new Date().getMonth();

            for (var i = start_year; i > start_year - 5; i--) {
                $("#s_favorit_year").append(
                    `<option value="${i}" ${
                i == start_year ? "selected" : ""
            }>${i}</option> `
                );

                $("#s_order_year").append(
                    `<option value="${i}" ${
                i == start_year ? "selected" : ""
            }>${i}</option> `
                );

                $("#s_refund_year").append(
                    `<option value="${i}" ${
                i == start_year ? "selected" : ""
            }>${i}</option> `
                );

                $("#s_reschedule_year").append(
                    `<option value="${i}" ${
                i == start_year ? "selected" : ""
            }>${i}</option> `
                );

                $("#s_income_year").append(
                    `<option value="${i}" ${
                i == start_year ? "selected" : ""
            }>${i}</option> `
                );

                $("#s_manifest").append(
                    `<option value="${i}" ${
                i == start_year ? "selected" : ""
            }>${i}</option> `
                );
            }

            // $.ajaxSetup({
            //     headers: {
            //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            //     }
            // });

            // __fetchDestination = () => {
            //     var month =
            //         $("#s_favorit_month").val().length < 1 ?
            //         nowMonth + 1 :
            //         $("#s_favorit_month").val();
            //     var year =
            //         $("#s_favorit_year").val().length < 1 ?
            //         start_year :
            //         $("#s_favorit_year").val();

            //     $.ajax({
            //         url: "/order/get_favorit",
            //         type: "POST",
            //         data: {
            //             month,
            //             year,
            //         },
            //         dataType: "JSON",
            //         beforeSend: () => {
            //             SET.__cardLoader("#t_destination tbody");
            //         },
            //         success: (res) => {
            //             // console.log(res);
            //             if (res.results.length !== 0) {
            //                 UI.__renderRowDestination(res);
            //             } else {
            //                 UI.__renderNoData();
            //             }
            //         },
            //         error: function(xhr, ajaxOptions, thrownError) {
            //             toastr.error(
            //                 "Code: " + xhr.status + ": " + xhr.responseJSON.message,
            //                 "Failed",
            //                 SET.__bottomNotif()
            //             );
            //         },
            //         complete: () => {
            //             SET.__closeCardLoader("#t_destination tbody");
            //         },
            //     });
            // };

            return {
                init: (TOKEN) => {
                        __fetchProfile(TOKEN, (data) => {
                                    $("#profile_photo").attr(
                                            "src",
                                            `${
                        data.photo !== null
                            ? `${SET.__fileURL()}admin_user/${data.photo}`
                            : `${SET.__baseURL()}assets/images/users/d_user2.png`
                    }`
                );
                $("#profile_name").text(data.name);
                $("#profile_email").text(data.email);
                $("#profile_company_name").text(
                    data.admin.company.company_name
                );
                $("#profile_company_po").text(data.admin.company.alias);
            });

            // __fetchDestination(TOKEN, "#t_destination");

            const CHART_ORDER = new Chart(
                document.getElementById("c_order").getContext("2d"),
                {
                    type: "pie",
                    data: {
                        labels: ["Success", "Pending", "Failed", "Expired"],
                        datasets: [
                            {
                                data: [0, 0, 0, 0],
                                backgroundColor: [
                                    "rgba(54, 162, 235, 5)",
                                    "rgba(251, 140, 0, 1)",
                                    "rgba(250, 88, 56, 1)",
                                    "rgba(125, 124, 130, 1)",
                                ],
                                borderColor: [
                                    "rgba(54, 162, 235, 1)",
                                    "rgba(251, 140, 0, 1)",
                                    "rgba(250, 88, 56, 1)",
                                    "rgba(125, 124, 130, 1)",
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        legend: {
                            labels: {
                                // This more specific font property overrides the global property
                                // fontColor: 'white'
                            },
                        },
                    },
                }
            );

            // __fetchTotalOrder(TOKEN, "#order_chart .card-body", (data) => {
            //     CHART_ORDER.data.datasets[0].data = [0, 0, 0, 0];
            //     CHART_ORDER.update();
            // });

            const CHART_REFUND = new Chart(
                document.getElementById("c_refund").getContext("2d"),
                {
                    type: "pie",
                    data: {
                        labels: ["Success", "Pending", "Failed", "Expired"],
                        datasets: [
                            {
                                data: [0, 0, 0, 0],
                                backgroundColor: [
                                    "rgba(54, 162, 235, 5)",
                                    "rgba(251, 140, 0, 1)",
                                    "rgba(250, 88, 56, 1)",
                                    "rgba(125, 124, 130, 1)",
                                ],
                                borderColor: [
                                    "rgba(54, 162, 235, 1)",
                                    "rgba(251, 140, 0, 1)",
                                    "rgba(250, 88, 56, 1)",
                                    "rgba(125, 124, 130, 1)",
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        legend: {
                            labels: {
                                // This more specific font property overrides the global property
                                // fontColor: 'white'
                            },
                        },
                    },
                }
            );

            // __fetchTotalOrder(TOKEN, "#refund_chart .card-body", (data) => {
            //     CHART_REFUND.data.datasets[0].data = [0, 0, 0, 0];
            //     CHART_REFUND.update();
            // });

            const CHART_RESCHEDULE = new Chart(
                document.getElementById("c_reschedule").getContext("2d"),
                {
                    type: "pie",
                    data: {
                        labels: ["Success", "Pending", "Failed", "Expired"],
                        datasets: [
                            {
                                data: [0, 0, 0, 0],
                                backgroundColor: [
                                    "rgba(54, 162, 235, 5)",
                                    "rgba(251, 140, 0, 1)",
                                    "rgba(250, 88, 56, 1)",
                                    "rgba(125, 124, 130, 1)",
                                ],
                                borderColor: [
                                    "rgba(54, 162, 235, 1)",
                                    "rgba(251, 140, 0, 1)",
                                    "rgba(250, 88, 56, 1)",
                                    "rgba(125, 124, 130, 1)",
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        legend: {
                            labels: {
                                // This more specific font property overrides the global property
                                // fontColor: 'white'
                            },
                        },
                    },
                }
            );

            // __fetchTotalOrder(TOKEN, "#reschedule_chart .card-body", (data) => {
            //     CHART_RESCHEDULE.data.datasets[0].data = [0, 0, 0, 0];
            //     CHART_RESCHEDULE.update();
            // });

            const CHART_MANIFEST = new Chart(
                document.getElementById("c_manifest").getContext("2d"),
                {
                    type: "line",
                    data: {
                        labels: [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                        ],
                        datasets: [
                            {
                                label: "Booking",
                                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                backgroundColor: [
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                ],
                                borderColor: [
                                    "rgba(48, 29, 110, 1)",
                                    "rgba(48, 29, 110, 1)",
                                    "rgba(48, 29, 110, 1)",
                                    "rgba(48, 29, 110, 1)",
                                    "rgba(48, 29, 110, 1)",
                                    "rgba(48, 29, 110, 1)",
                                    "rgba(48, 29, 110, 1)",
                                    "rgba(48, 29, 110, 1)",
                                    "rgba(48, 29, 110, 1)",
                                    "rgba(48, 29, 110, 1)",
                                    "rgba(48, 29, 110, 1)",
                                    "rgba(48, 29, 110, 1)",
                                ],
                                borderWidth: 4,
                            },
                            {
                                label: "Cancel",
                                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                backgroundColor: [
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                    "rgba(0, 0, 0, 0.1)",
                                ],
                                borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(255, 99, 132, 1)",
                                ],
                                borderWidth: 4,
                            },
                        ],
                    },
                    options: {
                        legend: {
                            labels: {
                                // This more specific font property overrides the global property
                                // fontColor: 'white'
                            },
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                    },
                }
            );

            // __fetchTotalOrder(TOKEN, "#manifest_chart .card-body", (data) => {
            //     CHART_MANIFEST.data.datasets[0].data = [
            //         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            //     ];
            //     CHART_MANIFEST.data.datasets[1].data = [
            //         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            //     ];
            //     CHART_MANIFEST.update();
            // });

            var income = document.getElementById("c_income").getContext("2d");

            const myChart = new Chart(income, {
                type: "bar",
                data: {
                    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                    datasets: [
                        {
                            label: "Rupiah",
                            data: [0, 0, 0, 0],
                            backgroundColor: [
                                "rgba(48, 29, 110, 1)",
                                "rgba(48, 29, 110, 1)",
                                "rgba(48, 29, 110, 1)",
                                "rgba(48, 29, 110, 1)",
                            ],
                            borderColor: [
                                "rgba(48, 29, 110, 1)",
                                "rgba(48, 29, 110, 1)",
                                "rgba(48, 29, 110, 1)",
                                "rgba(48, 29, 110, 1)",
                            ],
                            borderWidth: 4,
                        },
                    ],
                },
                options: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            // fontColor: 'white'
                        },
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                },
            });

            // __fetchOrder = () => {
            //     var month =
            //         $("#s_order_month").val().length < 1
            //             ? nowMonth + 1
            //             : $("#s_order_month").val();
            //     var year =
            //         $("#s_order_year").val().length < 1
            //             ? start_year
            //             : $("#s_order_year").val();

            //     $.ajax({
            //         type: "POST",
            //         url: "/order/get_order",
            //         data: {
            //             month,
            //             year,
            //         },
            //         dataType: "json",
            //         beforeSend: () => {
            //             SET.__cardLoader("#order_chart .card-body");
            //         },
            //         success: function (response) {
            //             CHART_ORDER.data.datasets[0].data = [
            //                 response.order_success,
            //                 response.order_pending,
            //                 response.order_failed,
            //                 response.order_expired,
            //             ];
            //             CHART_ORDER.update();
            //         },
            //         error: function (xhr, ajaxOptions, thrownError) {
            //             toastr.error(
            //                 "Code: " +
            //                     xhr.status +
            //                     ": " +
            //                     xhr.responseJSON.message,
            //                 "Failed",
            //                 SET.__bottomNotif()
            //             );
            //         },
            //         complete: () => {
            //             SET.__closeCardLoader("#order_chart .card-body");
            //         },
            //     });
            // };

            // __fetchRefund = () => {
            //     var month =
            //         $("#s_refund_month").val().length < 1
            //             ? nowMonth + 1
            //             : $("#s_refund_month").val();
            //     var year =
            //         $("#s_refund_year").val().length < 1
            //             ? start_year
            //             : $("#s_refund_year").val();

            //     $.ajax({
            //         type: "POST",
            //         url: "/refund/get_refund",
            //         data: {
            //             month,
            //             year,
            //         },
            //         dataType: "json",
            //         beforeSend: () => {
            //             SET.__cardLoader("#refund_chart .card-body");
            //         },
            //         success: function (response) {
            //             CHART_REFUND.data.datasets[0].data = [
            //                 response.refund_success,
            //                 response.refund_pending,
            //                 response.refund_failed,
            //                 response.order_expired,
            //             ];
            //             CHART_REFUND.update();
            //         },
            //         error: function (xhr, ajaxOptions, thrownError) {
            //             toastr.error(
            //                 "Code: " +
            //                     xhr.status +
            //                     ": " +
            //                     xhr.responseJSON.message,
            //                 "Failed",
            //                 SET.__bottomNotif()
            //             );
            //         },
            //         complete: () => {
            //             SET.__closeCardLoader("#refund_chart .card-body");
            //         },
            //     });
            // };

            // __fetchReschedule = () => {
            //     var month =
            //         $("#s_reschedule_month").val().length < 1
            //             ? nowMonth + 1
            //             : $("#s_reschedule_month").val();
            //     var year =
            //         $("#s_reschedule_year").val().length < 1
            //             ? start_year
            //             : $("#s_reschedule_year").val();

            //     $.ajax({
            //         type: "POST",
            //         url: "/reschedule/get_reschedule",
            //         data: {
            //             month,
            //             year,
            //         },
            //         dataType: "json",
            //         beforeSend: () => {
            //             SET.__cardLoader("#reschedule_chart .card-body");
            //         },
            //         success: function (response) {
            //             CHART_RESCHEDULE.data.datasets[0].data = [
            //                 response.reschedule_success,
            //                 response.reschedule_pending,
            //                 response.refund_failed,
            //                 response.reschedule_expired,
            //             ];
            //             CHART_RESCHEDULE.update();
            //         },
            //         error: function (xhr, ajaxOptions, thrownError) {
            //             toastr.error(
            //                 "Code: " +
            //                     xhr.status +
            //                     ": " +
            //                     xhr.responseJSON.message,
            //                 "Failed",
            //                 SET.__bottomNotif()
            //             );
            //         },
            //         complete: () => {
            //             SET.__closeCardLoader("#reschedule_chart .card-body");
            //         },
            //     });
            // };

            // __fetchManifest = () => {
            //     var year =
            //         $("#s_manifest").val().length < 1
            //             ? start_year
            //             : $("#s_manifest").val();

            //     $.ajax({
            //         type: "POST",
            //         url: "/booking/get_booking",
            //         data: {
            //             year,
            //         },
            //         dataType: "json",
            //         beforeSend: () => {
            //             SET.__cardLoader("#manifest_chart .card-body");
            //         },
            //         success: function (response) {
            //             // console.log(response)
            //             CHART_MANIFEST.data.datasets[0].data = [
            //                 response.booking[1],
            //                 response.booking[2],
            //                 response.booking[3],
            //                 response.booking[4],
            //                 response.booking[5],
            //                 response.booking[6],
            //                 response.booking[7],
            //                 response.booking[8],
            //                 response.booking[9],
            //                 response.booking[10],
            //                 response.booking[11],
            //                 response.booking[12],
            //             ];
            //             CHART_MANIFEST.update();
            //             CHART_MANIFEST.data.datasets[1].data = [
            //                 response.cancel[1],
            //                 response.cancel[2],
            //                 response.cancel[3],
            //                 response.cancel[4],
            //                 response.cancel[5],
            //                 response.cancel[6],
            //                 response.cancel[7],
            //                 response.cancel[8],
            //                 response.cancel[9],
            //                 response.cancel[10],
            //                 response.cancel[11],
            //                 response.cancel[12],
            //             ];
            //             CHART_MANIFEST.update();
            //         },
            //         error: function (xhr, ajaxOptions, thrownError) {
            //             toastr.error(
            //                 "Code: " +
            //                     xhr.status +
            //                     ": " +
            //                     xhr.responseJSON.message,
            //                 "Failed",
            //                 SET.__bottomNotif()
            //             );
            //         },
            //         complete: () => {
            //             SET.__closeCardLoader("#manifest_chart .card-body");
            //         },
            //     });
            // };

            // __fetchIncomes = () => {
            //     var month =
            //         $("#s_income_month").val().length < 1
            //             ? nowMonth + 1
            //             : $("#s_income_month").val();
            //     var year =
            //         $("#s_income_year").val().length < 1
            //             ? start_year
            //             : $("#s_income_year").val();

            //     $.ajax({
            //         type: "POST",
            //         url: "/order/get_income",
            //         data: {
            //             month,
            //             year,
            //         },
            //         beforeSend: () => {
            //             SET.__cardLoader("#income_chart .card-body");
            //         },
            //         dataType: "json",
            //         success: function (response) {
            //             myChart.data.datasets[0].data = [
            //                 response.week1,
            //                 response.week2,
            //                 response.week3,
            //                 response.week4,
            //             ];
            //             myChart.update();
            //         },
            //         error: function (xhr, ajaxOptions, thrownError) {
            //             toastr.error(
            //                 "Code: " +
            //                     xhr.status +
            //                     ": " +
            //                     xhr.responseJSON.message,
            //                 "Failed",
            //                 SET.__bottomNotif()
            //             );
            //         },
            //         complete: () => {
            //             SET.__closeCardLoader("#income_chart .card-body");
            //         },
            //     });
            // };
        },
    };
})(SettingController, DashboardUI);