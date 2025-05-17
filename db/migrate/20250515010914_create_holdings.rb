class CreateHoldings < ActiveRecord::Migration[8.0]
  def change
    create_table :holdings do |t|
      t.belongs_to :user, foreign_key: true
      t.decimal :lat, precision: 10, scale: 6 # common for GPS cords
      t.decimal :lng, precision: 10, scale: 6
      t.string :name
      t.timestamps
    end


    add_index :holdings, [ :user_id, :lat, :lng ], unique: true
  end
end
