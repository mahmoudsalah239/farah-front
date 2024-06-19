import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export function mustMatch(password: string, confirmPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const passControl = formGroup.controls[password];
    const confirmPassControl = formGroup.controls[confirmPassword];

    if (confirmPassControl.errors && !confirmPassControl.errors['mustMatch']) {
      return null;
    }

    if (passControl.value !== confirmPassControl.value) {
      confirmPassControl.setErrors({ mustMatch: true });
    } else {
      confirmPassControl.setErrors(null);
    }

    return null;
  };
}
