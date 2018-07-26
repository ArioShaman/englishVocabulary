json.array! @vocs do |voc|
  json.extract! voc, :id, :name, :color, :is_redact, :created_at
  json.cards_count voc.cards.count
  json.image voc.image.image
end