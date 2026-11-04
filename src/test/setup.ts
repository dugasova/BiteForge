import { vi } from 'vitest';

// Unit tests must not depend on a real Firebase project or on .env.
vi.mock('../firebase', () => ({ app: {}, auth: {}, db: {} }));
