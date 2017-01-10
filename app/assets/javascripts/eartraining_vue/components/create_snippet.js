var Vue = require('vue/dist/vue.js')
var Vex = require('vexflow');

var Synth = require('../classes/synth.js')
var AudioEngine = require('../classes/engine.js')

var snippet = require('../mixins/snippet.js')
var sheet = require('../mixins/sheet.js')

module.exports = Vue.component('create_snippet', {
  // TO-DO: propagate to parents
  props: ['exercise'],
  data: function(){
    return { 
      key: "C",
      note_1: 'c/4',
      note_2: 'eb/4',
      new_snippet: {}
    }
  },
  methods: {
    add_new_snippet: function() {
      this.new_snippet = {
        "key": this.key,
        "type": this.type,
        "instrument": this.instrument,
        "answer": "m3",
        "points": this.points, 
        "notes": [{
          "key": this.note_1,
          "duration": "q"
        },{
          "key": this.note_2,
          "duration": "q"
        }],
        "speed": "1000"
      }
      this.exercise.json_data.push(this.new_snippet)
    }
  },
  template: `
    <div class='snippet'>
      <div class='row'>
        <div class='small-8 columns'>
          <span>Key: </span>
          <select v-model="key">
            <option> C </option>
            <option> C# </option>
            <option> D </option>
            <option> D# </option>
            <option> E </option>
            <option> F </option>
          </select>
        </div>
        <div class='small-4 columns'>
          <span>Type: </span>
          <select v-model="type">
            <option> Interval </option>
          </select>
        </div>
      </div>
      <div class='row'>
        <div class='small-8 columns'>
          <span>Instrument: </span>
          <select v-model="instrument">
            <option> Sine </option>
          </select>
        </div>
        <div class='small-4 columns'>
          <span>Points: </span>
          <select v-model="points">
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
      </div>
      <div class='row'>
        <div class='small-6 columns'>
          <span>Root note: </span>
          <select v-model="note_1">
            <option> c/4 </option>
            <option> c#/4 </option>
            <option> db/4 </option>
            <option> d/4 </option>
            <option> d#/4 </option>
            <option> eb/4 </option>
            <option> e/4 </option>
            <option> f/4 </option>
          </select>
        </div>
        <div class='small-6 columns'>
          <span>Question note: </span>
          <select v-model="note_2">
            <option> c/4 </option>
            <option> c#/4 </option>
            <option> db/4 </option>
            <option> d/4 </option>
            <option> d#/4 </option>
            <option> eb/4 </option>
            <option> e/4 </option>
            <option> f/4 </option>
          </select>
        </div>
      </div>
      <div class='row'>
        <div class='small-2 columns'>
          <h3 class='centered' v-on:click='add_new_snippet()'>+</h3>
        </div>
      </div>
    </div>`
})
