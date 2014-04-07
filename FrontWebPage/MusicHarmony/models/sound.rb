class Sound < ActiveRecord::Base
  self.table_name = 'sounds'

  mount_uploader :SOUND_PATH, SoundUploader
end