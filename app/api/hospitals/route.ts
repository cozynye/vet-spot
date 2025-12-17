/**
 * ⚠️ DEPRECATED: REST API 방식 (고정 IP 필요)
 *
 * Vercel 배포 시 고정 IP가 없어 사용 불가
 * 현재는 JavaScript SDK (Places 서비스)를 사용 중
 *
 * 추후 고정 IP 호스팅으로 변경 시 다시 활성화 가능
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { searchAnimalHospitals } from '@/entities/hospital/api/kakaoLocalApi';
import type { Hospital } from '@/entities/hospital/model/types';

/**
 * GET /api/hospitals
 * 뷰포트 범위 내 동물병원 목록 조회 (카카오 로컬 API)
 *
 * Query Parameters:
 * - swLat: 남서쪽 위도
 * - swLng: 남서쪽 경도
 * - neLat: 북동쪽 위도
 * - neLng: 북동쪽 경도
 */
export async function GET_DISABLED(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const swLat = parseFloat(searchParams.get('swLat') || '0');
    const swLng = parseFloat(searchParams.get('swLng') || '0');
    const neLat = parseFloat(searchParams.get('neLat') || '0');
    const neLng = parseFloat(searchParams.get('neLng') || '0');

    // 파라미터 유효성 검사
    if (!swLat || !swLng || !neLat || !neLng) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // 중심점 계산
    const centerLat = (swLat + neLat) / 2;
    const centerLng = (swLng + neLng) / 2;

    // 사각형 범위로 검색 (x1,y1,x2,y2)
    const rect = `${swLng},${swLat},${neLng},${neLat}`;

    console.log(`[API] Searching hospitals in rect: ${rect}`);
    console.log(`[API] Center: ${centerLat}, ${centerLng}`);

    // 카카오 로컬 API로 동물병원 검색
    // 여러 페이지를 가져와서 더 많은 결과 반환
    const results = await searchAnimalHospitals({
      x: centerLng,
      y: centerLat,
      rect,
      size: 15, // 페이지당 최대 15개
      page: 1,
    });

    // 카카오 응답을 Hospital 타입으로 변환
    const hospitals: Hospital[] = results.documents.map((place) => ({
      id: place.id,
      name: place.place_name,
      address: place.address_name,
      roadAddress: place.road_address_name,
      coordinates: {
        lat: parseFloat(place.y),
        lng: parseFloat(place.x),
      },
      phone: place.phone || undefined,
      category: place.category_name,
    }));

    console.log(`[API] Found ${hospitals.length} hospitals from Kakao Local API`);
    console.log(`[API] Total available: ${results.meta.total_count}`);

    return NextResponse.json({
      hospitals,
      total: results.meta.total_count,
    });
  } catch (error) {
    console.error('[API] Error fetching hospitals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hospitals from Kakao Local API' },
      { status: 500 }
    );
  }
}
