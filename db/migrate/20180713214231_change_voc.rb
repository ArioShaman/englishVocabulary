class ChangeVoc < ActiveRecord::Migration[5.1]
  def change
    add_column :vocs, :image_id, :integer
  end
end
