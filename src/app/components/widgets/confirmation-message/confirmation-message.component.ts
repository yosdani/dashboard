import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.scss']
})
export class ConfirmationMessageComponent implements OnInit {
  message: string;

  constructor(private dialogR: MatDialogRef<ConfirmationMessageComponent>,
              @Inject(MAT_DIALOG_DATA) val) {
    this.message = val;
  }

  ngOnInit(): void {
  }

  Confirmation(): void {
    this.dialogR.close(true);
  }

  Negation(): void {
    this.dialogR.close(false);
  }
}
