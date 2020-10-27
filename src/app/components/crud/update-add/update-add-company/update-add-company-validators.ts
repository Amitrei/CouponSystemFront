import { AdminService } from 'src/app/services/admin/admin.service';
import { map } from 'rxjs/operators';

import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, of, pipe } from 'rxjs';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function isNameAlreadyExists(adminservice: AdminService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (control.pristine) return of(null);

    return adminservice.isCompanyExistsByName(control.value).pipe(
      map((res) => {
        return res ? { nameExists: true } : null;
      })
    );
  };
}

export function isEmailAlreadyExists(adminservice: AdminService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (control.pristine) return of(null);

    return adminservice.isCompanyExistsByEmail(control.value).pipe(
      map((res) => {
        return res ? { emailExists: true } : null;
      })
    );
  };
}
