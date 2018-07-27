class ImagesController < ApplicationController
  # before_action :authenticate_user!

  def index
    @images = Image.all.order('created_at desc')
    @images
  end  
end
