import { z } from 'zod';

// eslint-disable-next-line no-useless-escape
export const bannerSchema = z.object({
  name: z.string(),
  image: z.string(),
  customerID: z.string(),
  endAt: z.string(),
  startAt: z.string(),
  status: z.boolean()
});

export type Banner = z.infer<typeof bannerSchema>;
