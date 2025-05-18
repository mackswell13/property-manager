class ListingsController < ApplicationController
  allow_unauthenticated_access

  def show
    holdings = Holding.with_available_units

    render inertia: "Listings/Show", props: {
      holdings: holdings.as_json(only: %i[id name lat lng])
    }
  end


  def fetch_available_units
    holding = Holding.find(params[:holding_id])
    available_units = holding.units.available

    render inertia: "Units/Popup", props: {
      holding: holding,
      available_units: available_units
    }
  end
end
