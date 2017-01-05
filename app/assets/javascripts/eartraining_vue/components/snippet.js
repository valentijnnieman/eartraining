var Vue = require('vue/dist/vue.js')
var Vex = require('vexflow');

var Synth = require('../classes/synth.js')
var AudioEngine = require('../classes/engine.js')

var snippet = require('../mixins/snippet.js')
var sheet = require('../mixins/sheet.js')

module.exports = Vue.component('snippet', {
  mixins: [snippet],
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

Vue.component('snippet__canvas', {
  mixins: [sheet],
  template: "<canvas height=80 width=296 class='snippet__canvas' ref='canvas'></canvas>",
})

Vue.component('snippet__visualizer', {
  data: function() {
    var returnData = { }
    returnData.analyser = AudioEngine.getContext().createAnalyser()
    returnData.analyser.fftSize = 2048
    returnData.bufferLength = returnData.analyser.frequencyBinCount
    returnData.monitor_data = new Uint8Array(returnData.bufferLength)
    returnData.analyser.getByteTimeDomainData(returnData.monitor_data)
    return returnData 
  },
  mounted: function(){
    this.canvas = this.$refs.canvas.getContext('2d') 
    this.width = this.$refs.canvas.width
    this.height = this.$refs.canvas.height
    this.gradient = this.canvas.createLinearGradient(0, 0, 0, this.height)
    this.gradient.addColorStop(0, 'rgb(252,236,176)')
    this.gradient.addColorStop(0.25, 'rgb(252,197,0)')
    this.gradient.addColorStop(0.5, 'rgb(252,71,0)')
    this.gradient.addColorStop(0.75, 'rgb(252,197,0)')
    this.gradient.addColorStop(1, 'rgb(252,236,176)')
    this.flatline()
  },
  methods: {
    connect: function(synth) {
      synth.connectToAnalyser(this.analyser)
    },
    draw: function() {
      this.analyser.getByteTimeDomainData(this.monitor_data);
      this.drawVisual = requestAnimationFrame(this.draw)
      this.canvas.clearRect(0,0, this.width, this.height)
      this.canvas.lineWidth = 1
      this.canvas.strokeStyle = this.gradient

      this.canvas.beginPath();

      var sliceWidth = this.width / this.bufferLength;
      var x = 0;

      for(var i = 0; i < this.bufferLength; i++) {

        var v = this.monitor_data[i] / 128.0;
        var y = v * this.height/2;

        if(i === 0) {
          this.canvas.moveTo(x, y);
        } else {
          this.canvas.lineTo(x, y);
        }

        x += sliceWidth;
      }
      this.canvas.lineTo(this.width, this.height/2)
      this.canvas.stroke()
    },
    flatline: function() {
      this.canvas.clearRect(0,0, this.width, this.height)

      this.canvas.lineWidth = 0.5
      this.canvas.strokeStyle = this.gradient
      this.canvas.moveTo(0, this.height/2)
      this.canvas.lineTo(this.width, this.height/2)
      this.canvas.stroke();
    },
    animate: function(){
      this.analyser.getByteTimeDomainData(this.monitor_data);
      this.draw();
    }
  },
  template: "<canvas height=30 width=150 class='snippet__canvas snippet__canvas--dark-background' ref='canvas'></canvas>"
})
