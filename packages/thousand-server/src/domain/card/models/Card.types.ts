export enum Suite {
  CLUBS = 'CLUBS',
  HEARTS = 'HEARTS',
  SPADES = 'SPADES',
  DIAMONDS = 'DIAMONDS',
}

export enum Rank {
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
  SIX = 'SIX',
  SEVEN = 'SEVEN',
  EIGHT = 'EIGHT',
  NINE = 'NINE',
  TEN = 'TEN',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
  ACE = 'ACE',
}

export const RankValue: Record<Rank, number> = {
  [Rank.TWO]: 2,
  [Rank.THREE]: 3,
  [Rank.FOUR]: 4,
  [Rank.FIVE]: 5,
  [Rank.SIX]: 6,
  [Rank.SEVEN]: 7,
  [Rank.EIGHT]: 8,
  [Rank.NINE]: 9,
  [Rank.TEN]: 10,
  [Rank.JACK]: 11,
  [Rank.QUEEN]: 12,
  [Rank.KING]: 12,
  [Rank.ACE]: 14,
};

export enum ThousandRank {
  NINE = 'NINE',
  TEN = 'TEN',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
  ACE = 'ACE',
}

export const ThousandRankValue: Record<ThousandRank, number> = {
  [ThousandRank.NINE]: 0,
  [ThousandRank.TEN]: 10,
  [ThousandRank.JACK]: 2,
  [ThousandRank.QUEEN]: 3,
  [ThousandRank.KING]: 4,
  [ThousandRank.ACE]: 11,
};
