var Vue = require('vue/dist/vue.js')
var Vex = require('vexflow');

var Synth = require('../classes/synth.js')
var AudioEngine = require('../classes/engine.js')

var snippet = require('../mixins/snippet.js')
var sheet = require('../mixins/sheet.js')

module.exports = Vue.component('edit_snippet', {
  mixins: [snippet],
  methods: {
    delete_snippet: function() {
      console.log("click!")
      this.$emit('delete')
    }
  },
  template: `
    <div class='snippet'>
      <div class='row'>
        <div class='small-2 columns'>
          <h3 class='centered' v-on:click='delete_snippet()'>b</h3>
        </div>
      </div>
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
              <snippet__visualizer ref='visualizer'></snippet__visualizer>
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
