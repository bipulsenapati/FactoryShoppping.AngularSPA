export class Account {
  public UserId: number;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string ;
  public mobile: number;
  // tslint:disable-next-line: variable-name
  public profile_Image: string ;
  public gender: string;
  public RoleId: number ;
}

export class Address {
public adName: string;
public street: string;
public zipCode: string;
public city: string;
public state: string;
public adMobile: string;
public addressId: number;
}
