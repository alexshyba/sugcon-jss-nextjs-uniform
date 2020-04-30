import React from 'react';
import NextApp from 'next/app';
import i18n from 'i18next';
import { i18init } from '../src/lib/i18n';
import '../styles/style.css';

import Router from 'next/router'

import * as gtag from '../utils/gtag'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))


export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    // If `pageProps.dictionary` is defined and `i18n` isn't initialized, we assume
    // the app is being hydrated with SSR data and initialize `i18n` accordingly.
    if (pageProps.dictionary && !i18n.isInitialized) {
      // when passing in a dictionary that is defined, our i18init function
      // will set an option to immediately initialize the i18n instance instead
      // of initializing i18n asynchronously.
      i18init(pageProps.language, pageProps.dictionary);
    }
    return <Component {...pageProps} />;
  }
}
