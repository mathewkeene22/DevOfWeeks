class PokerTablesController < ApplicationController
  before_action :object_setter, only: :create

  def index
    @users = User.all
    @show_cards = params[:show_cards].presence || ''
    @average = @show_cards.present? ? User.average('bid')&.round : ''
    if params[:refresh_chart]
      is_unanimous = User.all.map(&:bid).compact.uniq.size == 1
      html = view_context.render partial: 'poker_tables/results'
      data = {
        html: html,
        is_unanimous: is_unanimous
      }
      render json: data.to_json
    end
  end

  def update_bid
    current_user.update(bid: params[:poker_table][:bid])
    PokerTableChannel.broadcast_to User.first, User.all
  end

  def clear_bids
    User.update_all(bid: nil)
    PokerTableChannel.broadcast_to User.first, User.all
    render partial: 'poker_tables/results'
  end

  def flip_cards
    PokerTableChannel.broadcast_to User.first, flip_cards: true
  end
end
