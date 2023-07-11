class WeeklySpending < ApplicationRecord
    belongs_to :user
    has_many :items, dependent: :destroy
    validates :date, uniqueness: { scope: :user_id }
    # validates :user, presence: true
end
