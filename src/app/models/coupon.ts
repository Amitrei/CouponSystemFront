import { Company } from './company';

export class Coupon {
  public id: number;
  public companyName?: string;
  public idOfCompany?: number;
  public category: string;
  public company?: Company;
  public title: string;
  public description: string;
  public start_date: string;
  public end_date: string;
  public amount: number;
  public price: number;
  public image: string;
}
