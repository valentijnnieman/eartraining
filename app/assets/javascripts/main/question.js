

function Question(key, rootNote, questionNote, questionInterval)
{
	this.key = key;
	this.rootNote = rootNote;
	this.questionNote = questionNote;
	
	this.questionInterval = questionInterval;
	
	this.rootSound = new Sound(rootNote, 'triangle');
	this.questionSound = new Sound(questionNote, 'triangle');
	
	this.success = false;			
}

function RandomNumber(min, max)
{
	return Math.random() * (max - min) + min;
}

function shuffle(a) 	// fisher-yates shuffle
{
  var i = a.length, temp, random ;

  while (0 !== i) 
  {
    random = Math.floor(Math.random() * i);
    i -= 1;

    temp = a[i];
    a[i] = a[random];
    a[random] = temp;
  }

  return a;
}

function Sound(note, type)
{
	this.frequency;
	this.attack = 0.0;
    this.decay = 0.2;
	this.release = 0.8;
	
	switch(note)
	{
	case 'c/4':
		this.frequency = 261.6;
		break;
	case'c#/4':
		this.frequency = 277.2;
		break;
	case'db/4':
		this.frequency = 277.2;
		break;
	case 'd/4':
		this.frequency = 293.6;
		break;
	case 'd#/4':
		this.frequency = 311.1;
		break;
	case 'eb/4':
		this.frequency = 311.1;
		break;
	case 'e/4':
		this.frequency = 329.6;
		break;
	case 'e#/4':
		this.frequency = 349.2;
		break;
	case 'fb/4':
		this.frequency = 329.6;
		break;
	case 'f/4':
		this.frequency = 349.2;
		break;
	case 'f#/4':
		this.frequency = 369.9;
		break;
	case 'gb/4':
		this.frequency = 369.9;
		break;
	case 'g/4':
		this.frequency = 391.9;
		break;
	case 'g#/4':
		this.frequency = 415.3;
		break;
	case 'ab/4':
		this.frequency = 415.3;
		break;
	case 'a/4':
		this.frequency = 440.0;
		break;
	case 'a#/4':
		this.frequency = 466.1;
		break;
    case 'bbb/4':
        this.frequency = 440.0;
        break;
	case 'bb/4':
		this.frequency = 466.1;
		break;
	case 'b/4':
		this.frequency = 493.8;
		break;
	case 'cb/5':
		this.frequency = 493.8;
		break;
	case 'c/5':
		this.frequency = 523.2;
		break;
	case'c#/5':
		this.frequency = 554.3;
		break;
	case'db/5':
		this.frequency = 554.3;
		break;
	case 'd/5':
		this.frequency = 587.3;
		break;
	case 'd#/5':
		this.frequency = 622.2;
		break;
	case 'eb/5':
		this.frequency = 622.2;
		break;
	case 'e/5':
		this.frequency = 659.2;
		break;
	case 'e#/5':
		this.frequency = 698.4;
		break;
	case 'fb/5':
		this.frequency = 659.2;
		break;
	case 'f/5':
		this.frequency = 698.4;
		break;
	case 'f#/5':
		this.frequency = 739.9;
		break;
	case 'gb/5':
		this.frequency = 739.9;
		break;
	case 'g/5':
		this.frequency = 783.9;
		break;
	case 'g#/5':
		this.frequency = 830.6;
		break;
	case 'ab/5':
		this.frequency = 830.6;
		break;
	case 'a/5':
		this.frequency = 880.0;
		break;
	case 'a#/5':
		this.frequency = 932.3;
		break;
    case 'bbb/5':
        this.frequency = 880.0;
        break;
	case 'bb/5':
		this.frequency = 932.3;
		break;
	case 'b/5':
		this.frequency = 987.7;
		break;
	}
	
	this.osc = audioCtx.createOscillator();
    this.osc2 = audioCtx.createOscillator();
    this.osc3 = audioCtx.createOscillator();
	this.osc.frequency.value = this.frequency;
    this.osc2.frequency.value = this.frequency / 2;
    this.osc3.frequency.value = this.frequency * 4;
	this.osc.type = "square";
    this.osc2.type = "sawtooth";
    this.osc3.type = "sine";
	this.osc.start(0);
    this.osc2.start(0);
    this.osc3.start(0);

	this.gainNode = audioCtx.createGain();
	this.gainNode.gain.value = 0;

    this.lpFilter = audioCtx.createBiquadFilter();
    this.lpFilter.type = "lowpass";
    this.lpFilter.frequency.value = 500.0;
	
	Sound.prototype.trigger = function()
	{	
		this.osc.connect(this.gainNode);
        this.osc2.connect(this.gainNode);
        this.osc3.connect(this.gainNode);
        this.gainNode.connect(this.lpFilter);
		this.lpFilter.connect(audioCtx.destination); 
        // FILTER
        		// ADSR
		now = audioCtx.currentTime;
	    this.gainNode.gain.cancelScheduledValues(now);
	    this.gainNode.gain.setValueAtTime(0, now);
		this.gainNode.gain.linearRampToValueAtTime(0.33, now + this.attack); // 0.1 is attack time
		this.gainNode.gain.linearRampToValueAtTime(0, now + this.attack + this.decay + this.release); // attack + release time		
	};
}
