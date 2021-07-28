import React, { ReactElement } from 'react';
import path from 'path';
import fs from 'fs';
import App, { AppInitialProps, AppContext } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import { END } from 'redux-saga';
import { makeStore as SagaStore, wrapper } from '../store/store';
import AudioPlayerContainer from '../components/audioPlayer/audioPlayerCont';
import '../styles/globals.css';
import 'nprogress/nprogress.css';
import NavBar from '../components/Navbar';
import BackToTop from '../components/shared/baackToTop';
import Footer from '../components/footer';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async (props: any) => {
    const { Component, ctx, router } = props;
    // 1. Wait for all page actions to dispatch
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };

    // 2. Stop the saga if on server
    if (ctx.req) {
      ctx.store.dispatch(END);
      await ctx.store.sagaTask.toPromise();
    }

    // const req = ctx?.req;
    const baseUrl = process.env.host;
    const filePath = `${baseUrl}/static/${router?.locale || 'en'}.json`;
    const data = await fetch(filePath);
    // const buffer = fs.readFileSync(filePath);
    // const content = JSON.parse(buffer.toString());
    const content = await data.json();

    pageProps.content = content;
    pageProps.locale = router?.locale || 'en';

    // 3. Return props
    return {
      pageProps,
    };
  };

  public render() {
    const { Component, pageProps } = this.props;
    const FooterElement = (): ReactElement => (
      <Footer content={pageProps.content} />
    );
    return (
      <div className="bg-gray-100 dark:bg-black flex flex-col  h-full w-full ">
        <NavBar
          appName={pageProps?.content?.appName}
          locale={pageProps?.locale}
        />
        <Component {...pageProps} Footer={FooterElement}></Component>
        <AudioPlayerContainer />
        <BackToTop />
      </div>
    );
  }
}

export default wrapper.withRedux(WrappedApp);
