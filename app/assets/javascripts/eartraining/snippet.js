// Snippets are objects holding a single 'piece of music',
// like an interval or a chord progression.

var Snippet = function(notes, element) {
  this.notes = notes;
  this.element = element;
  this.synth = new Synth(this.notes.instrument); 

  this.canvas = document.createElement('canvas')
  this.renderer = new Vex.Flow.Renderer(this.canvas,
    Vex.Flow.Renderer.Backends.CANVAS);
  this.vexCtx = this.renderer.getContext();
}

Snippet.prototype.render = function(){
  this.element.appendChild(this.canvas)

  var stave = new Vex.Flow.Stave(10, -18, 340);
  stave.addClef("treble").addKeySignature(this.notes.key).setContext(this.vexCtx).draw();

  var voice = new Vex.Flow.Voice({
    num_beats: 2,
    beat_value: 4,
    resolution: Vex.Flow.RESOLUTION
  });

  var notesToDraw = []

  for (var i = 0; i < this.notes.all_notes.length; i++){
    note = new Vex.Flow.StaveNote({ clef: "treble", auto_stem: true, keys: [this.notes.all_notes[i].key], duration: this.notes.all_notes[i].duration }),
    notesToDraw.push(note)
  }

  voice.addTickables(notesToDraw);
  formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 200);
  voice.draw(this.vexCtx, stave);
}

Snippet.prototype.play = function(){
  // play the notes 
  if (this.notes.type == 'interval') {
    var that = this
    this.synth.playNote(this.notes.all_notes[0].key, 0.01, 0.2, 1.0, 0.8); 
    window.setTimeout(function() {
      that.synth.playNote(that.notes.all_notes[1].key, 0.01, 0.2, 1.0, 0.8); 
    }, this.notes.speed);
  } 
}

Snippet.prototype.solve = function(){
  // handle right and wrong answers
} 

