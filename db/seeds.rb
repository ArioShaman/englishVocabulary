# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Kind.create!({name: 'food'})

Card.create!([
  {eng: 'outta(out + of)', rus: 'отсюда' , engSentence: 'Get outta here', rusSentence: 'Иди отсюда прочь', colorHash: '#A3FF8A'},
  {eng: 'gimme(give + me)', rus: 'дай' , engSentence: 'Gimme a break gimme', rusSentence: 'Дай мне отдохнуть', colorHash: '#94CCFF'},
  {eng: "dunno (doesn't/don't + know)", rus: 'не знаю' , engSentence: ' I dunno what to do', rusSentence: 'Я не знаю что делать', colorHash: '#C55E59'},
])


