import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { RefreshService } from '@common/refresh.service';
import { SearchBoxComponent } from '@lib/search-box/search-box.component';
import { SimpleToolbarNewComponent } from '@lib/simple-toolbar/simple-toolbar.component';
import { SkeletonTableComponent } from '@lib/skeletons/skeleton-table/skeleton-table.component';
import { JwtAuthStrategy } from 'src/app/auth/services/jwt-auth.strategy';
import { TableComponent } from '../table/table.component';
import { SectionService } from './section.service';

@Component({
  selector: 'frontend-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SectionService, JwtAuthStrategy, RefreshService],
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
  constructor(public srv: SectionService) {}
}
