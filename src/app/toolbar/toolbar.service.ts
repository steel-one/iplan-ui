import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class ToolbarService {
  user$ = of({ email: 'not@implemented.com' }).pipe(
    map(_userManipulation),
    shareReplay(1)
  );

  constructor() {}
}

export function _userManipulation(user: {
  first_name?: string;
  last_name?: string;
  email: string;
}) {
  const name = [user.first_name, user.last_name].filter((item) => !!item).join(' ');
  const email = user.email;
  return { name, email };
}
