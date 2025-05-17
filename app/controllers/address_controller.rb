class AddressController < ApplicationController
  before_action :set_addressable

  def create
    address = @addressable.build_address(address_params)
    if address.save
      redirect_to @addressable, notice: "Address was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    address = @addressable.address
    if address.update(address_params)
      redirect_to @addressable, notice: "Address was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def set_addressable
    permitted_types = {
      "Holding" => Holding,
      "User" => User
    }

    klass = permitted_types[params[:addressable_type]]

    if klass.nil?
      return head :bad_request
    end

    @addressable = klass.find(params[:addressable_id])
  end

  def address_params
    params.require(:address).permit(
      :street_address, :unit, :city, :state, :postal_code, :country,
      :latitude, :longitude, :is_primary
    )
  end
end
