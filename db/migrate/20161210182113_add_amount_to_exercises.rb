class AddAmountToExercises < ActiveRecord::Migration[5.0]
  def change
    add_column :exercises, :amount_of_exercises, :integer
  end
end
