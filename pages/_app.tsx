import React from 'react';
import App, { AppInitialProps, AppContext } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import { END } from 'redux-saga';
import { makeStore as SagaStore, wrapper } from '../store/store';
import AudioPlayerContainer from '../components/audioPlayer/audioPlayerCont';
import '../styles/globals.css';
import 'nprogress/nprogress.css';

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
  public static getInitialProps = async ({ Component, ctx }: any) => {
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

    // 3. Return props
    return {
      pageProps,
    };
  };

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
        <AudioPlayerContainer />
      </>
    );
  }
}

export default wrapper.withRedux(WrappedApp);
