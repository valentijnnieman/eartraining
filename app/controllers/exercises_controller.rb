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
    if @exercise.save(exercise_params)
      redirect_to edit_exercise_path(@exercise.id)
    else
      render 'new'
    end
  end

  def show
  end

  def edit
    @exercise = Exercise.find(params[:id])
  end

  def update
    @exercise = Exercise.find(params[:id])

    if @exercise.update(exercise_params)
      redirect_to @exercise
    else
      render 'edit'
    end
  end

  def destroy
    @exercise = Exercise.find(params[:id])
    @exercise.destroy

    redirect_to 'exercise/free'
  end

  private
  def exercise_params
    params.require(:exercise).permit(:title, :json_data, :points, :amount_of_exercises)
  end
end
