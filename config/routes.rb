Rails.application.routes.draw do
  devise_for :users

  root controller: :elections, action: :index

  resources :votes
  resources :poker_tables, only: %i[index]
  post 'poker_tables/clear_bids', to: 'poker_tables#clear_bids'
  post 'poker_tables/update_bid', to: 'poker_tables#update_bid'
  post 'poker_tables/flip_cards', to: 'poker_tables#flip_cards'
  resources :elections
  post 'elections/show_all_votes/:id', to: 'elections#show_all_votes'
  resources :icebreakers, only: :index
  put 'update_all', to: 'icebreakers#update_all_questions'
end