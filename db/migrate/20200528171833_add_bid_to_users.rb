class AddBidToUsers < ActiveRecord::Migration[6.0]
  def up
    add_column :users, :bid, :integer
  end
  def down
    remove_column :users, :bid
  end
end
