class AddCreatedByToElection < ActiveRecord::Migration[6.0]
  def change
    add_column :elections, :created_by, :integer
    add_reference :elections, :created_by, index: true, foreign_key: { to_table: :users }
  end
end
