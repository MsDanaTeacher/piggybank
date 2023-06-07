class AddRatingToWeeklySpendings < ActiveRecord::Migration[7.0]
  def change
    add_column :weekly_spendings, :rating, :integer
  end
end
