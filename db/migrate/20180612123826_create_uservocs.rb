class CreateUservocs < ActiveRecord::Migration[5.1]

  def self.up
    create_table :uservocs do |t|
      t.column :user_id, :integer
      t.column :voc_id, :integer

      t.timestamps
    end

    add_index :categorizations, [:user_id, :voc_id]
  end

  def self.down

  end    
end
