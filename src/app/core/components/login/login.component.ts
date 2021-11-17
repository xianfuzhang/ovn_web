import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, map } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private formSubmitAttempt: boolean = false;
  form: FormGroup;
  returnUrl: string = '';
  loginError: boolean = false;
  unknownError: boolean = false;
  loginSuccess: boolean = false;
  isLogin: boolean = false;
  webTitle: string = '';
  logoPath: string = '';

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form?.get('userName')?.valueChanges.subscribe(() => {
      this.loginError = false;
      this.unknownError = false;
    });
    this.form.get('password')?.valueChanges.subscribe(() => {
      this.loginError = false;
      this.unknownError = false;
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // this.toastrService.clear();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLogin = true;
      this.loginError = false;
      this.unknownError = false;
      this.authService.login(this.form.value)
      .subscribe(() => {
        this.router.navigate([this.returnUrl]);
      });
    }
    this.formSubmitAttempt = true;
  }
}
