class Project < ActiveRecord::Base
  self.table_name = 'projects'

  mount_uploader :ALBUM_IMAGE_PATH, ImageUploader
end