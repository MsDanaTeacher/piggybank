class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :item
      t.integer :cost
      t.boolean :need
      t.string :date
      t.integer :weekly_spending_id
      t.integer :user_id

      t.timestamps
    end
  end
end
