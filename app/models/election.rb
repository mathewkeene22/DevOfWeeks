class Election < ApplicationRecord
  has_many :votes, dependent: :destroy

  def format_votes
    votes.joins(:user).group('users.username').count
  end
end
