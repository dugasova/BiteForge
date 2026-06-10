import { describe, it, expect } from 'vitest';
import { loginSchema } from './loginSchema';

const t = (key: string) => key;
const schema = loginSchema(t);

const validData = { email: 'user@example.com', password: 'secret123' };

describe('loginSchema', () => {
  it('accepts a valid email and password', () => {
    const result = schema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = schema.safeParse({ ...validData, email: 'not-an-email' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('login.validation.invalidEmail');
    }
  });

  it('rejects a password shorter than 6 characters', () => {
    const result = schema.safeParse({ ...validData, password: '123' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('login.validation.passwordMin');
    }
  });

  it('rejects a password longer than 16 characters', () => {
    const result = schema.safeParse({ ...validData, password: 'a'.repeat(17) });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('login.validation.passwordMax');
    }
  });
});
