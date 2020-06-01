class PokerTableChannel < ApplicationCable::Channel
  def subscribed
    user = User.first
    stream_for user
  end
end