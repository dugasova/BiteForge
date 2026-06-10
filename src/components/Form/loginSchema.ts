import { z } from 'zod';

export type FormSchema = {
  email: string;
  password: string;
}

export const loginSchema = (t: (key: string) => string) => z.object({
  email: z.string().email({ message: t('login.validation.invalidEmail') }),
  password: z.string()
    .min(6, { message: t('login.validation.passwordMin') })
    .max(16, { message: t('login.validation.passwordMax') }),
});
