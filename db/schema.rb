# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_05_205748) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "elections", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "created_by"
    t.bigint "created_by_id"
    t.index ["created_by_id"], name: "index_elections_on_created_by_id"
    t.index ["name"], name: "index_elections_on_name", unique: true
  end

  create_table "icebreakers", force: :cascade do |t|
    t.string "question"
    t.boolean "is_asked", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "bid"
    t.date "birthday"
    t.date "work_anniversary"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "votes", force: :cascade do |t|
    t.bigint "election_id", null: false
    t.bigint "user_id", null: false
    t.integer "nominee_id"
    t.integer "created_by"
    t.text "message"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "is_seen", default: false
    t.text "write_in"
    t.index ["election_id"], name: "index_votes_on_election_id"
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "elections", "users", column: "created_by_id"
  add_foreign_key "votes", "elections"
  add_foreign_key "votes", "users"
  add_foreign_key "votes", "users", column: "created_by"
  add_foreign_key "votes", "users", column: "nominee_id"
end
