class VocsController < ApplicationController
  before_action :authenticate_user!
  def index
    @vocs = current_user.vocs.order('created_at desc')
    @vocs
  end
end
