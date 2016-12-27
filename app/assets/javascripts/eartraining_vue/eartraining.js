var Vue = require('vue/dist/vue.js')
var VueResource = require('vue-resource')

var Snippet = require('./components/snippet.js');

Vue.use(VueResource)

Vue.component('snippet__points' , {
  props: ['amount'],
  template: "<div class='snippet__points'>{{amount}}</div>"
})

window.onload = function () {
  var ExerciseApp = new Vue({
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
    components: {
      snippet: Snippet
    },
    el: "#exercise"
  })

  var EditApp = new Vue({
    data: function() {
      return { exercise: "Loading..." }
    },
    mounted: function() {
      var self = this;
      this.$http.get('get_exercise/5').then(function(response){
        self.exercise = response.body
        json_data = JSON.parse(response.body.json_data)
        console.log(json_data)
        self.exercise.json_data = json_data
      }, function (response) {

      })
    },
    components: {
      snippet: Snippet
    },
    el: "#new_exercise"
  })
}
