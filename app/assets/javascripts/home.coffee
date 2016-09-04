# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->
  $(window).on ('scroll'), (e)->
    e.preventDefault()
    e.stopPropagation()
    y = 80 + ($(window).scrollTop() * 0.04)
    $('.hero').animate {
      backgroundPositionY: y+'%'
    }, 0, ->
      console.log("done")
