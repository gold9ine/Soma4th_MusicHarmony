class Reply < ActiveRecord::Base
  self.table_name = 'replies'

  belongs_to :users, :counter_cache => true
  belongs_to :sources, :counter_cache => true

  validates :CONTENTS, :presence => true

  def self.latest
    order(:created_at => :desc)
  end
end