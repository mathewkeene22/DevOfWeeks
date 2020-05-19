class IcebreakersController < ApplicationController
  def index
    available_questions = Icebreaker.where(is_asked: false)
    if available_questions.count != 0
      @icebreaker = Icebreaker.get_icebreaker
    end
    render :index
  end

  def update_all_questions
    if Icebreaker.all.size != 0
      Icebreaker.update_all(is_asked: false)
    end
    redirect_to "/"
  end
end