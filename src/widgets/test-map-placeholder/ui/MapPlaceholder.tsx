import Image from "next/image";

interface MapPlaceholderProps {
  height?: string;
  className?: string;
  showIcon?: boolean;
}

export function MapPlaceholder({
  height = "500px",
  className = "",
  showIcon = true,
}: MapPlaceholderProps) {
  return (
    <div
      className={`bg-gray-400 rounded-2xl ${className}`}
      style={{ height }}
    >
      {showIcon && (
        <div className="flex items-center justify-center h-full">
          <Image
            src="/icon/location.svg"
            alt="지도"
            width={64}
            height={64}
            className="opacity-30"
          />
        </div>
      )}
    </div>
  );
}
