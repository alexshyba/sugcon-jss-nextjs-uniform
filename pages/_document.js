import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CustomHead } from '../src/lib/CustomHead.tsx';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <CustomHead>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Roboto:ital,wght@0,400;0,700;1,700&display=swap"
            rel="stylesheet"
          />
        </CustomHead>
        <body className="leading-normal tracking-normal text-white gradient">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
