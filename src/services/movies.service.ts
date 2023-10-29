import { Service } from "typedi";
import { Logger } from "../common/logger/logger";
import * as axios from 'axios';
import * as fs from 'fs';


@Service()
export class MoviesService {
  constructor(
    private logger: Logger,
    private omdbUrl: string = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`,
    private favoritesFile: string = `src/favorites.json`,
    private favoriteMovies: any = []
  ) {
  }
  public async search(newItem: any): Promise<any> {
    try {
      let url = this.omdbUrl;
      if (newItem.title) url += `&t=${newItem.title}`;  // its used for search by title
      else if (newItem.imdbID) url += `&i=${newItem.imdbID}`; // its used for search by IMDb ID
      const config = await this.formConfig('GET', url);
      const movieResponse = await axios.default.request(config);
      return { data: movieResponse.data, status: 200, message: 'Movies search success' };
    } catch (err: any) {
      return { data: err, message: 'Movies search failed', status: 500 };
    }
  }

  public async favorites(payload: any): Promise<any> {
    try {
      const jsonString = await fs.promises.readFile(this.favoritesFile, 'utf8');// Read from file and parse JSON string to array
      this.favoriteMovies = jsonString ? JSON.parse(jsonString) : [];
      const isMovieExist = this.favoriteMovies.includes(payload.imdbID);
      if (payload.actionType === 'addMovie') { // Check if movie already exists in favorites
        if (isMovieExist) return { message: 'Movie already added to favorites', status: 400 };
        else this.favoriteMovies.push(payload.imdbID);
      } else if (payload.actionType === 'removeMovie') {
        if (!isMovieExist) return { message: 'Movie not found in favorites', status: 400 };
        else this.favoriteMovies = this.favoriteMovies.filter((movie: any) => movie.imdbID !== payload.imdbID); // Remove the movie from favorites
      }
      await fs.promises.writeFile(this.favoritesFile, JSON.stringify(this.favoriteMovies, null, 2), 'utf8');// Write updated array back to file
      return { data: this.favoriteMovies, status: 200, message: `${payload.actionType} to Favorite` };
    } catch (err: any) {
      return { data: err, message: `${payload.actionType} to Favorite Failed`, status: 500 };
    }
  }

  private async formConfig(requestMethod: string, requestUrl: string) {
    const config = { method: requestMethod, url: requestUrl, headers: {} };
    return config;
  }
}
