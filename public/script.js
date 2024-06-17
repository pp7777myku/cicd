document.addEventListener('DOMContentLoaded', function() {
    initializeWebSocket();
});

function initializeWebSocket() {
    const ws = new WebSocket('ws://localhost:50001');
    const sensorsContainer = document.getElementById('sensors');

    ws.onmessage = function(event) {
        const data = JSON.parse(event.data); 
        updateSensorData(data);
    };

    ws.onerror = function(error) {
        console.log('WebSocket Error: ' + error);
    };

    function updateSensorData(data) {
        sensorsContainer.innerHTML = ''; // 清空当前的显示元素
        data.forEach((device, i) => {
            const sensorDiv = document.createElement('div');
            sensorDiv.className = 'sensor';
            sensorDiv.innerHTML = `
                <h2>Device ${i + 1} - ${device.status.icon}</h2>
                <p>Status: ${device.status.text}</p>
                ${generateSensorReadings(device.sensors)}
                <div class="chart" id="chart${i}"></div>
                ${generateControls(device.controls)}
            `;
            sensorsContainer.appendChild(sensorDiv);
            generateLineChart(`chart${i}`, device.chartData);
        });
    }

    function generateSensorReadings(sensors) {
        return sensors.map(sensor => `<p>Sensor ${sensor.id}: ${sensor.value}</p>`).join('');
    }

    function generateControls(controls) {
        return controls.map((control, index) => `
            <div class="control">
                <button onclick="alert('Button ${index + 1} clicked')">Control Button ${index + 1}</button>
                <input type="range" min="1" max="100" value="${control.value}">
            </div>
        `).join('');
    }

    function generateLineChart(chartId, chartData) {
        const chart = document.getElementById(chartId);
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "150");
        let previousPoint = { x: 0, y: chartData[0] };
        chartData.forEach((point, i) => {
            const x = (i / (chartData.length - 1)) * chart.offsetWidth;
            const y = (1 - point / 100) * 150;
            const line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", previousPoint.x);
            line.setAttribute("y1", 150 - previousPoint.y);
            line.setAttribute("x2", x);
            line.setAttribute("y2", 150 - y);
            line.setAttribute("stroke", "blue");
            line.setAttribute("stroke-width", "2");
            svg.appendChild(line);
            previousPoint = { x, y };
        });
        chart.appendChild(svg);
    }
}
