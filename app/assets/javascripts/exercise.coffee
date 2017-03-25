//= require 'exercise/exercise.js'

console.log("exercise loading!")

$(document).ready ->
  $('#sidebar-menu-button').on ('click'), (e)->
    if $('#sidebar-menu').hasClass("hide")
      $('#sidebar-menu-button').toggleClass('sidebar-menu-button--close')
      $('#sidebar-menu').toggleClass('hide')
      $('#sidebar-menu').animate {
        left: 0
      }, 200
    else
      $('#sidebar-menu-button').toggleClass('sidebar-menu-button--close')
      $('#sidebar-menu').animate {
        left: -300
      }, 200, ->
        $('#sidebar-menu').toggleClass('hide')
