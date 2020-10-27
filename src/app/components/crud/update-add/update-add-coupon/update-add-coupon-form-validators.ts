import { CompanyService } from './../../../../services/company/company.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export class UpdateCouponValidators {
  static cannotBeUnderZero(control: AbstractControl): ValidationErrors | null {
    if (control.value <= 0 && control.value) {
      return {
        cannotBeUnderZero: true,
      };
    }
  }

  static dateFormatValidator(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'DD-MM-YYYY', true).isValid()) {
      return { dateFormatValidator: true };
    }
    return null;
  }

  static dateValidator(AC: AbstractControl) {
    if (
      AC &&
      AC.value &&
      moment(AC.value, 'DD-MM-YYYY', true).isBefore(moment().subtract(1, 'days'))
    ) {
      return { dateValidator: true };
    }
    return null;
  }
}

export function isCouponExistsByTitle(companyService: CompanyService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (control.pristine) return of(null);

    return companyService.isCouponExistsByTitle(control.value).pipe(
      map((res) => {
        return res ? { titleExists: true } : null;
      })
    );
  };
}
