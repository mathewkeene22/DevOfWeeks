class Election < ApplicationRecord
  has_many :votes, dependent: :destroy

  def format_votes
    votes.where(is_seen: true).joins(:nominee).group("users.username").count
  end

  def allow_vote(current_user)
    votes.map(&:created_by).include? current_user.id
  end
end
