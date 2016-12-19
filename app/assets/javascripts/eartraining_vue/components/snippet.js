var Vue = require('vue/dist/vue.js')
var Vex = require('vexflow');

var Synth = require('../classes/synth.js')
var AudioEngine = require('../classes/engine.js')

module.exports = Vue.component('snippet', {
  props: ['snippet_data', 'index'],
  data: function() {
    return {
      synth: new Synth(this.snippet_data.instrument)
    }
  },
  methods: {
    play: function() {
      console.log(this.synth)
      this.synth.playNote(this.snippet_data.notes[0].key, 0.01, 0.2, 1.0, 0.8)
      var self = this
      window.setTimeout(function() {
        self.synth.playNote(self.snippet_data.notes[1].key, 0.01, 0.2, 1.0, 0.8)
      }, self.snippet_data.speed)
    }
  },
  template: `
    <div class='snippet'>
      <div class='row'>
        <div class='small-12 columns'>
          <snippet__points :amount='snippet_data.points'></snippet__points>
        </div>
      </div>
      <div class='row'>
        <div class='small-12 columns'>
          <div class='snippet__container'>
            <snippet__canvas :in_key_of='snippet_data.key' :notes='snippet_data.notes'></snippet_canvas>
          </div>
          <div class='snippet__container'>
            <button class='snippet__play button small radius' v-on:click='play'>play</button>
            <div class='snippet__section snippet__section--small snippet__section--wide'>
              <snippet__visualizer></snippet__visualizer>
            </div>
            <div class='snippet__section snippet__section--small'> 
              <input type='range' class='controls__slider'></input>
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
    </div>`
})

Vue.component('snippet__canvas', {
  props: ['in_key_of', 'notes'],
  template: "<canvas height=80 width=296 class='snippet__canvas' ref='canvas'></canvas>",
  mounted: function() {
    this.renderer = new Vex.Flow.Renderer(this.$refs.canvas,
      Vex.Flow.Renderer.Backends.CANVAS)
    this.vexCtx = this.renderer.getContext()
    var stave = new Vex.Flow.Stave(8, -16, 282);
    console.log("props!")
    console.log(this.in_key_of)
    stave.addClef("treble").addKeySignature(this.in_key_of).setContext(this.vexCtx).draw();

    var voice = new Vex.Flow.Voice({
      num_beats: 2,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION
    });

    var notesToDraw = []

    for (var i = 0; i < this.notes.length; i++){
      note = new Vex.Flow.StaveNote({ clef: "treble", auto_stem: true, keys: [this.notes[i].key], duration: this.notes[i].duration }),
      notesToDraw.push(note)
    }

    voice.addTickables(notesToDraw);
    formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 120);
    voice.draw(this.vexCtx, stave);
  }
})

Vue.component('snippet__visualizer', {
  data: function() {
    this.analyser = AudioEngine.getContext().createAnalyser()
    this.analyser.fftSize = 2048
    this.bufferLength = this.analyser.frequencyBinCount
    this.monitor_data = new Uint8Array(this.bufferLength)
    this.analyser.getByteTimeDomainData(this.monitor_data)
    return this
  },
  methods: {
    connect: function(synth) {
      synth.connectToAnalyser(this.analyser)
    }
  },
  template: "<canvas height=30 width=150 class='snippet__canvas' ref='canvas'></canvas>"
})
