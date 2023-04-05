const BRANDS = new Map(
  [
    { label: 'Test Collection', value: 'testcollection' },
    { label: 'EPOQUE', value: 'epoque' },
    { label: 'Made by 0011', value: 'madeby0011' },
    { label: '0011/Tempest', value: '0011/tempest' },
    { label: 'Coral Coast', value: 'coralcoast' },
    { label: 'MARTHE', value: 'marthe' },
    { label: 'Witch Feast', value: 'witchfeast' },
    { label: 'Cambrian Series', value: 'cambrianseries' },
    { label: 'Icefield Messenger', value: 'icefieldmessenger' },
    { label: 'Vitafield', value: 'vitafield' },
    { label: 'Raythean Pioneer', value: 'raytheanpioneer' },
    { label: 'Raythean Striker', value: 'raytheanstriker' },
    { label: 'Bloodline of Combat', value: 'bloodlineofcombat' },
    { label: 'Rhodes Kitchen', value: 'rhodeskitchen' },
    { label: 'Dreambind Castle', value: 'dreambindcastle' },
    { label: 'Whistlewind', value: 'whistlewind' },
    { label: 'Ambience Synesthesia', value: 'ambiencesynesthesia' },
    { label: 'Collab Series', value: 'collabseries' },
    { label: 'Shining Steps', value: 'shiningsteps' },
    { label: 'Achievement Star', value: 'achievementstar' },
  ].map((brand) => [brand.value.replace('/', '-'), brand.label])
);

export function getBrandMetadata(brand?: string | null) {
  if (!brand) {
    return { label: '', logo: '' };
  }

  brand = brand.replace('/', '-');
  return {
    label: BRANDS.get(brand)!,
    logo: `/ui/brand/${brand}-bg.webp`,
  };
}
