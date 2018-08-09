const fs = require('fs-extra');
const TimelineGenerator = require('./timeline-generator');

const OUTPUT_DIR = './timeline_output';

fs.ensureDirSync(OUTPUT_DIR);




let events = [
  {
    start: 3000,
    stop: 5000,
    startLabel: 'two',
    stopLabel: 'four',
    label: 'eventlabel'
  },
  {
    start: 4000,
    stop: 7000
  },
  {
    start: 1000,
    stop: 9000
  }
];




let generator = new TimelineGenerator(1000, 10000, events);
let result = generator.generate();


result += `<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>`;

fs.writeFileSync(`${OUTPUT_DIR}/output.html`, result);
