class CreateKinds < ActiveRecord::Migration[5.1]
  def change
    create_table :kinds do |t|
      t.string :name

      # t.belongs_to :cards
      t.timestamps
    end
  end
end
