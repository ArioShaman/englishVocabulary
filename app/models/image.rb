class Image < ApplicationRecord
  mount_uploader :image, ImageUploader
  has_many :vocs, foreign_key: "image_id"
end
