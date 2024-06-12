import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export function matchPasswords(group: FormGroup): ValidationErrors | null {
    let password = group.controls['password'].value;
    let confirmPassword = group.controls['confirmPassword'].value;
    return password === confirmPassword ? null : { notMatching: true };
}
