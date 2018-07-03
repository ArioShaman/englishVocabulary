class CardsController < ApplicationController
  before_action :set_card, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def index
    @voc = Voc.find(params[:voc_id])
    list = @voc.users
    if list.include?(current_user)
      @cards = @voc.cards.order('created_at desc')
      return @cards
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @card
  end

  # POST /cars
  def create
    @card = Card.new(card_params)
    @card.voc_id = params[:voc_id]
    if @card.save
      render json: @card, status: :created, location: @card
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cars/1
  def update
    if @card.update(card_params)
      render json: @card
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cars/1
  def destroy
    @card.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      @card = Voc.find(params[:voc_id]).cards.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def card_params
      params.require(:card).permit(:eng, :rus, :engSentence, :rusSentence, :colorHash, :kind_id, :voc_id)
    end
end
