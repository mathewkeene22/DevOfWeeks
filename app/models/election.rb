class Election < ApplicationRecord
  has_many :votes, dependent: :destroy

  def format_votes
    votes.group(:nominee_id).count
  end
end
