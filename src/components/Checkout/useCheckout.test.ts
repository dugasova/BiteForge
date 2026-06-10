import { describe, it, expect } from 'vitest';
import { contactsSchema } from './useCheckout';

const t = (key: string) => key;

const validData = {
  fullName: 'John Doe',
  phoneNumber: '+380501234567',
  email: 'user@example.com',
  password: 'secret123',
  deliveryAddress: '123 Main Street',
};

describe('contactsSchema', () => {
  describe('for a guest (isUserLoggedIn = false)', () => {
    const schema = contactsSchema(t, false);

    it('accepts valid data with a password', () => {
      expect(schema.safeParse(validData).success).toBe(true);
    });

    it('rejects an empty password', () => {
      const result = schema.safeParse({ ...validData, password: '' });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('checkout.validation.passwordMin');
      }
    });

    it('rejects a password shorter than 6 characters', () => {
      const result = schema.safeParse({ ...validData, password: '123' });

      expect(result.success).toBe(false);
    });
  });

  describe('for a logged-in user (isUserLoggedIn = true)', () => {
    const schema = contactsSchema(t, true);

    it('accepts an empty password', () => {
      const result = schema.safeParse({ ...validData, password: '' });

      expect(result.success).toBe(true);
    });
  });

  describe('common field validation', () => {
    const schema = contactsSchema(t, true);

    it('rejects a full name shorter than 2 characters', () => {
      const result = schema.safeParse({ ...validData, password: '', fullName: 'J' });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('checkout.validation.nameMin');
      }
    });

    it('rejects an invalid phone number', () => {
      const result = schema.safeParse({ ...validData, password: '', phoneNumber: '12345' });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('checkout.validation.invalidPhone');
      }
    });

    it('rejects an invalid email', () => {
      const result = schema.safeParse({ ...validData, password: '', email: 'not-an-email' });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('checkout.validation.invalidEmail');
      }
    });

    it('rejects a delivery address shorter than 2 characters', () => {
      const result = schema.safeParse({ ...validData, password: '', deliveryAddress: 'A' });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('checkout.validation.deliveryAddressMin');
      }
    });
  });
});
