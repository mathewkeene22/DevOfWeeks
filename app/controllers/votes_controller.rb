class VotesController < ApplicationController
  before_action :object_setter

  def create
    # byebug
    @vote = Vote.create(
      user: current_user,
      election: @election,
      message: params.dig(:vote, :message),
      nominee_id: params.dig(:vote, :nominee_id),
      created_by: current_user.id
    )
    ElectionChannel.broadcast_to @election, @vote
  end

  protected

  def object_setter
    @election = Election.find params.dig(:vote, :election_id)
  end
end
