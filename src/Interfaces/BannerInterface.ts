import { z } from 'zod';

export const bannerSchema = z.object({
  name: z.string(),
  image: z.string(),
  customerID: z.any(),
  endAt: z.string(),
  startAt: z.string(),
  status: z.boolean(),
  banners: z.array(z.any()).optional(),
  _id: z.any().optional()
});

export type Banner = z.infer<typeof bannerSchema>;
