class WeeklySpendingsController < ApplicationController
    def index
        all_spendings = WeeklySpending.where(user_id: @user.id)
        render json: all_spendings
    end

    def show
        spending = WeeklySpending.find(params[:id])
        render json: spending
    end

    def create
        weekly_spending = WeeklySpending.create!(user_id: @user.id, budget: params[:budget], date: params[:date], saved: params[:budget])
        render json: weekly_spending, status: :created
    end

    def update
        weekly_spending_update = WeeklySpending.find(params[:id])
        weekly_spending_update.update!(want_total: params[:want_total], need_total: params[:need_total], saved: params[:saved])
        render json: weekly_spending_update
    end

    def destroy
        spending_to_delete = WeeklySpending.find(params[:id])
        spending_to_delete.destroy!
    end
end
