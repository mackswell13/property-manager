class Holding < ApplicationRecord
  belongs_to :user

  has_one :address, as: :addressable, dependent: :destroy
  has_many :units, dependent: :destroy
end
