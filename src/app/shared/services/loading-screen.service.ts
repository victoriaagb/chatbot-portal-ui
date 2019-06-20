import { Injectable } from '@angular/core';
import { Subject  } from 'rxjs/Subject';
import { Observable  } from 'rxjs/Observable';


@Injectable()
export class LoadingScreenService {

  private _loading: Boolean = false;
  private _loadingStatus = new Subject<any>();
  get loading(): Boolean {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
    this._loadingStatus.next(value);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  getLoadingStatus(): Observable<any> {
    return this._loadingStatus.asObservable();
  }
}
