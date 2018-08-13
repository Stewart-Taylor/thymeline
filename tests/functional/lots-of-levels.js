const fs = require('fs-extra');
const TimelineGenerator = require('../../src');

const OUTPUT_DIR = './timeline_output';

fs.ensureDirSync(OUTPUT_DIR);

const events = [
  {
    start: 1600,
    stop: 5000,
    startLabel: 'two',
    stopLabel: 'four',
    label: 'eventlabel',
  },
  { start: 1200, stop: 2000, label: '2'},
  { start: 1000, stop: 3000, label: '3'},
  { start: 3000, stop: 4000, label: '4'},
  { start: 4000, stop: 5000, label: '5'},
  { start: 5000, stop: 6000, label: '6'},
  { start: 5100, stop: 7000, label: '7'},
  { start: 5400, stop: 8000, label: '8'},
  { start: 6000, stop: 9000, label: '9'},
  { start: 5400, stop: 8000, label: '8'},
  { start: 6000, stop: 9000, label: '9'},
  { start: 5400, stop: 8000, label: '8'},
  { start: 6000, stop: 10000, label: '9'},
];

const generator = new TimelineGenerator(1000, 10000, events);
let result = generator.generate();

result += `
<script>
document.write(
'<script src="http://' + (location.host || 'localhost').split(':')[0] +
':35729/livereload.js?snipver=1"></' + 'script>')</script>`;

fs.writeFileSync(`${OUTPUT_DIR}/lots-of-levels.html`, result);
