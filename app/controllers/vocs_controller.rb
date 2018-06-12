class VocsController < ApplicationController
  # before_action :authenticate_user!

  def index
    @vocs = Voc.all
  end
end
