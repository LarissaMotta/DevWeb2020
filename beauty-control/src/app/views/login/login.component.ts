import { Subscription } from 'rxjs';
import { Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
	urlImg: string;
  formLogin: FormGroup;
  formSubmitted: boolean;
	invalidUserSubmit: boolean;
	isSubmittingAuth: boolean;
	
	subscriptions: Subscription;

  constructor(private router: Router, private authService: AuthService) {
		this.subscriptions = new Subscription();
		this.redirectToHome();
    this.urlImg = "assets/logos/icon-white-fundo-transparente.png";
    this.formLogin = this.createForm();
    this.formSubmitted = false;
		this.invalidUserSubmit = false;
		this.isSubmittingAuth = false;
  }
	
	ngOnInit(): void {}
	
	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

  get formControls(): any {
    return this.formLogin.controls;
  }

  isFormFieldInvalid(field: string): boolean {
    return (
      (!this.formLogin.get(field).valid && this.formLogin.get(field).touched) ||
      this.invalidUserSubmit
    );
  }

  submitAuth(): void {
		this.formSubmitted = true;

    if (this.formLogin.valid) {
			this.isSubmittingAuth = true;

			this.subscriptions.add(
				this.authService.login(this.formLogin.value.email, this.formLogin.value.password)
					.subscribe({ 
						error: () => { 
							this.invalidUserSubmit = true;
						}
					}).add(() => this.isSubmittingAuth = false)
			);
    } else {
      this.formLogin.markAllAsTouched();
		}
  }

  private createForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [
				Validators.required, 
				Validators.email
			]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  private redirectToHome(): void {
    if (this.authService.authenticate()) {
      this.router.navigate(["/home"]);
    }
  }
}
