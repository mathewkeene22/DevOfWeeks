class Election < ApplicationRecord
  has_many :votes, dependent: :destroy

  def format_votes
    formatted_votes = votes.where(is_seen: true).joins(:nominee).group('users.username').count
    formatted_votes.merge(votes.where(is_seen: true, nominee_id: nil).group(:write_in).count)
  end

  def allow_vote(current_user)
    votes.map(&:created_by).include? current_user.id
  end
end
