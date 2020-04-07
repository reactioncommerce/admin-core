
import React from "react";
import PropTypes from "prop-types";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";
import { defaultTheme } from "@reactioncommerce/catalyst";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import apolloMocks from "./apolloMocks";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {}
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

/**
 * Component that wraps components with mock providers during testing.
 * @return {Component} - Component wrapped with mock providers
 */
const TestProviders = ({ children }) => (
  <MockedProvider mocks={apolloMocks}>
    <ThemeProvider theme={defaultTheme}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </ThemeProvider>
  </MockedProvider>
);

TestProviders.propTypes = {
  /** React Component */
  children: PropTypes.element.isRequired
};

/**
 * Custom test renderer that wraps all components with the appropriate mock providers.
 * @param {Component} component - React component to render.
 * @param {Object} options - Options.
 * @return {Object} - @see {@link https://testing-library.com/docs/react-testing-library/api#render-result|react-testing-library}
 */
const renderWithProviders = (component, options) => (
  render(component, { wrapper: TestProviders, ...options })
);

export * from "@testing-library/react";
export { renderWithProviders as render };
