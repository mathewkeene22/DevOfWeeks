class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def voted?(election)
    election.votes.map(&:created_by).include? id
  end

  def is_birthday_week?
    if birthday.present?
      today = Date.today
      days_from_this_week = (today.at_beginning_of_week..today.at_end_of_week)
      days_from_this_week.include?(birthday) ? '🧁' : nil
    end
  end
end
