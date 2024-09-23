import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

type SortDirection = Sort['direction'];

interface OrderBy {
  sort: string;
  order: SortDirection;
  nulls?: 'first' | 'last';
}

interface Paginate {
  perPage: number;
  page: number;
}

export interface QueryParams {
  search: string;
  paginate: Paginate;
  orderBy: OrderBy;
}

export function queryParamsManipulation(
  search: string,
  pageIndex: PageEvent['pageIndex'],
  pageSize: PageEvent['pageSize'],
  sortActive: Sort['active'],
  sortDirection: Sort['direction'],
): QueryParams {
  return {
    search,
    paginate: { perPage: pageSize, page: pageIndex },
    orderBy: sortConditionManipulation(sortActive, sortDirection),
  };
}

function sortConditionManipulation(
  active: Sort['active'],
  direction: Sort['direction'],
): QueryParams['orderBy'] {
  const DIRECTION = direction === 'asc' ? 'asc' : 'desc';
  const NULLS = 'last';

  switch (active) {
    case 'email':
      return { sort: 'email', order: DIRECTION, nulls: NULLS };
    case 'firstName':
      return { sort: 'firstName', order: DIRECTION, nulls: NULLS };
    case 'lastName':
      return { sort: 'lastName', order: DIRECTION, nulls: NULLS };
    default:
      throw new Error(`Sort by ${active} not supported.`);
  }
}
