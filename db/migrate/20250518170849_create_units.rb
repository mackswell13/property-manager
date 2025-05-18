class CreateUnits < ActiveRecord::Migration[8.0]
  def change
    create_table :units do |t|
      t.string :name
      t.integer :square_footage
      t.integer :bedroom_count
      t.integer :bathroom_count
      t.integer :rental_rate
      t.integer :status
      t.belongs_to :holding, null: false, foreign_key: true

      t.timestamps
    end


    add_index :units, [ :name, :holding_id ], unique: true
  end
end
