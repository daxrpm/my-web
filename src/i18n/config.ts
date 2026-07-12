/**
 * Two locales, two real URLs: `/` is English (canonical) and `/es/` is Spanish. Both are
 * static HTML on disk, both are indexable, and each declares the other through hreflang —
 * which is the only arrangement Google actually honours. A client-side toggle that swapped
 * the text in place would leave the Spanish version invisible to search engines and
 * impossible to link to.
 */

export const locales = ['en', 'es'] as const;
export type Lang = (typeof locales)[number];

/** English is the default, so it owns the bare URL. */
export const defaultLocale: Lang = 'en';

/** A string (or list, or anything) written once per language. */
export type L<T = string> = Record<Lang, T>;

/** Pick the active language out of a localized value. */
export const t = <T>(value: L<T>, lang: Lang): T => value[lang];

/** The URL of `path` in `lang`. The default locale carries no prefix. */
export const localeUrl = (lang: Lang, path = '/') =>
  lang === defaultLocale ? path : `/${lang}${path}`;

export const otherLocale = (lang: Lang): Lang => (lang === 'en' ? 'es' : 'en');

/** Shown on the language toggle. Native names, as they should always be. */
export const localeNames: L = { en: 'English', es: 'Español' };
