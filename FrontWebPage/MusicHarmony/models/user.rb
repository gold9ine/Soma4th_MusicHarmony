class User < ActiveRecord::Base
  self.table_name = 'users'

  mount_uploader :PICTURE_PATH, ImageUploader

  has_many :projects
  has_many :comments
  has_many :replies
  has_many :sources
  has_many :sounds  

  validates :PART, :presence => true

  def self.latest
    order(:created_at => :desc)
  end
end