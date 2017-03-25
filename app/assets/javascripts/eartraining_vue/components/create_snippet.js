var Vue = require('vue/dist/vue.js')
var Vex = require('vexflow');

var Synth = require('../classes/synth.js')
var AudioEngine = require('../classes/engine.js')

var snippet = require('../mixins/snippet.js')
var sheet = require('../mixins/sheet.js')

var possible_notes = require('../data/possible_notes.js')
var possible_keys = require('../data/possible_keys.js')
var interval_list = require('../data/interval_list.js')

module.exports = Vue.component('create_snippet', {
  // TO-DO: propagate to parents
  props: ['exercise'],
  data: function(){
    return { 
      key: "C",
      type: 'interval',
      instrument: 'sine',
      answer: "m3",
      points: 10,
      root_note: 'c/4',
      question_note: 'eb/4',
      new_snippet: {}
    }
  },
  computed: {
    possible_notes: function() {
      return possible_notes;
    },
    possible_keys: function() {
      return possible_keys;
    },
    interval_list: function() {
      return interval_list;
    }
  },
  methods: {
    add_new_snippet: function() {
      this.new_snippet = {
        "key": this.key,
        "type": this.type,
        "instrument": this.instrument,
        "answer": this.answer,
        "points": this.points, 
        "notes": [{
          "key": this.root_note,
          "duration": "q"
        },{
          "key": this.question_note,
          "duration": "q"
        }],
        "speed": "1000"
      }
      this.exercise.json_data.push(this.new_snippet)
    },
    parse_to_key: function(rootnote) {
      // parse rootnote to key!
      // let's try regex! 
      var regex = /(.{1,2})\//g;
      var key = String(rootnote.match(regex))
      console.log(typeof key)
      key = key.substr(0, key.length - 1)
      key = key.charAt(0).toUpperCase() + key.substr(1)

      this.key = key
      console.log(key)
    },
    calculate_answer: function(rootnote, questionnote) {
      var index_of_root = possible_notes.indexOf(rootnote) 
      var index_of_question = possible_notes.indexOf(questionnote) 

      console.log(index_of_root)
      console.log(index_of_question)
    }
  },
  template: `
    <div class='snippet'>
      <div class='row'>
        <div class='small-8 columns'>
          <span>Key: </span>
          <select v-model="key">
            <option v-for="key in possible_keys">{{key}}</option>
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
          <select v-model="root_note" v-on:change='parse_to_key(root_note)'>
            <option v-for="note in possible_notes">{{note}}</option>
          </select>
        </div>
        <div class='small-6 columns'>
          <span>Question note: </span>
          <select v-model="question_note" v-on:change='calculate_answer(root_note, question_note)'>
            <option v-for="note in possible_notes">{{note}}</option>
          </select>
        </div>
      </div>
      <div class='row'>
        <div class='small-2 columns'>
          <h3 class='centered' v-on:click='add_new_snippet()'>+</h3>
        </div>
        <div class='small-6 columns'>
          <span>Answer: </span>
          <select v-model="answer">
            <option v-for="interval in interval_list">{{interval}}</option>
          </select>
        </div>
      </div>
    </div>`
})
