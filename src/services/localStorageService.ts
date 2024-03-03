/* eslint-disable no-console */
import { Tokens } from '../types/tokens';

const TOKENS = 'big_hearts_tokens';

function getTokens(): Tokens | undefined {
  const tokens = localStorage.getItem(TOKENS);

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

function addAccessToken(access: string) {
  try {
    const tokens = getTokens();

    if (tokens) {
      localStorage.setItem(TOKENS, JSON.stringify({ ...tokens, access }));
    }
  } catch (error) {
    console.error('Помилка при додаванні в localStorage: ', error);
  }
}

function setTokens(data: Tokens) {
  try {
    localStorage.setItem(TOKENS, JSON.stringify(data));
  } catch (error) {
    console.error('Помилка при додаванні в localStorage: ', error);
  }
}

function removeTokens() {
  try {
    localStorage.removeItem(TOKENS);
  } catch (error) {
    console.error('Помилка при видаленні з localStorage: ', error);
  }
}

export const localStorageService = {
  setTokens,
  addAccessToken,
  getTokens,
  removeTokens,
};
