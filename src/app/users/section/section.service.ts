import { inject, Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SortDirection } from '@angular/material/sort';
import { User } from '@models/user';
import { ConfirmationDialogComponent } from 'projects/common/src/lib/confirmation-dialog';
import {
  combineLatest,
  EMPTY,
  interval,
  Observable,
  of,
  ReplaySubject,
  throwError,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  mergeMap,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { JwtAuthStrategy } from 'src/app/auth/services/jwt-auth.strategy';
import { DialogComponent, DialogData, FormValue } from '../dialog';
import { TableItem } from '../table/table-item.model';
import { config } from './../../config';
import {
  QueryParams,
  queryParamsManipulation,
} from './query-params-manipulation';
import { RefreshService } from './refresh.service';

export interface CmptData {
  nodes: TableItem[];
  total: number;
}

@Injectable()
export class SectionService {
  snackBar = inject(MatSnackBar);
  _params$ = new ReplaySubject<QueryParams>(1);
  _cmptDataRaw$: ReplaySubject<CmptData> = new ReplaySubject(1);
  _cmptData$ = this._cmptDataRaw$.pipe(catchError(() => EMPTY));

  items$: Observable<TableItem[] | null> = this._cmptData$.pipe(
    map((x) => x.nodes),
  );
  collectionLength$: Observable<number | null> = this._cmptData$.pipe(
    map((x) => x.total),
  );

  searchValue$ = new ReplaySubject<string>(1);
  paginatorPageIndex$ = new ReplaySubject<number>(1);
  paginatorPageSize$ = new ReplaySubject<number>(1);
  sortActive$ = new ReplaySubject<string>(1);
  sortDirection$ = new ReplaySubject<SortDirection>(1);

  loading$ = this._cmptData$.pipe(
    map(() => false),
    startWith(true),
  );

  constructor(
    private refreshSrv: RefreshService,
    private dialog: MatDialog,
    private http: HttpClient,
    private jwt: JwtAuthStrategy,
  ) {
    this.searchValue$.next('');
    this.paginatorPageIndex$.next(0);
    this.paginatorPageSize$.next(5);
    this.sortActive$.next('lastName');
    this.sortDirection$.next('asc');

    combineLatest([this.searchValue$, this.sortActive$, this.sortDirection$])
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.paginatorPageIndex$.next(0));

    interval(60 * 1000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.refreshSrv.refresh());

    combineLatest([
      this.searchValue$.pipe(distinctUntilChanged()),
      this.paginatorPageIndex$.pipe(distinctUntilChanged()),
      this.paginatorPageSize$.pipe(distinctUntilChanged()),
      this.sortActive$,
      this.sortDirection$,
    ])
      .pipe(
        map(([search, pageIndex, pageSize, sortActive, sortDirection]) => {
          return queryParamsManipulation(
            search,
            pageIndex,
            pageSize,
            sortActive,
            sortDirection,
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe(this._params$);

    combineLatest([this._params$, this.refreshSrv.onRefresh$])
      .pipe(
        switchMap(([params]) => this._getData(params)),
        takeUntilDestroyed(),
      )
      .subscribe(this._cmptDataRaw$);

    this._cmptDataRaw$.pipe(takeUntilDestroyed()).subscribe({
      error: (err) => {
        const message = err?.message || `There was an unexpected error.`;
        this.snackBar.open(message, `Close`, { duration: 10000 });
        throw err;
      },
    });
  }

  private _getData(variables: QueryParams) {
    const params = new HttpParams()
      .set('search', variables.search)
      .set('paginate', JSON.stringify({ page: 1, perPage: 10 }))
      .set('orderBy', JSON.stringify({ sort: 'firstName', order: 'asc' }));

    const token = this.jwt.getToken();

    return this.http
      .get<CmptData>(`${config['API_URL']}/users`, {
        params,
        headers: { Authorization: `${token}` },
      })
      .pipe(
        map((result) => {
          if (!result) {
            throw new Error(
              'Error getting user page data (result.data was falsy)',
            );
          }
          return result;
        }),
        map((data) => {
          const { nodes, total } = data;
          return { nodes, total };
        }),
      );
  }

  block(user: TableItem) {
    const data = {
      message: `You are about to block the user ${user.lastName} with ${user.email}.`,
      name: user.email,
    };
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: '500px',
        data,
      })
      .afterClosed()
      .pipe(
        mergeMap((result) => {
          if (result) {
            return this.http.put<User>(`${config['API_URL']}/users`, user);
          }
          return of(result);
        }),
        catchError((err) => {
          return of(err?.error?.message).pipe(
            mergeMap((message) => throwError({ id: user.id, message })),
          );
        }),
      )
      .subscribe(
        (accepted) => {
          if (accepted) {
            this.snackBar.open(`User was successfully blocked.`, undefined, {
              duration: 3000,
            });
            this.refreshSrv.refresh();
          }
        },
        (e) => {
          const message = `There was an unexpected error.`;
          this.snackBar.open(message, `Close`, { duration: 10000 });
          throw e;
        },
      );
  }

  openDialog(user: FormValue) {
    const data: DialogData = {
      user,
    };
    this.dialog
      .open(DialogComponent, { data, width: '500px' })
      .afterClosed()
      .subscribe({
        next: (reopen) => reopen && this.openDialog(user),
        complete: () => this.refreshSrv.refresh(),
      });
  }
}
