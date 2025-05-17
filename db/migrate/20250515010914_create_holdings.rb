class CreateHoldings < ActiveRecord::Migration[8.0]
  def change
    create_table :holdings do |t|
      t.belongs_to :user, foreign_key: true
      t.decimal :lat
      t.decimal :lng
      t.string :name
      t.timestamps
    end
  end
end
