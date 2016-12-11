var Vue = require('vue/dist/vue.js')
var VueResource = require('vue-resource')
var Vex = require('vexflow');

Vue.use(VueResource)

Vue.component('snippet', {
  props: ['snippet_data', 'index'],
  template: `
    <div class='snippet'>
      <div class='row'>
        <div class='small-12 columns'>
          <snippet__points :name='snippet_data.points'></snippet__points>
        </div>
      </div>
      <div class='row'>
        <div class='small-12 columns'>
          <div class='snippet__container'>
            <snippet__canvas :notes='snippet_data.notes'></snippet_canvas>
          </div>
          <div class='snippet__container'>
            <button class='snippet__play button small radius'>play</button>
            <div class='snippet__section snippet__section--small snippet__section--wide'></div>
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
  props: ['notes'],
  template: "<canvas class='snippet__canvas' ref='canvas'></canvas>",
  data: function() {
    //canvas = document.getElementById(this.index)
    //console.log(canvas)

    return this
  },
  methods: {
    draw_notes: function() {
      var stave = new Vex.Flow.Stave(8, -16, 191);
      stave.addClef("treble").addKeySignature(this.notes.key).setContext(this.vexCtx).draw();

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
  },
  mounted: function() {
    this.renderer = new Vex.Flow.Renderer(this.$refs.canvas,
      Vex.Flow.Renderer.Backends.CANVAS)
    this.vexCtx = this.renderer.getContext()
    //this.draw_notes()
  }
})

Vue.component('snippet__points' , {
  props: ['name'],
  template: "<div class='snippet__points'>{{name}}</div>"
})

window.onload = function () {
  new Vue({
    data: function() {
      return { exercise: "Loading..." }
    },
    mounted: function() {
      var self = this;
      this.$http.get('get_exercise/2').then(function(response){
        self.exercise = response.body
        json_data = JSON.parse(response.body.json_data)
        console.log(json_data)
        self.exercise.json_data = json_data
      }, function (response) {

      })
    },
    el: "#exercise"
  })
}
