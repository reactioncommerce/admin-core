import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/**
 * Init i18next
 * @returns {undefined}
 */
export function initI18next() {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      backend: {
        loadPath: "/public/locales/{{lng}}-{{ns}}.json"
      },
      resources: {
        en: {
          translation: {
            shop: "Shop"
          }
        }
      },
      lng: "en",
      fallbackLng: "en",

      interpolation: {
        escapeValue: false
      }
    });
}
