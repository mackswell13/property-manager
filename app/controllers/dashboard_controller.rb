class DashboardController < ApplicationController
  def show
    home = Current.user.areas.where(is_active: true).first
    holdings = Current.user.holdings


    render inertia: "Dashboard/Show", props: {
      home: home.as_json(only: %i[lat lng]),
      holdings: holdings.as_json(only: %i[id name lat lng])
    }
  end
end
