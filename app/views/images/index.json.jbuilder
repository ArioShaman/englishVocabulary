json.array! @images do |image|
  json.extract! image, :id, :is_default
  json.image image.image.url
end