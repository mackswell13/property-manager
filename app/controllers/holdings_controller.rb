class HoldingsController < ApplicationController
  before_action :check_user, only: [ :update, :destroy ]

  def index
    holdings = Current.user.holdings


    render inertia: "Dashboard/Show", props: {
      holdings: holdings.as_json(only: %i[id name lat lng])
    }
  end

  def show
    holding = Holding.find(params[:id])

    if holding.user == Current.user
     render inertia: "Holding/Show", props: {
        holding: holding.as_json(only: %i[id name lat lng]),
        address: holding.address&.as_json(only: %i[id street_address city state postal_code country]),
        units: holding.units.as_json(only: [ :id, :name, :square_footage, :bedroom_count, :bathroom_count, :rental_rate, :status ])
      }
    else
      redirect_to root_path, alert: "you are not authorized to view this holding"
    end
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

  def check_user
    @holding = Holding.find_by(id: params[:id])

    unless @holding && @holding.user == Current.user
      flash[:alert] = "You are not authorized to access this holding."
      redirect_to root_path
    end
  end

  def holding_params
    params.require(:holding).permit(:name, :lat, :lng)
  end
end
