class Card < ApplicationRecord
  # has_one :kind
  belongs_to :voc


  def kind
    Kind.find(self.kind_id).name
  end
end
