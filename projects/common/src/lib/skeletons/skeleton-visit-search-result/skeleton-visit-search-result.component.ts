import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton-visit-search-result',
  templateUrl: './skeleton-visit-search-result.component.html',
  styles: [
    `
          .row {
            height: 40px;
            gap: 16px;
            display: flex;
            align-items: center;
          }
        `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonVisitSearchResultComponent {}
