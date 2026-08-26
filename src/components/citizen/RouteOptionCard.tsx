import Image from "next/image";

export interface RouteOption {
  id: string;
  title: string;
  badge?: string;
  subtitle: string;
  time: string;
  distance: string;
  icon: string;
  iconSize: number;
  iconBgClassName: string;
}

interface RouteOptionCardProps {
  option: RouteOption;
  selected: boolean;
  onSelect: () => void;
}

export function RouteOptionCard({ option, selected, onSelect }: RouteOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center justify-between rounded-[16px] border p-[14px] text-left ${
        selected ? "border-[#0080ff] bg-[#f2f9ff]" : "border-[#e4e8f1] bg-[#f7f8fa]"
      }`}
    >
      <div className="flex items-center gap-[8px]">
        <div
          className={`flex size-[36px] shrink-0 items-center justify-center rounded-full ${option.iconBgClassName}`}
        >
          <Image src={option.icon} alt="" width={option.iconSize} height={option.iconSize} />
        </div>
        <div className="flex flex-col items-start gap-[4px]">
          <div className="flex items-center gap-[6px]">
            <p className="whitespace-nowrap text-[16px] font-medium leading-[1.4] text-[#101828]">
              {option.title}
            </p>
            {option.badge ? (
              <span className="whitespace-nowrap rounded-[6px] bg-[#50a8ff] px-[8px] py-[2px] text-[12px] font-semibold leading-[1.4] text-white">
                {option.badge}
              </span>
            ) : null}
          </div>
          <p className="whitespace-nowrap text-[11px] font-medium leading-[1.4] text-[#585c62]">
            {option.subtitle}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-[6px] whitespace-nowrap text-right leading-[1.4]">
        <p className="text-[18px] font-medium text-[#101828]">{option.time}</p>
        <p className="text-[12px] font-medium text-[#6a7282]">{option.distance}</p>
      </div>
    </button>
  );
}
