class CreateElections < ActiveRecord::Migration[6.0]
  def change
    create_table :elections do |t|
      t.string :name

      t.timestamps
    end
    add_index :elections, :name, unique: true
  end
end
