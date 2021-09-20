class PokerTablesController < ApplicationController
  before_action :object_setter, only: :create

  def index
    @users = User.all
    @show_cards = params[:show_cards].presence || ''
    @average = @show_cards.present? ? User.average('bid')&.round : ''
    if params[:refresh_chart]
      html = view_context.render partial: 'poker_tables/results'
      data = {
        html: html,
        special_animation: 'allButOne'
      }
      render json: data.to_json
    end
  end

  def special_animation
    compact = User.all.map(&:bid).compact
    compact_unique = compact.uniq
    # ruby 2.7 has Array.tally which will be nice.
    tally = compact.group_by(&:itself).transform_values(&:count)

    return 'allDifferent' if compact_unique.size == compact.size
    return 'allButOne' if (compact.size > 2 && compact_unique.size == 2) && (tally[compact.first] == 1 || tally[compact.second] == 1)
    return 'isUnanimous' if compact_unique.size == 1
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
