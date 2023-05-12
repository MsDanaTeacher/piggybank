Rails.application.routes.draw do
  # get '/hello', to: 'application#hello_world'
  # setting up a custom route in our Rails application, and handle any requests that come through that aren't requests for our API routes by returning the public/index.html file instead
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
