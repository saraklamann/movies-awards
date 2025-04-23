import { Movie } from "./movie";

export interface MovieResponse {
    _embedded: {
        movies: Movie[];
        };
        page: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
        };
}