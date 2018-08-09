


const EVENT_COLORS = [
  '#74b9ff',
  '#00b894',
  '#ffeaa7'
]

const GRAPH_WIDTH = 480;
const GRAPH_HEIGHT = 170;

const DIVIDER_AMOUNT = 20;

class TimelineGenerator {
  constructor(start, stop, events, startLabel, stopLabel) {
    this.start = start;
    this.stop = stop;

    if (startLabel) {
      this.startLabel = startLabel;
    } else {
      this.startLabel = start;
    }

    if (stopLabel) {
      this.stopLabel = stopLabel;
    } else {
      this.stopLabel = stop;
    }

    this.width = GRAPH_WIDTH;

    this.events = events;
  }


  generateBase() {
    const height = GRAPH_HEIGHT;
    const baseColor = '#b2bec3';

    let base = `<rect
      x="0"
      y="${height}"
      width="${this.width}"
      height="3"
      style="fill:${baseColor};stroke-width:0;stroke:rgb(0,0,0)"
      />
      `;

    base += `<rect
      x="0"
      y="0"
      width="3"
      height="${height}"
      style="fill:${baseColor};stroke-width:0;stroke:rgb(0,0,0)"
      />
      `;


    for (let i = 1; i < DIVIDER_AMOUNT ; i++) {
      if (i % 2) {
      base += `<rect
        x="${i * (this.width/DIVIDER_AMOUNT)}"
        y="0"
        width="${((this.width/DIVIDER_AMOUNT))}"
        height="${height}"
        style="fill:#dfe6e969;stroke-width:0;stroke:rgb(0,0,0)"
        />
        `;
      }
    }

    return base;
  }

  generateEvent(event, i) {

    if (!i) {
      i = 1;
    }

    let color;

    color = EVENT_COLORS[i - 1];

    let xpos =  ((event.start-this.start)/(this.stop-this.start)) * this.width;

    const xend = ((event.stop-this.start)/(this.stop-this.start)) * this.width;
    const width = xend - xpos;

    // const xpos = event.start;
    // const width = event.stop;

    const ypos = 40 * i;


    if (xpos === 0) {
      xpos += 3;
    }


    let bar = `<rect
    x="${xpos}"
    y="${ypos}"
    width="${width}"
    height="20"
    style="fill:${color};stroke-width:0;stroke:rgb(0,0,0)"
    />;
    `;


    let startLabel = event.start;
    let stopLabel = event.stop;

    if (event.startLabel) {
      startLabel = event.startLabel;
    }

    if (event.stopLabel) {
      stopLabel = event.stopLabel;
    }



    bar += `
       <text x="${xpos}" y="${ypos - 2}" class="eventlabel">${startLabel}</text>
       <text x="${xpos + (width - 25)}" y="${ypos - 2}" class="eventlabel">${stopLabel}</text>
    `;

    if (event.label) {
      bar += `
       <text x="${xpos + (width / 2) - (event.label.length * 3)}" y="${ypos + 13}" class="eventinsidelabel">${event.label}</text>
      `;
    }

    return bar;
  }

  generateStartLabel() {
    let label = `
      <text x="0" y="190" class="chartlabel">${this.startLabel}</text>
    `;

    return label;
  }

  generateStopLabel() {
    let label = `
      <text x="450" y="190" class="chartlabel">${this.stopLabel}</text>
    `;

    return label;
  }

  generateStyle() {
    let style = `
      <style>
      .chartlabel {
        font: bold 13px helvetica;
        fill: #636e72;
      }

      .eventlabel {
        font: bold 10px helvetica;
        fill: #636e72;
      }

      .eventinsidelabel {
        font: bold 10px helvetica;
        fill: #fff;
        letter-spacing: 1px;
      }
      </style>
    `;


    style += `
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:#b2bec3;stop-opacity:1" />
        </linearGradient>
      </defs>
    `;

    return style;
  }

  generate() {

    let graph = '<svg viewbox="0 0 500 200">';

    graph += this.generateStyle();
    graph += this.generateBase();
    graph += this.generateStartLabel();
    graph += this.generateStopLabel();


    const event = {
      start: 10,
      stop: 50
    }

    let i = 1;
    this.events.forEach((event) => {
      graph += this.generateEvent(event, i);
      i += 1;
    });

    graph += '</svg>';

    return graph;
  }

}

module.exports = TimelineGenerator;
