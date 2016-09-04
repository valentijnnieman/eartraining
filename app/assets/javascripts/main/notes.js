var canvas;
var renderer;
var vexCtx;
var stave;
var formatter;

$(document).ready(function()
{
    	
});

function drawNotes(key, root, question, correct)
{
	canvas = $("#display-notes").get(0);
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

	renderer = new Vex.Flow.Renderer(canvas,
	   Vex.Flow.Renderer.Backends.CANVAS);
   
	vexCtx = renderer.getContext();
	stave = new Vex.Flow.Stave(10, -18, 340);
	stave.addClef("treble").addKeySignature(key).setContext(vexCtx).draw();
	
	// draw notes	
	if(correct)
	{
		// if the answer was right, draw two notes (the root and the correct answer)
		var voice = new Vex.Flow.Voice({
			num_beats: 2,
			beat_value: 4,
			resolution: Vex.Flow.RESOLUTION
		});

		var notes = [
			new Vex.Flow.StaveNote({ clef: "treble", auto_stem: true, keys: [root], duration: "q" }),
			new Vex.Flow.StaveNote({ clef: "treble", auto_stem: true, keys: [question], duration: "q" })
		];
	}
	else if(!correct)
	{
		var voice = new Vex.Flow.Voice({
			num_beats: 2,
			beat_value: 4,
			resolution: Vex.Flow.RESOLUTION
		});
		var notes = [
			new Vex.Flow.StaveNote({ clef: "treble", auto_stem: true, keys: [root], duration: "q" }),
			new Vex.Flow.StaveNote({ clef: "treble", auto_stem: true, keys: [question], duration: "q" })
		];
	}
	
	voice.addTickables(notes);
	formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 200);
	voice.draw(vexCtx, stave);
}
