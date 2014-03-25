class DatabaseCreate < ActiveRecord::Migration
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
      t.integer :GOOD_COUNT, :default => 0
      t.integer :DOWNLOAD_COUNT, :default => 0
      t.integer :PLAY_COUNT, :default => 0
      t.integer :PLAY_TIME
      t.timestamps :UPLOAD_DATE
      t.text :ALBUM_IMAGE_PATH
      t.text :TITLE
      t.text :ARTIST
      t.text :PROJECT_INFO
      t.integer :META_NUM
      t.integer :PRI_USER_ID
      t.text :GENRE
    end
    create_table :sources do |t|
      t.text :SOURCE_PATH
      t.integer :PROJECT_NUM
      t.text :INSTRUMENT
      t.integer :PRI_USER_ID
      t.integer :PLAY_TIME
      t.timestamps :UPLOAD_DATE
      t.integer :PLAY_COUNT, :default => 0
      t.integer :DOWNLOAD_COUNT, :default => 0
      t.integer :GOOD_COUNT, :default => 0
      t.integer :META_NUM
      t.text :TYPE
      t.text :OFFSET
      t.text :GENRE
    end
      create_table :replies do |t|
      t.integer :SOURCE_NUM
      t.timestamps :UPLOAD_DATE
      t.integer :PRI_USER_ID
      t.text :CONTENTS
    end
      create_table :comments do |t|
      t.integer :PROJECT_NUM
      t.timestamps :UPLOAD_DATE
      t.integer :PRI_USER_ID
      t.text :CONTENTS
    end
      create_table :metas do |t|
      t.timestamps :UPLOAD_DATE
      t.integer :SOURCE_NUM
      t.integer :SOUND_NUM
    end
      create_table :sounds do |t|
      t.text :PROJECT_NUM
      t.text :SOUND_PATH
      t.timestamps :UPLOAD_DATE
      t.integer :PRI_USER_ID
    end
  end
end


