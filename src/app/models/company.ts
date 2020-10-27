import { Coupon } from 'src/app/models/coupon';
export class Company {
  public id: number;
  public name?: string;
  public email?: string;
  public password?: string;
  public coupons?: Coupon[];
}
