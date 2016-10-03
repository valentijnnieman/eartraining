// Snippets are objects holding a single 'piece of music',
// like an interval or a chord progression.
//

var Snippet = function(notes, element) {
  this.notes = notes
  this.element = element
}

Snippet.prototype.render = function(){
  var canvas = document.createElement('canvas')
  this.element.appendChild(canvas)

  var renderer = new Vex.Flow.Renderer(canvas,
    Vex.Flow.Renderer.Backends.CANVAS);

  var vexCtx = renderer.getContext();
  var stave = new Vex.Flow.Stave(10, -18, 340);
  console.log(this.notes.key)
  stave.addClef("treble").addKeySignature(this.notes.key).setContext(vexCtx).draw();

  // Here we need to decide what to render:
  // All the notes?
  // Only the root?
  // Nothing?

  var voice = new Vex.Flow.Voice({
    num_beats: 2,
    beat_value: 4,
    resolution: Vex.Flow.RESOLUTION
  });

  var notesToDraw = []
  for (var i = 0; i < this.notes.all_notes.length; i++){
    console.log(this.notes.all_notes[i].key)  
    note = new Vex.Flow.StaveNote({ clef: "treble", auto_stem: true, keys: [this.notes.all_notes[i].key], duration: this.notes.all_notes[i].duration }),
    notesToDraw.push(note)
  }
    voice.addTickables(notesToDraw);
    formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 200);
    voice.draw(vexCtx, stave);
  
}
Snippet.prototype.play = function(){
  // play the notes 
}
Snippet.prototype.solve = function(){
  // handle right and wrong answers
} 
