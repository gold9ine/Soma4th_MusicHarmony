class Meta < ActiveRecord::Base
  self.table_name = 'metas'

  has_many :sources
  has_many :sounds

  validates :id, :presence => true

end