class Vote < ApplicationRecord
  belongs_to :election
  belongs_to :user
  belongs_to :nominee, class_name: 'User'
end
