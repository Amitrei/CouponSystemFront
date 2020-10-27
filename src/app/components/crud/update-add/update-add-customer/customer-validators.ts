import { AdminService } from 'src/app/services/admin/admin.service';
import { map } from 'rxjs/operators';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';

export function isCustomerEmailAlreadyExists(
  adminservice: AdminService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (control.pristine) return of(null);

    return adminservice.isCustomerExistsByEmail(control.value).pipe(
      map((res) => {
        return res ? { emailExists: true } : null;
      })
    );
  };
}
