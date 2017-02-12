class DashboardController < ApplicationController
  def index
    @exercises = Exercise.all
  end
end
