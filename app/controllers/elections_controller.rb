class ElectionsController < ApplicationController
  before_action :object_setter

  def index
    @elections = Election.all
  end

  def show
    @vote = Vote.new election: @election
    @votes = @election.votes.includes(:user)
    if params[:refresh_chart]
      render partial: 'elections/chart'
    end
  end

  def show_all_votes
    @election.votes.update_all(is_seen: true)
    redirect_to @election
  end

  def new
    @election = Election.new
  end

  def create
    @election = Election.new(permitted_parameters.merge!(created_by: current_user.id))
    if @election.save
      flash[:success] = "Election #{@election.name} was created successfully"
      redirect_to elections_path
    else
      flash[:errors] = @election.errors.messages
      render :new
    end
  end

  def edit
  end

  def update
    if @election.update_attributes(permitted_parameters)
      flash[:success] = "Election #{@election.name} was updated successfully"
      redirect_to elections_path
    else
      render :new
    end
  end

  private

  def object_setter
    @elections = Election.all
    @election = Election.find(params[:id]) if params[:id]
  end

  def permitted_parameters
    params.require(:election).permit(:name)
  end
end
