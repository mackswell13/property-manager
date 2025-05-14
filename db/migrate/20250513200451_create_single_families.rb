class CreateSingleFamilies < ActiveRecord::Migration[8.0]
  def change
    create_table :single_families do |t|
      t.timestamps
    end
  end
end
