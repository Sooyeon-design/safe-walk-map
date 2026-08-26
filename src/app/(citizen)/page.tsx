"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RouteOptionCard, type RouteOption } from "@/components/citizen/RouteOptionCard";

const ROUTE_OPTIONS: RouteOption[] = [
  {
    id: "integrated",
    title: "통합안전로",
    badge: "추천",
    subtitle: "그늘구간 73% | 쉼터 2곳 | 승강기 1곳",
    time: "15분",
    distance: "1.0km",
    icon: "/assets/map-home/icons/route-recommended.svg",
    iconSize: 20,
    iconBgClassName: "bg-[rgba(0,128,255,0.15)]",
  },
  {
    id: "shade",
    title: "그늘경로",
    subtitle: "그늘 구간 88% | 쉼터 2곳",
    time: "18분",
    distance: "1.1km",
    icon: "/assets/map-home/icons/route-shade.svg",
    iconSize: 22,
    iconBgClassName: "bg-[rgba(52,168,83,0.13)]",
  },
  {
    id: "flat",
    title: "평탄경로",
    subtitle: "최대 경사 3% | 계단 없음 | 승강기 2곳",
    time: "19분",
    distance: "1.2km",
    icon: "/assets/map-home/icons/route-flat.svg",
    iconSize: 22,
    iconBgClassName: "bg-[rgba(249,115,22,0.14)]",
  },
  {
    id: "shortest",
    title: "최단경로",
    subtitle: "기장 빠름 | 최대 경사 11%",
    time: "14분",
    distance: "0.9km",
    icon: "/assets/map-home/icons/route-shortest.svg",
    iconSize: 24,
    iconBgClassName: "bg-[rgba(234,179,8,0.2)]",
  },
];

