class DashboardController < ApplicationController
  def home
    render inertia: "Dashboard/Dashboard", props: {}
  end
end
