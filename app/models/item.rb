class Item < ApplicationRecord
    belongs_to :weekly_spending
    belongs_to :user

    validates :cost, :item, :need, presence: true
end