export default function CitizenMapHomePage() {
  const router = useRouter();
  const [selectedRouteId, setSelectedRouteId] = useState<string>("integrated");

  return (
    <div className="flex min-h-dvh w-full justify-center bg-white">
      <div className="relative min-h-dvh w-full max-w-[375px] overflow-hidden bg-white">
        {/* 지도 배경 (정적 이미지) */}
        <div className="absolute left-0 top-[-47px] h-[667px] w-full">
          <Image
            src="/assets/map-home/map-background.png"
            alt=""
            fill
            priority
            sizes="(max-width: 375px) 100vw, 375px"
            className="object-cover"
          />
        </div>

        {/* 상태바 */}
        <div className="absolute inset-x-0 top-0 z-10 flex h-[44px] items-center">
          <div className="flex w-[93px] items-center justify-center py-[13px] pl-[30.5px]">
            <p
              className="text-[15px] font-semibold tracking-[-0.237px] text-black"
              style={{ fontFeatureSettings: '"ss16" 1' }}
            >
              9:41
            </p>
          </div>
          <div className="ml-auto flex w-[95px] items-center justify-center gap-[4px] p-[14px]">
            <Image src="/assets/map-home/icons/status-cellular.svg" alt="" width={18} height={12} />
            <Image src="/assets/map-home/icons/status-wifi.svg" alt="" width={16} height={12} />
            <Image
              src="/assets/map-home/icons/status-battery.svg"
              alt=""
              width={24.328}
              height={11.333}
            />
          </div>
        </div>

        {/* 출발/도착 검색 바 */}
        <div className="absolute left-0 top-[43px] z-10 w-full px-[16px] py-[12px] drop-shadow-[0px_14px_10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center overflow-hidden rounded-[14px] border border-[#d4d7dc] bg-white pr-[10px]">
            <div className="flex w-0 flex-1 flex-col">
              <div className="flex h-[40px] items-center gap-[10px] border-b border-[#d4d7dc] px-[14px] py-[12px]">
                <span className="size-[8px] shrink-0 rounded-full bg-[#00c964]" />
                <p className="truncate text-[14px] font-medium leading-[1.4] text-[#101828]">
                  e편한세상 금빛그랑메종 6단지
                </p>
              </div>
              <div className="flex h-[40px] items-center gap-[10px] px-[14px] py-[12px]">
                <span className="size-[8px] shrink-0 rounded-full bg-[#ea373d]" />
                <p className="truncate text-[14px] font-medium leading-[1.4] text-[#101828]">
                  단대오거리역 2번 출구
                </p>
              </div>
            </div>
            <div className="relative flex size-[36px] shrink-0 items-center justify-center rounded-full bg-white">
              <div className="absolute rotate-90">
                <Image src="/assets/map-home/icons/swap-arrow-a.svg" alt="" width={24} height={24} />
              </div>
              <div className="absolute -rotate-90 scale-y-[-1]">
                <Image src="/assets/map-home/icons/swap-arrow-b.svg" alt="" width={24} height={24} />
              </div>
            </div>
          </div>
        </div>

        {/* 출발 마커 */}
        <div className="absolute left-[8px] top-[154px] size-[39px] overflow-clip">
          <div className="absolute inset-[0_12.82%_5.13%_15.38%]">
            <Image src="/assets/map-home/markers/pin-origin.svg" alt="" fill sizes="39px" />
          </div>
          <div className="absolute inset-[17.95%_33.33%_35.9%_33.33%]">
            <Image src="/assets/map-home/markers/ellipse-origin.svg" alt="" fill sizes="39px" />
          </div>
          <p className="absolute inset-[17.95%_23.08%_43.59%_25.64%] whitespace-nowrap text-[11px] font-semibold leading-[1.4] text-white">
            출발
          </p>
        </div>

        {/* 도착 마커 */}
        <div className="absolute left-[335px] top-[301px] size-[39px] overflow-clip">
          <div className="absolute inset-[0_12.82%_5.13%_15.38%]">
            <Image src="/assets/map-home/markers/pin-destination.svg" alt="" fill sizes="39px" />
          </div>
          <div className="absolute inset-[17.95%_33.33%_35.9%_33.33%]">
            <Image src="/assets/map-home/markers/ellipse-destination.svg" alt="" fill sizes="39px" />
          </div>
          <p className="absolute inset-[17.95%_23.08%_43.59%_25.64%] whitespace-nowrap text-[11px] font-semibold leading-[1.4] text-white">
            도착
          </p>
        </div>

        {/* 통합 안전로 라벨 */}
        <div className="absolute left-[142px] top-[205px] h-[45px] w-[66px]">
          <div className="absolute left-0 top-0 h-[43.745px] w-[66px]">
            <Image src="/assets/map-home/labels/bubble-recommended.svg" alt="" fill sizes="66px" />
          </div>
          <p className="absolute left-[7.5px] right-[7.5px] top-[4px] whitespace-nowrap text-[11px] font-semibold leading-[1.4] text-[#0080ff]">
            통합 안전로
          </p>
          <p className="absolute left-[6px] right-[6px] top-[19px] whitespace-nowrap text-[10px] font-medium leading-[1.4] text-[#5f646e]">
            15분 | 1.0km
          </p>
        </div>

        {/* 그늘 경로 라벨 */}
        <div className="absolute left-[238px] top-[164px] flex flex-col items-center whitespace-nowrap rounded-[4px] bg-white px-[6px] py-[4px] drop-shadow-[0px_4px_11px_rgba(0,0,0,0.15)]">
          <p className="text-[11px] font-medium leading-[1.4] text-[#101828]">그늘 경로</p>
          <p className="text-[10px] font-medium leading-[1.4] text-[#5f646e]">18분 | 1.1km</p>
        </div>
        <div className="absolute left-[264px] top-[197px] size-[12px] rotate-180">
          <Image src="/assets/map-home/labels/pointer-a.svg" alt="" fill sizes="12px" />
        </div>

        {/* 최단 경로 라벨 */}
        <div className="absolute left-[256px] top-[255px] flex flex-col items-center whitespace-nowrap rounded-[4px] bg-white px-[6px] py-[4px] drop-shadow-[0px_4px_11px_rgba(0,0,0,0.15)]">
          <p className="text-[11px] font-medium leading-[1.4] text-[#101828]">최단 경로</p>
          <p className="text-[10px] font-medium leading-[1.4] text-[#5f646e]">14분 | 0.9km</p>
        </div>
        <div className="absolute left-[285px] top-[288px] size-[12px] rotate-180">
          <Image src="/assets/map-home/labels/pointer-a.svg" alt="" fill sizes="12px" />
        </div>

        {/* 평탄 경로 라벨 */}
        <div className="absolute left-[59px] top-[275px] flex flex-col items-center whitespace-nowrap rounded-[4px] bg-white px-[6px] py-[4px] drop-shadow-[0px_4px_11px_rgba(0,0,0,0.15)]">
          <p className="text-[11px] font-medium leading-[1.4] text-[#101828]">평탄 경로</p>
          <p className="text-[10px] font-medium leading-[1.4] text-[#5f646e]">19분 | 1.2km</p>
        </div>
        <div className="absolute left-[121px] top-[288px] size-[12px] rotate-90">
          <Image src="/assets/map-home/labels/pointer-b.svg" alt="" fill sizes="12px" />
        </div>

        {/* 하단 바텀시트 */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-[24px] bg-white p-[16px] drop-shadow-[0px_4px_12px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col gap-[8px]">
            {ROUTE_OPTIONS.map((option) => (
              <RouteOptionCard
                key={option.id}
                option={option}
                selected={selectedRouteId === option.id}
                onSelect={() => setSelectedRouteId(option.id)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => router.push(`/routes/${selectedRouteId}`)}
            className="flex h-[50px] w-full items-center justify-center gap-[2px] rounded-[12px] bg-[#0080ff]"
          >
            <span className="relative flex size-[25px] rotate-[39deg] items-center justify-center">
              <Image src="/assets/map-home/icons/nav-arrow.svg" alt="" width={16} height={16} />
            </span>
            <span className="whitespace-nowrap text-[16px] font-semibold leading-[1.4] text-white">
              안심 보행 시작
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
