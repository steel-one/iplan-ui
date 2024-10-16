import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SearchBoxModule } from 'projects/common/src/lib/search-box';


import { JwtAuthStrategy } from 'src/app/auth/services/jwt-auth.strategy';

import { RefreshService } from './refresh.service';
import { SectionComponent } from './section.component';

@NgModule({
    imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SearchBoxModule,
    SectionComponent,
],
    exports: [SectionComponent],
    providers: [RefreshService, JwtAuthStrategy],
})
export class SectionModule {}
