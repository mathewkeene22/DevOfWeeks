class IcebreakersController < ApplicationController
  def index
    available_questions = Icebreaker.where(is_asked: false)
    if available_questions.count != 0
      @icebreaker = Icebreaker.get_icebreaker
    end
    render :index
  end

  def update_all_questions
    Icebreaker.update_all(is_asked: false)
    redirect_to "/"
  end
end