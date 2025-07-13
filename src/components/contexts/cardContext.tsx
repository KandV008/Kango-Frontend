import { CardEntity } from '@/model/card/card';
import { createContext } from 'react';

type CardContextType = {
  card: CardEntity;
  setCard: React.Dispatch<React.SetStateAction<CardEntity>>;
};

export const CardContext = createContext<CardContextType>({
  card: new CardEntity(),
  setCard: () => {},
});
