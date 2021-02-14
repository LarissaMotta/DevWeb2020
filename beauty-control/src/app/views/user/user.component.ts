import { ToastMessageService } from "./../../services/toast-message.service";
import { ConfirmationService } from "primeng/api";
import { UserService } from "./../../services/user.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { normalizeFormLayout } from "src/app/utils/form-normalized.util";
import { HttpErrorResponse } from "@angular/common/http";
import { Role } from "src/app/enums/role.enum";
import { userDict } from "src/app/dicts/user.dict";
import { Subscription } from "rxjs";
import User from "src/app/models/user.model";
import MailUtils from "src/app/utils/mail.util";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit, OnDestroy {
  srcImage: string;
  users: User[];
  handleUser: User;
  isNewUser: boolean;
  formSubmitted: boolean;
  showUserDialog: boolean;
  headerUserDialog: string;
	passwordConfirm: string;
	loading: boolean;

  private subscriptions: Subscription;

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private toastMessageService: ToastMessageService
  ) {
		this.subscriptions = new Subscription();
		this.srcImage = "assets/usuarios/usuario-sem-avatar.jpg";
		this.loading = true;
  }

  ngOnInit(): void {
    this.subscriptions.add(
			this.userService.getAll().subscribe({
				next: (users: User[]) => {
					this.users = users.map((user: User) => {
						user.password = !user.password ? "" : user.password;
						return user;
					});
				},
				error: (error: HttpErrorResponse) =>
					this.toastMessageService.showToastError(error.error.message),
				complete: () => this.loading = false
			})
		);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get roleDict(): any {
    return userDict.role;
  }

  get roleType(): typeof Role {
    return Role;
  }

  get isValidEmail(): boolean {
    return MailUtils.isValidEmail(this.handleUser.email);
  }

  get isValidLengthPassword(): boolean {
    return this.handleUser.password.length >= 6;
  }

  hideDialog(): void {
    this.headerUserDialog = "";
    this.showUserDialog = false;
    this.formSubmitted = false;
  }

  onClickBtnCreate(): void {
    this.handleUser = new User();
    this.passwordConfirm = this.handleUser.password;
    this.isNewUser = true;
    this.formSubmitted = false;
    this.showUserDialog = true;
    this.headerUserDialog = "Criar Usuário";
    normalizeFormLayout();
  }

  onClickBtnUpdate(user: User): void {
    this.handleUser = { ...user };
    this.passwordConfirm = this.handleUser.password;
    this.isNewUser = false;
    this.showUserDialog = true;
    this.headerUserDialog = "Atualizar Usuário";
    normalizeFormLayout();
  }

  onClickBtnDelete(user: User): void {
    this.confirmationService.confirm({
      header: "Atenção",
      message: `Tem certeza que deseja deletar o usuário ${user.name}?`,
      acceptLabel: "Sim",
      rejectLabel: "Não",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.deleteUser(user);
      },
    });
  }

  saveUser(): void {
    this.formSubmitted = true;
    let isValid: boolean = this.isValidForm(this.handleUser);

    if (isValid) {
      this.createOrUpdateUser();
      this.hideDialog();
      this.handleUser = new User();
    }
  }

  createOrUpdateUser(): void {
    if (this.isNewUser) {
      this.createUser(this.handleUser);
    } else {
      this.updateUser(this.handleUser);
    }
  }

  createUser(user: User): void {
		this.subscriptions.add(
			this.userService.create(user).subscribe({
				next: (userCreated: User) => {
					this.users.push(userCreated);
					this.users = [...this.users];
					this.toastMessageService.showToastSuccess("Usuário criado com sucesso.");
				},
				error: (error: HttpErrorResponse) =>
					this.toastMessageService.showToastError(error.message),
			})
		);
  }

  updateUser(user: User): void {
		this.subscriptions.add(
			this.userService.update(user, user.id).subscribe({
				next: (userUpdated: User) => {
					let productIndex: number = this.users.findIndex(
						(val: User, i: number) => val.id === user.id
					);
					this.users[productIndex] = userUpdated;
					this.users = [...this.users];
					this.toastMessageService.showToastSuccess("Usuário atualizado com sucesso.");
				},
				error: (error: HttpErrorResponse) =>
					this.toastMessageService.showToastError(error.message),
			})
		);
  }

  deleteUser(user: User): void {
		this.subscriptions.add(
			this.userService.delete(user.id).subscribe({
				next: () => {
					this.users = this.users.filter((val) => val.id !== user.id);
					this.handleUser = new User();
					this.toastMessageService.showToastSuccess("Usuário deletado com sucesso.");
				},
				error: (error: HttpErrorResponse) =>
					this.toastMessageService.showToastError(error.error.message)
			})
		);
  }

  private isValidForm(user: User): boolean {
    if (
      !user.name.trim() ||
      !MailUtils.isValidEmail(user.email.trim()) ||
      this.isNewUser && user.password !== this.passwordConfirm ||
      this.isNewUser && user.password.length < 6
    ) {
      return false;
    } else {
      return true;
    }
  }
}
