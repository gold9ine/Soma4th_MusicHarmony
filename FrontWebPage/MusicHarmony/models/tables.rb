class ImageUploader < CarrierWave::Uploader::Base
  storage :file

  def root
    'public/'
  end
end

class SourceUploader < CarrierWave::Uploader::Base
  storage :file

  def root
    'public/'
  end
end

class SoundUploader < CarrierWave::Uploader::Base
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

  mount_uploader :SOURCE_PATH, SourceUploader
end

class Reply < ActiveRecord::Base
  self.table_name = 'replies'
end
