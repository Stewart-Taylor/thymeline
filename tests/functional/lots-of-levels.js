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
  { start: 1000, stop: 2000 },
  { start: 2000, stop: 3000 },
  { start: 3000, stop: 4000 },
  { start: 4000, stop: 5000 },
  { start: 5000, stop: 6000 },
];

const generator = new TimelineGenerator(1000, 10000, events);
let result = generator.generate();

result += `
<script>
document.write(
'<script src="http://' + (location.host || 'localhost').split(':')[0] +
':35729/livereload.js?snipver=1"></' + 'script>')</script>`;

fs.writeFileSync(`${OUTPUT_DIR}/lots-of-levels.html`, result);
