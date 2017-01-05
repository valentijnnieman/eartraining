var Vue = require('vue/dist/vue.js')
var Vex = require('vexflow');

var Synth = require('../classes/synth.js')
var AudioEngine = require('../classes/engine.js')

var snippet = {
  props: ['snippet_data', 'index'],
  data: function() {
    return {
      synth: new Synth(this.snippet_data.instrument)
    }
  },
  methods: {
    play: function() {
      var self = this
      this.$refs.visualizer.connect(this.synth)
      this.$refs.visualizer.animate()

      this.synth.playNote(this.snippet_data.notes[0].key, 0.01, 0.2, 1.0, 0.8)
      window.setTimeout(function() {
        self.synth.playNote(self.snippet_data.notes[1].key, 0.01, 0.2, 1.0, 0.8)
      }, self.snippet_data.speed)
      window.setTimeout(function() {
        self.$refs.visualizer.flatline()
        cancelAnimationFrame(self.$refs.visualizer.drawVisual);
      }, self.snippet_data.speed * 2)
    }
  }
}

module.exports = snippet
