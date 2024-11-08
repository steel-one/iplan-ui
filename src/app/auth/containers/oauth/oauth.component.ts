import { Location, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OAuthService } from '../../services/oauth.service';

@Component({
    templateUrl: './oauth.component.html',
    styleUrls: ['./oauth.component.scss'],
    standalone: true,
    imports: [RouterLink, JsonPipe],
})
export class OAuthComponent implements OnInit {
  user = {};
  stateIsValid = false;
  nonceIsValid = false;

  constructor(
    private oauthService: OAuthService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit() {
    const fragment = new URLSearchParams(this.route?.snapshot?.fragment as any);
    const idToken = fragment.get('id_token');
    const state = fragment.get('state');

    this.user = idToken && this.oauthService.decodeIdToken(idToken);
    this.stateIsValid = this.oauthService.isStateValid(state);
    this.nonceIsValid = this.oauthService.isNonceValid(this.user);

    this.clearAddressBar(); // do not show id_token in the address bar
  }

  private clearAddressBar() {
    const pathWithoutHash = this.location.path(false);
    this.location.replaceState(pathWithoutHash);
  }
}
