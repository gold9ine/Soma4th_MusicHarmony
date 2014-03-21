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

ActiveRecord::Schema.define(version: 20140321023751) do

  create_table "metas", force: true do |t|
    t.integer "META_NUM"
  end

  create_table "projects", force: true do |t|
    t.integer  "PROJECT_NUM"
    t.integer  "GOOD_COUNT"
    t.integer  "DOWNLOAD_COUNT"
    t.integer  "PLAY_COUNT"
    t.integer  "PLAY_TIME"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "ALBUM_IMAGE_PATH"
    t.text     "TITLE"
    t.text     "ARTIST"
    t.text     "PROJECT_INFO"
    t.integer  "META_NUM"
    t.integer  "SOURCE_NUM"
    t.text     "USER_ID"
    t.text     "GENRE"
  end

  create_table "replies", force: true do |t|
    t.integer  "COMMENT_NUM"
    t.integer  "PROJECT_NUM"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "WRITE_USER_ID"
    t.text     "CONTENTS"
  end

  create_table "sources", force: true do |t|
    t.integer  "SOURCE_NUM"
    t.text     "SOURCE_PATH"
    t.integer  "PROJECT_NUM"
    t.text     "INSTRUMENT"
    t.text     "USER_ID"
    t.integer  "PLAY_TIME"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "PLAY_COUNT"
    t.integer  "GOOD_COUNT"
    t.integer  "META_NUM"
    t.text     "OFFSET"
    t.text     "GENRE"
  end

  create_table "users", force: true do |t|
    t.text     "USER_ID"
    t.text     "USER_PASSWORD"
    t.text     "NICKNAME"
    t.text     "EMAIL"
    t.text     "PART"
    t.text     "AFFILIATE_BAND"
    t.text     "PICTURE_PATH"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "INFO"
  end

end
