class CreateVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :votes do |t|
      t.references :election, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :nominee_id
      t.integer :created_by
      t.text :message
      t.timestamps
    end

    add_foreign_key :votes, :users, column: 'nominee_id'
    add_foreign_key :votes, :users, column: 'created_by'
  end
end
