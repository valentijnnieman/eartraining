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
      return { 
        exercise: {},
        all_points: 0,
        exercise_amount: 0
      }
    },
    methods: {
      completed_exercise: function() {
        var user_id = document.getElementsByClassName('topbar__user')[0].id
        fetch('/add_points/'+user_id+'/'+this.all_points, { method: 'POST' }).then(function(response){
          console.log(response)
        })
      },
      add_points: function(points) {
        this.all_points += points
        this.exercise_amount -= 1
        if(this.exercise_amount < 1) this.completed_exercise()
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
      this.$http.get('/exercises/load/1').then(function(response){
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
}
