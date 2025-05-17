class UpdateHoldingsIndexes < ActiveRecord::Migration[8.0]
  def change
    # Update holding indexs such that each users properties must have unique name
    # Update holding indexs such that each users properties must have a unique location
    remove_index :holdings, column: [ :user_id, :lat, :lng ], unique: true
    add_index :holdings, [ :user_id, :name ], unique: true
    add_index :holdings, [ :user_id, :lat, :lng ], unique: true
  end
end
