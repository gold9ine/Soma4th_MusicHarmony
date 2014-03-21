class MusicUploader < CarrierWave::Uploader::Base
  storage :file

  def root
    'public/'
  end
end

class User < ActiveRecord::Base
  self.table_name = 'USERS'
end

class Project < ActiveRecord::Base
  self.table_name = 'PROJECTS'
end

class Meta < ActiveRecord::Base
  self.table_name = 'METAS'
end

class Source < ActiveRecord::Base
  self.table_name = 'SOURCES'
end

class Reply < ActiveRecord::Base
  self.table_name = 'REPLIES'
end
