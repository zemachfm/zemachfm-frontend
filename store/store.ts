import { createStore } from 'redux';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { reducer, State } from './reducer';

export const makeStore: MakeStore<State> = (context: Context) =>
  createStore(reducer);

export const wrapper = createWrapper<State>(makeStore, { debug: true });
