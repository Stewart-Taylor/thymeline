const fs = require('fs-extra');
const TimelineGenerator = require('../../src');

const OUTPUT_DIR = './timeline_output';

fs.ensureDirSync(OUTPUT_DIR);

const events = [
  {
    start: 1200,
    stop: 5000,
    startLabel: '11:30',
    stopLabel: '10:40',
    label: 'Label',
  },
  {
    start: 5000,
    stop: 7000,
  },
  {
    start: 3000,
    stop: 9000,
  },
];

const generator = new TimelineGenerator(1000, 10000, events);
let graph = generator.generate();

graph += `
<script>
document.write(
'<script src="http://' + (location.host || 'localhost').split(':')[0] +
':35729/livereload.js?snipver=1"></' + 'script>')</script>`;

fs.writeFileSync(`${OUTPUT_DIR}/output.html`, graph);
