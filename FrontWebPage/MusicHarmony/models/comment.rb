class Comment < ActiveRecord::Base
  self.table_name = 'comments'

  belongs_to :users, :counter_cache => true
  belongs_to :projects, :counter_cache => true

  validates :CONTENTS, :presence => true

  def self.latest
    order(:created_at => :desc)
  end
end