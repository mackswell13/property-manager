class DashboardController < ApplicationController
  def show
    render inertia: "Dashboard/Show", props: { home: { lat: 40.7128, lng: -74.0060 } }
  end
end
