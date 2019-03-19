import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Campaign } from '../_models/campaign';

import { HttpService } from '../core/http.service';

import { AppStore } from '../app.store';

@Injectable()
export class CampaignService {

    // Redux based variables
    campaigns: Observable<Array<Campaign>>;
    campaignUrl = 'campaign';

    constructor(
        private http: HttpService,
        private store: Store<AppStore>
    ) { 

        this.campaigns = store.select( store => store.campaigns );
    }

    loadCampaigns() {
        return this.http.get(this.campaignUrl)
                        .map((res: Response) => {
                            let body = res.json();
                           // this.data = body.data;
                            return body.data || {};
                        })
                        .map((payload: Campaign[]) => {
                            debugger
                            return { type: 'ADD_CAMPAIGNS', payload };
                        })
                        .subscribe((action) => {
                            debugger
                            this.store.dispatch(action);
                        });
    }

    deleteCampaigns(payload) {
        debugger
        const action = { type: 'DELETE_CAMPAIGN',  payload};
        this.store.dispatch(action);
}
// tslint:disable-next-line:eofline
}