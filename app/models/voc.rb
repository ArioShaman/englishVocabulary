class Voc < ApplicationRecord
  has_many :cards

  has_many :uservocs
  has_many :users, through: :uservocs, foreign_key: true
end
