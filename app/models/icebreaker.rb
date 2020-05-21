class Icebreaker < ApplicationRecord

  def self.get_icebreaker
    @icebreaker = Icebreaker.where(is_asked: false).sample
    @icebreaker.update(is_asked: true)
    @icebreaker
  end
end