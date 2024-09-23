import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationDialogsModule } from './confirmation-dialog.module';

describe('Remove Confirmation Dialog', () => {
  beforeEach(() => {
    cy.mount(ConfirmationDialogComponent, {
      imports: [ConfirmationDialogsModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { type: 'Site', name: 'North River' },
        },
      ],
    });
  });

  it('should mount', () => {
    cy.mount(ConfirmationDialogComponent, {
      imports: [ConfirmationDialogsModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { type: 'Site', name: 'North River' },
        },
      ],
    });
  });

  it('should have default empty input, disabled proceed button and not disabled Cancel button', () => {
    cy.get('[data-cy="proceed"]').should('be.disabled');
    cy.get('[data-cy="cancel"]').should('be.enabled');
  });

  it('should not allow to proceed', () => {
    cy.get('[formcontrolname="name"]').clear().type('WrongSite').blur();
    cy.get('mat-error').should('be.visible');
    cy.get('mat-error').contains('Enter North River to confirm.');
    cy.get('[data-cy="proceed"]').should('be.disabled');
    cy.get('[data-cy="cancel"]').should('be.enabled');
  });

  it('should allow to proceed', () => {
    cy.get('[formcontrolname="name"]').clear().type('North River').blur();
    cy.get('mat-error').should('not.exist');
    cy.get('[data-cy="proceed"]').should('be.enabled');
    cy.get('[data-cy="cancel"]').should('be.enabled');
  });
});
