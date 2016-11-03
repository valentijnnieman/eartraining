var Snippet = require('./snippet.js')

console.log(Snippet.notes)

var notes = {
  "id": "1",
  "key": "C",
  "type": "interval",
  "instrument": "piano",
  "difficulty": "easy",
  "all_notes": [
    { "key": "c/4", "duration" :"q" },
    { "key": "d/4", "duration" :"q" }
  ],
  "speed": "1000"
}
var simpleNotes = {
  "id": "1",
  "key": "C",
  "type": "interval",
  "instrument": "sine",
  "difficulty": "easy",
  "all_notes": [
    { "key": "c/4", "duration" :"q" },
    { "key": "e/4", "duration" :"q" }
  ]
}

window.onload = function () {
  var myPanel = document.getElementById('exercises')
  var snippets = [6]
  for(var i = 0; i < 6; i++) {
    snippets[i] = new Snippet(notes, myPanel, i)
    snippets[i].render()
  }
}
