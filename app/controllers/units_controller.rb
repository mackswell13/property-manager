class UnitsController < ApplicationController
  before_action :set_holding


  def create
    unit = @holding.units.new(unit_params)

    if unit.save
      redirect_to @holding
    end
  end


  def update
    unit = @holding.units.find(params[:id])
    if unit.update(unit_params)
      redirect_to @holding
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def set_holding
    @holding = Holding.find(params[:holding_id])
  end

  def unit_params
    params.require(:unit).permit(:name, :square_footage, :bedroom_count, :bathroom_count, :rental_rate, :status)
  end
end
