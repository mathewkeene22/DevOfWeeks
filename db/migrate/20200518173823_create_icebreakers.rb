class CreateIcebreakers < ActiveRecord::Migration[6.0]
  def up
    create_table :icebreakers do |t|
      t.string :question
      t.boolean :is_asked, default: false, null: false
      t.timestamps
    end
  end
  def down
    drop_table :icebreakers
  end
end
