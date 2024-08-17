import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, first, map, startWith } from 'rxjs';

interface Config {}

const REGISTERED_KEYS: (keyof Config)[] = [];

@Injectable()
export class AppConfigService {
  _config?: Config;
  _config$: ReplaySubject<Config> = new ReplaySubject(1);
  _fileName = this._getFileName();

  constructor(private http: HttpClient) {
    this._config$.subscribe((c) => (this._config = c));

    this.http
      .get<Config>(this._fileName, { params: { 'cache-bust': Math.random() } })
      .pipe(map((c) => this._validateConfig(c)))
      .subscribe(this._config$);
  }

  get isLoading$() {
    return this._config$.pipe(
      map((config) => !config),
      first(),
      startWith(true)
    );
  }

  get<T extends keyof Config>(key: T): Config[T] {
    if (!REGISTERED_KEYS.includes(key)) {
      throw `AppConfigService: ${key} is not a registered key.`;
    }
    return (this._config as Config)[key];
  }

  _getFileName() {
    const domain = window.location.hostname.match(/(-staging|-dev)?.com/);
    if (!domain) {
      return 'config.local.json';
    }
    switch (domain[0]) {
      case 'dev.com':
        return 'config.dev.json';
      case 'staging.com':
        return 'config.staging.json';
      default:
        return 'config.prod.json';
    }
  }

  _validateConfig(config: Config) {
    try {
      REGISTERED_KEYS.forEach((rk) => {
        if (!Object.hasOwn(config, rk)) {
          throw `AppConfigService: ${rk} is a registered key but is not defined in ${this._fileName}`;
        }
      });
    } catch (err) {
      console.error(err);
      return {} as Config;
    }
    return config;
  }
}
