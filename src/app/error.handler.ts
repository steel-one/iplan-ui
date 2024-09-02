import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum SnackBarStatus {
  ERROR,
  WARN,
  MESSAGE,
}
@Injectable()
export class HttpErrorHandler {
  constructor(private snackBar: MatSnackBar) {}

  //TODO: panelClass not working - OVERWRITTEN by MDC
  openSnackBar(message: string = 'Unknown error', status: number) {
    let panelClass;
    switch (status) {
      case SnackBarStatus.ERROR:
        panelClass = ['error-snackbar'];
        break;
      case SnackBarStatus.WARN:
        panelClass = ['warn-snackbar'];
        break;
    }
    const action = 'Dismiss';
    this.snackBar.open(message, action, {
      duration: 10000,
      panelClass,
    });
  }

  handleError(error: HttpErrorResponse) {
    console.error(error.status); // TODO: remove this in future
    const msg = Array.isArray(error.error?.message)
      ? error.error?.message[0]
      : error.error?.message;
    this.openSnackBar(msg, SnackBarStatus.ERROR);
  }
}
