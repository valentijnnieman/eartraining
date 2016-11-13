// This is the audio engine, holding the Web Audio context

var AudioEngine = ( function() {
  try {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    var _context = new AudioContext();
    var _gain = _context.createGain();
    _gain.gain.value = 1.0;
    var _analyser = _context.createAnalyser();

    _gain.connect(_analyser);

    _analyser.smoothingTimeConstant = 0.3;
    _analyser.fftSize = 1024;
    
    console.log("Audio engine is running!");
  }
  catch(e) {
    console.log(e)
    console.log("Audio engine failed to run, because Web Audio is not supported by this browser. Please try a different browser.");
  }
  var AudioEngine = {};

  AudioEngine.getContext = function() {
    return _context;
  }
  AudioEngine.getGain = function() {
    return _gain;
  }
  AudioEngine.getAnalyser = function () {
    return _analyser;
  }

  return AudioEngine;
})();

module.exports = AudioEngine;
