class PokerTablesController < ApplicationController
  before_action :object_setter, only: :create

  def index
    @users = User.all
    if params[:refresh_chart]
      render partial: 'poker_tables/results'
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
end
