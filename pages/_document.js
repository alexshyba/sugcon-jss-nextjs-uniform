import Document, { Html, Main, NextScript } from 'next/document';
import { CustomHead } from '../src/lib/CustomHead.tsx';
import { GA_TRACKING_ID } from '../utils/gtag';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <CustomHead>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
   
          <link rel="preconnect" href="https://ajax.googleapis.com" />
          <link rel="dns-prefetch" href="https://ajax.googleapis.com" />

          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </CustomHead>
        <body className="leading-normal tracking-normal text-white gradient">
          <Main />
          <NextScript />
        </body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        const loadDynamicScript = (src, id, callback) => {
  const existingScript = document.getElementById('#' + id);
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = src; // URL for the third-party library being loaded.
    script.id = id; // e.g., googleMaps or stripe
    script.async = false;
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
const onDomContentLoaded = (func) => {
  console.log('here');
  if (typeof window !== 'undefined') {
      window.addEventListener('load', (event) => {
      func();
    });
  }
};
        onDomContentLoaded(() => {
            loadDynamicScript('https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', 'webfont', () => {
 WebFont.load({
  google: {
    families: ['Montserrat:300,700:latin', 'Roboto:700:latin']
  }
});
            });
            });`,
          }}
        ></script>
      </Html>
    );
  }
}

export default MyDocument;
