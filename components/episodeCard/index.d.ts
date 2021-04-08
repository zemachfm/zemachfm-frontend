import React from 'react';
import { episode } from '../../store/home/types.d';

type Props = {
  title: string;
  image?: string;
  onPlay: (item: episode) => void;
  item: episode;
  playing: true;
};

export default Props;
