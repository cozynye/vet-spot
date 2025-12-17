'use client';

import { useState, useCallback } from 'react';
import type { Coordinates } from '@/shared/types/hospital';
import { SEOUL_CENTER } from '@/shared/config/constants';

interface GeolocationState {
  location: Coordinates | null;
  isLoading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    isLoading: false,
    error: null,
  });

  const getCurrentLocation = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setState({
        location: SEOUL_CENTER,
        isLoading: false,
        error: '위치 서비스를 지원하지 않는 브라우저입니다. 서울로 이동합니다.',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setState({
          location,
          isLoading: false,
          error: null,
        });
      },
      (error) => {
        let errorMessage = '위치를 가져올 수 없습니다. 서울로 이동합니다.';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '위치 권한이 거부되었습니다. 서울로 이동합니다.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = '위치 정보를 사용할 수 없습니다. 서울로 이동합니다.';
            break;
          case error.TIMEOUT:
            errorMessage = '위치 요청 시간이 초과되었습니다. 서울로 이동합니다.';
            break;
        }

        setState({
          location: SEOUL_CENTER,
          isLoading: false,
          error: errorMessage,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  return {
    ...state,
    getCurrentLocation,
  };
}
