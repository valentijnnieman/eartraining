var Vue = require('vue/dist/vue.js')
var VueResource = require('vue-resource')

var Snippet = require('./components/snippet.js');
var EditSnippet = require('./components/edit_snippet.js');
var NewSnippet= require('./components/new_snippet.js');

Vue.use(VueResource)

Vue.component('snippet__points' , {
  props: ['amount'],
  template: "<div class='snippet__points'>{{amount}}</div>"
})

window.onload = function () {
  var ExerciseApp = new Vue({
    data: function() {
      return { exercise: {} }
    },
    mounted: function() {
      var self = this;
      this.$http.get('get_exercise/2').then(function(response){
        self.exercise = response.body
        json_data = JSON.parse(response.body.json_data)
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
      return { exercise: [], test: "hi" }
    },
    mounted: function() {
      this.exercise = {
        "id": 0,
        "title": "New Exercise",
        "json_data": [],
        "points": 10,
        "amount_of_exercises": 0
      }
    },
    components: {
      editSnippet: EditSnippet,
      newSnippet: NewSnippet
    },
    el: "#new_exercise"
  })
}
