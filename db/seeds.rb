User.destroy_all
WeeklySpending.destroy_all
Item.destroy_all


puts "all users destroyed"


puts "seeding users..."


user1 = User.create!(username: "dana", password_digest: "abc", icon: "https://cdn-icons-png.flaticon.com/512/3940/3940407.png")
user2 = User.create!(username: "sam", password_digest: "abcya", icon: "https://cdn-icons-png.flaticon.com/512/3940/3940446.png")
user3 = User.create!(username: "bali", password_digest: "boosta", icon: "https://cdn-icons-png.flaticon.com/128/3940/3940422.png")


puts "users seeded"


# puts "seeding weekly spending..."
# # WeeklySpending.create!(budget: , date: "", want_total: , need_total: , saved: , user_id: )
# WeeklySpending.create!(budget: 50, date: "September 1, 2023", want_total: 13, need_total: 7, saved: 30, user_id: 1)
# WeeklySpending.create!(budget: 65, date: "September 1, 2023", want_total: 26, need_total: 2, saved: 37, user_id: 3)
# WeeklySpending.create!(budget: 33, date: "September 3, 2023", want_total: 14, need_total: 5, saved: 14, user_id: 2)


# puts "spending seeded"


# puts "seeding items..."
# Item.create!(cost: 5, item: "food", need: true, date: "September 3, 2023", weekly_spending_id: 3, user_id: 2)
# Item.create!(cost: 14, item: "candy", need: false, date: "September 3, 2023", weekly_spending_id: 3, user_id: 2)
# Item.create!(cost: 13, item: "teddy bear", need: false, date: "September 1, 2023", weekly_spending_id: 1, user_id: 1)
# Item.create!(cost: 7, item: "gas", need: true, date: "September 1, 2023", weekly_spending_id: 1, user_id: 1)
# Item.create!(cost: 2, item: "kibble", need: true, date: "September 1, 2023", weekly_spending_id: 2, user_id: 3)
# Item.create!(cost: 26, item: "toys", need: false, date: "September 1, 2023", weekly_spending_id: 2, user_id: 3)
# puts "items seeded"
