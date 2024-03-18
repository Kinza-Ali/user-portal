/**
 * Defined some of the common types
 */
type ReactNode = import('react').ReactNode
type ReactChild = import('react').ReactChild
type ReactChildren = import('react').ReactChildren
type Component = import('react').Component
type TFunction = () => void
type TObject = Record<string, number, string, undefined, boolean, TFunction>
type TArrayOfObjects = Array<string, TObject>
type TNumberOrString = number | string
type TFunctionOrObject = TFunction | TObject
type LeafletLocation = import('leaflet').LatLngExpression;


/**
 * Redux Store types
 */
type TDispatch = import('../store/index').AppDispatch
type TReduxState = import('../store/index').ReduxState

/**
 * Defined an interfce example
 */


interface UserInfo {
  gender?: string;
  name?: {
      title?: string;
      first?: string;
      last?: string;
  };
  location?: {
      street?: {
          number?: number;
          name?: string;
      };
      city?: string;
      state?: string;
      country?: string;
      postcode?: number;
      coordinates?: {
          latitude?: string;
          longitude?: string;
      };
      timezone?: {
          offset?: string;
          description?: string;
      };
  };
  email?: string;
  login?: {
      uuid?: string;
      username?: string;
      password?: string;
      salt?: string;
      md5?: string;
      sha1?: string;
      sha256?: string;
  };
  dob?: {
      date?: string;
      age?: number;
  };
  registered?: {
      date?: string;
      age?: number;
  };
  phone?: string;
  cell?: string;
  id?: {
      name?: string;
      value?: string;
  };
  picture?: {
      large?: string;
      medium?: string;
      thumbnail?: string;
  };
  nat?: string;
}
interface IMapsProp {
  position: LeafletLocation;
  userName: string;
 }
 
 interface PaginateProps {
    page: number;
    count: number;
    pageSize: number;
    margin?: number;
    onPageChange: (page: number) => any;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    variant?: 'solid' | 'ghost' | 'outline' | 'link';
    selectedVariant?: 'solid' | 'ghost' | 'outline' | 'link';
    previousIcon?: React.ReactElement;
    nextIcon?: React.ReactElement;
    colorScheme?: string;
    isRtl?: boolean;
    fontWeight?:
      | 'hairline'
      | 'thin'
      | 'light'
      | 'normal'
      | 'medium'
      | 'semibold'
      | 'bold'
      | 'extrabold'
      | 'black';
    borderRadius?:
      | 'none'
      | 'sm'
      | 'base'
      | 'md'
      | 'lg'
      | 'xl'
      | '2xl'
      | '3xl'
      | 'full';
  }

  interface IHttpRequestOptions {
    headers?: Record<string, string>;
    queryParams?: Record<string, string>;
  }

  interface IPrepareResponse<T> {
    data: UserDataResponse;
    error: boolean;
    statusCode: number;
    statusText: string;
    statusMessage?: T;
    totalCount ?: number
  }

  interface UserDataResponse {
    results?: {
      gender?: string;
      name?: {
        title?: string;
        first?: string;
        last?: string;
      };
      location?: {
        street?: {
          number?: number;
          name?: string;
        };
        city?: string;
        state?: string;
        country?: string;
        postcode?: string;
        coordinates?: {
          latitude?: string;
          longitude?: string;
        };
        timezone?: {
          offset?: string;
          description?: string;
        };
      };
      email?: string;
      login?: {
        uuid?: string;
        username?: string;
        password?: string;
        salt?: string;
        md5?: string;
        sha1?: string;
        sha256?: string;
      };
      dob?: {
        date?: string;
        age?: number;
      };
      registered?: {
        date?: string;
        age?: number;
      };
      phone?: string;
      cell?: string;
      id?: {
        name?: string;
        value?: string;
      };
      picture?: {
        large?: string;
        medium?: string;
        thumbnail?: string;
      };
      nat?: string;
    }[];
    info?: {
      seed?: string;
      results?: number;
      page?: number;
      version?: string;
    };
  }
  
  interface IActionOptions {
    dispatch?: TDispatch;
    state: TReduxState;
  }