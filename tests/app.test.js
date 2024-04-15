const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
const { document } = (new JSDOM(html)).window;
global.document = document;
global.window = document.defaultView;

// 引入你的脚本
require('../public/script.js'); 

describe('Sensor Data Generation', () => {
  test('it should create 10 sensor divs', () => {
    const sensors = document.querySelectorAll('.sensor');
    expect(sensors.length).toBe(10);
  });

  test('each sensor should have a chart', () => {
    const charts = document.querySelectorAll('.chart');
    expect(charts.length).toBe(10);
  });

  test('device status should be properly set', () => {
    const statuses = Array.from(document.querySelectorAll('.sensor h2')).map(h2 => h2.textContent);
    const validStatuses = ['Device 1 - ✅', 'Device 1 - ⚠️', 'Device 1 - ❌'];
    statuses.forEach(status => {
      expect(validStatuses.includes(status)).toBeTruthy();
    });
  });
});
