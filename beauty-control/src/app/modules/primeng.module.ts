import { NgModule } from "@angular/core";

import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { RadioButtonModule } from "primeng/radiobutton";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ToastModule } from "primeng/toast";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { DataViewModule } from 'primeng/dataview';

import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";

@NgModule({
  imports: [],
  exports: [
    TableModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
    CardModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    DialogModule,
    DataViewModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class PrimengModule {}
