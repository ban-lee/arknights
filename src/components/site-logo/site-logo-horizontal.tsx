import Image from 'next/image';

export function SiteLogoHorizontal() {
  return (
    <Image
      src="/logo/logo-horizontal.webp"
      alt="Karlan Tools Logo"
      width={224}
      height={60}
      priority
    />
  );
}
