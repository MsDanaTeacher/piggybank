class AddRatingToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :rating, :integer
  end
end
