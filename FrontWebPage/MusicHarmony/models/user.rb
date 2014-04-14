class User < ActiveRecord::Base
  self.table_name = 'users'

  mount_uploader :PICTURE_PATH, ImageUploader

  has_many :projects
  has_many :comments
  has_many :replies
  has_many :sources
  has_many :sounds  

  validates :NAME, :presence => true
  validates :EMAIL, :uniqueness => true

  validates :PASSWORD, :presence => true
  validates :SALT, :presence => true

  validates :PART, :presence => true

end