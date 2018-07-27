Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  
  # resources :cards
  resources :images, only: [:index]
  resources :kinds
  resources :vocs, only: [:index, :create] do
    resources :cards, only: [:index, :create, :destroy, :update]
  end
  resources :cards, only: [:update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
