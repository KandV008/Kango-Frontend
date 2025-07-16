import type { CardEntity } from '@/model/card/card';
import { createContext } from 'react';

type CardListContextType = {
  cardList: CardEntity[];
  setCardList: React.Dispatch<React.SetStateAction<CardEntity[]>>;
};

export const CardListContext = createContext<CardListContextType>({
  cardList: [],
  setCardList: () => {},
});
