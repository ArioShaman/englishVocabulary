class VocsController < ApplicationController
  before_action :authenticate_user!
  def index
    @vocs = current_user.vocs.order('created_at desc')
    @vocs
  end

  def create
    @voc = Voc.new(voc_params)
    if @voc.save
      @uservoc = Uservoc.new(user: current_user, voc: @voc)
      if @uservoc.save
        render json: @voc, status: :created
      else
        render json: @uservoc.errors, status: :unprocessable_entity
      end
    else
      render json: @voc.errors, status: :unprocessable_entity
    end
  end


  private
    def voc_params
      params.require(:voc).permit(:name, :color)
    end
end
