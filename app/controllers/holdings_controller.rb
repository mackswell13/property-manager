class HoldingsController < ApplicationController
  def create
    holding = Current.user.holdings.build(holding_params)

    if holding.save
      redirect_to root_path
    end
  end

  def update
    holding = Holding.find(params[:id])

    if holding.update(holding_params)
      redirect_to root_path
    end
  end


  private

  def holding_params
    params.require(:holding).permit(:name, :lat, :lng)
  end
end
