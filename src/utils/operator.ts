import { EventBannerTypeType } from '@prisma/client';

export function getRarityColour(rarity: number) {
  switch (rarity) {
    case 1:
      return '#9f9f9f';
    case 2:
      return '#dce537';
    case 3:
      return '#00b2f6';
    case 4:
      return '#dbb1db';
    case 5:
      return '#fbae02';
    case 6:
      return '#f96601';
    default:
      return '';
  }
}

const BANNER_TYPE = new Map<EventBannerTypeType, string>(
  [
    { label: 'Single Standard', value: 'single' },
    { label: 'Limited', value: 'limited' },
    { label: 'Special Collab', value: 'spcollab' },
    { label: 'Joint Operation', value: 'jointop' },
    { label: 'None', value: 'none' },
  ].map((type) => [type.value as EventBannerTypeType, type.label])
);

export function getBannerTypeLabel(bannerType: EventBannerTypeType): string {
  if (!BANNER_TYPE.has(bannerType)) throw new Error(`Banner types out of sync with schema [${bannerType}]`);

  return BANNER_TYPE.get(bannerType)!;
}
