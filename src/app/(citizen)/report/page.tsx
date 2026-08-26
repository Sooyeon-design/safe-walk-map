"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface SituationOption {
  id: string;
  label: string;
}

interface ReasonOption {
  id: string;
  label: string;
}

interface Photo {
  id: string;
  url: string;
}

const SITUATION_OPTIONS: SituationOption[] = [
  { id: "hard-to-pass", label: "지나가기 어려워요" },
  { id: "hard-to-rest", label: "쉬기 불편해요" },
  { id: "hard-to-walk", label: "걷기 불편해요" },
];

const REASON_OPTIONS: ReasonOption[] = [
  { id: "crowded", label: "사람이 많아 지나가기 어려워요" },
  { id: "steep", label: "길이 가팔라요" },
  { id: "bumpy", label: "바닥이 울퉁불퉁해요" },
  { id: "slippery", label: "미끄러워요" },
  { id: "etc", label: "기타" },
];

export default function ReportPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedSituation, setSelectedSituation] = useState("hard-to-walk");
  const [selectedReasons, setSelectedReasons] = useState<string[]>(["bumpy"]);
  const [detailText, setDetailText] = useState(
    "바닥이 울퉁불퉁해서 불편하고 넘어질 것 같아요",
  );
  const [photos, setPhotos] = useState<Photo[]>([
    { id: "sample", url: "/assets/report/images/sample-photo.png" },
  ]);

  const toggleReason = (id: string) => {
    setSelectedReasons((prev) =>
      prev.includes(id) ? prev.filter((reasonId) => reasonId !== id) : [...prev, id],
    );
  };

  const handleAddPhotos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const newPhotos = Array.from(files).map((file) => ({
      id: `${file.name}-${file.lastModified}-${file.size}`,
      url: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
    event.target.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const handleSubmit = () => {
    console.log("[불편 신고] 제출된 내용 (프로토타입, 서버 전송 없음)", {
      situation: selectedSituation,
      reasons: selectedReasons,
      detailText,
      photoCount: photos.length,
    });
  };

  return (
    <div className="flex min-h-dvh w-full justify-center bg-white">
      <div className="w-full max-w-[375px] bg-white">
        {/* 상태바 */}
        <div className="flex h-[44px] items-center">
          <div className="flex w-[93px] items-center justify-center py-[13px] pl-[30.5px]">
            <p
              className="text-[15px] font-semibold tracking-[-0.237px] text-black"
              style={{ fontFeatureSettings: '"ss16" 1' }}
            >
              9:44
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

        {/* 헤더 */}
        <div className="flex items-center gap-[8px] px-[16px] py-[12px]">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex shrink-0 flex-col items-start justify-center p-[4px]"
          >
            <Image src="/assets/report/icons/back-arrow.svg" alt="뒤로가기" width={22} height={22} />
          </button>
          <p className="text-[18px] font-medium leading-[27px] text-[#101828]">불편 신고</p>
        </div>

        {/* 위치 지도 미리보기 */}
        <div className="relative h-[221px] w-full overflow-hidden">
          <Image
            src="/assets/report/map-background.png"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute left-[157px] top-[35px] h-[44px] w-[36px]">
            <Image src="/assets/report/markers/pin-marker.svg" alt="신고 위치" fill />
          </div>

          <div className="absolute left-1/2 top-[137px] w-[335px] -translate-x-1/2 rounded-[16px] bg-white p-[12px] drop-shadow-[0px_4px_12px_rgba(0,0,0,0.09)]">
            <div className="flex w-full items-center gap-[12px]">
              <div className="flex flex-1 items-start gap-[4px]">
                <div className="flex size-[20px] shrink-0 items-center justify-center pt-[0.833px]">
                  <Image
                    src="/assets/report/icons/location-pin-small.svg"
                    alt=""
                    width={13}
                    height={16}
                  />
                </div>
                <div className="flex flex-col items-start gap-[2px]">
                  <p className="whitespace-nowrap text-[14px] font-semibold leading-[19.6px] text-[#101828]">
                    금광동 생활권 동측 보행로
                  </p>
                  <p className="whitespace-nowrap text-[12px] font-medium leading-[18px] text-[#868c97]">
                    현재 위치를 기준으로 등록되었습니다.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="flex shrink-0 items-center justify-center rounded-[8px] bg-[#ecf0f5] px-[8px] py-[6px]"
              >
                <span className="whitespace-nowrap text-[11px] font-semibold leading-[18px] text-[#364153]">
                  위치 수정
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 신고 입력 폼 */}
        <div className="flex flex-col gap-[24px] px-[20px] py-[24px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-[14px] font-medium leading-[1.4] text-[#21242b]">
              어떤 상황이 불편하셨나요?
            </p>
            <div className="flex w-full gap-[5px]">
              {SITUATION_OPTIONS.map((option) => {
                const selected = selectedSituation === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedSituation(option.id)}
                    className={`flex h-[40px] flex-1 items-center justify-center gap-[2px] rounded-[44px] border px-[10px] py-[12px] ${
                      selected
                        ? "border-[#0080ff] bg-[#f0f7ff]"
                        : "border-[#e5e7eb] bg-[#f7f8fa]"
                    }`}
                  >
                    {selected ? (
                      <Image src="/assets/report/icons/check.svg" alt="" width={13} height={13} />
                    ) : null}
                    <span
                      className={`whitespace-nowrap text-[13px] font-medium leading-[17.875px] ${
                        selected ? "text-[#0080ff]" : "text-[#364153]"
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="text-[14px] font-medium leading-[1.4] text-[#21242b]">
              무엇 때문에 불편하셨나요? (복수선택 가능)
            </p>
            <div className="flex flex-wrap gap-x-[6px] gap-y-[8px]">
              {REASON_OPTIONS.map((option) => {
                const selected = selectedReasons.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleReason(option.id)}
                    className={`flex h-[40px] items-center gap-[2px] rounded-[50px] border px-[14px] py-[8px] ${
                      selected
                        ? "border-[#0080ff] bg-[#f0f7ff]"
                        : "border-[#e5e7eb] bg-[#f7f8fa]"
                    }`}
                  >
                    {selected ? (
                      <Image src="/assets/report/icons/check.svg" alt="" width={13} height={13} />
                    ) : null}
                    <span
                      className={`whitespace-nowrap text-[13px] font-medium leading-[18.2px] ${
                        selected ? "text-[#0080ff]" : "text-[#364153]"
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="text-[14px] font-medium leading-[1.4] text-[#21242b]">상세 작성</p>
            <div className="flex items-center gap-[8px] rounded-[12px] border border-[#697077] px-[14px] py-[12px]">
              <input
                type="text"
                value={detailText}
                onChange={(event) => setDetailText(event.target.value)}
                className="h-full flex-1 text-[14px] font-normal leading-[21px] text-[#101828] outline-none"
              />
              {detailText ? (
                <button
                  type="button"
                  onClick={() => setDetailText("")}
                  className="flex shrink-0 items-center justify-center"
                >
                  <Image src="/assets/report/icons/clear.svg" alt="지우기" width={18} height={18} />
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="text-[14px] font-medium leading-[1.4] text-[#21242b]">사진 첨부</p>
            <div className="flex flex-wrap items-start gap-[10px]">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex size-[88px] shrink-0 flex-col items-center justify-center gap-[6px] rounded-[12px] border-[1.5px] border-dashed border-[#d1d5db] bg-[#f9fafb]"
              >
                <Image src="/assets/report/icons/camera.svg" alt="" width={24} height={24} />
                <span className="text-[12px] font-semibold leading-[16.5px] text-[#9ca3af]">
                  사진 추가
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleAddPhotos}
              />
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative size-[88px] shrink-0 overflow-hidden rounded-[12px]"
                >
                  <Image src={photo.url} alt="첨부 사진" fill className="object-cover" unoptimized />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="absolute right-[5px] top-[5px] flex size-[18px] items-center justify-center"
                  >
                    <Image src="/assets/report/icons/remove-photo.svg" alt="사진 삭제" width={18} height={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex h-[50px] w-full">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex h-full w-full items-center justify-center rounded-[12px] bg-[#0080ff] py-[15px]"
            >
              <span className="text-[16px] font-semibold leading-[1.4] text-white">신고 보내기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
