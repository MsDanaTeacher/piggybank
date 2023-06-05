class WeeklySpendingSerializer < ActiveModel::Serializer
  attributes :id, :budget, :date, :want_total, :need_total, :saved, :user_id
  has_many :items
end
