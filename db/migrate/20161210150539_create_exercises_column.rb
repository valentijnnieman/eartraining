class CreateExercisesColumn < ActiveRecord::Migration[5.0]
  def change
    create_table :exercises do |t|
      t.string :title
      t.text :json_data
      t.integer :points
    end
  end
end
