class ApplicationController < ActionController::API
    def hello_world
       
        render json: "hello world"
      end
end
