class AssociateExercisesWithLessons < ActiveRecord::Migration[5.0]
  def change
    add_reference :exercises, :lessons, index: true
    add_foreign_key :exercises, :lessons
  end
end
