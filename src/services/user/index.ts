import { AxiosResponse } from 'axios';
import { HttpService } from '../http';
import { prepareErrorResponse } from '../http/response';

export class UserService extends HttpService {

  fetchUserList = async (url: string, data: TObject): Promise<IPrepareResponse<AxiosResponse>>=> {
    try {
      const apiResponse  = await this.get(
        url,data);

      return apiResponse;
    } catch (error) {
      return prepareErrorResponse(error);
    }
  };
}