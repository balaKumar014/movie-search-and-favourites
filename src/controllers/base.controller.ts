import { Logger } from "../common/logger/logger";
import { ServiceResponse } from "../models/service-response.model";

export class BaseController {
  constructor(protected logger: Logger) { }
  protected returnSuccess<T>(data: T, status: any, message: any): ServiceResponse<T> {
    return {
      data: data,
      status: status,
      message: message
    };
  }

  
  protected returnError<T>(error: Error): ServiceResponse<T> {
    return {
      status: 500,
      error: error,
    };
  }

}
