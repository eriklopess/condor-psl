import { z } from 'zod';

// eslint-disable-next-line no-useless-escape
const PHONE_REGEX = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;

export const customerSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().regex(PHONE_REGEX, { message: 'Please enter a valid phone number.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  banners: z.any().optional()
});

export type Customer = z.infer<typeof customerSchema>;
