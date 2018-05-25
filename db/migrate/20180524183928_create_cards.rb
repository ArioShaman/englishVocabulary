class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.string :eng
      t.string :rus
      t.string :engSentence
      t.string :rusSentence
      t.string :colorHash

      t.belongs_to :kind, index: true

      t.timestamps
    end
  end
end
