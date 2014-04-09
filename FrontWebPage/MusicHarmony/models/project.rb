class Project < ActiveRecord::Base
  self.table_name = 'projects'

  mount_uploader :ALBUM_IMAGE_PATH, ImageUploader

  belongs_to :users, :counter_cache => true
  has_many :comments
  has_many :replies
  has_many :sounds
  has_many :sources

  validates :TITLE, :presence => true

  def self.latest
    order(:created_at => :desc)
  end
end