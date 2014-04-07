class Source < ActiveRecord::Base
  self.table_name = 'sources'

  mount_uploader :SOURCE_PATH, SoundUploader
end