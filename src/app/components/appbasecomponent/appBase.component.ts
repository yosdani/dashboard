import {AbstractControl, FormGroup} from '@angular/forms';
import {DefaultImage} from '../../enums';
import {environment} from '../../../environments/environment';

export class AppBaseComponent {

    // declarations passed to components like their own variables (with this.)

    isDevelopment = (): boolean => {
        return window.location.hostname.includes('localhost') || window.location.hostname.includes('dc0') ? true : false;
    }

    openBlankPage = (url: string): void => {
        window.open(url, '_blank');
    }

    customRound = (value: number, digits: number): number => {
        const base = Math.pow(10, digits);
        const entire = Math.round(value * base);
        return entire / base;
    }

    loadDefaultImage = (event): void => {
        event.target.src = DefaultImage.user;
    }

    setStorageEnvironment = (url: string): string => {
        return `${environment.apiUrl}${url}`;
    }

    isValidField = (form: FormGroup, field: string): boolean => {
        return (
            (form.get(field).touched || form.get(field).dirty) &&
            !form.get(field).valid
        );
    }

    restrictNumbersOnly = (control: AbstractControl, value: string): void => {
        control.setValue(value.replace(/[^0-9]/, ''));
    }

    isValidEmailFn = (control: AbstractControl): { [key: string]: any } | null => {
        return /^[\w]+([\._-]?\w+)*[\w]+@{1}[\w]+\.[a-z]{2,3}$/.test(control.value) ? null :
            {invalidEmail: {valid: false, value: control.value, message: 'No es válido'}};
    }
}