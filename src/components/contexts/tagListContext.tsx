import type { TagEntity } from '@/model/tag/tag';
import { createContext } from 'react';

type TagListContextType = {
  tagList: TagEntity[];
  setTagList: React.Dispatch<React.SetStateAction<TagEntity[]>>;
};

export const TagListContext = createContext<TagListContextType>({
  tagList: [],
  setTagList: () => {},
});
