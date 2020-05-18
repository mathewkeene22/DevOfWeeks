class IcebreakersController < ApplicationController
  def index
    available_questions = Icebreaker.where(is_asked: false)
    if available_questions.count != 0
      @icebreaker = Icebreaker.get_icebreaker
    end
    render :index
  end
end