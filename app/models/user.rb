class User < ApplicationRecord
    has_many :weekly_spendings
    has_many :items, through: :weekly_spendings
end
