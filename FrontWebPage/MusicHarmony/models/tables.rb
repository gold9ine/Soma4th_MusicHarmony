class ImageUploader < CarrierWave::Uploader::Base
  storage :file

  def root
    'public/'
  end
end

class MusicUploader < CarrierWave::Uploader::Base
  storage :file

  def root
    'public/'
  end
end

class User < ActiveRecord::Base
  self.table_name = 'users'

  mount_uploader :PICTURE_PATH, ImageUploader
end

class Project < ActiveRecord::Base
  self.table_name = 'projects'

  mount_uploader :ALBUM_IMAGE_PATH, ImageUploader
end

class Meta < ActiveRecord::Base
  self.table_name = 'metas'
end

class Source < ActiveRecord::Base
  self.table_name = 'sources'

  mount_uploader :SOURCE_PATH, MusicUploader
end

class Reply < ActiveRecord::Base
  self.table_name = 'replies'
end
