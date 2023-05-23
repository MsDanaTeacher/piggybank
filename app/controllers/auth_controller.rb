# require_relative './lib/json_web_token'

# class AuthController < ApplicationController
#     def login
#         user = User.find_by(username: params[:username])
    
#         if user&.authenticate(params[:password])
#           token = JsonWebToken.encode(user_id: user.id)
#           render json: { token: token }
#         else
#           render json: { error: 'Invalid username or password' }, status: :unauthorized
#         end
#       end
# end