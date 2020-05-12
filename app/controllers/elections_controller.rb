class ElectionsController < ApplicationController
  def index
    @elections = Election.all
  end

  def new
    @election = 'foo'
  end
end
