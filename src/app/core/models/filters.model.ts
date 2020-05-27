export interface BookFilter {
    name: string;
    fromReleaseDate: string;
    toReleaseDate: string;
}
export interface CharacterFilter {
    name: string;
    gender: string;
    culture: string;
    born?: string;
    died?: string;
    isAlive: boolean;
}
export interface HouseFilter {
    name: string;
    region: string;
    words?: string;
    hasWords: boolean;
    hasTitles: boolean;
    hasSeats: boolean;
    hasDiedOut: boolean;
    hasAncestralWeapons: boolean;
}