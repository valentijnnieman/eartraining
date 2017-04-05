class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def add_points
    user = User.find(params[:id])
    user[:points] = user[:points] + Integer(params[:points])
    user.save
  end
end
