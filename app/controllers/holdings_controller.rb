class HoldingsController < ApplicationController

  def create
    Rails.logger.info("Logging to Foreman")
    redirect_to root_path
  end
end
