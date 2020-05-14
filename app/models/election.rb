class Election < ApplicationRecord
  has_many :votes, dependent: :destroy

  def format_votes
    votes.joins(:nominee).group("users.username").count
  end
end
