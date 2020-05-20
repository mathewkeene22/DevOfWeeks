Rails.application.routes.draw do
  devise_for :users

  root controller: :elections, action: :index

  resources :votes
  resources :elections
  resources :icebreakers, only: :index
  put 'update_all', to: 'icebreakers#update_all_questions'
end