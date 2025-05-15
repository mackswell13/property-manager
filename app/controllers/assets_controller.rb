class AssetsController < ApplicationController
  allow_unauthenticated_access


  def create
    puts "running"
    puts params.inspect

    redirect_to root_path
  end
end
