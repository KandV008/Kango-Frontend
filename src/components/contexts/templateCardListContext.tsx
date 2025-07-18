import type { CardEntity } from '@/model/card/card';
import { createContext } from 'react';

type TemplateCardListContextType = {
  templateCardList: CardEntity[];
  setTemplateCardList: React.Dispatch<React.SetStateAction<CardEntity[]>>;
};

export const TemplateCardListContext = createContext<TemplateCardListContextType>({
  templateCardList: [],
  setTemplateCardList: () => {},
});
