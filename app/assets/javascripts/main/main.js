var app = angular.module('eartraining', []);
var audioCtx = new(AudioContext || webkitAudioContext)();

app.controller('exerciseController', function($scope, $http, exerciseService)
{
	//$scope.exercise.asyncLoad('seconds', false);
  $scope.questionList = [];
  $scope.numberOfQuestions = 10;
	$scope.currentQuestion = 0;	
	$scope.currentKey;
  $scope.currentRootNote; 
	$scope.currentQuestionNote;

	$scope.wrongAnswers = 0;
	$scope.rightAnswers = 0;
	$scope.wrongPercentage = "0%";      // for displaying progress bar
	$scope.displayWrongPercentage;
	$scope.rightPercentage = "0%";
	$scope.displayRightPercentage;

  $scope.soundPercentage = 0;         // for displaying sound timeline

  $scope.exerciseName = "Choose an exercise!";
	$scope.questionDisplay = "?";
	
	$scope.nextClass = 'hide';

	$scope.messageClass = 'alert alert-warning';

	$scope.showPiano = false;

	$scope.giveAnswer = function(answer)
	{
		if($scope.answer != true)
		{
			if(answer == $scope.questionList[$scope.currentQuestion].questionInterval)
			{
				$scope.success = answer;
				$scope.answer = true;
				$scope.message = "That's right, you got it!";;
				$scope.messageClass = 'alert alert-success';
				$scope.rightAnswers += 1;
				$scope.questionDisplay = $scope.questionList[$scope.currentQuestion].questionNote;
				$scope.nextClass = 'btn btn-info';
				
				drawNotes($scope.currentKey, $scope.currentRootNote, $scope.currentQuestionNote, true);
			}
			else
			{
				$scope.failed = answer;
				$scope.answer = false;
				$scope.messageClass = 'alert alert-danger';
				$scope.message = "Oops! That's not right. Try again?";
				$scope.wrongAnswers += 1;
			}
		}

		$scope.calculatePercentage();
	};
	
	$scope.playRoot = function()
	{
	};
	
	$scope.playQuestion = function()
	{
      // animate the playbar over the notes  
        if(!this.playing)
        {
            this.playing = true;
            var that = this;
            $('.playbar').animate({
                left: "+=265",
            }, 1000, function() {
                $('.playbar').css("left", "10px");
            });

            // play the notes after 300 ms with a time of 500 ms between them
            window.setTimeout(function()
            {
        	    $scope.questionList[$scope.currentQuestion].rootSound.trigger();
            }, 300);
            window.setTimeout(function() 
            {            
		        $scope.questionList[$scope.currentQuestion].questionSound.trigger();
                that.playing = false;
            }, 800);
        }
	};

	$scope.calculatePercentage = function()	
	{
		var full = $scope.wrongAnswers + $scope.rightAnswers;
		var onePercent = full / 100;

		var p = $scope.wrongAnswers / onePercent;
		$scope.wrongPercentage = p.toString() + "%";
		$scope.displayWrongPercentage = Math.round(p);

		p = $scope.rightAnswers / onePercent;
		$scope.rightPercentage = p.toString() + "%";
		$scope.displayRightPercentage = Math.round(p);
	}
	
	$scope.restartExercise = function()
	{
        //$scope.questionList = shuffle($scope.questionList);
		$scope.currentQuestion = 0;
		$scope.resetVars();
    $scope.message = "Welcome! Click on the notes below to hear the interval!";
		$scope.wrongAnswers = 0;
		$scope.rightAnswers = 0;
		$scope.displayWrongPercentage = 0;
		$scope.displayRightPercentage = 0;
		$scope.wrongPercentage = '';
		$scope.rightPercentage = '';
	}
	
	$scope.resetVars = function() // resets all variables for the next question
	{
		$scope.answer = false;
		$scope.success = 0;
		$scope.failed = 0;
		$scope.messageClass = 'alert alert-warning';
    $scope.message = "What's the interval between these two notes?";
		$scope.questionDisplay = "?";
		$scope.nextClass = 'hide';
		$scope.currentKey = $scope.questionList[$scope.currentQuestion].key;
		$scope.currentRootNote = $scope.questionList[$scope.currentQuestion].rootNote;					// copy for readability in index.html
		$scope.currentQuestionNote = $scope.questionList[$scope.currentQuestion].questionNote;
		
		drawNotes($scope.currentKey, $scope.currentRootNote, $scope.currentQuestionNote, false);
	}

	$scope.nextQuestion = function()
	{
		if($scope.answer == true)
		{		
			if($scope.numberOfQuestions > $scope.currentQuestion+1)
			{
				// load everything for the next question
				$scope.currentQuestion += 1;
				$scope.resetVars();
			}
			else
			{
				if($scope.displayRightPercentage < 50)
				{
					$scope.messageClass = 'alert alert-danger';
					$scope.message = "You've got " + $scope.displayRightPercentage + "% of the questions right... Perhaps you should retry this exercise?";
				}

				else if($scope.displayRightPercentage > 50 && $scope.displayRightPercentage < 75)
				{
					$scope.messageClass = 'alert alert-success';
					$scope.message = "You've got " + $scope.displayRightPercentage + "% of the questions right!";
				}
				else if($scope.displayRightPercentage > 75 && $scope.displayRightPercentage < 100)
				{
					$scope.messageClass = 'alert alert-success';
					$scope.message = "You've got " + $scope.displayRightPercentage + "% of the questions right! That's pretty good!";
				}
				else if($scope.displayRightPercentage >= 100)
				{
					$scope.messageClass = 'alert alert-success';
					$scope.message = "You've got " + $scope.displayRightPercentage + "% of the questions right! That's amazing!";
				}
			}
		}
	}

	$scope.togglePiano = function()
	{
		$scope.showPiano = !$scope.showPiano;
	};

    $scope.setName = function(filename)
    {
        var name = "";
        switch(filename)
        {
            case "seconds":
                name = "Minor and Major Seconds";
                break;
            case "thirds":
                name = "Minor and Major Thirds";
                break;
            case "fourthsfifths":
                name = "Fourths and Fifths";
                break;
            case "sixths":
                name = "Minor and Major Sixths";
                break;
            case "sevenths":
                name = "Minor and Major Sevenths";
                break;
            case "all":
                name = "All Intervals";
                break;
        }      

        return name;
    };

    $scope.setMaxQuestions = function(max)
    {
        $scope.numberOfQuestions = max;
        $scope.restartExercise();
    };

	$scope.loadExercise = function(filename, down)
	{
        $scope.exerciseName = $scope.setName(filename);
		//exerciseService.loadExercise(id, down);
        if(filename !== "all")
		{ 
			exerciseService.asyncLoad(filename).then(function(d)
  		    {
				$scope.questionList = [];		// empty current questionset
		        for(i in d)
		        {
		            $scope.questionList.push(new Question(d[i].root, d[i].rootnote,
		                                                  d[i].questionnote, d[i].interval));
		        }  
                console.log("questionList is now: " + $scope.questionList);
		        $scope.questionList = shuffle($scope.questionList);
		        //$scope.questionList = $scope.questionList.slice(0, $scope.numberOfQuestions);
		        if(down)
		        {
		            // reverse questions!
                    $scope.questionList = exerciseService.reverseQuestions($scope.questionList);
		        }
		        $scope.restartExercise();
		    });
		}
        else if(filename === "all")
        {
            // quick and dirty way of loading all the files 
            $scope.questionList = [];
            for(var i = 0; i < 5; i++)
            {
                var getfile = "";
                switch(i)
                {
                    case 0:
                        getfile = "seconds";
                        break;
                    case 1:
                        getfile = "thirds";
                        break;
                    case 2:
                        getfile = "fourthsfifths";
                        break;
                    case 3:
                        getfile = "sixths";
                        break;
                    case 4:
                        getfile = "sevenths";
                        break;
                }
                exerciseService.asyncLoad(getfile).then(function(d)
                {
                    for(j in d)
                    {
                        $scope.questionList.push(new Question(d[j].root, d[j].rootnote,
                                                              d[j].questionnote, d[j].interval));
                        $scope.questionList = shuffle($scope.questionList);
                    }
                    
                    // after last file, shuffle and slice
                    if(getfile === "sevenths")
                    {
		                if(down)
		                {
		                    // reverse questions!
                            $scope.questionList = exerciseService.reverseQuestions($scope.questionList);
		                }
		                $scope.restartExercise();
                    }
                    console.log("questionList is now: " + $scope.questionList); 
                });
            }
        }
		//$scope.restartExercise();
	}
    $scope.loadExercise('seconds', false);
});

app.filter('capitalize', function() {
    return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

