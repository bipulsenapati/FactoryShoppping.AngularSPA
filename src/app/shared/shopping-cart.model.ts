export class ShoppingCart {
  public PId: number;
  public UserId: number;
  public price: number;
  public orderQuantity: number;
  public CartDate: Date;
  public amount: number;
  public productName: string ;
  public productImage: string ;
  public cartId: number;
}

export class Checkout{
  public UserId: number;
  public subTotal: number;
  public cartTotal: number;
  public shipping: number;
  public AdName: string;
  public Street: string;
  public ZipCode: string;
  public City: string;
  public State: string;
  public AdMobile: string;
}


