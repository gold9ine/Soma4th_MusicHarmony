class ImageUploader < CarrierWave::Uploader::Base
  storage :file

  def root
    'public/'
  end
end