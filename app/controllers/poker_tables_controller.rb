class PokerTablesController < ApplicationController
  before_action :object_setter, only: :create

  def index
    @users = User.all
    @show_cards = params[:show_cards].presence || ''
    # binding.pry
    if params[:refresh_chart]
      render partial: 'poker_tables/results' #, locals: { show_cards: @show_cards }
    end
  end

  def update_bid
    current_user.update(bid: params[:poker_table][:bid])
    PokerTableChannel.broadcast_to User.first, User.all
  end

  def clear_bids
    User.update_all(bid: nil)
    PokerTableChannel.broadcast_to User.first, User.all
  end

  def flip_cards
    @users = User.all
    # binding.pry
    @show_cards = params[:show_cards].presence || ''
    render partial: 'poker_tables/results', locals: { show_cards: @show_cards }
    PokerTableChannel.broadcast_to User.first, flip_cards: true
  end
end
