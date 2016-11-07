var Snippet = require('./snippet.js')

console.log(Snippet.notes)

var notes = {
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
var notes2 = {
  "key": "D",
  "type": "interval",
  "instrument": "piano",
  "difficulty": "easy",
  "all_notes": [
    { "key": "d/4", "duration" :"q" },
    { "key": "f#/4", "duration" :"q" }
  ],
  "speed": "1000"
}
var simpleNotes = {
  "key": "C",
  "type": "interval",
  "instrument": "sine",
  "difficulty": "easy",
  "all_notes": [
    { "key": "c/4", "duration" :"q" },
    { "key": "e/4", "duration" :"q" }
  ],
  "speed": "1000"
}

window.onload = function () {
  var myPanel = document.getElementById('exercises')
  var snippets = [1]
  snippets[0] = new Snippet(notes, myPanel, 0)
  snippets[0].render()
  snippets[1] = new Snippet(simpleNotes, myPanel, 1)
  snippets[1].render()
  snippets[2] = new Snippet(notes2, myPanel, 2)
  snippets[2].render()
  snippets[3] = new Snippet(notes2, myPanel, 3)
  snippets[3].render()
  snippets[4] = new Snippet(notes2, myPanel, 4)
  snippets[4].render()
}
