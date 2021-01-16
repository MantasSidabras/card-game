

const cardSuites = ['clubs', 'diamonds', 'hearts', 'spades'];
const cardValues = ['09', '10', 'J', 'Q', 'K', 'A'];

export const getCardSprites = () => cardSuites.flatMap(suite => cardValues.map(value => `card_${suite}_${value}`));
