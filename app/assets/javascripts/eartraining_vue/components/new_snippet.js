var Vue = require('vue/dist/vue.js')
var Vex = require('vexflow');

var Synth = require('../classes/synth.js')
var AudioEngine = require('../classes/engine.js')

var snippet = require('../mixins/snippet.js')
var sheet = require('../mixins/sheet.js')

module.exports = Vue.component('new_snippet', {
  props: ['exercise'],
  methods: {
    add_new_snippet: function() {
      var new_snippet = {
        "key": "C",
        "type": "interval",
        "instrument": "sine",
        "answer": "m3",
        "points": "10", 
        "notes": [{
          "key": "c/4",
          "duration": "q"
        },{
          "key": "eb/4",
          "duration": "q"
        }],
        "speed": "1000"
      }
      this.exercise.json_data.push(new_snippet)
    } 
  },
  template: `
    <div class='snippet' v-on:click='add_new_snippet()'>
      <div class='row'>
        <div class='small-2 columns'>
          <h3 class='centered'>+</h3>
        </div>
      </div>
    </div>`
})
