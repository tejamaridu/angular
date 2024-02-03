export class Department {
  public uuid: string;
  public name: string;
  public head: string;

  constructor(uuid: string, name: string, head: string){
    this.uuid = uuid;
    this.name = name;
    this.head = head;
  }
}