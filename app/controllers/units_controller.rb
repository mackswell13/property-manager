class UnitsController < ApplicationController
  before_action :set_holding


  def create
    unit = @holding.units.new(holding_params)

    if unit.save
      redirect_to @holding
    end
  end

  private

  def set_holding
    @holding = Holding.find(params[:holding_id])
  end

  def holding_params
    params.require(:unit).permit(:name, :square_footage, :bedroom_count, :bathroom_count, :rental_rate, :status)
  end
end
