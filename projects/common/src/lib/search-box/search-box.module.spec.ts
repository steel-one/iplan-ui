import { TestBed, waitForAsync } from '@angular/core/testing';
import { SearchBoxModule } from './search-box.module';

describe('SearchBoxModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SearchBoxModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(SearchBoxModule).toBeDefined();
  });
});
