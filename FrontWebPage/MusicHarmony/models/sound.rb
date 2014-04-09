class Sound < ActiveRecord::Base
  self.table_name = 'sounds'

  mount_uploader :SOUND_PATH, SoundUploader

  belongs_to :users, :counter_cache => true
  belongs_to :projects, :counter_cache => true

  has_many :metas

  validates :SOUND_PATH, :presence => true

  def self.latest
    order(:created_at => :desc)
  end
end