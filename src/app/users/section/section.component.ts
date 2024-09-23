import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RefreshService } from '../../../common/refresh.service';
import { SectionService } from './section.service';

@Component({
  selector: 'frontend-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SectionService],
})
export class SectionComponent {
  constructor(
    public srv: SectionService,
    public refreshSrv: RefreshService,
  ) {}
}
