import { BookFilter, CharacterFilter, HouseFilter } from './filters.model';

export interface Query {
    url: string;
    resource: string;
    filters: BookFilter | CharacterFilter | HouseFilter;
    page: number;
    pageSize?: number;
}