class User < ApplicationRecord
    has_secure_password

    has_many :weekly_spendings
    has_many :items, through: :weekly_spendings
    validates :username, uniqueness: { case_sensitive: false }
end
