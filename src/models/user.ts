export const userobj = {
  1: {
    name: 'haha',
    age: 11,
  },
  2: {
    name: 'haha1',
    age: 12,
  },
};

export class User {
  public static create(id: string) {
    return new User(id);
  }

  protected constructor(
    id: string,
    public readonly nickName: string = userobj[id].name,
    public readonly age: number = userobj[id].age,
  ) {}
}
