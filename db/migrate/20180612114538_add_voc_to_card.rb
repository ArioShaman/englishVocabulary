class AddVocToCard < ActiveRecord::Migration[5.1]
  def self.up
      add_column :cards, :voc_id, :integer
      add_index 'cards', ['voc_id'], :name => 'index_voc_id' 
  end

  def self.down
      remove_column :cards, :voc_id
  end
end
