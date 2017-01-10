var Vue = require('vue/dist/vue.js')
var VueResource = require('vue-resource')

var Snippet = require('./components/snippet.js');
var EditSnippet = require('./components/edit_snippet.js');
var CreateSnippet= require('./components/create_snippet.js');

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
      createSnippet: CreateSnippet
    },
    methods: {
      delete_snippet: function(i) {
        // TO-DO: This now deletes the last element added instead of the one clicked on
        console.log(i)
        if (i > -1) {
          this.exercise.json_data.splice(i, 1)
        }
      }
    },
    el: "#new_exercise"
  })
}
