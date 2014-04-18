# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140325045650) do

  create_table "ajax_example", primary_key: "name", force: true do |t|
    t.integer "age",           null: false
    t.string  "sex", limit: 1, null: false
    t.integer "wpm",           null: false
  end

  create_table "comments", force: true do |t|
    t.integer  "PROJECT_NUM"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "PRI_USER_ID"
    t.text     "CONTENTS"
  end

  create_table "metas", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "SOURCE_NUM"
    t.integer  "SOUND_NUM"
  end

  create_table "projects", force: true do |t|
    t.integer  "GOOD_COUNT",       default: 0
    t.integer  "DOWNLOAD_COUNT",   default: 0
    t.integer  "PLAY_COUNT",       default: 0
    t.integer  "PLAY_TIME"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "ALBUM_IMAGE_PATH"
    t.text     "TITLE"
    t.text     "ARTIST"
    t.text     "PROJECT_INFO"
    t.integer  "META_NUM"
    t.integer  "PRI_USER_ID"
    t.text     "GENRE"
  end

  create_table "replies", force: true do |t|
    t.integer  "SOURCE_NUM"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "PRI_USER_ID"
    t.text     "CONTENTS"
  end

  create_table "sounds", force: true do |t|
    t.text     "PROJECT_NUM"
    t.text     "SOUND_PATH"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "PRI_USER_ID"
  end

  create_table "sources", force: true do |t|
    t.text     "SOURCE_PATH"
    t.integer  "PROJECT_NUM"
    t.text     "INSTRUMENT"
    t.integer  "PRI_USER_ID"
    t.integer  "PLAY_TIME"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "PLAY_COUNT",     default: 0
    t.integer  "DOWNLOAD_COUNT", default: 0
    t.integer  "GOOD_COUNT",     default: 0
    t.integer  "META_NUM"
    t.text     "TYPE"
    t.text     "OFFSET"
    t.text     "GENRE"
  end

  create_table "users", force: true do |t|
    t.text     "PASSWORD"
    t.text     "NAME"
    t.text     "EMAIL"
    t.text     "PART"
    t.text     "AFFILIATE_BAND"
    t.text     "PICTURE"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "INFO"
    t.text     "SALT"
  end

end
