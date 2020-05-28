Rails.application.routes.draw do
  devise_for :users

  root controller: :elections, action: :index

  resources :votes
  resources :poker_tables, only: %i[index]
  put 'poker_tables/clear_bids', to: 'poker_tables#clear_bids'
  post 'poker_tables/update_bid', to: 'poker_tables#update_bid'
  resources :elections
  resources :icebreakers, only: :index
  put 'update_all', to: 'icebreakers#update_all_questions'
end