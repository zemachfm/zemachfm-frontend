import { episode } from '../home/types.d';

const singlePodcastActionTypes = {
  FETCH_SINGLE_PODCAST: 'FETCH_SINGLE_PODCAST',
  FETCH_SINGLE_PODCAST_SUCCEEDED: 'FETCH_SINGLE_PODCAST_SUCCEEDED',
  FETCH_SINGLE_PODCAST_FAILED: 'FETCH_SINGLE_PODCAST_FAILED',
};

interface basicReturnType {
  type: string;
  payload: string;
}
interface succeededReturnType {
  type: string;
  payload: {
    slug: string;
    page: episode;
  };
}

const fetchSinglePodcast = (payload: string): basicReturnType => ({
  type: singlePodcastActionTypes.FETCH_SINGLE_PODCAST,
  payload,
});

const fetchSinglePodcastFailed = (payload: string): basicReturnType => ({
  type: singlePodcastActionTypes.FETCH_SINGLE_PODCAST_FAILED,
  payload,
});

const fetchSinglePodcstSucceeded = ({
  slug,
  page,
}: {
  slug: string;
  page: episode;
}): succeededReturnType => ({
  type: singlePodcastActionTypes.FETCH_SINGLE_PODCAST_SUCCEEDED,
  payload: {
    slug,
    page,
  },
});

export {
  singlePodcastActionTypes,
  fetchSinglePodcast,
  fetchSinglePodcstSucceeded,
  fetchSinglePodcastFailed,
};
