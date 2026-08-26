import Image from "next/image";

export function DestinationMarker() {
  return (
    <div className="relative size-[39px] overflow-clip">
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
  );
}
