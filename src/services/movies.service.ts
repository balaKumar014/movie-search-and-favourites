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
      // Read from file and parse JSON string to array
      const jsonString = await fs.promises.readFile(this.favoritesFile, 'utf8');
      this.favoriteMovies = jsonString ? JSON.parse(jsonString) : [];
      if (payload.actionType === 'addMovie') {
        // Check if movie already exists in favorites
        const checkMovieExist = this.favoriteMovies.filter((movie: any) => movie.imdbID === payload.imdbID);
        if (checkMovieExist) return { message: 'Movie already added to favorites', status: 400 };
        else this.favoriteMovies.push(payload.imdbID);
      } else if (payload.actionType === 'removeMovie') {
        // Remove the movie from favorites
        this.favoriteMovies = this.favoriteMovies.filter((movie: any) => movie.imdbID !== payload.imdbID);
      }
      // Write updated array back to file
      await fs.promises.writeFile(this.favoritesFile, JSON.stringify(this.favoriteMovies, null, 2), 'utf8');
      return { data: this.favoriteMovies, status: 200, message: 'Movie Added to Favorite' };
    } catch (err: any) {
      this.logger.error("Movie Add to Favorite Failed", err);
      return { data: err, message: 'Movie Add to Favorite Failed', status: 500 };
    }
  }

  private async formConfig(requestMethod: string, requestUrl: string) {
    const config = { method: requestMethod, url: requestUrl, headers: {} };
    return config;
  }
}
