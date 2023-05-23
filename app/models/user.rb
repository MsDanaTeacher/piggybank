class User < ApplicationRecord
    has_secure_password

    has_many :weekly_spendings
    has_many :items

    # validates :username, presence: true, uniqueness: true
    # validates :password, presence: true
end
