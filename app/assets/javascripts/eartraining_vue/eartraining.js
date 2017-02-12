var Vue = require('vue/dist/vue.js')
var VueResource = require('vue-resource')

var Snippet = require('./components/snippet.js');
var EditSnippet = require('./components/edit_snippet.js');
var CreateSnippet= require('./components/create_snippet.js');

Vue.use(VueResource)

function get_id() {
	// returns last parameter of url, which *should* be the id
	return window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
}

Vue.component('snippet__points' , {
  props: ['amount'],
  template: "<div class='snippet__points'>{{amount}}</div>"
})

window.onload = function () {
  var ExerciseApp = new Vue({
    data: function() {
      return { 
        exercise: {},
        all_points: 0,
        exercise_amount: 0
      }
    },
    methods: {
      add_points: function(points) {
        console.log('all_points: ' + typeof(this.all_points))
        console.log('points: ' + typeof(points))
        this.all_points += points
        this.exercise_amount -= 1
      },
      delete_snippet: function(i) {
        // TO-DO: This now deletes the last element added instead of the one clicked on
        console.log("deleting: " + i)
        if (i > -1) {
          this.exercise.json_data.splice(i, 1)
          console.log(this.exercise.json_data.length)
        }
      }
    },
    mounted: function() {
      var self = this;
      this.$http.get('/exercises/load/'+get_id()).then(function(response){
        self.exercise = response.body
        json_data = JSON.parse(response.body.json_data)
        self.exercise.json_data = json_data
        self.exercise_amount = json_data.length
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
