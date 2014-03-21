class Mh < ActiveRecord::Migration
def change
    create_table :users do |t|
      t.text :USER_ID
      t.text :USER_PASSWORD
      t.text :NICKNAME
      t.text :EMAIL
      t.text :PART
      t.text :AFFILIATE_BAND
      t.text :PICTURE_PATH
      t.timestamps :SIGNUP_DATE
      t.text :INFO
    end
    create_table :projects do |t|
      t.integer :PROJECT_NUM
      t.integer :GOOD_COUNT
      t.integer :DOWNLOAD_COUNT
      t.integer :PLAY_COUNT
      t.integer :PLAY_TIME
      t.timestamps :UPLOAD_DATE
      t.text :ALBUM_IMAGE_PATH
      t.text :TITLE
      t.text :ARTIST
      t.text :PROJECT_INFO
      t.integer :META_NUM
      t.integer :SOURCE_NUM
      t.text :USER_ID
      t.text :GENRE
    end
    create_table :sources do |t|
      t.integer :SOURCE_NUM
      t.text :SOURCE_PATH
      t.integer :PROJECT_NUM
      t.text :INSTRUMENT
      t.text :USER_ID
      t.integer :PLAY_TIME
      t.timestamps :UPLOAD_DATE
      t.integer :PLAY_COUNT
      t.integer :GOOD_COUNT
      t.integer :META_NUM
      t.text :OFFSET
      t.text :GENRE
    end
      create_table :replies do |t|
      t.integer :COMMENT_NUM
      t.integer :PROJECT_NUM
      t.timestamps :UPLOAD_DATE
      t.text :WRITE_USER_ID
      t.text :CONTENTS
    end
      create_table :metas do |t|
      t.integer :META_NUM
    end
  end
end

