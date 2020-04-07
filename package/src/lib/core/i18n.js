import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import i18nextSprintfPostProcessor from "i18next-sprintf-postprocessor";
import i18nextFetch from "i18next-fetch-backend";
import i18nextMultiLoadBackendAdapter from "i18next-multiload-backend-adapter";

const configuredI18n = i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  // https://github.com/i18next/i18next-browser-languageDetector
  // Sets initial language to load based on `lng` query string
  // with various fallbacks.
  .use(i18nextBrowserLanguageDetector)
  // https://github.com/i18next/i18next-sprintf-postProcessor
  // key: 'Hello %(users[0].name)s, %(users[1].name)s and %(users[2].name)s',
  // i18next.t('key2', { postProcess: 'sprintf', sprintf: { users: [{name: 'Dolly'}, {name: 'Molly'}, {name: 'Polly'}] } });
  // --> 'Hello Dolly, Molly and Polly'
  .use(i18nextSprintfPostProcessor)
  // https://github.com/perrin4869/i18next-fetch-backend
  // This uses `fetch` to load resources from the backend based on `backend`
  // config object below.
  .use(i18nextMultiLoadBackendAdapter);

/**
 * Init i18next
 * @returns {undefined}
 */
export async function initI18next({ i18nBaseUrl, fallbackLng = "en" }) {
  // Reaction does not have a predefined list of namespaces. Any API plugin can
  // add any namespaces. So we must first get the list of namespaces from the API.
  const namespaceResponse = await fetch(`${i18nBaseUrl}/locales/namespaces.json`);
  const allTranslationNamespaces = await namespaceResponse.json();

  await configuredI18n.init({
    backend: {
      backend: i18nextFetch,
      backendOption: {
        allowMultiLoading: true,
        loadPath: `${i18nBaseUrl}/locales/resources.json?lng={{lng}}&ns={{ns}}`
      }
    },
    debug: false,
    detection: {
      // We primarily set language according to `navigator.language`,
      // which is supported in all modern browsers and can be changed
      // in the browser settings. This is the same list that browsers
      // send in the `Accept-Language` header.
      //
      // For ease of testing translations, we also support `lng`
      // query string to override the browser setting.
      order: ["querystring", "navigator"]
    },
    ns: allTranslationNamespaces,
    defaultNS: "core", // reaction "core" is the default namespace
    fallbackNS: allTranslationNamespaces,
    fallbackLng
  });
}
