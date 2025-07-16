import { TagEntity } from '@/model/tag/tag';
import { createContext } from 'react';

type TagContextType = {
  tag: TagEntity;
  setTag: React.Dispatch<React.SetStateAction<TagEntity>>;
};

export const TagContext = createContext<TagContextType>({
  tag: new TagEntity(),
  setTag: () => {},
});
