class AssetsController < ApplicationController
  def hello
    render "hello"
  end

  def create
    Rails.logger.info("Logging to Foreman")
    redirect_to root_path
  end
end
