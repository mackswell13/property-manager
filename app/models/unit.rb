class Unit < ApplicationRecord
  belongs_to :holding

  enum status: { available: 0, rented: 1, application_pending: 2 }
end
