class WeeklySpending < ApplicationRecord
    belongs_to :user
    has_many :items
    validates :date, uniqueness: { scope: :user_id }
end
