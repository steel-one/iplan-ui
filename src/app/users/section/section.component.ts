import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RefreshService } from '../../../common/refresh.service';
import { SectionService } from './section.service';
import { SimpleToolbarNewComponent } from '../../../../projects/common/src/lib/simple-toolbar/simple-toolbar.component';
import { SearchBoxComponent } from '../../../../projects/common/src/lib/search-box/search-box.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf, AsyncPipe } from '@angular/common';
import { SkeletonTableComponent } from '../../../../projects/common/src/lib/skeletons/skeleton-table/skeleton-table.component';
import { TableComponent } from '../table/table.component';

@Component({
    selector: 'frontend-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SectionService],
    standalone: true,
    imports: [
        SimpleToolbarNewComponent,
        SearchBoxComponent,
        MatCard,
        MatCardContent,
        NgIf,
        SkeletonTableComponent,
        TableComponent,
        AsyncPipe,
    ],
})
export class SectionComponent {
  constructor(
    public srv: SectionService,
    public refreshSrv: RefreshService,
  ) {}
}
