type WhatsappIconProps = {
  size?: number;
  className?: string;
};

export function WhatsappIcon({ size = 18, className = "" }: WhatsappIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        width: size,
        height: size,
        maskImage: "url(/img/WhatsApp.svg)",
        WebkitMaskImage: "url(/img/WhatsApp.svg)",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
