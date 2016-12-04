var Vue = require('vue/dist/vue.js')

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
            <div class='snippet__canvas-container' id='sheet-${1}'><div class='snippet__playbar'></div></div>
            <div class='snippet__section' id='controls-${1}'>
              <input type='range' id='gain-${1}' class='controls__slider' ></input>
              <input type='range' id='type' class='controls__slider'></input>
            </div>
          </div>
          <div class='snippet__container'>
            <button class='snippet__play button small radius' id='play-${1}'>play</button>
            <div class='snippet__section snippet__section--small snippet__section--wide' id='playbar-${1}'></div>
            <div class='snippet__section snippet__section--small' id='monitor-${1}'>
              <div class='snippet__canvas-container' id='monitor-canvas-${1}'></div>
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

Vue.component('snippet__title' , {
  data: function() {
    return { 
      message: 'cool' 
    }
  },
  template: "<div class='snippet__title'>{{message}}</div>"
})

window.onload = function () {
  new Vue({
    el: "#exercise",
    data: {
      test: "Haha!",
      amountOfExercises: 8 
    }
  })
}
