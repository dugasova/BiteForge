import { describe, it, expect } from 'vitest';
import reducer, { setUser, signUpUser, logInUser, logOutUser, type AuthUser } from './authSlice';

const initialState = reducer(undefined, { type: '@@INIT' });

const mockUser: AuthUser = {
  uid: 'uid-1',
  email: 'user@example.com',
  displayName: null,
  photoURL: null,
};

describe('authSlice', () => {
  it('returns the initial state', () => {
    expect(initialState).toEqual({ user: null, loading: true });
  });

  describe('setUser', () => {
    it('sets the user and clears loading', () => {
      const state = reducer(initialState, setUser(mockUser));

      expect(state.user).toEqual(mockUser);
      expect(state.loading).toBe(false);
    });

    it('clears the user on logout (payload null)', () => {
      const loggedIn = reducer(initialState, setUser(mockUser));
      const state = reducer(loggedIn, setUser(null));

      expect(state.user).toBeNull();
      expect(state.loading).toBe(false);
    });
  });

  describe('signUpUser', () => {
    it('sets loading on pending', () => {
      const state = reducer(initialState, signUpUser.pending('requestId', { email: 'a@a.com', password: '123456' }));

      expect(state.loading).toBe(true);
    });

    it('sets the user and clears loading on fulfilled', () => {
      const pending = reducer(initialState, signUpUser.pending('requestId', { email: 'a@a.com', password: '123456' }));
      const state = reducer(pending, signUpUser.fulfilled(mockUser, 'requestId', { email: 'a@a.com', password: '123456' }));

      expect(state.user).toEqual(mockUser);
      expect(state.loading).toBe(false);
    });

    it('clears loading without setting a user on rejected', () => {
      const pending = reducer(initialState, signUpUser.pending('requestId', { email: 'a@a.com', password: '123456' }));
      const state = reducer(pending, signUpUser.rejected(new Error('Sign up failed'), 'requestId', { email: 'a@a.com', password: '123456' }));

      expect(state.user).toBeNull();
      expect(state.loading).toBe(false);
    });
  });

  describe('logInUser', () => {
    it('sets loading on pending', () => {
      const state = reducer(initialState, logInUser.pending('requestId', { email: 'a@a.com', password: '123456' }));

      expect(state.loading).toBe(true);
    });

    it('sets the user and clears loading on fulfilled', () => {
      const state = reducer(initialState, logInUser.fulfilled(mockUser, 'requestId', { email: 'a@a.com', password: '123456' }));

      expect(state.user).toEqual(mockUser);
      expect(state.loading).toBe(false);
    });

    it('clears loading without setting a user on rejected', () => {
      const state = reducer(initialState, logInUser.rejected(new Error('Login failed'), 'requestId', { email: 'a@a.com', password: '123456' }));

      expect(state.user).toBeNull();
      expect(state.loading).toBe(false);
    });
  });

  describe('logOutUser', () => {
    it('clears the user and loading on fulfilled', () => {
      const loggedIn = reducer(initialState, setUser(mockUser));
      const state = reducer(loggedIn, logOutUser.fulfilled(undefined, 'requestId', undefined));

      expect(state.user).toBeNull();
      expect(state.loading).toBe(false);
    });
  });
});
