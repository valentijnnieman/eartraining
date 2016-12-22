// A Synth is an object holding everything that is needed 
// to synthesize a basic sound, using simple subtractive synthesis. 

var AudioEngine = require('./engine.js')

var Synth = function(instrument) {
  this.oscillators = [];
  this.gainNodes = [];
  this.masterGain;
  this.volume;

  switch(instrument) {
    case 'piano':
      var waves = ['sine', 'sawtooth', 'square'];
      // there should be the same amount of filters as there are waves
      // TODO: add filters
      var filters = [
        {
          "type": "lowpass",
          "freq": 500
        },
        {
          "type": "lowpass",
          "freq": 1500
        },
        {
          "type": "lowpass",
          "freq": 1000
        }
      ];
      break;
    case 'sine':
      var waves = ['sine'];
      break;
    default:
      var waves = ['sine'];
      break;
  }
  this.masterGain = AudioEngine.getContext().createGain();
  this.masterGain.gain.value = 0;
  this.volume = AudioEngine.getContext().createGain();
  this.volume.gain.value = 1;

  for(var i = 0; i < waves.length; i++) {
    var osc = AudioEngine.getContext().createOscillator();
    osc.type = waves[i];
    osc.start(0);
    this.oscillators.push(osc)
    var gain = AudioEngine.getContext().createGain();
    console.log(1.0 / waves.length)
    gain.gain.value = 1.0 / waves.length; 
    this.gainNodes.push(gain);
    if(filters) {
      for (var j = 0; j < filters.length; j++) {
        var filter = AudioEngine.getContext().createBiquadFilter(); 
        filter.type = filters[j].type;
        filter.frequency.value = filters[j].freq;
        this.gainNodes[i].connect(filter);
        filter.connect(this.masterGain);
      }
    }
    else this.gainNodes[i].connect(this.masterGain);
  }

  this.masterGain.connect(this.volume);
  this.volume.connect(AudioEngine.getContext().destination);
}

Synth.prototype.playNote = function(note, a, d, s, r){
  now = AudioEngine.getContext().currentTime;
  for(var i = 0; i < this.oscillators.length; i++) {
    this.oscillators[i].frequency.setValueAtTime(noteToFrequency(note), now);
    this.oscillators[i].connect(this.gainNodes[i]);
  }
  this.masterGain.gain.cancelScheduledValues(now);
  this.masterGain.gain.setValueAtTime(0.0, now);
  this.masterGain.gain.linearRampToValueAtTime(1, now + a); 
  this.masterGain.gain.linearRampToValueAtTime(0, now + a + d + r);
}

Synth.prototype.connectToAnalyser = function(analyser) {
  console.log('Connecting:')
  console.log(this.masterGain)
  console.log(' to: ')
  console.log(analyser)
  this.masterGain.connect(analyser)
}

var noteToFrequency = function(note) {
  switch(note)
  {
    case 'c/4': return 261.6;
    case 'c#/4': return 277.2;
    case 'db/4': return 277.2;
    case 'd/4': return 293.6;
    case 'd#/4': return 311.1;
    case 'eb/4': return 311.1;
    case 'e/4': return 329.6;
    case 'e#/4': return 349.2;
    case 'fb/4': return 329.6;
    case 'f/4': return 349.2;
    case 'f#/4': return 369.9;
    case 'gb/4': return 369.9;
    case 'g/4': return 391.9;
    case 'g#/4': return 415.3;
    case 'ab/4': return 415.3;
    case 'a/4': return 440.0;
    case 'a#/4': return 466.1;
    case 'bbb/4': return 440.0;
    case 'bb/4': return 466.1;
    case 'b/4': return 493.8;
    case 'cb/5': return 493.8;
    case 'c/5': return 523.2;
    case 'c#/5': return 554.3;
    case 'db/5': return 554.3;
    case 'd/5': return 587.3;
    case 'd#/5': return 622.2;
    case 'eb/5': return 622.2;
    case 'e/5': return 659.2;
    case 'e#/5': return 698.4;
    case 'fb/5': return 659.2;
    case 'f/5': return 698.4;
    case 'f#/5': return 739.9;
    case 'gb/5': return 739.9;
    case 'g/5': return 783.9;
    case 'g#/5': return 830.6;
    case 'ab/5': return 830.6;
    case 'a/5': return 880.0;
    case 'a#/5':return 932.3;
    case 'bbb/5': return 880.0;
    case 'bb/5': return 932.3;
    case 'b/5': return 987.7;
  }
}
module.exports = Synth; 
