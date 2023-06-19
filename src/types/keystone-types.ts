import { Prisma } from '@prisma/client';

export interface CloudinaryImageMeta {
  url: string;
  etag: string;
  tags: string[];
  type: string;
  bytes: number;
  width: number;
  folder: string;
  format: string;
  height: number;
  api_key: string;
  version: number;
  asset_id: string;
  public_id: string;
  signature: string;
  created_at: string;
  secure_url: string;
  version_id: string;
  placeholder: boolean;
  resource_type: string;
  original_filename: string;
}

export interface CloudinaryImage {
  id: string;
  _meta: CloudinaryImageMeta;
  encoding: string;
  filename: string;
  mimetype: string;
  originalFilename: string;
}

const fullEvent = Prisma.validator<Prisma.EventArgs>()({
  include: {
    materials: true,
    freeOp: true,
    bannerOp: true,
    newSkin: { include: { operator: true } },
    freeSkin: { include: { operator: true } },
    rerunSkin: { include: { operator: true } },
  },
});

export type FullEvent = Prisma.EventGetPayload<typeof fullEvent>;
