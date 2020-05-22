class VotesController < ApplicationController
  before_action :object_setter

  def create
    @vote = Vote.create(
      user: current_user,
      election: @election,
      message: params.dig(:vote, :message),
      nominee_id: params.dig(:vote, :nominee_id),
      write_in: params.dig(:vote, :write_in),
      created_by: current_user.id
    )
    ElectionChannel.broadcast_to @election, @vote
  end

  protected

  def object_setter
    @election = Election.find params.dig(:vote, :election_id)
  end
end
