import { z } from 'zod';

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const contactSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, { message: t('contact.validation.nameMin') }),
  email: z.string().email({ message: t('contact.validation.invalidEmail') }),
  subject: z.string(),
  message: z.string().min(10, { message: t('contact.validation.messageMin') }),
});
