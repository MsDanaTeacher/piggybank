class Api::V1::AuthController < ApplicationController
    skip_before_action :authorized, only: [:create, :auto_login]

    def create
        @user = User.find_by(username: user_login_params[:username])
        if @user && @user.authenticate(user_login_params[:password])
            @token = encode_token({ user_id: @user.id })
            render json: { user: UserSerializer.new(@user), jwt: @token }, status: :accepted
        else
            render json: { message: 'Invalid username or password' }, status: :unauthorized
        end
    end

    # def auto_login
    #     @token = params[:token]
    #     decoded_token = JWT.decode(@token, 'my_s3cr3t', true, algorithm: 'HS256')
    #     user_id = decoded_token[0]['user_id']
    #     user = User.find(user_id)
    #     render json: user
    # end

    def auto_login
        token = request.headers['Authorization']&.split(' ')&.last
            if token
                begin
                decoded_token = JWT.decode(token, 'my_s3cr3t', true, algorithm: 'HS256')
                user_id = decoded_token[0]['user_id']
                user = User.find(user_id)
                render json: user
                rescue JWT::DecodeError
                render json: { error: 'Invalid token' }, status: :unauthorized
                end
            else
                render json: { error: 'Token missing' }, status: :unauthorized
            end
    end

    private

    def user_login_params
        params.permit(:username, :password)
    end
end
