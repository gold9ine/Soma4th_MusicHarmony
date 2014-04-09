class Source < ActiveRecord::Base
  self.table_name = 'sources'

  mount_uploader :SOURCE_PATH, SoundUploader

  belongs_to :users, :counter_cache => true
  belongs_to :projects, :counter_cache => true

  has_many :replies
  has_many :metas

  validates :SOURCE_PATH, :presence => true

  def self.latest
    order(:created_at => :desc)
  end
end