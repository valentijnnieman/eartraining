app.service('exerciseService', function($http)
{
    var exerciseService = 
    {
        asyncLoad: function(filename)
        {
            var promise = $http.get('exercises/' + filename + '.json').then(function(response)
            {
                return response.data;
            });
            return promise;
        },

        reverseQuestions: function(questionList)
        {
            for(i in questionList)
            {
                var root = questionList[i].rootNote;
                var q = questionList[i].questionNote;

                questionList[i].rootNote = q;
                questionList[i].questionNote = root;

                var rootSound = questionList[i].rootSound;
                var qSound = questionList[i].questionSound;

                questionList[i].rootSound = qSound;
                questionList[i].questionSound = rootSound;
            }       
            return questionList;
        }
    };
    return exerciseService;
});
