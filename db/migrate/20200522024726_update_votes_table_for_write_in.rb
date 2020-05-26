class UpdateVotesTableForWriteIn < ActiveRecord::Migration[6.0]
  def up
    change_column_null :votes, :nominee_id, true
    add_column :votes, :write_in, :text
  end

  def down
    change_column_null :votes, :nominee_id, false
    remove_column :votes, :write_in, :text
  end
end
