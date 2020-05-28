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
export const selectFilter = createSelector(
    selectQuery,
    (state: fromQuery.State) => state.filter
);
export const selectLoadingStatus = createSelector(
    selectQuery,
    (state: fromQuery.State) => state.isLoading
);
export const selectQueryStatus = createSelector(
    selectQuery,
    (state: fromQuery.State) => state.isNewQuery
);
