import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        welcome: string;
        about: string;
        projects: string;
        contact: string;
        language: string;
        english: string;
        hindi: string;
        spanish: string;
        french: string;
        arabic: string;
        chinese: string;
        japanese: string;
      };
    };
  }
}
