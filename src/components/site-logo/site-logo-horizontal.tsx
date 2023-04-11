import Image from 'next/image';

export function SiteLogoHorizontal() {
  return (
    <Image
      src="/logo/logo-horizontal.webp"
      alt="Karlan Tools Logo"
      width={280}
      height={75}
      priority
    />
  );
}
