class ApplicationController < ActionController::API
    def authenticate_user!
        token = request.headers['Authorization']&.split(' ')&.last
        payload = JsonWebToken.decode(token)
        @current_user = User.find(payload['user_id'])
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    
      def current_user
        @current_user
      end
end
