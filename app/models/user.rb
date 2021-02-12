class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def voted?(election)
    election.votes.map(&:created_by).include? id
  end

  def is_special_week?(election_date)
    special_icon = ""
    days_from_this_week = (election_date.at_beginning_of_week..election_date.at_end_of_week)
    if birthday.present?
      special_icon += days_from_this_week.include?(birthday.change(year: election_date.year)) ? "<span class='hoverable' title=#{birthday&.strftime('%e-%b')}>🧁</span>" : ""
    end
    if work_anniversary.present?
      special_icon += days_from_this_week.include?(work_anniversary.change(year: election_date.year)) ? "<span class='hoverable' title=#{work_anniversary&.strftime(' %v')}>🎉</span>" : ""
    end
  end
end
