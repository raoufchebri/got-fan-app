import { createSelector } from '@ngrx/store';
import * as fromQuery from '../reducers/query.reducers';
import { AppState } from '../../app.reducers';

export const selectQuery = (state: AppState) => state.query;
export const selectQueryCollection = createSelector(
    selectQuery,
    (state: fromQuery.State) => state.queries
);
export const selectResponseCollection = createSelector(
    selectQuery,
    (state: fromQuery.State) => state.reponse
);
export const selectItem = createSelector(
    selectQuery,
    (state: fromQuery.State) => state.item
);
