class Lesson < ApplicationRecord
  has_many :exercises, dependent: :destroy
end
