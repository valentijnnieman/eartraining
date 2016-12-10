var Vue = require('vue/dist/vue.js')
var VueResource = require('vue-resource')

Vue.use(VueResource)

Vue.component('snippet', {
  template: `
    <div class='snippet'>
      <div class='row'>
        <div class='small-12 columns'>
          <snippet__title title='hihi'></snippet__title>
        </div>
      </div>
      <div class='row'>
        <div class='small-12 columns'>
          <div class='snippet__container'>
            <snippet__canvas></snippet_canvas>
            <div class='snippet__section' id='controls-${1}'>
              <input type='range' id='type' class='controls__slider'></input>
            </div>
          </div>
          <div class='snippet__container'>
            <button class='snippet__play button small radius' id='play-${1}'>play</button>
            <div class='snippet__section snippet__section--small snippet__section--wide' id='playbar-${1}'></div>
            <div class='snippet__section snippet__section--small' id='monitor-${1}'>
              <input type='range' id='gain-${1}' class='controls__slider' ></input>
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
  template: "<canvas class='snippet__canvas' id='sheet-${1}'></canvas>"
})

Vue.component('snippet__title' , {
  data: function() {
    return { 
      title: 'Interval' 
    }
  },
  template: "<div class='snippet__title'>{{title}}</div>"
})

window.onload = function () {
  new Vue({
    el: "#exercise",
    data: function() {
      var exercise = { test: 'test' }
      console.log(this)
      this.$http.get('get_exercise').then(function(response){
        exercise = response.body
        console.log(exercise)
      }, function (response) {

      })
      console.log(exercise)
      return exercise
    }
  })
}
