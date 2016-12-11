class ExercisesController < ApplicationController
  def free
  end
  def get_exercise
    @exercise = Exercise.find(params[:id])
    render json: @exercise 
  end

  def index
  end
  def new
    @new_exercise = Exercise.new 
  end
  def create
    @exercise = Exercise.new(exercise_params)
    @exercise.save
  end
  def show
  end

  private
  def exercise_params
    params.require(:exercise).permit(:title, :json_data, :points, :amount_of_exercises)
  end

end
