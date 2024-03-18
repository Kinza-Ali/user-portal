import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { RESPONSE_TYPES, STATUS_CODES, STATUS_MESSAGES } from 'src/constants/response-types';

export const prepareResponseObject = (
  response: AxiosResponse<any> | any,
  status?: string
): any => {
  const finalResponse = {
    data: null,
    error: true,
    statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
    statusText: response?.message || response?.statusText,
  };

  if (response.noInternet) {
    return {
      ...finalResponse,
      data: { message: STATUS_MESSAGES.OFFLINE },
      statusCode: STATUS_CODES.BAD_GATEWAY,
      statusText: STATUS_MESSAGES.OFFLINE,
    };
  }

  if (!status) {
    return finalResponse;
  } else if (status === RESPONSE_TYPES.SUCCESS) {
    const successResponse = {
      data: response?.data?.data || response?.data,
      statusMessage:
        response?.data?.userMessage ||
        response?.data?.message ||
        response?.data?.data?.message,
      statusCode: response?.status,
      error: response?.status !== STATUS_CODES.SUCCESS && response?.status !== STATUS_CODES.CREATED,
      statusText: response?.statusText || response?.data?.message,
      ...(response?.data?.pagination ? {totalCount: response?.data?.pagination?.totalCount} : {}),
    };


    if (response?.pagination) {
      successResponse.data = { data: successResponse.data, totalCount: response?.pagination?.totalCount || 0 };
    }

    if (response?.data?.total) {
      successResponse.data = { data: successResponse.data, totalCount: response?.data?.total  || 0 };
    }

    return successResponse;
  } else if (status === RESPONSE_TYPES.ERROR_RESPONSE) {
    const {
      data: { error: errorResponse },
    } = response;

    const errorData = !isEmpty(errorResponse) ? errorResponse : response.data;
    return {
      ...finalResponse,
      data: errorData,
      statusCode: response?.data?.error?.code || response?.status,
      statusText: response?.data?.message || STATUS_MESSAGES.WENT_WRONG,
    };
  } else if (status === RESPONSE_TYPES.ERROR_REQUEST) {
    return {
      ...finalResponse,
      statusText: response || STATUS_MESSAGES.WENT_WRONG,
    };
  }

  return finalResponse;
};

export const prepareErrorResponse = (error: AxiosResponse<any> | any): any => {
  if (error?.response) {
    return prepareResponseObject(error.response, RESPONSE_TYPES.ERROR_RESPONSE);
  } else if (error?.request) {
    return prepareResponseObject(error.request, RESPONSE_TYPES.ERROR_REQUEST);
  }

  return prepareResponseObject(error);
};
