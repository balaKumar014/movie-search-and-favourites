import { Controller, Body, Post, Req, } from "routing-controllers";
import { Logger } from "../common/logger/logger";
import { MoviesService } from "../services/movies.service";
import { BaseController } from "./base.controller";
import { Service } from "typedi";
@Service()
@Controller('/movies') // Assuming '/movies' is the base path for this controller

export class MoviesController extends BaseController {

  constructor(private moviesService: MoviesService, logger: Logger) { super(logger); };

  @Post('/search')
  async search(@Body() item: { title: string, imdbID: string }): Promise<any> {
    try {
      const result = await this.moviesService.search(item);
      return this.returnSuccess(result.data, result.status, result.message);
    } catch (error: any) {
      this.logger.error(error);
      return this.returnError(error);
    }
  }

  @Post('/favorites')
  async favorites(@Body() item: { actionType: string, imdbID: string }): Promise<any> {
    try {
      const result = await this.moviesService.favorites(item);
      return this.returnSuccess(result.data, result.status, result.message);
    } catch (error: any) {
      this.logger.error(error);
      return this.returnError(error);
    }
  }

}
