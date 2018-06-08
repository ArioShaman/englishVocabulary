class KindsController < ApplicationController
  before_action :set_kind, only: [:show]

  def index
    @kinds = Kind.all
  end
  def show
    render json: @kind
  end

  private
    def set_kind
      @kind = Kind.find(params[:id])
    end
end
