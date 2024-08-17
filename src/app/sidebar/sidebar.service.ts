import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable()
export class SidebarService {
  currentDate = new Date().getFullYear();
  openState$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() {
    this.getStateFromPreferences().subscribe((isOpen) => {
      const initialState = isOpen === true || isOpen === undefined;
      this.openState$.next(initialState);
    });
  }

  toggleState() {
    const newState = !this.openState$.value;
    this.openState$.next(newState);
  }

  private getStateFromPreferences() {
    return of({ sidebar_state: true }).pipe(
      map((p) => p.sidebar_state),
      first()
    );
  }
}
