class ListingsController < ApplicationController
  allow_unauthenticated_access

  def index
    holdings = Holding.with_available_units

    render inertia: "Listings/Show", props: {
      holdings: holdings.as_json(only: %i[id name lat lng])
    }
  end


  def fetch_available_units
    puts "running"
    holding = Holding.find(params[:holding_id])
    available_units = holding.units.available

    render inertia: nil, props: {
      units: available_units.as_json(only: [ :name ])
    }, only: [ :units ]
  end
end
