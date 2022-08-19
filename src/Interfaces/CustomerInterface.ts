import { z } from 'zod';

// eslint-disable-next-line no-useless-escape
const PHONE_REGEX = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;

export const customerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().regex(PHONE_REGEX),
  password: z.string().min(6),
  banners: z.any().optional()
});

export type Customer = z.infer<typeof customerSchema>;
