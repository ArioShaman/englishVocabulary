class Card < ApplicationRecord
  # has_one :kind
  def kind
    Kind.find(self.kind_id).name
  end
end
