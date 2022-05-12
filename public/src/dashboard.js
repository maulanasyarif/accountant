const DashboardUI = ((SET) => {
    return {

    }
})(SettingController);


const DashboardController = ((SET, UI) => {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    const __fetchTotal = (TOKEN, callback) => {
        $.ajax({
            url: `${SET.__apiURL()}prov/dashboard`,
            type: "GET",
            dataType: "JSON",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            success: (res) => {
                callback(res.results);
            },
            error: (err) => {},
            complete: () => {
                SET.__closeGlobalLoader();
            },
        });
    };

    return {
            init: (TOKEN) => {
                __fetchTotal(TOKEN, (data) => {
                    $("#count_total").text(data.total_awal);
                    $("#count_distribution").text(data.total_ditribusi);
                    $("#count_notDistribution").text(data.belum_distribusi);
        });


        var income = document.getElementById("c_income").getContext("2d");

        const myChart = new Chart(income, {
            type: "bar",
            data: {
                labels: [0, 0, 0, 0],
                datasets: [
                    {
                        label: "Total",
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

        __fetchIncomes = () => {
                $.ajax({
                    type: "POST",
                    url: `${SET.__apiURL()}prov/get_daerah`,
                    beforeSend: () => {
                        SET.__cardLoader("#income_chart .card-body");
                    },
                    dataType: "json",
                    success: function (response) {
                        myChart.data.datasets[0].data = [
                            response.d_total,
                        ];
                        myChart.data.labels = [
                            response.d_name,
                        ];
                        myChart.update();
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        toastr.error(
                            "Code: " +
                                xhr.status +
                                ": " +
                                xhr.responseJSON.message,
                            "Failed",
                            SET.__bottomNotif()
                        );
                    },
                    complete: () => {
                        SET.__closeCardLoader("#income_chart .card-body");
                    },
                });
            };
    }
}

})(SettingController, DashboardUI);
