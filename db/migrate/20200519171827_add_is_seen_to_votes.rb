class AddIsSeenToVotes < ActiveRecord::Migration[6.0]
  def up
    add_column :votes, :is_seen, :bool, default: false
  end
  def down
    remove_column :votes, :is_seen, :bool
  end
end
