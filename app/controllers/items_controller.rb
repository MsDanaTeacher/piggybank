class ItemsController < ApplicationController
    def index
        items = Item.where(user_id: @user.id, weekly_spending_id: params[:weekly_spending_id]).to_a
        render json: items
    end

    def create
        item = Item.create!(user_id: @user.id, weekly_spending_id: params[:weekly_spending_id], date: params[:date], need: params[:need], cost: params[:cost], item: params[:item])
        render json: item, status: :created
    end
    
    def destroy
        item = Item.find(params[:id])
        item.destroy!
    end
end
