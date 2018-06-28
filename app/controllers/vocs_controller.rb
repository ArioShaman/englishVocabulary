class VocsController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
  # before_action :authenticate_user!

  def index
    # auth_headers = JSON.parse(cookies[:auth_headers])
    @vocs = Voc.all.order('created_at desc')
  end
end
