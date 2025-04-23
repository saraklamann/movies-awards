import { Movie } from "./movie";

export interface AllMoviesResponse {
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