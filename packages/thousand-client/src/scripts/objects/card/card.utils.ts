import Card from './card';
import { CardSuite, CardValue } from './card.types';

export const mapCardToThousandValue: { [key: string]: CardValue } = {
  ['09']: CardValue.NINE,
  ['J']: CardValue.JACK,
  ['Q']: CardValue.QUEEN,
  ['K']: CardValue.KING,
  ['A']: CardValue.ACE,
  ['10']: CardValue.TEN,
};

export const mapToSuite: { [key: string]: CardSuite } = {
  ['clubs']: CardSuite.CLUBS,
  ['hearts']: CardSuite.HEARTS,
  ['spades']: CardSuite.SPADES,
  ['diamonds']: CardSuite.DIAMONDS,
};
