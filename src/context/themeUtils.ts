export type Theme = 'light' | 'dark';

export const THEMES: Theme[] = ['light', 'dark'];

export const getSavedTheme = (): Theme | null => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return null;
};

export const getPreferredTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const getInitialTheme = (): Theme => {
  const saved = getSavedTheme();
  return saved ?? getPreferredTheme();
};

export const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

export const saveTheme = (theme: Theme) => {
  localStorage.setItem('theme', theme);
};

export const toggleThemeValue = (prev: Theme): Theme => (prev === 'light' ? 'dark' : 'light');
