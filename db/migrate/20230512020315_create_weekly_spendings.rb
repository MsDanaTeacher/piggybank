class CreateWeeklySpendings < ActiveRecord::Migration[7.0]
  def change
    create_table :weekly_spendings do |t|
      t.integer :budget
      t.string :date
      t.integer :want_total
      t.integer :need_total
      t.integer :saved
      t.integer :user_id

      t.timestamps
    end
  end
end
