class CreateAssets < ActiveRecord::Migration[8.0]
  def change
    create_table :assets do |t|
      t.belongs_to :user
      t.decimal :lat
      t.decimal :lng
      t.string :name
      t.timestamps
    end
  end
end
