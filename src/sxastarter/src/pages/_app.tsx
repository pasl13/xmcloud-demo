import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import Bootstrap from 'src/Bootstrap';
import { NextUIProvider } from '@nextui-org/react';
import 'assets/main.scss';

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    <>
      <NextUIProvider>
        <Bootstrap {...pageProps} />
        {/*
          // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
          // Note Next.js does not (currently) provide anything for translation, only i18n routing.
          // If your app is not multilingual, next-localization and references to it can be removed.
        */}
        <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
          <Component {...rest} />
        </I18nProvider>
      </NextUIProvider>
    </>
  );
}

export default App;
