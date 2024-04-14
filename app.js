document.addEventListener('DOMContentLoaded', function() {
  generateSensorData();
});

function generateSensorData() {
  const sensorsContainer = document.getElementById('sensors');
  for (let i = 0; i < 10; i++) {
      const sensorDiv = document.createElement('div');
      sensorDiv.className = 'sensor';
      const deviceStatus = generateDeviceStatus();
      sensorDiv.innerHTML = `
          <h2>Device ${i + 1} - ${deviceStatus.icon}</h2>
          <p>Status: ${deviceStatus.text}</p>
          ${generateSensorReadings(i)}
          <div class="chart" id="chart${i}"></div>
          ${generateControls(i)}
      `;
      sensorsContainer.appendChild(sensorDiv);
      generateLineChart(`chart${i}`, 20); // Increased number of points to 20
  }
}

function generateDeviceStatus() {
  const statuses = [
      { text: "Normal", icon: "✅" },
      { text: "Warning", icon: "⚠️" },
      { text: "Danger", icon: "❌" }
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function generateSensorReadings(deviceIndex) {
  let readingsHtml = '';
  const sensorCount = Math.floor(Math.random() * 6) + 1; // Random number of sensors between 1 and 6
  for (let i = 0; i < sensorCount; i++) {
      readingsHtml += `<p>Sensor ${i + 1}: ${Math.random().toFixed(2)}</p>`;
  }
  return readingsHtml;
}

function generateControls(deviceIndex) {
  let controlsHtml = '';
  const controlCount = Math.floor(Math.random() * 3) + 1; // Random number of controls between 1 and 3
  for (let i = 0; i < controlCount; i++) {
      controlsHtml += `
          <div class="control">
              <button onclick="alert('Button ${i + 1} on Device ${deviceIndex + 1} clicked')">Control Button ${i + 1}</button>
              <input type="range" min="1" max="100" value="${Math.floor(Math.random() * 100)}">
          </div>
      `;
  }
  return controlsHtml;
}

function generateLineChart(chartId, points) {
  const chart = document.getElementById(chartId);
  const chartData = Array.from({ length: points }, () => Math.random() * 100);
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "150");
  let previousPoint = { x: 0, y: chartData[0] };
  for (let i = 1; i < chartData.length; i++) {
      const x = (i / (chartData.length - 1)) * chart.offsetWidth;
      const y = (1 - chartData[i] / 100) * 150;
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", previousPoint.x);
      line.setAttribute("y1", 150 - previousPoint.y);
      line.setAttribute("x2", x);
      line.setAttribute("y2", 150 - y);
      line.setAttribute("stroke", "blue");
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);
      previousPoint = { x, y };
      }
      chart.appendChild(svg);
      }
      