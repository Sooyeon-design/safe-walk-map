"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DestinationMarker } from "@/components/citizen/DestinationMarker";

const MAP_ZOOM_STEPS = [1, 1.2, 1.4, 1.6];

export default function RouteDetailPage() {
  const router = useRouter();
  const [zoomStepIndex, setZoomStepIndex] = useState(0);

  const zoomIn = () => setZoomStepIndex((index) => Math.min(index + 1, MAP_ZOOM_STEPS.length - 1));
  const zoomOut = () => setZoomStepIndex((index) => Math.max(index - 1, 0));

  return (
    <div className="flex min-h-dvh w-full justify-center bg-white">
      <div className="relative flex min-h-dvh w-full max-w-[375px] flex-col bg-white">
        {/* 지도 영역: Figma 375×812 기준 지도 영역 높이(812 - 하단 시트 194 = 618px)를 최소값으로 유지 */}
        <div className="relative min-h-[618px] flex-1">
          {/* 지도 콘텐츠 (배경/마커 등, 확대·축소 대상) */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 origin-center transition-transform duration-200 ease-out"
              style={{ transform: `scale(${MAP_ZOOM_STEPS[zoomStepIndex]})` }}
            >
              {/* 지도 배경 (정적 이미지) */}
              <div className="absolute left-1/2 top-[-140px] h-[889px] w-[400px] -translate-x-1/2">
                <Image
                  src="/assets/route-detail/map-background.png"
                  alt=""
                  fill
                  priority
                  sizes="400px"
                  className="object-cover"
                />
              </div>

              {/* 도착 마커 */}
              <div className="absolute left-[157px] top-[202px]">
                <DestinationMarker />
              </div>

              {/* 현재 위치(진행 방향) 표시 */}
              <div className="absolute left-[176px] top-[545px] flex size-[39.439px] items-center justify-center">
                <div className="rotate-[-10.11deg]">
                  <div className="relative size-[34px]">
                    <div className="absolute left-[-12.07px] top-[-12.09px] size-[58px]">
                      <Image
                        src="/assets/route-detail/markers/current-location.svg"
                        alt="현재 위치"
                        fill
                        sizes="58px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 상태바 */}
          <div className="absolute inset-x-0 top-0 z-10 flex h-[44px] items-center">
            <div className="flex w-[93px] items-center justify-center py-[13px] pl-[30.5px]">
              <p
                className="text-[15px] font-semibold tracking-[-0.237px] text-black"
                style={{ fontFeatureSettings: '"ss16" 1' }}
              >
                9:42
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

          {/* 상단 경로 안내 카드 */}
          <div className="absolute left-[14px] top-[44px] z-10 w-[347px]">
            <div className="flex w-full flex-col items-center rounded-t-[16px] bg-[#45a2ff] px-[6px] pb-[6px] pt-[8px]">
              <div className="flex w-full items-center">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex shrink-0 flex-col items-start justify-center p-[4px]"
                >
                  <Image src="/assets/route-detail/icons/back-arrow.svg" alt="뒤로가기" width={22} height={22} />
                </button>
                <div className="flex flex-1 items-center gap-[9px]">
                  <div className="flex shrink-0 items-center gap-[7px] overflow-hidden">
                    <span className="size-[8px] shrink-0 rounded-full bg-[#05df72]" />
                    <p className="whitespace-nowrap text-[13px] font-medium leading-[16px] text-white">
                      e편한세상 금빛그랑메...
                    </p>
                  </div>
                  <div className="relative h-0 w-[7px] shrink-0">
                    <div className="absolute inset-[-3.68px_-7.14%_-3.68px_0]">
                      <Image src="/assets/route-detail/icons/route-connector.svg" alt="" fill sizes="7px" />
                    </div>
                  </div>
                  <div className="flex w-[120px] shrink-0 items-center gap-[7px]">
                    <span className="size-[8px] shrink-0 rounded-full bg-[#ff6467]" />
                    <p className="whitespace-nowrap text-[13px] font-medium leading-[16px] text-white">
                      단대오거리역 2번 출구
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center rounded-b-[16px] bg-[#007df8] px-[16px] py-[20px]">
              <div className="flex w-[315px] items-center gap-[12px]">
                <div className="flex size-[48px] shrink-0 items-center justify-center rounded-[11.294px] bg-[rgba(255,255,255,0.28)]">
                  <Image src="/assets/route-detail/icons/arrow-upward.svg" alt="" width={31} height={31} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start gap-[6px]">
                  <div className="flex w-full items-end gap-[2px]">
                    <p className="whitespace-nowrap text-[26px] font-bold leading-[25px] text-white">180m 앞</p>
                    <p className="whitespace-nowrap text-[16px] font-bold leading-[25px] text-white">
                      {" "}
                      금광동 공용상가 진입
                    </p>
                  </div>
                  <p className="w-[258px] text-[12px] font-medium leading-[1.4] text-[#e9f2ff]">
                    승강기로 1층 → 3층 이동 후 상부 보행로 연결
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 지도 우측 상단 컨트롤 (레이어/내 위치) */}
          <div className="absolute left-[319px] top-[193px] flex w-[40px] flex-col items-start gap-[12px]">
            <button
              type="button"
              className="flex h-[40px] w-full items-center justify-center rounded-full bg-white drop-shadow-[0px_2px_7px_rgba(0,0,0,0.1)]"
            >
              <Image src="/assets/route-detail/icons/map-layers.svg" alt="지도 레이어" width={20} height={20} />
            </button>
            <button
              type="button"
              className="flex h-[40px] w-full items-center justify-center rounded-full bg-white drop-shadow-[0px_2px_7px_rgba(0,0,0,0.1)]"
            >
              <Image src="/assets/route-detail/icons/map-locate.svg" alt="현재 위치로 이동" width={20} height={20} />
            </button>
          </div>

          {/* 지도 확대/축소 컨트롤: 바텀시트 상단과 항상 16px 간격 유지 */}
          <div className="absolute bottom-[16px] left-[321px] flex h-[80px] w-[40px] flex-col items-start overflow-clip rounded-[12px] bg-white shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <button
              type="button"
              onClick={zoomIn}
              className="flex size-[40px] items-center justify-center border-b border-[#e5e7eb]"
            >
              <span className="text-[20px] font-bold leading-[24px] text-[#4a5565]">+</span>
            </button>
            <button type="button" onClick={zoomOut} className="flex size-[40px] items-center justify-center">
              <span className="text-[20px] font-bold leading-[24px] text-[#4a5565]">−</span>
            </button>
          </div>
        </div>

        {/* 하단 진행 상태 시트 */}
        <div className="z-10 flex flex-col gap-[16px] bg-white px-[16px] pb-[20px] pt-[24px] drop-shadow-[0px_0px_12px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <p className="text-[24px] font-bold leading-[28px] text-[#101828]">14분</p>
              <p className="text-[16px] font-medium leading-[24px] text-[#99a1af]">|</p>
              <p className="text-[16px] font-semibold leading-[24px] text-[#364153]">850m 남음</p>
            </div>
            <div className="flex h-[28px] items-center justify-center rounded-full bg-[#e3f2fd] px-[12px] py-[7px]">
              <p className="whitespace-nowrap text-[12px] font-bold leading-[16px] text-[#1976d2]">
                통합안전로
              </p>
            </div>
          </div>

          <div className="relative h-[8px] w-[343px]">
            <div className="absolute left-0 top-0 h-[8px] w-[343px] rounded-full bg-[#e5e7eb]" />
            <div className="absolute left-0 top-0 h-[8px] w-[109.898px] rounded-full bg-[#0080ff]" />
            <div className="absolute left-0 top-[-6px] size-[20px]">
              <Image src="/assets/route-detail/icons/progress-current.svg" alt="" fill sizes="20px" />
            </div>
            <div className="absolute left-[101.72px] top-[-6.28px] flex size-[20px] items-center justify-center">
              <div className="rotate-90">
                <div className="relative size-[20px]">
                  <div className="absolute inset-[-29.41%_-41.18%_-52.94%_-41.18%]">
                    <Image src="/assets/route-detail/icons/progress-waypoint.svg" alt="" fill sizes="20px" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="whitespace-nowrap text-[12px] font-medium leading-[16px] text-[#6a7282]">
            안전을 위해 주변을 살피며 이동해 주세요.
          </p>

          <div className="flex h-[50px] w-full gap-[8px]">
            <button
              type="button"
              onClick={() => router.push("/report")}
              className="flex h-full flex-[165_0_0] items-center justify-center gap-[4px] rounded-[12px] bg-[#fee] py-[14px]"
            >
              <Image src="/assets/route-detail/icons/exclamation.svg" alt="" width={20} height={20} />
              <span className="whitespace-nowrap text-[16px] font-semibold leading-[1.4] text-[red]">
                불편 신고
              </span>
            </button>
            <button
              type="button"
              className="flex h-full flex-[161_0_0] items-center justify-center rounded-[12px] bg-[#0080ff] py-[14px]"
            >
              <span className="whitespace-nowrap text-[16px] font-semibold leading-[1.4] text-white">
                안내 종료
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
