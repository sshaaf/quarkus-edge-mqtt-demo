var xAxis = [0];
var xMax = 0;

var config = {
    type: 'line',
    data: {
        labels: xAxis,
        datasets: [{
            label: 'Temperature',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: [
            ],
            fill: false,
        }, {
            label: 'Humidity',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: [
            ],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value'
                }
            }
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
};

var source = new EventSource("/devices/stream");
source.onmessage = function (event) {
    var incoming = JSON.parse(event.data);


    if (config.data.datasets.length > 0) {
        xMax = xMax +5;
        config.data.labels.push(xMax);

        config.data.datasets[0].data.push(incoming.temp);
        config.data.datasets[1].data.push(incoming.humidity);
        window.myLine.update();
    }
    //Date.getTime()

    tr_temp = "<tr role=\"row\">\n" +
        "            <td role=\"cell\" data-label=\"Device Name\">A</td>\n" +
        "            <td role=\"cell\" data-label=\"Temperature\">B</td>\n" +
        "            <td role=\"cell\" data-label=\"Humidity\">C</td>\n" +
        "            <td role=\"cell\" data-label=\"Reading\">D</td>\n" +
        "        </tr>";


    var tableBody = document.getElementById("tempBody");

    var row = document.createElement("tr");
    var cell = document.createElement("td")
    var cellText = document.createTextNode(incoming.deviceName);
    cell.appendChild(cellText);
    row.appendChild(cell);

    var cell = document.createElement("td")
    var cellText = document.createTextNode(incoming.temp+"°");
    cell.appendChild(cellText);
    row.appendChild(cell);

    var cell = document.createElement("td")
    var cellText = document.createTextNode(incoming.humidity+"%");
    cell.appendChild(cellText);
    row.appendChild(cell);

    var cell = document.createElement("td")
    var cellText = document.createTextNode(new Date());
    cell.appendChild(cellText);
    row.appendChild(cell);

    tableBody.appendChild(row);

};