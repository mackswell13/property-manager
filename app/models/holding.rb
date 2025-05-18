class Holding < ApplicationRecord
  belongs_to :user

  has_one :address, as: :addressable, dependent: :destroy
  has_many :units, dependent: :destroy

  scope :with_available_units, -> {
    joins(:units).where(units: { status: :available }).distinct
  }
end
