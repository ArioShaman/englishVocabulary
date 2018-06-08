json.array! @cards do |card|
  json.extract! card, :id, :eng, :rus, :engSentence, :rusSentence, :colorHash
  json.kind card.kind
end