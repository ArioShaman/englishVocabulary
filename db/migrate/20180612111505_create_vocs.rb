class CreateVocs < ActiveRecord::Migration[5.1]
  def change
    create_table :vocs do |t|
      t.string :name
      t.string :color, default: ''
      t.boolean :is_redact, default: false

      t.belongs_to :cards, index: true
      t.belongs_to :users, index: true
      t.timestamps
    end
  end
end
