class HoldingsController < ApplicationController
  def index
    holdings = Current.user.holdings


    render inertia: "Dashboard/Show", props: {
      holdings: holdings.as_json(only: %i[id name lat lng])
    }
  end


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

  def destroy
    holding = Holding.find(params[:id])

    if holding.user == Current.user
      holding.destroy
      redirect_to root_path, notice: "Holding was successfully deleted."
    else
      redirect_to root_path, alert: "You are not authorized to delete this holding."
    end
  end


  private

  def holding_params
    params.require(:holding).permit(:name, :lat, :lng)
  end
end
