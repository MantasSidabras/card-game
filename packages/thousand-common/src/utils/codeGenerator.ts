import { ID } from '@thousand/common/src/types';

const chunkToChar = (chunk: string) => {
  const charDict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const charSum = chunk.split('').reduce((acc, item) => {
    return acc + item.charCodeAt(0);
  }, 0);
  return charDict[charSum % charDict.length];
};

export const generateCodeFromId = (id: ID, charCount = 5): string => {
  const chunkSize = Math.floor(id.length / charCount);
  const chunkRemainder = id.length / 5;
  const chars: string[] = [];

  for (let i = 0; i < charCount - 1; i++) {
    const chunk = id.substr(i * chunkSize, chunkSize);
    chars.push(chunkToChar(chunk));
  }
  const lastChunk = id.substr(
    (charCount - 1) * chunkSize,
    chunkSize + chunkRemainder
  );
  chars.push(chunkToChar(lastChunk));
  return chars.join('');
};
