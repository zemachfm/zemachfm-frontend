/**
 * fetch episodes payload types
 */
interface renderedType {
  rendered: string;
}
interface singleEpisodeType {
  id: number;
  title: renderedType;
  description: renderedType;
  content: renderedType;
  data: string;
}

interface paginationType {
  total: number;
  current: number;
  pageSize: number;
}

interface EpisodesReturnType {
  data: singleEpisodeType[];
  pagination?: paginationType;
}

/**
 * audio player payload type annotations
 */
interface playerStatus {
  type: number;
}

// eslint-disable-next-line no-shadow
enum preecedTypes {
  NEXT,
  PREVIOUS,
}

interface playerStatusActionReturn {
  type: string;
  payload: playerStatus;
}

interface palyCertainAudioType {
  type: string;
  payload: string;
}

export {
  /**
   * episode types
   */
  singleEpisodeType,
  EpisodesReturnType,
  preecedTypes,
  /**
   * audio player paylod type annotations
   */
  playerStatus,
  playerStatusActionReturn,
  palyCertainAudioType,
};
