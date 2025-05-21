class ListingsController < ApplicationController
  allow_unauthenticated_access

  def index
    holdings = Holding.with_available_units

    render inertia: "Listings/Show", props: {
      holdings: holdings.as_json(only: %i[id name lat lng])
    }
  end

  def fetch_available_units
    holding = Holding.find(params[:holding_id])
    available_units = holding.units.available

    render json: { units: available_units.as_json(only: [ :name, :rental_rate ]) }
  end
end
