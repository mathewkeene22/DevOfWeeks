class AddUserBirthday < ActiveRecord::Migration[6.0]
  def up
    add_column :users, :birthday, :date
  end
  def down
    remove_column :users, :birthday
  end
end
