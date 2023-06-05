class ItemSerializer < ActiveModel::Serializer
  attributes :id, :item, :cost, :need, :date, :weekly_spending_id, :user_id

end
