var Vue = require('vue/dist/vue.js')
var Vex = require('vexflow');

var Synth = require('../classes/synth.js')
var AudioEngine = require('../classes/engine.js')

var sheet = {
  props: ['in_key_of', 'notes'],
  methods: {
    render: function() {
      if(!this.rendered) {
        this.renderer = new Vex.Flow.Renderer(this.$refs.canvas,
          Vex.Flow.Renderer.Backends.CANVAS)
        this.vexCtx = this.renderer.getContext()
        var stave = new Vex.Flow.Stave(8, -16, 282);
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
        this.rendered = true;
        this.$emit('show_notes')
      }
    }
  },
  mounted: function() {
    this.renderer = new Vex.Flow.Renderer(this.$refs.canvas,
      Vex.Flow.Renderer.Backends.CANVAS)
    this.vexCtx = this.renderer.getContext()
    var stave = new Vex.Flow.Stave(8, -16, 282);
    stave.addClef("treble").addKeySignature(this.in_key_of).setContext(this.vexCtx).draw();

    var voice = new Vex.Flow.Voice({
      num_beats: 2,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION
    });
    voice.draw(this.vexCtx, stave);
  }
}

module.exports = sheet
