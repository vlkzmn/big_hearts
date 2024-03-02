import { Tokens } from '../types/tokens';

function setTokens(data: Tokens) {
  localStorage.setItem('big_hearts_tokens', JSON.stringify(data));
}

function getTokens(): Tokens | undefined {
  const tokens = localStorage.getItem('big_hearts_tokens');

  if (tokens) {
    try {
      return JSON.parse(tokens);
    } catch (error) {
      return undefined;
    }
  } else {
    return undefined;
  }
}

export const localStorageService = {
  setTokens,
  getTokens,
};
