import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  urlImg: string;
  formLogin: FormGroup;
  formSubmitted: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.redirectToHome();
    this.urlImg = "../../../assets/logos/icon-white-fundo-transparente.png";
    this.formLogin = this.createForm();
    this.formSubmitted = false;
  }

  ngOnInit(): void {}

  get formControls(): any {
    return this.formLogin.controls;
  }

  isFormFieldInvalid(field: string): boolean {
    return (
      (!this.formLogin.get(field).valid && this.formLogin.get(field).touched) ||
      (this.formLogin.get(field).untouched && this.formSubmitted)
    );
  }

  submitAuth(): void {
    this.formSubmitted = true;

    if (this.formLogin.valid) {
      this.authService
        .login(this.formLogin.value.email, this.formLogin.value.password)
        .subscribe({ error: () => this.setAllFieldsAsInvalid() });
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  private createForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  private setAllFieldsAsInvalid(): void {
    this.formLogin.setErrors({ invalid: true });
    this.formLogin.controls["email"].setErrors({ incorrect: true });
    this.formLogin.controls["password"].setErrors({ incorrect: true });
    this.formLogin.markAllAsTouched();
  }

  private redirectToHome() {
    if (this.authService.authenticate()) {
      this.router.navigate(["/home"]);
    }
  }
}
