import { z } from 'zod';

// eslint-disable-next-line no-useless-escape
const PHONE_REGEX = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;

export const customerSchema = z.object({
  name: z.string({
    required_error: 'name is required.',
    invalid_type_error: 'name must be a string.'
  }).min(3, { message: 'name must be at least 3 characters long.' }),
  email: z.string({
    required_error: 'email is required.',
    invalid_type_error: 'email must be a string.'
  }).email({ message: 'Please enter a valid email.' }),
  phone: z.string({
    required_error: 'phone is required.',
    invalid_type_error: 'phone must be a string.'
  }).regex(PHONE_REGEX, { message: 'Please enter a valid phone number.' }),
  password: z.string({
    required_error: 'password is required.',
    invalid_type_error: 'password must be a string.'
  }).min(6, { message: 'Password must be at least 6 characters long.' }),
  banners: z.any().optional()
});

export type Customer = z.infer<typeof customerSchema>;
