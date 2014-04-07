class SoundUploader < CarrierWave::Uploader::Base
  storage :file

  def root
    'public/'
  end
end