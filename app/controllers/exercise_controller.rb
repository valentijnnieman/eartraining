class ExerciseController < ApplicationController
  def free
  end
  def get_exercise
    @exercise = Exercise.find(1)
    render json: @exercise 
  end
end
