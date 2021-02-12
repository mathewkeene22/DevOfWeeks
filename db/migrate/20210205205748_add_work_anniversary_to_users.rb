class AddWorkAnniversaryToUsers < ActiveRecord::Migration[6.0]
  def up
    add_column :users, :work_anniversary, :date
  end
  def down
    remove_column :users, :work_anniversary
  end
end
