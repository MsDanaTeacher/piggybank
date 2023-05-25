class ItemsController < ApplicationController
    def create
        item = Item.create!(user_id: @user.id, weekly_spending_id: params[:weekly_spending_id], date: params[:date], need: params[:need], cost: params[:cost], item: params[:item])
        render json: item, status: :created
    end
    
end
