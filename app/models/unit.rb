class Unit < ApplicationRecord
  belongs_to :holding

  enum :status, [ :available, :rented, :application_pending ]
end
