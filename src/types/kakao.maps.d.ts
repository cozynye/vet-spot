// Kakao Maps JavaScript API Type Declarations

// Geocoder 응답 타입
interface KakaoGeocoderAddressResult {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  zip_code: string;
  x: string; // longitude
  y: string; // latitude
}

interface KakaoGeocoderRoadAddressResult {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: string; // longitude
  y: string; // latitude
}

interface KakaoGeocoderResult {
  address: KakaoGeocoderAddressResult | null;
  road_address: KakaoGeocoderRoadAddressResult | null;
  address_name: string;
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
  x: string; // longitude
  y: string; // latitude
}

interface KakaoGeocoder {
  addressSearch: (
    address: string,
    callback: (result: KakaoGeocoderResult[], status: string) => void
  ) => void;
  coord2Address: (
    lng: number,
    lat: number,
    callback: (result: KakaoGeocoderResult[], status: string) => void
  ) => void;
}

// Places API 타입
interface KakaoPlacesResult {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; // longitude
  y: string; // latitude
  place_url: string;
  distance: string;
}

interface KakaoPlacesPagination {
  current: number;
  first: boolean;
  gotoFirst: () => void;
  gotoLast: () => void;
  gotoPage: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  last: number;
  nextPage: () => void;
  perPage: number;
  prevPage: () => void;
  totalCount: number;
}

interface KakaoPlaces {
  keywordSearch: (
    keyword: string,
    callback: (
      result: KakaoPlacesResult[],
      status: string,
      pagination: KakaoPlacesPagination
    ) => void,
    options?: {
      category_group_code?: string;
      location?: any;
      radius?: number;
      bounds?: any;
      rect?: string;
      size?: number;
      page?: number;
      sort?: string;
    }
  ) => void;
  categorySearch: (
    code: string,
    callback: (
      result: KakaoPlacesResult[],
      status: string,
      pagination: KakaoPlacesPagination
    ) => void,
    options?: any
  ) => void;
}

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => any;
        Map: new (container: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        InfoWindow: new (options: any) => any;
        Circle: new (options: any) => any;
        services: {
          Places: new () => KakaoPlaces;
          Geocoder: new () => KakaoGeocoder;
          Status: {
            OK: string;
            ZERO_RESULT: string;
            ERROR: string;
          };
        };
        event: {
          addListener: (target: any, type: string, handler: (...args: any[]) => void) => void;
          removeListener: (target: any, type: string, handler: (...args: any[]) => void) => void;
        };
      };
    };
  }
}

export type { KakaoGeocoder, KakaoGeocoderResult, KakaoPlaces, KakaoPlacesResult };
