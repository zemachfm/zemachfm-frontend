import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wrapper } from '../store/store';
import { fetchEpisodes } from '../store/home/actions';

const Other = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEpisodes('payload'));
  }, [dispatch]);

  return <h1> hi there </h1>;
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(fetchEpisodes(false));
  const state = store.getState();
  return { props: state };
});

export default Other;
