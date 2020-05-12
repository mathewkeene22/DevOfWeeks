Rails.application.routes.draw do
  devise_for :users

  root controller: :elections, action: :index

  resources :votes
  resources :elections
end