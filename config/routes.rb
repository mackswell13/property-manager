Rails.application.routes.draw do
  resource :session
  resources :passwords, param: :token
  get "inertia-example", to: "inertia_example#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check


  resources :holdings, only: [ :index, :show, :create, :update, :destroy ] do
    resources :address, only: [ :create, :update ]
    resources :units, only: [ :create, :update, :destroy ]
  end


  get "/hello", to: "assets#hello"

  get "/listings", to: "listings#show"
  # Defines the root path route ("/")
  root "dashboard#show"
end
