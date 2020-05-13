class ElectionChannel < ApplicationCable::Channel
  def subscribed
    election = Election.find params[:election_id]
    stream_for election
  end
end