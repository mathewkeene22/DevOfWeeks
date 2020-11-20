class Election < ApplicationRecord
  has_many :votes, dependent: :destroy
  validates :name, uniqueness: true, presence: true

  def format_votes
    formatted_votes = votes.where(is_seen: true).joins(:nominee).group('users.username').count
    formatted_votes.merge(votes.where(is_seen: true, nominee_id: nil).group(:write_in).count)
  end

end
