class Election < ApplicationRecord
  has_many :votes, dependent: :destroy
end
