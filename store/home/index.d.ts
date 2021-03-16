/**
 * fetch episodes payload types
 */

interface singleEpisodeType {
  title: string;
  description: string;
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
  type: string;
}

interface audioId {
  id: string;
}

interface playerStatusActionReturn {
  type: string;
  payload: playerStatus;
}

interface palyCertainAudioType {
  type: string,
  payload: audioId,
}



export {
  /**
   * episode types
   */
  singleEpisodeType,
  EpisodesReturnType,
  /**
   * audio player paylod type annotations
   */
  playerStatus,
  playerStatusActionReturn,
  palyCertainAudioType,
  audioId,
};
