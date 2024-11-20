import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt_br from './locale/pt_br.json';
import en from './locale/en.json';
import es from './locale/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt_br: {
        translation: pt_br,
      },
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
    lng: 'pt_br',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;