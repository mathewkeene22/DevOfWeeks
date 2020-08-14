class Vote < ApplicationRecord
  belongs_to :election
  belongs_to :user
  belongs_to :nominee, class_name: 'User', optional: true

  validates :nominee_id, presence: true, unless: -> { write_in.present? }
  validates :write_in, presence: true, unless: -> { nominee_id.present? }

  scope :visable, -> { where(is_seen: true).order(updated_at: :desc) }
  scope :hidden, -> { where(is_seen: false) }

  def nominee_name
    nominee.present? ? nominee.username : write_in
  end
end
