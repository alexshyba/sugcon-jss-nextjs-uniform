// be sure to import isomorphic-unfetch _before_ i18next-fetch-backend
// as it would seem that the i18next-fetch-backend module requires
// `fetch` to be defined at import time.
import 'isomorphic-unfetch';
import i18n from 'i18next';
import fetchBackend from 'i18next-fetch-backend';
import { initReactI18next } from 'react-i18next';
import getConfig from '../temp/config';

/**
 * Initializes the i18next library to provide a translation dictionary to the app.
 * If your app is not multilingual, this file and references to it can be removed.
 * @param {string} language Required, the initial language.
 * @param {*} dictionary Optional, the dictionary to load. Used for SSR and when hydrating from SSR; otherwise, the dictionary is loaded via JSS dictionary service.
 */
export function i18init(language, dictionary) {
  const config = getConfig();

  const options = {
    debug: false,
    lng: language,
    fallbackLng: false, // fallback to keys
    load: 'currentOnly', // e.g. don't load 'es' when requesting 'es-MX' -- Sitecore config should handle this
    useCookie: false, // using URLs and Sitecore to store language context, don't need a cookie
    interpolation: {
      escapeValue: false, // not needed for react
    },
    react: {
      useSuspense: false,
    },
  };

  const dictionaryServicePath = `${config.sitecoreApiHost}/sitecore/api/jss/dictionary/${config.jssAppName}/{{lng}}?sc_apikey=${config.sitecoreApiKey}&sc_site=${config.sitecoreSiteName}`;

  options.backend = {
    loadPath: dictionaryServicePath,
    parse: (data) => {
      const parsedData = JSON.parse(data);
      if (parsedData.phrases) {
        return parsedData.phrases;
      }
      return parsedData;
    },
  };

  // We may also have dictionary data deserialized from SSR state, so we can initialize with that
  // if it is present.
  if (dictionary) {
    options.resources = {};
    options.resources[language] = {
      translation: dictionary,
    };
    // This option is a bit counter-intuitive. Setting the value to `false` will cause `i18n` to
    // initialize synchronously. Otherwise, `i18n` will initialize asynchronously.
    // Note: initializing asynchronously typically means the app will need to handle/render a "language loading" state or
    // initialization will need to happen before the app starts rendering at all - which will generally cause a "flash"
    // to occur in the browser.
    options.initImmediate = false;
  }

  // Although the `i18n.init` function returns a promise after init is complete, we're unable to
  // use `catch` to handle errors that originate in the fetch backend. If the fetch backend throws an
  // error, the backend only calls the `init` callback with the error, it doesn't attempt to reject
  // the init promise.
  // https://github.com/perrin4869/i18next-fetch-backend/blob/397b1c9c0fc87a3b9e7ff80aaf36674b89fd6466/src/index.js#L70

  // So the workaround is treat the `init` call like a traditional async call and
  // wrap it with our own promise.
  return new Promise((resolve, reject) => {
    i18n
      .use(fetchBackend)
      .use(initReactI18next)
      .init(options, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
  });
}
