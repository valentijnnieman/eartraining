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
  this.monitor = document.createElement('canvas')
  this.monitor.width = 88
  this.monitor.height = 34
  this.monitor_data = new Uint8Array(AudioEngine.getAnalyser().frequencyBinCount);
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
    window.setTimeout(function() {
      that.synth.playNote(that.notes.all_notes[1].key, 0.01, 0.2, 1.0, 0.8); 
    }, this.notes.speed);
  } 
  this.monitor_frequencies('#3c0ec9');
}

Snippet.prototype.monitor_frequencies = function(fillColor) {
  console.log(fillColor)
  AudioEngine.getAnalyser().getByteFrequencyData(this.monitor_data); 
  console.log(this.monitor_data);
  var monitorContext = this.monitor.getContext('2d');

  monitorContext.clearRect(0, 0, this.monitor.width, this.monitor.height);
  monitorContext.fillStyle = fillColor;

  for (var i = 0; i < this.monitor_data.length; i++) {
    monitorContext.fillRect(i*3, 250 - this.monitor_data[i], 2, 325);
  }
}

Snippet.prototype.solve = function(){
  // handle right and wrong answers
} 

module.exports = Snippet; 
