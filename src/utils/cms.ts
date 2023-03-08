export function getCmsUrl(path: string) {
  return `${process.env.CMS_URL}/${path}`;
}
