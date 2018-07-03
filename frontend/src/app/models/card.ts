export class Card{
  public id:number;
  public eng:string;
  public rus:string;
  public rusSentence:string;
  public engSentence:string;
  public colorHash:string;
  public state = 'inactive';
  public selected = 'inactive';
  public kind_id:number;
}