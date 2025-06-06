# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_05_18_170849) do
  create_table "addresses", force: :cascade do |t|
    t.string "street_address"
    t.string "unit"
    t.string "city"
    t.string "state"
    t.string "postal_code"
    t.string "country"
    t.string "addressable_type", null: false
    t.integer "addressable_id", null: false
    t.boolean "is_primary"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable"
  end

  create_table "areas", force: :cascade do |t|
    t.string "name"
    t.float "lat"
    t.float "lng"
    t.boolean "is_active"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_areas_on_user_id"
  end

  create_table "holdings", force: :cascade do |t|
    t.integer "user_id"
    t.decimal "lat", precision: 10, scale: 6
    t.decimal "lng", precision: 10, scale: 6
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "lat", "lng"], name: "index_holdings_on_user_id_and_lat_and_lng", unique: true
    t.index ["user_id", "name"], name: "index_holdings_on_user_id_and_name", unique: true
    t.index ["user_id"], name: "index_holdings_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "ip_address"
    t.string "user_agent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "units", force: :cascade do |t|
    t.string "name"
    t.integer "square_footage"
    t.integer "bedroom_count"
    t.integer "bathroom_count"
    t.integer "rental_rate"
    t.integer "status"
    t.integer "holding_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["holding_id"], name: "index_units_on_holding_id"
    t.index ["name", "holding_id"], name: "index_units_on_name_and_holding_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email_address", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email_address"], name: "index_users_on_email_address", unique: true
  end

  add_foreign_key "areas", "users"
  add_foreign_key "holdings", "users"
  add_foreign_key "sessions", "users"
  add_foreign_key "units", "holdings"
end
