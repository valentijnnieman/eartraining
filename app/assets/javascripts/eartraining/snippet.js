  // Snippets are objects holding a single 'piece of music',
// like an interval or a chord progression.

var Vex = require('vexflow');
var Synth = require('./synth.js');
var AudioEngine = require('./engine.js')

var Snippet = function(notes, element, count) {
  this.notes = notes;
  this.count = count;
  this.test = 'test!';
  this.element = element; // TO-DO: Delete after HTML member has been made
  this.synth = new Synth(this.notes.instrument); 

  this.sheet = document.createElement('canvas')
  this.sheet.width = 208
  this.sheet.height = 80
  this.analyser = AudioEngine.getContext().createAnalyser()
  this.analyser.fftSize = 2048
  this.bufferLength = this.analyser.frequencyBinCount
  this.monitor_data = new Uint8Array(this.bufferLength)
  this.analyser.getByteTimeDomainData(this.monitor_data)
  this.monitor = document.createElement('canvas')
  this.monitor.width = 88
  this.monitor.height = 34
  this.renderer = new Vex.Flow.Renderer(this.sheet,
    Vex.Flow.Renderer.Backends.CANVAS);
  this.vexCtx = this.renderer.getContext();

  this.html_elements = ` 
    <div class='snippet'>
      <div class='row'>
        <div class='small-12 columns'>
          <div class='snippet__title'>interval</div>
        </div>
      </div>
      <div class='row'>
        <div class='small-12 columns'>
          <div class='snippet__container'>
            <div class='snippet__canvas-container' id='sheet-${this.count}'><div class='snippet__playbar'></div></div>
            <div class='snippet__section' id='controls-${this.count}'>
              <input type='range' id='gain' class='controls__slider'></input>
              <input type='range' id='type' class='controls__slider'></input>
            </div>
          </div>
          <div class='snippet__container'>
            <button class='snippet__play button small radius' id='play-${this.count}'>play</button>
            <div class='snippet__section snippet__section--small snippet__section--wide' id='playbar-${this.count}'></div>
            <div class='snippet__section snippet__section--small' id='monitor-${this.count}'>
              <div class='snippet__canvas-container' id='monitor-canvas-${this.count}'></div>
            </div>
          </div>
        </div>
      </div>
      <div class='row'>
        <div class='small-12 columns'>
          <div class='answer_input'>
            <ul class='answer_input__menu'>
              <li> 1st </li>
              <li> 2nd </li>
              <li> 3th </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

}

Snippet.prototype.render = function(){
  console.log('render ' + this.test);
  this.element.insertAdjacentHTML('beforeend', this.html_elements);
  var b = document.getElementById('play-' + this.count);
  var that = this
  b.addEventListener('click', function() {
    that.play()  
  })
  var sheetElement = document.getElementById('sheet-' + this.count);
  var monitorElement = document.getElementById('monitor-canvas-' + this.count);
  sheetElement.appendChild(this.sheet);
  monitorElement.appendChild(this.monitor);

  var stave = new Vex.Flow.Stave(8, -16, 191);
  stave.addClef("treble").addKeySignature(this.notes.key).setContext(this.vexCtx).draw();

  var voice = new Vex.Flow.Voice({
    num_beats: 2,
    beat_value: 4,
    resolution: Vex.Flow.RESOLUTION
  });

  var notesToDraw = []

  for (var i = 0; i < this.notes.all_notes.length; i++){
    note = new Vex.Flow.StaveNote({ clef: "treble", auto_stem: true, keys: [this.notes.all_notes[i].key], duration: this.notes.all_notes[i].duration }),
    notesToDraw.push(note)
  }

  voice.addTickables(notesToDraw);
  formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 120);
  voice.draw(this.vexCtx, stave);
}

Snippet.prototype.play = function(){
  // play the notes 
  console.log('playing')
  console.log(this)
  if (this.notes.type == 'interval') {
    var that = this
    this.synth.playNote(this.notes.all_notes[0].key, 0.01, 0.2, 1.0, 0.8); 
    this.synth.connectToAnalyser(this.analyser)
    window.setTimeout(function() {
      that.synth.playNote(that.notes.all_notes[1].key, 0.01, 0.2, 1.0, 0.8); 
    }, this.notes.speed);
  } 
  var monitorContext = this.monitor.getContext('2d');
  this.monitor_frequencies(this.analyser, this.monitor_data, monitorContext, this.bufferLength, this.monitor.width, this.monitor.height);
}

Snippet.prototype.monitor_frequencies = function(analyser, monitor_data, monitorContext, bufferLength, width, height) {
  console.log(analyser)

  analyser.getByteTimeDomainData(monitor_data);

  function draw() {
    console.log('draw')
    analyser.getByteTimeDomainData(monitor_data);
    drawVisual = requestAnimationFrame(draw)
    monitorContext.fillStyle = 'rgb(255, 255, 255)';
    monitorContext.fillRect(0, 0, width, height);

    monitorContext.lineWidth = 2;
    monitorContext.strokeStyle = 'rgb(0, 0, 0)';

    monitorContext.beginPath();

    var sliceWidth = width * 1.0 / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {

      var v = monitor_data[i] / 128.0;
      var y = v * height/2;

      if(i === 0) {
        monitorContext.moveTo(x, y);
      } else {
        monitorContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    monitorContext.lineTo(width, height/2);
    monitorContext.stroke();
  };
  draw();
  cancelAnimationFrame(draw);
};

Snippet.prototype.solve = function(){
  // handle right and wrong answers
} 

module.exports = Snippet; 
