import Image from "next/image";

export function StudioLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Image
        src="/SL-WORDMARK-ONE LINE-WHITE.png"
        alt="Sensational League"
        width={160}
        height={20}
        priority
        style={{ height: 20, width: 'auto', objectFit: 'contain' }}
      />
    </div>
  );
}
