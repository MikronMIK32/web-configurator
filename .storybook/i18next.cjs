import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const getLanguageData = () => {
  const data = import.meta.glob('../public/locales/**/*.json');
  const keys = Object.keys(data).map(
    (e) => '.' + e.replace('../public/locales', ''),
  );

  const langsSet = new Set(
    keys.map((e) => {
      const path = e.substring(2);
      const slashPos = path.indexOf('/');

      return path.substring(0, slashPos);
    }),
  );

  const ns = new Set(
    keys.map((e) => {
      const slashPos = e.lastIndexOf('/');

      return e.substring(slashPos + 1).split('.')[0];
    }),
  );

  const supportedLngs = [...langsSet.values()];

  return {
    ns: [...ns.values()],
    supportedLngs,
  };
};

const { ns, supportedLngs } = getLanguageData();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    whitelist: supportedLngs,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: true },
    defaultNS: 'common',
    ns,
    supportedLngs,
  });

async function addStuff() {
  await Promise.all(
    supportedLngs.flatMap((lang) => {
      ns.map((n) =>
        import(`../public/locales/${lang}/${n}.json`).then((module) => {
          i18n.addResourceBundle(lang, n, module.default);
        }),
      );
    }),
  );
}

addStuff();

export default i18n;
