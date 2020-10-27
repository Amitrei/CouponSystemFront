import { Coupon } from 'src/app/models/coupon';
export class Customer {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public coupons: Coupon[];

  constructor() {}
}
