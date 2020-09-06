import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class ToastMessageService {
  constructor(private messageService: MessageService) {}

  showToastError(message: string, lifetime: number = 3000) {
    this.messageService.add({
      severity: "error",
      summary: "Erro",
      detail: message,
      life: lifetime,
    });
  }

  showToastSuccess(message: string, lifetime: number = 3000) {
    this.messageService.add({
      severity: "success",
      summary: "Sucesso",
      detail: message,
      life: lifetime
    });
  }
}
