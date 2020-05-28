import { createSelector } from '@ngrx/store';
import * as fromItem from '../reducers/item.reducers';
import { AppState } from '../../app.reducers';

export const selectItemState = (state: AppState) => state.query;
export const selectQueryCollection = createSelector(
    selectItemState,
    (state: fromItem.State) => state.queries
);
export const selectResponseCollection = createSelector(
    selectItemState,
    (state: fromItem.State) => state.reponse
);
export const selectItem = createSelector(
    selectItemState,
    (state: fromItem.State) => state.item
);
export const selectFilter = createSelector(
    selectItemState,
    (state: fromItem.State) => state.filter
);
export const selectLoadingStatus = createSelector(
    selectItemState,
    (state: fromItem.State) => state.isLoading
);
export const selectQueryStatus = createSelector(
    selectItemState,
    (state: fromItem.State) => state.isNewQuery
);
